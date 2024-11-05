import React, { useState } from 'react';
import Modal from '../components/interfaceComponents/modal';
import Notification from '../components/interfaceComponents/customNotification';

interface ReportsGeneratorProps {
  onGenerate: (reportType: string) => void;
  onClose: () => void;
}

const ReportsGenerator: React.FC<ReportsGeneratorProps> = ({ onGenerate, onClose }) => {
  const [reportType, setReportType] = useState<string>('summary');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info'; } | null>(null);

  const handleGenerate = () => {
    onGenerate(reportType);
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

        <h2 className="text-2xl font-bold mb-4">Gerar Relatórios</h2>

        <label className="block mb-2">
          Tipo de Relatório:
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="summary">Resumo</option>
            <option value="detailed">Detalhado</option>
            <option value="custom">Personalizado</option>
          </select>
        </label>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
          >
            Gerar
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

export default ReportsGenerator;
