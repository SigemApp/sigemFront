'use client';

import React, { useState, useEffect } from 'react';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import SupplierForm from '../../components/especificComponents/supplierForm';
import Button from '../../components/interfaceComponents/button';
import Notification from '../../components/interfaceComponents/customNotification';
import { SupplierItem, PartSupplier, ServiceSupplier } from './types';

const SuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierItem[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierItem | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    fetch('/api/suppliers')
      .then(response => response.json())
      .then(data => {
        setSuppliers(data);
        setFilteredSuppliers(data);
      })
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  const handleSearch = () => {
    setFilteredSuppliers(suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.type.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleSave = async (supplier: Omit<PartSupplier | ServiceSupplier, 'id'> & { id?: number }) => {
    try {
      const url = formMode === 'create' ? '/api/suppliers' : `/api/suppliers/${selectedSupplier?.id}`;
      const method = formMode === 'create' ? 'POST' : 'PUT';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
      });
      const result = await response.json();

      if (formMode === 'create') {
        setSuppliers([...suppliers, result]);
        setNotification({ message: 'Fornecedor adicionado com sucesso!', type: 'success' });
      } else {
        setSuppliers(suppliers.map(s => s.id === result.id ? result : s));
        setNotification({ message: 'Fornecedor atualizado com sucesso!', type: 'success' });
      }

      setFormOpen(false);
      setSelectedSupplier(null);
    } catch (error) {
      console.error('Error saving supplier:', error);
      setNotification({ message: 'Erro ao salvar fornecedor!', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/suppliers/${id}`, {
        method: 'DELETE',
      });
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      setNotification({ message: 'Fornecedor deletado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Error deleting supplier:', error);
      setNotification({ message: 'Erro ao deletar fornecedor!', type: 'error' });
    }
  };

  const handleEdit = (supplier: SupplierItem) => {
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
        columns={['Nome', 'Código', 'Tipo', 'Ações']}
        data={filteredSuppliers}
        renderRow={(supplier) => (
          <>
            <td className="p-2">{supplier.name}</td>
            <td className="p-2">{supplier.code}</td>
            <td className="p-2">{supplier.type}</td>
            <td className="p-2">
              <Button label="Editar" onClick={() => handleEdit(supplier)} />
              <Button label="Deletar" onClick={() => handleDelete(supplier.id)} />
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
    </div>
  );
};

export default SuppliersPage;
