import React from 'react';
import { ServiceSupplier } from '../../pages/suppliers/types';

interface ServiceDetailProps {
  service: ServiceSupplier;
  onClose: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onClose }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-bold mb-4">Detalhes do Serviço</h2>
      
      <div className="mb-4">
        <strong>ID do Serviço:</strong>
        <p>{service.id}</p>
      </div>
      
      <div className="mb-4">
        <strong>Nome do Serviço:</strong>
        <p>{service.name}</p>
      </div>
      
      <div className="mb-4">
        <strong>Empresa Prestadora:</strong>
        <p>{service.name}</p> {/* Name of the supplier / service provider */}
      </div>
      
      <div className="mb-4">
        <strong>Descrição do Serviço:</strong>
        <p>{service.serviceDescription}</p>
      </div>
      
      <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md mt-4">Fechar</button>
    </div>
  );
};

export default ServiceDetail;
