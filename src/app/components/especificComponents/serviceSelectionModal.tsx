import React, { useState } from 'react';
import Modal from '../interfaceComponents/modal';
import SearchBar from '../interfaceComponents/searchBar'; 
import Table from '../interfaceComponents/table'; 

export interface Service {
  id: string;         
  name: string;       
  description?: string;  
  price?: number;     
  duration?: number;  
}

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[]; 
  selectedServices: Service[];
  onSelectService: (service: Service) => void;
}

const ServiceSelectionModal: React.FC<ServiceSelectionModalProps> = ({ isOpen, onClose, services = [], selectedServices, onSelectService }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtra os serviços com base no termo de busca
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="800px" height="auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Selecionar Serviços</h2>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={() => {}}
          placeholder="Buscar serviços..."
          className="mb-4"
        />
        <Table
          columns={['Nome', 'Ações']}
          data={filteredServices}
          renderRow={(service: Service) => (
            <>
              <td className="px-4 py-2">{service.name}</td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onSelectService(service)}
                  className={`px-4 py-2 rounded-md ${selectedServices.find(selectedService => selectedService.id === service.id) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                >
                  {selectedServices.find(selectedService => selectedService.id === service.id) ? 'Remover' : 'Adicionar'}
                </button>
              </td>
            </>
          )}
          className="mt-2"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceSelectionModal;
