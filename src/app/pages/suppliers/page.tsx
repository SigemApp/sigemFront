'use client';

import React, { useState, useEffect } from 'react';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import SupplierForm from '../../components/especificComponents/supplierForm';
import Button from '../../components/interfaceComponents/button';
import Notification from '../../components/interfaceComponents/customNotification';
import SupplierDetail from '@/app/components/especificComponents/supplierDetail'; 
import { PartSupplier, ServiceSupplier } from './types';
import axios from 'axios';

const SuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<(PartSupplier | ServiceSupplier)[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState<(PartSupplier | ServiceSupplier)[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedSupplier, setSelectedSupplier] = useState<PartSupplier | ServiceSupplier | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // States for the Detail Modal
  const [detailOpen, setDetailOpen] = useState(false); // Estado para abrir o modal de detalhes
  const [selectedDetail, setSelectedDetail] = useState<PartSupplier | ServiceSupplier | null>(null); // Fornecedor selecionado para o modal

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/suppliers', {
        params: { searchTerm }
      });
      setSuppliers(response.data);
      setFilteredSuppliers(response.data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  const handleSave = async (supplier: Omit<PartSupplier | ServiceSupplier, 'id'> & { id?: string }) => {
    try {
      const supplyData = {
        name: supplier.name,
        code: supplier.code,
        type: supplier.type,
        address: supplier.address,
        contactName: supplier.contactName,
        contactEmail: supplier.contactEmail,
        contactPhone: supplier.contactPhone,
        website: supplier.website,
        notes: supplier.notes,
        ...(supplier.type === 'service' && { serviceDescription: (supplier as ServiceSupplier).serviceDescription }),
      };

      if (formMode === 'create') {
        const response = await axios.post('http://localhost:3000/suppliers', supplyData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setSuppliers([...suppliers, response.data]);
        setNotification({ message: 'Fornecedor adicionado com sucesso!', type: 'success' });
      } else if (selectedSupplier) {
        await axios.put(`http://localhost:3000/suppliers/${selectedSupplier.id}`, supplyData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setNotification({ message: 'Fornecedor atualizado com sucesso!', type: 'success' });
        handleSearch();
      }

      setFormOpen(false);
      setSelectedSupplier(null);
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
      setNotification({ message: 'Erro ao salvar fornecedor!', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/suppliers/${id}`);
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      setNotification({ message: 'Fornecedor deletado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
      setNotification({ message: 'Erro ao deletar fornecedor!', type: 'error' });
    }
  };

  const handleDetail = (supplier: PartSupplier | ServiceSupplier) => {
    setSelectedDetail(supplier); 
    setDetailOpen(true); // Abre o modal de detalhes
  };

  const handleEdit = (supplier: PartSupplier | ServiceSupplier) => {
    setSelectedSupplier(supplier);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedSupplier(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleCloseModal = () => {
    setFormOpen(false);
    setSelectedSupplier(null);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const getInitialData = (): Omit<PartSupplier, 'id'> | Omit<ServiceSupplier, 'id'> | null => {
    if (selectedSupplier) {
      const { id, ...rest } = selectedSupplier;
      if (selectedSupplier.type === 'part') {
        return rest as Omit<PartSupplier, 'id'>;
      } else if (selectedSupplier.type === 'service') {
        return rest as Omit<ServiceSupplier, 'id'>;
      }
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Button label="Adicionar Fornecedor" onClick={handleCreate} />
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          placeholder="Procurar Fornecedores"
        />
      </div>

      <Table 
        columns={['Nome', 'Código', 'Tipo', 'Endereço', 'Contato', 'Email', 'Ações']}
        data={filteredSuppliers}
        renderRow={(supplier) => (
          <>
            <td className="p-2">{supplier.name}</td>
            <td className="p-2">{supplier.code}</td>
            <td className="p-2">{supplier.type === 'part' ? 'Peça' : 'Serviço'}</td>
            <td className="p-2">{supplier.address}</td>
            <td className="p-2">{supplier.contactName}</td>
            <td className="p-2">{supplier.contactEmail}</td>
            <td className="p-2 flex gap-2">
              <Button label="Editar" onClick={() => handleEdit(supplier)} className="mx-1" />
              <Button label="Deletar" onClick={() => handleDelete(supplier.id)} className="mx-1" />
              <Button label="Detalhar" onClick={() => handleDetail(supplier)} className="mx-1" />
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
        <SupplierForm
          isOpen={isFormOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          initialData={getInitialData()}
          mode={formMode}
        />
      </Modal>

      {/* Modal de detalhes */}
      {detailOpen && selectedDetail && (
        <SupplierDetail 
          supplier={selectedDetail} 
          onClose={() => setDetailOpen(false)} 
        />
      )}
    </div>
  );
};

export default SuppliersPage;
