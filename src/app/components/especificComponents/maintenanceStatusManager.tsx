'use client';

import React, { useState, useEffect } from 'react';
import Modal from '../interfaceComponents/modal';
import Notification from '../interfaceComponents/customNotification';

interface MaintenanceStatusManagerProps {
  isOpen: boolean;
  maintenance: {
    orderNumber: string;
    machine: string;
    openingDate: string;
    completionDeadline: string;
    responsibleTeam: string;
    status: string;
    description?: string;
    priority?: string;
    maintenanceType?: string;
    files: File[] | null;
    comments: string;
    stockItems: string[];
    services: string[];
  };
  onClose: () => void;
  mode: 'create' | 'edit';
}

const MaintenanceStatusManager: React.FC<MaintenanceStatusManagerProps> = ({
  isOpen,
  maintenance,
  onClose,
  mode
}) => {
  const [orderNumber, setOrderNumber] = useState(maintenance?.orderNumber || ''); // Valor padrão
  const [machine, setMachine] = useState(maintenance?.machine || ''); // Valor padrão
  const [openingDate, setOpeningDate] = useState(maintenance?.openingDate || ''); // Valor padrão
  const [completionDeadline, setCompletionDeadline] = useState(maintenance?.completionDeadline || ''); // Valor padrão
  const [responsibleTeam, setResponsibleTeam] = useState(maintenance?.responsibleTeam || ''); // Valor padrão
  const [status, setStatus] = useState(maintenance?.status || ''); // Valor padrão
  const [description, setDescription] = useState(maintenance?.description || ''); // Valor padrão
  const [priority, setPriority] = useState(maintenance?.priority || ''); // Valor padrão
  const [maintenanceType, setMaintenanceType] = useState(maintenance?.maintenanceType || ''); // Valor padrão
  const [files, setFiles] = useState<File[]>(maintenance?.files || []); // Valor padrão
  const [comments, setComments] = useState(maintenance?.comments || ''); // Valor padrão
  const [stockItems, setStockItems] = useState(maintenance?.stockItems || []); // Valor padrão
  const [services, setServices] = useState(maintenance?.services || []); // Valor padrão

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (maintenance) {
      setOrderNumber(maintenance.orderNumber);
      setMachine(maintenance.machine);
      setOpeningDate(maintenance.openingDate);
      setCompletionDeadline(maintenance.completionDeadline);
      setResponsibleTeam(maintenance.responsibleTeam);
      setStatus(maintenance.status);
      setDescription(maintenance.description || '');
      setPriority(maintenance.priority || '');
      setMaintenanceType(maintenance.maintenanceType || '');
      setFiles(maintenance.files || []);
      setComments(maintenance.comments);
      setStockItems(maintenance.stockItems);
      setServices(maintenance.services);
    }
  }, [maintenance]);

  const handleSave = async () => {
    if (!orderNumber || !machine || !openingDate || !completionDeadline || !responsibleTeam || !status || !comments) {
      setNotification({ message: 'Campos obrigatórios não preenchidos!', type: 'error' });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('orderNumber', orderNumber);
    formData.append('machine', machine);
    formData.append('openingDate', openingDate);
    formData.append('completionDeadline', completionDeadline);
    formData.append('responsibleTeam', responsibleTeam);
    formData.append('status', status);
    formData.append('description', description || '');
    formData.append('priority', priority || '');
    formData.append('maintenanceType', maintenanceType || '');
    formData.append('comments', comments);
    stockItems.forEach(item => formData.append('stockItems[]', item));
    services.forEach(service => formData.append('services[]', service));

    // Adicionando arquivos, se houver
    files.forEach(file => {
      formData.append('files[]', file);
    });

    try {
      const response = await fetch('http://localhost:3000/maintenance', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setNotification({ message: mode === 'create' ? 'Manutenção criada com sucesso!' : 'Manutenção atualizada com sucesso!', type: 'success' });
      } else {
        setNotification({ message: 'Erro ao salvar manutenção!', type: 'error' });
      }
      setLoading(false);
      onClose(); // Fecha o modal após salvar
    } catch (error) {
      setNotification({ message: 'Erro ao enviar os dados!', type: 'error' });
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="600px" height="auto">
      <div className="p-4 max-h-[80vh] overflow-y-auto">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
            className="mb-4"
          />
        )}

        <h2 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Adicionar Manutenção' : 'Editar Manutenção'}</h2>

        <div className="mb-4">
          <label className="block mb-2">Número da Ordem:</label>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Máquina (ID):</label>
          <input
            type="text"
            value={machine}
            onChange={(e) => setMachine(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Data de Abertura:</label>
          <input
            type="datetime-local"
            value={openingDate}
            onChange={(e) => setOpeningDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Prazo de Conclusão:</label>
          <input
            type="datetime-local"
            value={completionDeadline}
            onChange={(e) => setCompletionDeadline(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Equipe Responsável:</label>
          <input
            type="text"
            value={responsibleTeam}
            onChange={(e) => setResponsibleTeam(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="Pendente">Pendente</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Prioridade:</label>
          <input
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Tipo de Manutenção:</label>
          <input
            type="text"
            value={maintenanceType}
            onChange={(e) => setMaintenanceType(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Comentários:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Itens de Estoque:</label>
          <input
            type="text"
            value={stockItems.join(', ')}
            onChange={(e) => setStockItems(e.target.value.split(', '))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Serviços:</label>
          <input
            type="text"
            value={services.join(', ')}
            onChange={(e) => setServices(e.target.value.split(', '))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded-md">Cancelar</button>
          <button onClick={handleSave} disabled={loading} className="bg-blue-600 text-white p-2 rounded-md">
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MaintenanceStatusManager;
