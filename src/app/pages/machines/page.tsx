'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import MachineForm from '../../components/especificComponents/machineForm';
import Button from '../../components/interfaceComponents/button';
import Notification from '../../components/interfaceComponents/customNotification';
import MachineDetail from '../../components/especificComponents/machineDetail';
import { Machine } from './types';

const MachinesPage: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/machines', {
        params: { searchTerm }
      });
      setMachines(response.data);
      setFilteredMachines(response.data);
    } catch (error) {
      console.error('Erro ao buscar máquinas:', error);
    }
  };

  const handleSave = async (machine: Omit<Machine, 'id' | 'maintenanceHistory'> & { image: File | null }) => {
    try {
      const machineData = {
        name: machine.name,
        type: machine.type,
        machineModel: machine.machineModel,
        manufacturingDate: machine.manufacturingDate,
        serialNumber: machine.serialNumber,
        location: machine.location,
        image: machine.image ? machine.image : null,
      };

      if (formMode === 'create') {
        const response = await axios.post('http://localhost:3000/machines', machineData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setMachines([...machines, response.data]);  
        setNotification({ message: 'Máquina adicionada com sucesso!', type: 'success' });
      } else if (selectedMachine) {
        const updatedMachine = { ...machineData, id: selectedMachine.id, maintenanceHistory: selectedMachine.maintenanceHistory };
        await axios.put(`http://localhost:3000/machines/${selectedMachine.id}`, updatedMachine, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setMachines(machines.map(m => m.id === selectedMachine.id ? updatedMachine : m));  
        setNotification({ message: 'Máquina atualizada com sucesso!', type: 'success' });
      }

      setFormOpen(false);
      setSelectedMachine(null);
      handleSearch(); 

    } catch (error) {
      console.error('Erro ao salvar máquina:', error);
      setNotification({ message: 'Erro ao salvar máquina!', type: 'error' });
    }
  };

const handleDelete = async (id: string) => {
  try {
    await axios.delete(`http://localhost:3000/machines/${id}`);
    setMachines(machines.filter(machine => machine.id !== id)); 
    setNotification({ message: 'Máquina excluída com sucesso!', type: 'success' });
    handleSearch();  

  } catch (error) {
    console.error('Erro ao excluir máquina:', error);
    setNotification({ message: 'Erro ao excluir máquina!', type: 'error' });
  }
};

  const handleDetail = async (machine: Machine) => {
    try {
      const response = await axios.get(`http://localhost:3000/machines/${machine.id}`);
      setSelectedMachine(response.data);
      setDetailOpen(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes da máquina:', error);
    }
  };

  const handleUpdate = (machine: Machine) => {
    setSelectedMachine(machine); 
    setFormMode('edit'); 
    setFormOpen(true); 
  };

  const handleCloseModal = () => {
    setFormOpen(false);
    setSelectedMachine(null);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const handleCloseDetailModal = () => {
    setDetailOpen(false);
    setSelectedMachine(null);
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold m-4">Maquinas</h1>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Button label="Adicionar Máquina" onClick={() => setFormOpen(true)} />
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
              <td className="p-2">{machine.machineModel}</td>
              <td className="p-2">
                <Button className='mr-4' label="Editar" onClick={() => handleUpdate(machine)} /> 
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
              machineModel: selectedMachine.machineModel, 
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
            machine={{
              name: selectedMachine.name,
              type: selectedMachine.type,
              model: selectedMachine.machineModel,  
              manufacturingDate: selectedMachine.manufacturingDate,
              serialNumber: selectedMachine.serialNumber,
              location: selectedMachine.location,
              maintenanceHistory: selectedMachine.maintenanceHistory || [],  
            }}
            onClose={handleCloseDetailModal}
          />
        </Modal>
      )}
      </div>

    </div>
  );
};

export default MachinesPage;
