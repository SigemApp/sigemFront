import React from 'react';
import { Team } from '../../pages/collaborator/types';

interface TeamListProps {
  teams: Team[];
  onEdit: (id: number) => void;
  onView: (team: Team) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onEdit, onView }) => {
  return (
    <div>
      {teams.map(team => (
        <div key={team.id} className="border p-4 mb-4">
          <h3 className="text-lg font-bold">{team.name}</h3>
          <p>Descrição: {team.description}</p>
          <p>Identificação: {team.identifier}</p>
          <p>Líder: {team.leader}</p>
          <button 
            onClick={() => onEdit(team.id)} 
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
          >
            Editar
          </button>
          <button 
            onClick={() => onView(team)} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
          >
            Visualizar
          </button>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
