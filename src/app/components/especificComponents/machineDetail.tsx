import React, { useState } from 'react';
import MaintenanceDetails from '../especificComponents/maintenanceDetail'; 
import Button from '../../components/interfaceComponents/button';
import Modal from '../interfaceComponents/modal';
import Table from '../../components/interfaceComponents/table'; 

interface MaintenanceHistory {
  id: string;
  orderNumber: string;
  openingDate: string;
  completionDeadline: string;
  date: string;
  description: string;
  partsUsed?: string[];
  materialsUsed?: string[];
  responsibleTeam: string;
  status: string;
}

interface MachineDetailProps {
  machine: {
    name: string;
    type: string;
    model: string;
    manufacturingDate: string;
    serialNumber: string;
    location: string;
    maintenanceHistory: MaintenanceHistory[];
  };
  onClose: () => void;
}

const MachineDetail: React.FC<MachineDetailProps> = ({ machine, onClose }) => {
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceHistory | null>(null);

  const handleOpenMaintenance = (maintenance: MaintenanceHistory) => {
    setSelectedMaintenance(maintenance);
  };

  const handleCloseMaintenance = () => {
    setSelectedMaintenance(null);
  };

  const columns = ["Data", "Descrição", "Peças Usadas", "Materiais Usados", "Equipe Responsável", "Ação"];

  return (
    <div>
      <h2 className="text-xl font-bold">{machine.name}</h2>
      <p>Tipo: {machine.type}</p>
      <p>Modelo: {machine.model}</p>
      <p>Data de Fabricação: {machine.manufacturingDate}</p>
      <p>Número de Série: {machine.serialNumber}</p>
      <p>Localização: {machine.location}</p>
      
      <h3 className="text-lg font-semibold">Histórico de Manutenção</h3>
      
      <Table
        columns={columns}
        data={machine.maintenanceHistory}
        renderRow={(entry, index) => (
          <>
            <td className="px-4 py-2">{entry.date}</td>
            <td className="px-4 py-2">{entry.description}</td>
            <td className="px-4 py-2">{entry.partsUsed?.join(', ') || 'N/A'}</td>
            <td className="px-4 py-2">{entry.materialsUsed?.join(', ') || 'N/A'}</td>
            <td className="px-4 py-2">{entry.responsibleTeam}</td>
            <td className="px-4 py-2">
              <Button label="Ver Detalhes" onClick={() => handleOpenMaintenance(entry)} />
            </td>
          </>
        )}
      />

      <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Fechar</button>

      {selectedMaintenance && (
        <Modal isOpen={!!selectedMaintenance} onClose={handleCloseMaintenance}>
          <MaintenanceDetails
            maintenance={selectedMaintenance}
            onClose={handleCloseMaintenance}
          />
        </Modal>
      )}
    </div>
  );
};

export default MachineDetail;
