'use client';

import React, { useState, useEffect } from 'react';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import MachineForm from '../../components/especificComponents/machineForm';
import Button from '../../components/interfaceComponents/button';
import Notification from '../../components/interfaceComponents/customNotification';
import MachineDetail from '../../components/especificComponents/machineDetail'; 
import { Machine } from './types';
import { mockMachines } from './mockData';  

const MachinesPage: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false); // Novo estado para controlar o modal de detalhes

  useEffect(() => {
    setMachines(mockMachines);
    setFilteredMachines(mockMachines);
  }, []);

  const handleSearch = () => {
    setFilteredMachines(machines.filter(machine => 
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.type.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleSave = async (machine: Omit<Machine, 'id' | 'maintenanceHistory'> & { image: File | null }) => {
    try {
      if (formMode === 'create') {
        const newMachine = {
          ...machine,
          id: machines.length + 1, // Mock new ID
          maintenanceHistory: []
        };
        setMachines([...machines, newMachine]);
        setNotification({ message: 'Máquina adicionada com sucesso!', type: 'success' });
      } else if (selectedMachine) {
        const updatedMachine = {
          ...machine,
          id: selectedMachine.id,
          maintenanceHistory: selectedMachine.maintenanceHistory
        };
        setMachines(machines.map(m => m.id === selectedMachine.id ? updatedMachine : m));
        setNotification({ message: 'Máquina atualizada com sucesso!', type: 'success' });
      }
      setFormOpen(false);
      setSelectedMachine(null);
    } catch (error) {
      console.error('Error saving machine:', error);
      setNotification({ message: 'Erro ao salvar máquina!', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setMachines(machines.filter(machine => machine.id !== id));
      setNotification({ message: 'Máquina excluída com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Error deleting machine:', error);
      setNotification({ message: 'Erro ao excluir máquina!', type: 'error' });
    }
  };

  const handleEdit = (machine: Machine) => {
    setSelectedMachine(machine);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedMachine(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleCloseModal = () => {
    setFormOpen(false);
    setSelectedMachine(null);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const handleDetail = (machine: Machine) => {
    setSelectedMachine(machine);
    setDetailOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailOpen(false);
    setSelectedMachine(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Button label="Adicionar Máquina" onClick={handleCreate} />
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          placeholder="Procurar Máquinas"
        />
      </div>

      <Table 
        columns={['Nome', 'Tipo', 'Modelo', 'Ações']}
        data={filteredMachines}
        renderRow={(machine) => (
          <>
            <td className="p-2">{machine.name}</td>
            <td className="p-2">{machine.type}</td>
            <td className="p-2">{machine.model}</td>
            <td className="p-2">
              <Button className='mr-4' label="Editar" onClick={() => handleEdit(machine)} />
              <Button className='mr-4' label="Deletar" onClick={() => handleDelete(machine.id)} />
              <Button label='Detalhar' onClick={() => handleDetail(machine)} />
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
        <MachineForm
          isOpen={isFormOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          initialData={selectedMachine ? {
            name: selectedMachine.name,
            type: selectedMachine.type,
            model: selectedMachine.model,
            manufacturingDate: selectedMachine.manufacturingDate,
            serialNumber: selectedMachine.serialNumber,
            location: selectedMachine.location,
            image: null, 
          } : null}
          mode={formMode}
        />
      </Modal>

      {selectedMachine && (
        <Modal isOpen={isDetailOpen} onClose={handleCloseDetailModal}>
          <MachineDetail
            machine={selectedMachine}
            onClose={handleCloseDetailModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default MachinesPage;
