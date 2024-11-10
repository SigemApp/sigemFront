import React from 'react';
import { Service } from '../../pages/services/types';

interface ServiceDetailProps {
  service: Service;
  onClose: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Detalhes do Serviço</h2>
        
        <div className="mb-4">
          <p><strong>Nome:</strong> {service.name}</p>
        </div>

        <div className="mb-4">
          <p><strong>Descrição:</strong> {service.description}</p>
        </div>

        <div className="mb-4">
          <p><strong>Fornecedor:</strong> {service.supplierName}</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
