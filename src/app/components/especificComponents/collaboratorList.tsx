import React, { useState } from 'react';
import { Collaborator, Service } from '../../pages/collaborator/types'; 

interface CollaboratorListProps {
  collaborators: Collaborator[];
  services: Service[];
  onEdit: (id: number) => void;
  onView: (collaborator: Collaborator) => void;
}

const CollaboratorList: React.FC<CollaboratorListProps> = ({ collaborators, services, onEdit, onView }) => {
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);

  const handleViewServices = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
  };

  return (
    <div>
      {/* Listagem de Colaboradores */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Colaboradores</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th> {/* Nova coluna para o cargo */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Líder</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collaborators.map(collaborator => (
              <tr key={collaborator.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{collaborator.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collaborator.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {collaborator.team ? collaborator.team.name : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collaborator.position || 'N/A'}</td> {/* Exibição do cargo */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {collaborator.team ? collaborator.team.leader : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => onEdit(collaborator.id)} 
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleViewServices(collaborator)} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
                  >
                    Visualizar Serviços
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Listagem de Serviços */}
      {selectedCollaborator && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Serviços de {selectedCollaborator.name}</h2>
          {services
            .filter(service => service.collaboratorId === selectedCollaborator.id)
            .map(service => (
              <div key={service.id} className="border p-4 mb-4">
                <p>ID do Serviço: {service.id}</p>
                <p>Descrição: {service.description}</p>
                <p>Status: {service.status}</p>
              </div>
            ))
          }
          <button 
            onClick={() => setSelectedCollaborator(null)} 
            className="px-4 py-2 bg-gray-500 text-white rounded-md mt-4"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
};

export default CollaboratorList;
