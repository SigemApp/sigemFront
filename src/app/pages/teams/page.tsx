'use client';

import React, { useState, useEffect } from 'react';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import TeamForm from '../../components/especificComponents/teamForm';
import Button from '../../components/interfaceComponents/button';
import Notification from '../../components/interfaceComponents/customNotification';
import { Team, Collaborator } from '../collaborator/types'; 
import { mockTeams } from './mockData'; 
import TeamDetail from '../../components/especificComponents/teamDetail';
import { generateReportContent } from '../../utils/reportUtils'; 

const TeamPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false); 
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    const updatedMockTeams = mockTeams.map(team => ({
      ...team,
      id: Number(team.id)
    }));
    setTeams(updatedMockTeams);
    setFilteredTeams(updatedMockTeams);

    // setCollaborators(mockCollaborators);
  }, []);

  const handleSearch = () => {
    setFilteredTeams(teams.filter(team =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleSaveTeam = async (team: Omit<Team, 'id'>) => {
    try {
      if (formMode === 'create') {
        const newTeam = { ...team, id: teams.length + 1 };
        setTeams([...teams, newTeam]);
        setNotification({ message: 'Equipe adicionada com sucesso!', type: 'success' });
      } else if (selectedTeam) {
        setTeams(teams.map(t => t.id === selectedTeam.id ? { ...team, id: selectedTeam.id } : t));
        setNotification({ message: 'Equipe atualizada com sucesso!', type: 'success' });
      }
      setFormOpen(false);
      setSelectedTeam(null);
    } catch (error) {
      console.error('Erro ao salvar equipe:', error);
      setNotification({ message: 'Erro ao salvar equipe!', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setTeams(teams.filter(team => team.id !== id));
      setNotification({ message: 'Equipe excluída com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao excluir equipe:', error);
      setNotification({ message: 'Erro ao excluir equipe!', type: 'error' });
    }
  };

  const handleEdit = (team: Team) => {
    setSelectedTeam(team);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedTeam(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleViewDetails = (team: Team) => {
    setSelectedTeam(team);
    setDetailOpen(true);
  };

  const handleCloseFormModal = () => {
    setFormOpen(false);
    setSelectedTeam(null);
  };

  const handleCloseDetailModal = () => {
    setDetailOpen(false);
    setSelectedTeam(null);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <Button label="Adicionar Equipe" onClick={handleCreate} />
        </div>
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          placeholder="Procurar Equipes"
        />
      </div>

      <Table 
        columns={['ID', 'Nome', 'Ações']}
        data={filteredTeams}
        renderRow={(team) => (
          <>
            <td className="p-2">{team.id}</td>
            <td className="p-2">{team.name}</td>
            <td className="p-2">
              <Button className='mr-4' label="Editar" onClick={() => handleEdit(team)} />
              <Button className='mr-4' label="Detalhar" onClick={() => handleViewDetails(team)} />
              <Button label="Deletar" onClick={() => handleDelete(team.id)} />
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
        <TeamForm
          isOpen={isFormOpen}
          onClose={handleCloseFormModal}
          onSave={handleSaveTeam}
          initialData={selectedTeam ? {
            name: selectedTeam.name,
            description: selectedTeam.description,
            identifier: selectedTeam.identifier,
            leader: selectedTeam.leader
          } : null}
          mode={formMode}
        />
      </Modal>

      <Modal isOpen={isDetailOpen} onClose={handleCloseDetailModal} width="800px" height="auto">
        <TeamDetail
          team={selectedTeam}
          collaborators={collaborators}
          onUpdateTeam={handleSaveTeam}
          onClose={handleCloseDetailModal}
        />
      </Modal>
    </div>
  );
};

export default TeamPage;
