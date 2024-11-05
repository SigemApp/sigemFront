import React, { useState, useEffect } from 'react';
import Modal from '../interfaceComponents/modal'; 
import Form from '../interfaceComponents/form'; 
import { Collaborator, Team } from '../../pages/collaborator/types'; 

interface CollaboratorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collaborator: Omit<Collaborator, 'id'>) => Promise<void>;
  initialData: Omit<Collaborator, 'id'> | null;
  mode: 'create' | 'edit';
  teams: Team[]; // Lista de equipes
}

const CollaboratorForm: React.FC<CollaboratorFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
  teams,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [teamId, setTeamId] = useState<number | null>(null);
  const [position, setPosition] = useState(''); // Novo estado para o cargo

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setEmployeeNumber(initialData.employeeNumber);
      setTeamId(initialData.teamId);
      setPosition(initialData.position || ''); // Configura o estado para o cargo
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ name, email, employeeNumber, teamId: teamId ?? 0, position }); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      width="500px"
      height="480px"
    >
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold mb-3">{mode === 'create' ? 'Adicionar Colaborador' : 'Editar Colaborador'}</h2>
        <Form onSubmit={handleSubmit} className="flex-1" width="100%" height="100%">
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Número de Matrícula:
            <input
              type="text"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Cargo:
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Equipe:
            <select
              value={teamId !== null ? teamId : ''} // Garantir que o valor seja uma string vazia quando teamId for null
              onChange={(e) => setTeamId(e.target.value ? Number(e.target.value) : null)} // Converter valor para número ou null
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecione uma equipe</option>
              {teams.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </label>
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Salvar</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancelar</button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CollaboratorForm;
