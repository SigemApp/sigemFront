import React, { useState } from 'react';
import jsPDF from 'jspdf';
import Modal from '../interfaceComponents/modal';
import Notification from '../interfaceComponents/customNotification';
import { Collaborator, Service } from '../../pages/collaborator/types';
import Table from '../interfaceComponents/table';

interface CollaboratorDetailProps {
  collaborators: Collaborator[];
  services: Service[];
  onAddService: (service: Omit<Service, 'id'>) => void;
}

const CollaboratorDetail: React.FC<CollaboratorDetailProps> = ({ collaborators, services, onAddService }) => {
  const [newService, setNewService] = useState<Partial<Omit<Service, 'id'>>>({});
  const [reportVisible, setReportVisible] = useState(false);
  const [reportContent, setReportContent] = useState<string>('');
  const [selectedCollaboratorId, setSelectedCollaboratorId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info'; } | null>(null);

  const handleAddService = () => {
    if (newService.description && newService.status) {
      onAddService({
        ...newService as Omit<Service, 'id'>,
        collaboratorId: selectedCollaboratorId!,
      });
      setNewService({});
      setNotification({ message: 'Serviço adicionado com sucesso!', type: 'success' });
    } else {
      setNotification({ message: 'Erro ao adicionar serviço. Verifique os dados fornecidos.', type: 'error' });
    }
  };

  const handleGenerateReport = () => {
    if (selectedCollaboratorId === null) {
      setNotification({ message: 'Por favor, selecione um colaborador.', type: 'error' });
      return;
    }

    const filteredServices = services.filter(service => service.collaboratorId === selectedCollaboratorId);

    const reportLines = filteredServices.map(service => ({
      ID: service.id,
      Descrição: service.description,
      Status: service.status,
      'Data de Início': service.startDate,
      'Data de Fim': service.endDate || 'Em andamento',
      'Supervisor Líder': service.supervisor || 'Não atribuído',
    }));

    setReportContent(JSON.stringify(reportLines, null, 2));
    setReportVisible(true);
  };

  const handleSaveAsPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Ordens de Serviço", 10, 10);
    doc.text(`Emitido em: ${getCurrentDateTime()}`, 10, 20);
    const selectedCollaborator = collaborators.find(collab => collab.id === selectedCollaboratorId);
    doc.text(`Colaborador: ${selectedCollaborator?.name || 'Colaborador não encontrado'}`, 10, 30);
    doc.text("Conteúdo do Relatório:", 10, 40);
    
    const lines = reportContent.split('\n');
    let y = 50;
    lines.forEach((line) => {
      doc.text(line, 10, y);
      y += 10;
    });

    doc.save('relatorio_servicos.pdf');
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  };

  const handleDetailClick = (serviceId: number) => {
    // Implement your detail page redirection or handling here
    console.log(`Detalhar ordem de serviço ID: ${serviceId}`);
  };

  const selectedCollaborator = collaborators.find(collab => collab.id === selectedCollaboratorId);
  const filteredServices = services.filter(service => service.collaboratorId === selectedCollaboratorId);

  return (
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

      {/* Adicionar Novo Serviço */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Adicionar Novo Serviço</h3>
        <input
          type="text"
          placeholder="Descrição do Serviço"
          value={newService.description || ''}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Status do Serviço"
          value={newService.status || ''}
          onChange={(e) => setNewService({ ...newService, status: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="date"
          placeholder="Data de Início"
          value={newService.startDate || ''}
          onChange={(e) => setNewService({ ...newService, startDate: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="date"
          placeholder="Data de Fim"
          value={newService.endDate || ''}
          onChange={(e) => setNewService({ ...newService, endDate: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Supervisor Líder"
          value={newService.supervisor || ''}
          onChange={(e) => setNewService({ ...newService, supervisor: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={handleAddService}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Adicionar Serviço
        </button>
      </div>

      {/* Relatório */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Gerar Relatório</h3>
        <select
          value={selectedCollaboratorId || ''}
          onChange={(e) => setSelectedCollaboratorId(Number(e.target.value))}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="" disabled>Selecione um Colaborador</option>
          {collaborators.map(collaborator => (
            <option key={collaborator.id} value={collaborator.id}>
              {collaborator.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleGenerateReport}
          className="p-2 bg-green-500 text-white rounded-md"
        >
          Gerar Relatório
        </button>
      </div>

      {/* Exibir Tabela de Serviços */}
      {filteredServices.length > 0 && (
        <Table
          columns={['ID', 'Descrição', 'Status', 'Data de Início', 'Data de Fim', 'Supervisor Líder']}
          data={filteredServices}
          renderRow={(row) => (
            <>
              <td className="px-4 py-2 border-b border-gray-200">{row.id}</td>
              <td className="px-4 py-2 border-b border-gray-200">{row.description}</td>
              <td className="px-4 py-2 border-b border-gray-200">{row.status}</td>
              <td className="px-4 py-2 border-b border-gray-200">{row.startDate}</td>
              <td className="px-4 py-2 border-b border-gray-200">{row.endDate || 'Em andamento'}</td>
              <td className="px-4 py-2 border-b border-gray-200">{row.supervisor || 'Não atribuído'}</td>
              <td className="px-4 py-2 border-b border-gray-200">
                <button
                  onClick={() => handleDetailClick(row.id)}
                  className="p-2 bg-yellow-500 text-white rounded-md"
                >
                  Detalhes
                </button>
              </td>
            </>
          )}
        />
      )}

      {/* Modal do Relatório */}
      {reportVisible && (
        <Modal
          isOpen={reportVisible}
          onClose={() => setReportVisible(false)}
          width="80%"
          height="80%"
          className="relative"
        >
          <div className="text-xl font-semibold mb-4">Relatório de Ordens de Serviço</div>
          <pre className="whitespace-pre-wrap">{reportContent}</pre>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveAsPDF}
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Baixar PDF
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CollaboratorDetail;
