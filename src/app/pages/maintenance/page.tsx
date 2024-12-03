'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import MaintenanceStatusManager from '../../components/especificComponents/maintenanceStatusManager';
import CostControlModal from '../../components/especificComponents/costControl';
import CustomNotification from '../../components/interfaceComponents/customNotification';
import { Maintenance } from './types';
import { StockItem } from '../stock/types';
import Button from '../../components/interfaceComponents/button';

const MaintenancePage: React.FC = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMaintenances, setFilteredMaintenances] = useState<Maintenance[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/maintenance', {
        params: { searchTerm }
      });
      setMaintenances(response.data);  // Ajuste aqui caso a resposta seja um array direto
      setFilteredMaintenances(response.data);  // Adicionando o filtro caso necessário
    } catch (error) {
      console.error('Erro ao buscar manutenções:', error);
      setNotification({ message: 'Erro ao buscar manutenções!', type: 'error' });
    }
  };

  const handleSave = async (maintenance: Omit<Maintenance, "id"> & { files: File[] | null }) => {
    try {
      const maintenanceData = {
        orderNumber: maintenance.orderNumber,
        machine: maintenance.machine,
        openingDate: maintenance.openingDate,
        completionDeadline: maintenance.completionDeadline,
        responsibleTeam: maintenance.responsibleTeam,
        status: maintenance.status,
        files: maintenance.files ? maintenance.files : null,
        comments: maintenance.comments,
        stockItems: maintenance.stockItems || [],  // Adicionando 'stockItems'
        services: maintenance.services || []       // Adicionando 'services'
      };
  
      if (formMode === 'create') {
        const response = await axios.post('http://localhost:3000/maintenance', maintenanceData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setMaintenances([...maintenances, response.data]);
        setNotification({ message: 'Manutenção adicionada com sucesso!', type: 'success' });
      } else if (selectedMaintenance) {
        const updatedMaintenance = { ...maintenanceData, id: selectedMaintenance.id, maintenanceHistory: selectedMaintenance.maintenanceHistory };
        await axios.put(`http://localhost:3000/maintenance/${selectedMaintenance.id}`, updatedMaintenance, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setMaintenances(maintenances.map(m => m.id === selectedMaintenance.id ? updatedMaintenance : m));
        setNotification({ message: 'Manutenção atualizada com sucesso!', type: 'success' });
      }
  
      setFormOpen(false);
      setSelectedMaintenance(null);
      handleSearch();
  
    } catch (error) {
      console.error('Erro ao salvar manutenção:', error);
      setNotification({ message: 'Erro ao salvar manutenção!', type: 'error' });
    }
  };  

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/maintenance/${id}`);
      setMaintenances(maintenances.filter(maintenance => maintenance.id !== id));
      setNotification({ message: 'Manutenção excluída com sucesso!', type: 'success' });
      handleSearch();
    } catch (error) {
      console.error('Erro ao excluir manutenção:', error);
      setNotification({ message: 'Erro ao excluir manutenção!', type: 'error' });
    }
  };

  const handleDetail = async (maintenance: Maintenance) => {
    try {
      const response = await axios.get(`http://localhost:3000/maintenance/${maintenance.id}`);
      setSelectedMaintenance(response.data);
      setDetailOpen(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes da manutenção:', error);
    }
  };

  const handleUpdate = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleCloseModal = () => {
    setFormOpen(false);
    setSelectedMaintenance(null);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const handleCloseDetailModal = () => {
    setDetailOpen(false);
    setSelectedMaintenance(null);
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold m-4">Manutenções</h1>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Button label="Adicionar Manutenção" onClick={() => setFormOpen(true)} />
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSubmit={handleSearch}
            placeholder="Procurar Manutenções"
          />
        </div>

        <Table
          columns={['Ordem', 'Máquina', 'Data de Abertura', 'Prazo de Conclusão', 'Equipe Responsável', 'Status', 'Ações']}
          data={filteredMaintenances}
          renderRow={(maintenance) => (
            <>
              <td className="p-2">{maintenance.orderNumber}</td>
              <td className="p-2">{maintenance.machineId}</td>
              <td className="p-2">{maintenance.openingDate}</td>
              <td className="p-2">{maintenance.completionDeadline}</td>
              <td className="p-2">{maintenance.responsibleTeam}</td>
              <td className="p-2">{maintenance.status}</td>
              <td className="p-2">
                <Button className='mr-4' label="Editar" onClick={() => handleUpdate(maintenance)} />
                <Button className='mr-4' label="Deletar" onClick={() => handleDelete(maintenance.id)} />
                <Button label="Detalhar" onClick={() => handleDetail(maintenance)} />
              </td>
            </>
          )}
        />

        {notification && (
          <CustomNotification
            message={notification.message}
            type={notification.type}
            onClose={handleNotificationClose}
          />
        )}

        <Modal isOpen={isFormOpen} onClose={handleCloseModal}>
          <MaintenanceStatusManager
            isOpen={isFormOpen}
            onClose={handleCloseModal}
            onSave={handleSave}
            initialData={selectedMaintenance ? {
              orderNumber: selectedMaintenance.orderNumber,
              machine: selectedMaintenance.machine,
              openingDate: selectedMaintenance.openingDate,
              completionDeadline: selectedMaintenance.completionDeadline,
              responsibleTeam: selectedMaintenance.responsibleTeam,
              status: selectedMaintenance.status,
              description: selectedMaintenance.description || '',
              priority: selectedMaintenance.priority || '',
              maintenanceType: selectedMaintenance.maintenanceType || '',
              files: null,
              comments: selectedMaintenance.comments || '',
              stockItems: selectedMaintenance.stockItems || [],
              services: selectedMaintenance.services || []
            } : null}
            mode={formMode}
          />
        </Modal>

        {selectedMaintenance && (
          <Modal isOpen={isDetailOpen} onClose={handleCloseDetailModal}>
             <CostControlModal
                maintenance={selectedMaintenance}
                onClose={handleCloseDetailModal}
                onSave={handleSaveCostControl}  // Passando a função de salvar, se necessário
             />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MaintenancePage;
