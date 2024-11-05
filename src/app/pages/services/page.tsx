'use client';

import React, { useState, useEffect } from 'react';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import ServiceForm from '../../components/especificComponents/serviceForm';
import Button from '../../components/interfaceComponents/button';
import Notification from '../../components/interfaceComponents/customNotification';
import { ServiceSupplier, PartSupplier } from './types';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceSupplier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState<ServiceSupplier[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedService, setSelectedService] = useState<ServiceSupplier | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    fetch('/api/services')
      .then(response => response.json())
      .then(data => {
        setServices(data);
        setFilteredServices(data);
      })
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const handleSearch = () => {
    setFilteredServices(services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.type.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleSave = async (service: Omit<ServiceSupplier, 'id'> & { id?: number }) => {
    try {
      const url = formMode === 'create' ? '/api/services' : `/api/services/${selectedService?.id}`;
      const method = formMode === 'create' ? 'POST' : 'PUT';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      const result = await response.json();

      if (formMode === 'create') {
        setServices([...services, result]);
        setNotification({ message: 'Serviço adicionado com sucesso!', type: 'success' });
      } else {
        setServices(services.map(s => s.id === result.id ? result : s));
        setNotification({ message: 'Serviço atualizado com sucesso!', type: 'success' });
      }

      setFormOpen(false);
      setSelectedService(null);
    } catch (error) {
      console.error('Error saving service:', error);
      setNotification({ message: 'Erro ao salvar serviço!', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      setServices(services.filter(service => service.id !== id));
      setNotification({ message: 'Serviço deletado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Error deleting service:', error);
      setNotification({ message: 'Erro ao deletar serviço!', type: 'error' });
    }
  };

  const handleEdit = (service: ServiceSupplier) => {
    setSelectedService(service);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedService(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleCloseModal = () => {
    setFormOpen(false);
    setSelectedService(null);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const getInitialData = (): Omit<ServiceSupplier, 'id'> | null => {
    if (selectedService) {
      const { id, ...rest } = selectedService;
      return rest as Omit<ServiceSupplier, 'id'>;
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Button label="Adicionar Serviço" onClick={handleCreate} />
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          placeholder="Procurar Serviços"
        />
      </div>

      <Table 
        columns={['Nome', 'Código', 'Descrição', 'Ações']}
        data={filteredServices}
        renderRow={(service) => (
          <>
            <td className="p-2">{service.name}</td>
            <td className="p-2">{service.code}</td>
            <td className="p-2">{service.serviceDescription}</td>
            <td className="p-2">
              <Button label="Editar" onClick={() => handleEdit(service)} />
              <Button label="Deletar" onClick={() => handleDelete(service.id)} />
            </td>
          </>
        )}
      />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}

      <Modal isOpen={isFormOpen} onClose={handleCloseModal}>
        <ServiceForm
          isOpen={isFormOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          initialData={getInitialData()}
          mode={formMode}
        />
      </Modal>
    </div>
  );
};

export default ServicesPage;
