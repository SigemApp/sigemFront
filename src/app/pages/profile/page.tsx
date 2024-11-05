'use client';

import React, { useState, useEffect } from 'react';
import Modal from '../../components/interfaceComponents/modal';
import CollaboratorForm from '../../components/especificComponents/collaboratorForm';

// Definição dos tipos
interface Collaborator {
  id: number;
  name: string;
  email: string;
  employeeNumber: string;
  position?: string;
  teamId: number;
}

interface MaintenanceHistory {
  date: string;
  description: string;
}

interface ScheduledMaintenance {
  date: string;
  description: string;
}

interface Team {
  id: number;
  name: string;
  description: string;
  leader: string;
  identifier: string;
  createdAt: string;
  updatedAt: string;
}

const CollaboratorProfile: React.FC = () => {
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceHistory[]>([]);
  const [scheduledMaintenance, setScheduledMaintenance] = useState<ScheduledMaintenance[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    // Simulando a busca de dados para fins de demonstração
    const simulateData = () => {
      const fetchedCollaborator: Collaborator = {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@example.com',
        employeeNumber: '123456',
        teamId: 2,
        position: 'Desenvolvedor'
      };
      const fetchedMaintenanceHistory: MaintenanceHistory[] = [
        { date: '2024-07-01', description: 'Atualização de software' },
        { date: '2024-07-15', description: 'Correção de bugs' }
      ];
      const fetchedScheduledMaintenance: ScheduledMaintenance[] = [
        { date: '2024-08-10', description: 'Manutenção programada no servidor' }
      ];
      const fetchedTeams: Team[] = [
        { id: 1, name: 'Equipe A', description: 'Descrição da Equipe A', leader: 'Líder A', identifier: 'A1', createdAt: '2024-01-01', updatedAt: '2024-06-01' },
        { id: 2, name: 'Equipe B', description: 'Descrição da Equipe B', leader: 'Líder B', identifier: 'B1', createdAt: '2024-02-01', updatedAt: '2024-06-02' }
      ];

      setCollaborator(fetchedCollaborator);
      setMaintenanceHistory(fetchedMaintenanceHistory);
      setScheduledMaintenance(fetchedScheduledMaintenance);
      setTeams(fetchedTeams);
    };

    simulateData();
  }, []);

  const handleSave = async (updatedCollaborator: Omit<Collaborator, 'id'>) => {
    // Simular o salvamento dos dados do colaborador
    if (collaborator) {
      setCollaborator({ ...collaborator, ...updatedCollaborator });
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    // Limpar quaisquer tokens de autenticação ou dados
    alert('Você foi deslogado.'); // Substitua isso pela lógica de logout real
    // Opcionalmente, redirecione ou atualize o estado da UI se necessário
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {isEditing && collaborator && teams && (
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <CollaboratorForm
            isOpen={isEditing}
            onClose={() => setIsEditing(false)}
            onSave={handleSave}
            initialData={{ ...collaborator, position: collaborator.position || '' }}
            mode="edit"
            teams={teams}
          />
        </Modal>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Perfil do Colaborador</h1>

        {collaborator && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Informações Pessoais</h2>
                <p><strong>Nome:</strong> {collaborator.name}</p>
                <p><strong>Email:</strong> {collaborator.email}</p>
                <p><strong>Número de Matrícula:</strong> {collaborator.employeeNumber}</p>
                <p><strong>Cargo:</strong> {collaborator.position}</p>
                <p><strong>Equipe:</strong> {teams.find(t => t.id === collaborator.teamId)?.name || 'Não atribuído'}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Editar Informações
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Histórico de Manutenções Realizadas</h2>
                  <ul>
                    {maintenanceHistory.map((maintenance, index) => (
                      <li key={index} className="border-b py-2">
                        {maintenance.date} - {maintenance.description}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Manutenções Escaladas</h2>
                  <ul>
                    {scheduledMaintenance.map((maintenance, index) => (
                      <li key={index} className="border-b py-2">
                        {maintenance.date} - {maintenance.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CollaboratorProfile;
