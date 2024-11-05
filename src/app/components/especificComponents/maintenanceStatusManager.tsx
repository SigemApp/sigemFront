import React, { useState } from 'react';
import Modal from '../interfaceComponents/modal';
import Notification from '../interfaceComponents/customNotification';

interface MaintenanceStatusManagerProps {
  maintenance: any;
  onUpdateStatus: (status: string, comments: string) => void;
  onClose: () => void;
}

const MaintenanceStatusManager: React.FC<MaintenanceStatusManagerProps> = ({ maintenance, onUpdateStatus, onClose }) => {
  const [status, setStatus] = useState<string>(maintenance.status);
  const [comments, setComments] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info'; } | null>(null);

  const handleUpdate = () => {
    onUpdateStatus(status, comments);
    setNotification({ message: 'Status atualizado com sucesso!', type: 'success' });
  };

  return (
    <Modal isOpen={true} onClose={onClose} width="600px" height="auto">
      <div className="p-4">
        {/* Notificação */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
            className="mb-4"
          />
        )}

        <h2 className="text-2xl font-bold mb-4">Gerenciar Status da Manutenção</h2>
        
        <label className="block mb-2">
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Em Andamento">Em Andamento</option>
            <option value="Pendente">Pendente</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </label>
        
        <label className="block mb-2">
          Comentários:
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
          >
            Atualizar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MaintenanceStatusManager;
