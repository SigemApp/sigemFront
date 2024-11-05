// MaintenanceDetails.tsx
import React from 'react';
import { Maintenance } from '../../pages/maintenance/types';

interface MaintenanceDetailsProps {
  maintenance: Maintenance;
  onClose: () => void;
}

const MaintenanceDetails: React.FC<MaintenanceDetailsProps> = ({ maintenance, onClose }) => {
  if (!maintenance) return null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Detalhes da Manutenção</h2>
      <div className="space-y-2">
        <div><strong>Número da Ordem:</strong> {maintenance.orderNumber}</div>
        <div><strong>Máquina:</strong> {maintenance.machine}</div>
        <div><strong>Data de Abertura:</strong> {maintenance.openingDate}</div>
        <div><strong>Prazo de Conclusão:</strong> {maintenance.completionDeadline}</div>
        <div><strong>Equipe Responsável:</strong> {maintenance.responsibleTeam}</div>
        <div><strong>Status:</strong> {maintenance.status}</div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default MaintenanceDetails;
