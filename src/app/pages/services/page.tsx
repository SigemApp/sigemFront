'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import ServiceForm from '../../components/especificComponents/serviceForm';
import Button from '../../components/interfaceComponents/button';
import Notification from '../../components/interfaceComponents/customNotification';
import ServiceDetail from '../../components/especificComponents/serviceDetail';
import { Service } from './types';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<{ [id: string]: string }>({}); 

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    fetchSuppliers();
  }, [services]);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/suppliers');
      const supplierMap = response.data.reduce((acc: { [id: string]: string }, supplier: any) => {
        acc[supplier.id] = supplier.name; 
        return acc;
      }, {});
      setSuppliers(supplierMap); 
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/services', {
        params: { searchTerm }
      });
      setServices(response.data);
      setFilteredServices(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const handleSave = async (service: Omit<Service, 'id'>) => {
    try {
      const supplierId = "67309514fe565d75f45fd58c"; 

      const serviceData = {
        name: service.name,
        supplierName: supplierId, 
        description: service.description,
      };

      if (formMode === 'create') {
        const response = await axios.post('http://localhost:3000/services', serviceData);
        setServices((prevServices) => [...prevServices, response.data]);
        setNotification({ message: 'Serviço adicionado com sucesso!', type: 'success' });
      } else if (selectedService) {
        const updatedService = { ...serviceData, id: selectedService.id };
        await axios.put(`http://localhost:3000/services/${selectedService.id}`, updatedService);
        setServices((prevServices) => prevServices.map(s => s.id === selectedService.id ? updatedService : s));
        setNotification({ message: 'Serviço atualizado com sucesso!', type: 'success' });
      }

      setFormOpen(false);
      setSelectedService(null);
      handleSearch();
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      setNotification({ message: 'Erro ao salvar serviço!', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/services/${id}`);
      setServices((prevServices) => prevServices.filter(service => service.id !== id));
      setNotification({ message: 'Serviço excluído com sucesso!', type: 'success' });
      handleSearch();
    } catch (error) {
      console.error('Erro ao excluir serviço:', error);
      setNotification({ message: 'Erro ao excluir serviço!', type: 'error' });
    }
  };

  const handleDetail = async (service: Service) => {
    try {
      const response = await axios.get(`http://localhost:3000/services/${service.id}`);
      setSelectedService(response.data);
      setDetailOpen(true);  
    } catch (error) {
      console.error('Erro ao buscar detalhes do serviço:', error);
    }
  };

  const handleUpdate = (service: Service) => {
    setSelectedService(service);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleCloseModal = () => {
    setFormOpen(false);
    setSelectedService(null);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const handleCloseDetailModal = () => {
    setDetailOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Button label="Adicionar Serviço" onClick={() => setFormOpen(true)} />
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          placeholder="Procurar Serviços"
        />
      </div>

      <Table
        columns={['Nome', 'Cód. Fornecedor', 'Descrição', 'Ações']}
        data={filteredServices}
        renderRow={(service) => (
          <>
            <td className="p-2">{service.name}</td>
            <td className="p-2">{suppliers[service.supplierName] || service.supplierName}</td>
            <td className="p-2">{service.description}</td>
            <td className="p-2">
              <Button className='mr-4' label="Editar" onClick={() => handleUpdate(service)} />
              <Button className='mr-4' label="Deletar" onClick={() => handleDelete(service.id)} />
              <Button label='Detalhar' onClick={() => handleDetail(service)} />
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
          initialData={selectedService ? {
            id: selectedService.id,
            name: selectedService.name,
            supplierName: selectedService.supplierName,
            description: selectedService.description,
          } : null}
          mode={formMode}
        />
      </Modal>

      {selectedService && (
        <Modal isOpen={isDetailOpen} onClose={handleCloseDetailModal}>
          <ServiceDetail
            service={selectedService}  
            onClose={handleCloseDetailModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default ServicesPage;
