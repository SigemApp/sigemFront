import React, { useState } from 'react';
import Modal from '../interfaceComponents/modal'; 
import Notification from '../interfaceComponents/customNotification'; 
import { Team, Collaborator } from '../../pages/collaborator/types'; 

interface TeamDetailProps {
  team: Team | null;
  collaborators: Collaborator[];
  onUpdateTeam: (team: Omit<Team, 'id'>) => void;
  onClose: () => void;
}

const TeamDetail: React.FC<TeamDetailProps> = ({ team, collaborators, onUpdateTeam, onClose }) => {
  const [name, setName] = useState<string>(team?.name || '');
  const [description, setDescription] = useState<string>(team?.description || '');
  const [identifier, setIdentifier] = useState<string>(team?.identifier || '');
  const [leader, setLeader] = useState<string>(team?.leader || '');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info'; } | null>(null);

  const handleUpdateTeam = () => {
    if (name && description && identifier && leader) {
      const updatedTeam: Omit<Team, 'id'> = {
        name,
        description,
        identifier,
        leader,
        createdAt: team?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      onUpdateTeam(updatedTeam);
      setNotification({ message: 'Equipe atualizada com sucesso!', type: 'success' });
    } else {
      setNotification({ message: 'Erro ao atualizar equipe. Verifique todos os campos.', type: 'error' });
    }
  };

  if (!team) return null;

  return (
    <Modal isOpen={true} onClose={onClose} width="800px" height="600px">
      <div className="relative p-4">
        {/* Botão de Fechar Modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-950 text-white rounded-md"
        >
          Fechar
        </button>

        {/* Notificação */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
            className="mb-4"
          />
        )}

        {/* Detalhes da Equipe */}
        <h2 className="text-2xl font-bold mb-4">Detalhes da Equipe</h2>
        <div className="mb-4">
          <label className="block mb-2">
            Nome da Equipe:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Descrição:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Número de Identificação:
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Líder:
            <input
              type="text"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <button
            onClick={handleUpdateTeam}
            className="px-4 py-2 bg-blue-950 text-white rounded-md mt-4"
          >
            Atualizar Equipe
          </button>
        </div>

        {/* Colaboradores da Equipe */}
        <h3 className="text-lg font-semibold mb-2">Colaboradores da Equipe</h3>
        <div>
          {collaborators.filter(collaborator => collaborator.teamId === team.id).map(collaborator => (
            <div key={collaborator.id} className="border p-4 mb-4">
              <p>ID do Colaborador: {collaborator.id}</p>
              <p>Nome: {collaborator.name}</p>
              <p>Cargo: {collaborator.position}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TeamDetail;
