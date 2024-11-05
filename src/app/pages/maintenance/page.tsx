'use client';

import React, { useState, useEffect } from 'react';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import MaintenanceForm from '../../components/especificComponents/maintenenceForm';
import MaintenanceStatusManager from '../../components/especificComponents/maintenanceStatusManager';
import CostControl from '../../components/especificComponents/costControl'; 
import ReportsGenerator from '../../utils/reportsGenerator';
import CustomNotification from '../../components/interfaceComponents/customNotification';
import { Maintenance } from './types';
import { StockItem } from '../stock/types'; 
import { mockMaintenances, mockStockItems, mockMachines, mockServices } from './mockData'; 

const MaintenancePage: React.FC = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMaintenances, setFilteredMaintenances] = useState<Maintenance[]>([]);
  const [modalType, setModalType] = useState<string | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    setMaintenances(mockMaintenances);
    setFilteredMaintenances(mockMaintenances);
    setStockItems(mockStockItems);
  }, []);

  const handleSearch = () => {
    setFilteredMaintenances(maintenances.filter(maintenance =>
      maintenance.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.responsibleTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (maintenance.machine?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
    ));
  };

  const handleOpenForm = () => setModalType('form');
  
  const handleOpenStatusManager = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setModalType('statusManager');
  };
  
  const handleOpenCostControl = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setModalType('costControl');
  };
  
  const handleOpenReportsGenerator = () => setModalType('reportsGenerator');

  const handleSaveMaintenance = async (maintenance: any) => {
    try {
      if (maintenance.id) {
        setMaintenances(maintenances.map(m => m.id === maintenance.id ? maintenance : m));
        setNotification({ message: 'Manutenção atualizada com sucesso!', type: 'success' });
      } else {
        const newMaintenance = { ...maintenance, id: (maintenances.length + 1).toString() }; 
        setMaintenances([...maintenances, newMaintenance]);
        setNotification({ message: 'Manutenção cadastrada com sucesso!', type: 'success' });
      }
    } catch (error) {
      console.error('Error saving maintenance:', error);
      setNotification({ message: 'Erro ao salvar manutenção!', type: 'error' });
    }
    setModalType(null);
  };

  const handleUpdateStatus = async (status: string, comments: string) => {
    if (selectedMaintenance) {
      try {
        setMaintenances(maintenances.map(m => m.id === selectedMaintenance.id ? { ...m, status } : m));
        setNotification({ message: 'Status atualizado com sucesso!', type: 'success' });
      } catch (error) {
        console.error('Error updating status:', error);
        setNotification({ message: 'Erro ao atualizar status!', type: 'error' });
      }
      setModalType(null);
    }
  };

  const handleSaveCosts = async (costs: any) => {
    try {
      setNotification({ message: 'Custos registrados com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Error saving costs:', error);
      setNotification({ message: 'Erro ao registrar custos!', type: 'error' });
    }
    setModalType(null);
  };

  const handleGenerateReport = async (criteria: any) => {
    try {
      setNotification({ message: 'Relatório gerado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Error generating report:', error);
      setNotification({ message: 'Erro ao gerar relatório!', type: 'error' });
    }
    setModalType(null);
  };

  const handleNotificationClose = () => setNotification(null);

  const handleUpdate = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setModalType('form');
  };

  return (
    <div className="p-4">
      {notification && (
        <CustomNotification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
          className="mb-4"
        />
      )}

      <h1 className="text-3xl font-bold mb-6">Manutenções</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={handleOpenForm}
            className="px-4 py-2 bg-blue-950 text-white rounded-md"
          >
            Cadastrar Manutenção
          </button>
          <button
            onClick={handleOpenReportsGenerator}
            className="px-4 py-2 bg-blue-950 text-white rounded-md"
          >
            Gerar Relatórios
          </button>
        </div>
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          placeholder="Procurar Manutenções"
        />
      </div>

      <Table 
        columns={['OS', 'Máquina', 'Data de Abertura', 'Prazo de Conclusão', 'Equipe Responsável', 'Status', 'Ações']}
        data={filteredMaintenances}
        renderRow={(maintenance) => (
          <>
            <td className="p-2">{maintenance.orderNumber}</td>
            <td className="p-2">{maintenance.machine}</td> 
            <td className="p-2">{maintenance.openingDate}</td>
            <td className="p-2">{maintenance.completionDeadline}</td>
            <td className="p-2">{maintenance.responsibleTeam}</td>
            <td className="p-2">{maintenance.status}</td>
            <td className="p-2">
              <button
                onClick={() => handleOpenStatusManager(maintenance)}
                className="px-4 py-2 bg-blue-950 text-white rounded-md mr-2"
              >
                Gerenciar Status
              </button>
              <button
                onClick={() => handleOpenCostControl(maintenance)}
                className="px-4 py-2 bg-blue-950 text-white rounded-md"
              >
                Gerenciar Custos
              </button>
              <button
                onClick={() => handleUpdate(maintenance)} 
                className="px-4 py-2 bg-blue-950 text-white rounded-md ml-2"
              >
                Editar
              </button>
            </td>
          </>
        )}
      />

      {modalType === 'form' && (
        <Modal isOpen={modalType === 'form'} onClose={() => setModalType(null)}>
          <MaintenanceForm 
            onSave={handleSaveMaintenance}
            onClose={() => setModalType(null)}
            stockItems={stockItems} 
            machines={mockMachines} 
            services={mockServices} J
          />
        </Modal>
      )}
      {modalType === 'statusManager' && selectedMaintenance && (
        <Modal isOpen={modalType === 'statusManager'} onClose={() => setModalType(null)}>
          <MaintenanceStatusManager
            maintenance={selectedMaintenance}
            onUpdateStatus={handleUpdateStatus}
            onClose={() => setModalType(null)}
          />
        </Modal>
      )}
      {modalType === 'costControl' && selectedMaintenance && (
        <Modal isOpen={modalType === 'costControl'} onClose={() => setModalType(null)}>
          <CostControl
            isOpen={modalType === 'costControl'}
            maintenance={selectedMaintenance}
            onSaveCosts={handleSaveCosts}
            onClose={() => setModalType(null)}
          />
        </Modal>
      )}
      {modalType === 'reportsGenerator' && (
        <Modal isOpen={modalType === 'reportsGenerator'} onClose={() => setModalType(null)}>
          <ReportsGenerator 
            onGenerate={handleGenerateReport} 
            onClose={() => setModalType(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default MaintenancePage;
