import React, { useState, useEffect } from 'react';
import Modal from '../interfaceComponents/modal'; 
import Form from '../interfaceComponents/form'; 
import { Team } from '../../pages/collaborator/types'; 

export interface TeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (team: Omit<Team, 'id'>) => Promise<void>;
  initialData: {
    name: string;
    description?: string;
    identifier?: string;
    leader?: string;
  } | null;
  mode: 'create' | 'edit';
}

const TeamForm: React.FC<TeamFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); 
  const [identifier, setIdentifier] = useState(''); 
  const [leader, setLeader] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setIdentifier(initialData.identifier || '');
      setLeader(initialData.leader || '');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ name, description, identifier, leader, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  };

  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      width="500px"
      height="400px"
    >
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold mb-3">{mode === 'create' ? 'Criar Equipe' : 'Editar Equipe'}</h2>
        <Form onSubmit={handleSubmit} className="flex-1" width="100%" height="100%">
          <label>
            Nome da Equipe:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Identificação:
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Líder:
            <input
              type="text"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Salvar
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Cancelar
            </button> 
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default TeamForm;
