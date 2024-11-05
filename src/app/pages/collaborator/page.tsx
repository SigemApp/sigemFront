// src/pages/CollaboratorsPage.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import CollaboratorForm from '../../components/especificComponents/collaboratorForm';
import Button from '../../components/interfaceComponents/button';
import Notification from '../../components/interfaceComponents/customNotification';
import { Collaborator } from './types'; 
import { mockCollaborators } from './mockData';
import { generateReportContent } from '../../utils/reportUtils'; 

const CollaboratorsPage: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCollaborators, setFilteredCollaborators] = useState<Collaborator[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSelectReportModalOpen, setIsSelectReportModalOpen] = useState(false);
  const [reportSearchTerm, setReportSearchTerm] = useState('');
  const [filteredForReport, setFilteredForReport] = useState<Collaborator[]>([]);

  useEffect(() => {
    const updatedMockCollaborators = mockCollaborators.map(collaborator => ({
      ...collaborator,
      id: Number(collaborator.id)
    }));
    setCollaborators(updatedMockCollaborators);
    setFilteredCollaborators(updatedMockCollaborators);
    setFilteredForReport(updatedMockCollaborators);
  }, []);

  const handleSearch = () => {
    setFilteredCollaborators(collaborators.filter(collaborator => 
      collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleSaveCollaborator = async (collaborator: Omit<Collaborator, 'id'>) => {
    try {
      if (formMode === 'create') {
        const newCollaborator = { ...collaborator, id: collaborators.length + 1 };
        setCollaborators([...collaborators, newCollaborator]);
        setNotification({ message: 'Colaborador adicionado com sucesso!', type: 'success' });
      } else if (selectedCollaborator) {
        setCollaborators(collaborators.map(c => c.id === selectedCollaborator.id ? { ...collaborator, id: selectedCollaborator.id } : c));
        setNotification({ message: 'Colaborador atualizado com sucesso!', type: 'success' });
      }
      setFormOpen(false);
      setSelectedCollaborator(null);
    } catch (error) {
      console.error('Erro ao salvar colaborador:', error);
      setNotification({ message: 'Erro ao salvar colaborador!', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setCollaborators(collaborators.filter(collaborator => collaborator.id !== id));
      setNotification({ message: 'Colaborador excluído com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao excluir colaborador:', error);
      setNotification({ message: 'Erro ao excluir colaborador!', type: 'error' });
    }
  };

  const handleEdit = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedCollaborator(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleCloseFormModal = () => {
    setFormOpen(false);
    setSelectedCollaborator(null);
  };

  const handleGenerateReport = async (collaborator: Collaborator) => {
    try {
      // Geração do relatório usando a função utilitária
      const reportContent = generateReportContent(collaborator); 
      setReportContent(reportContent);
      setIsReportModalOpen(true);
      setIsSelectReportModalOpen(false);
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      setNotification({ message: 'Erro ao gerar relatório!', type: 'error' });
    }
  };

  const handleSelectReportCollaborator = () => {
    setFilteredForReport(collaborators.filter(collaborator =>
      collaborator.name.toLowerCase().includes(reportSearchTerm.toLowerCase()) ||
      collaborator.employeeNumber.toLowerCase().includes(reportSearchTerm.toLowerCase()) ||
      collaborator.position.toLowerCase().includes(reportSearchTerm.toLowerCase())
    ));
    setIsSelectReportModalOpen(true);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
    setReportContent(null);
  };

  const handleCloseSelectReportModal = () => {
    setIsSelectReportModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <Button label="Adicionar Colaborador" onClick={handleCreate} />
          <Button label="Gerar Relatório" onClick={handleSelectReportCollaborator} />
        </div>
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          placeholder="Procurar Colaboradores"
        />
      </div>

      <Table 
        columns={['ID', 'Nome', 'Email', 'Número de Funcionário', 'Equipe', 'Cargo', 'Ações']}
        data={filteredCollaborators}
        renderRow={(collaborator) => (
          <>
            <td className="p-2">{collaborator.id}</td>
            <td className="p-2">{collaborator.name}</td>
            <td className="p-2">{collaborator.email}</td>
            <td className="p-2">{collaborator.employeeNumber}</td>
            <td className="p-2">{collaborator.team ? collaborator.team.name : 'N/A'}</td>
            <td className="p-2">{collaborator.position}</td>
            <td className="p-2">
              <Button className='mr-4' label="Editar" onClick={() => handleEdit(collaborator)} />
              <Button label="Deletar" onClick={() => handleDelete(collaborator.id)} />
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

      <Modal isOpen={isFormOpen} onClose={handleCloseFormModal}>
        <CollaboratorForm
          isOpen={isFormOpen}
          onClose={handleCloseFormModal}
          onSave={handleSaveCollaborator}
          initialData={selectedCollaborator ? {
            name: selectedCollaborator.name,
            email: selectedCollaborator.email,
            employeeNumber: selectedCollaborator.employeeNumber,
            teamId: selectedCollaborator.teamId,
            position: selectedCollaborator.position, 
          } : null}
          mode={formMode}
          teams={[]} 
        />
      </Modal>

      <Modal isOpen={isSelectReportModalOpen} onClose={handleCloseSelectReportModal}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Selecionar Colaborador para Relatório</h2>
            <Button label="Fechar" onClick={handleCloseSelectReportModal} />
          </div>
          <SearchBar
            value={reportSearchTerm}
            onChange={(e) => setReportSearchTerm(e.target.value)}
            onSubmit={handleSelectReportCollaborator}
            placeholder="Procurar Colaboradores"
          />
          <Table 
            columns={['ID', 'Nome', 'Número de Funcionário', 'Cargo', 'Ações']}
            data={filteredForReport}
            renderRow={(collaborator) => (
              <>
                <td className="p-2">{collaborator.id}</td>
                <td className="p-2">{collaborator.name}</td>
                <td className="p-2">{collaborator.employeeNumber}</td>
                <td className="p-2">{collaborator.position}</td>
                <td className="p-2">
                  <Button label="Gerar Relatório" onClick={() => handleGenerateReport(collaborator)} />
                </td>
              </>
            )}
          />
        </div>
      </Modal>

      <Modal isOpen={isReportModalOpen} onClose={handleCloseReportModal}>
        <div className="p-4">
          <h2 className="text-lg font-bold">Relatório do Colaborador</h2>
          <pre className="whitespace-pre-wrap">{reportContent}</pre>
          <Button label="Fechar" onClick={handleCloseReportModal} />
        </div>
      </Modal>
    </div>
  );
};

export default CollaboratorsPage;
