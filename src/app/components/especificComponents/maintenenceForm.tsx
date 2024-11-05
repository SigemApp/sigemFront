import React, { useState } from 'react';
import Modal from '../interfaceComponents/modal';
import Notification from '../interfaceComponents/customNotification';
import ItemSelectionModal from '../especificComponents/itemSelectionModal'; 
import ServiceSelectionModal from '../especificComponents/serviceSelectionModal'; 
import MachineSelectionModal from '../especificComponents/machineSelectionModal'; 
import { StockItem } from '../../pages/stock/types'; 
import { Machine } from '../../pages/machines/types';


export interface Service {
  id: string; 
  name: string;
  description?: string;
  price?: number;
  duration?: number;
}

interface MaintenanceFormProps {
  onSave: (maintenance: any) => void;
  onClose: () => void;
  stockItems: StockItem[];
  services: Service[];
  machines: Machine[];
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onSave, onClose, stockItems, services, machines }) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [priority, setPriority] = useState<string>('Baixa');
  const [responsible, setResponsible] = useState<string>('');
  const [maintenanceType, setMaintenanceType] = useState<'Preventiva' | 'Corretiva'>('Preventiva');
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<StockItem[]>([]); 
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [showMachineModal, setShowMachineModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info'; } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleItemSelect = (item: StockItem) => {
    setSelectedItems(prevItems =>
      prevItems.find(selectedItem => selectedItem.id === item.id)
        ? prevItems.filter(selectedItem => selectedItem.id !== item.id)
        : [...prevItems, item]
    );
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedServices(prevServices =>
      prevServices.find(selectedService => selectedService.id === service.id)
        ? prevServices.filter(selectedService => selectedService.id !== service.id)
        : [...prevServices, service]
    );
  };

  const handleMachineSelect = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowMachineModal(false); 
  };

  const handleSave = () => {
    const maintenance = {
      description,
      date,
      priority,
      responsible,
      type: maintenanceType,
      files,
      comments,
      items: selectedItems,
      services: selectedServices,
      machine: selectedMachine,
    };
    onSave(maintenance);
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose} width="800px" height="auto">
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

          <h2 className="text-2xl font-bold mb-4">Cadastro de Manutenção</h2>

          {/* Container de duas colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">
                Data da Solicitação:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2">
                Prioridade:
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </label>
              <label className="block mb-2">
                Equipe Responsável:
                <input
                  type="text"
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2">
                Tipo de Manutenção:
                <select
                  value={maintenanceType}
                  onChange={(e) => setMaintenanceType(e.target.value as 'Preventiva' | 'Corretiva')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Preventiva">Preventiva</option>
                  <option value="Corretiva">Corretiva</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block mb-2">
                Descrição do Problema:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2 mt-4">
                Arquivos:
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1 block w-full"
                />
              </label>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowMachineModal(true)}
              className="px-4 py-2 bg-blue-950 text-white rounded-md mr-4"
            >
              {selectedMachine ? selectedMachine.name : 'Selecionar Máquina'}
            </button>
            <button
              onClick={() => setShowItemModal(true)}
              className="px-4 py-2 bg-blue-950 text-white rounded-md mr-4"
            >
              Selecionar Itens
            </button>
            <button
              onClick={() => setShowServiceModal(true)}
              className="px-4 py-2 bg-blue-950 text-white rounded-md"
            >
              Selecionar Serviços
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <ul>
              <li className="font-bold">Itens Selecionados:</li>
              <ul className="mt-2">
                {selectedItems.map(item => (
                  <li key={item.id} className="border p-2 mb-2">{item.name}</li>
                ))}
              </ul>
            </ul>
            <ul>
              <li className="font-bold">Serviços Selecionados:</li>
              <ul className="mt-2">
                {selectedServices.map(service => (
                  <li key={service.id} className="border p-2 mb-2">{service.name}</li>
                ))}
              </ul>
            </ul>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-950 text-white rounded-md mr-4"
            >
              Salvar
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

      <ItemSelectionModal
        stockItems={stockItems}
        selectedItems={selectedItems} 
        onSelectItem={handleItemSelect}
        onClose={() => setShowItemModal(false)}
        isOpen={showItemModal}
      />

      {/* Modal para seleção de serviços */}
      <ServiceSelectionModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        services={services}
        selectedServices={selectedServices}
        onSelectService={handleServiceSelect}
      />

      {/* Modal para seleção de máquinas */}
      <MachineSelectionModal
        isOpen={showMachineModal}
        onClose={() => setShowMachineModal(false)}
        machines={machines}
        selectedMachine={selectedMachine}
        onSelectMachine={handleMachineSelect}
      />
    </>
  );
};

export default MaintenanceForm;
