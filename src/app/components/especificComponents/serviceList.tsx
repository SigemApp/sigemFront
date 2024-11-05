import React from 'react';
import { ServiceSupplier } from '../../pages/suppliers/types';

interface ServiceListProps {
  services: ServiceSupplier[];
  onEdit: (id: number) => void;
  onView: (service: ServiceSupplier) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onEdit, onView }) => {
  return (
    <div>
      {services.map(service => (
        <div key={service.id} className="border p-4 mb-4">
          <h3 className="text-lg font-bold">{service.name}</h3>
          <p>Código: {service.code}</p>
          <p>Descrição: {service.serviceDescription}</p>
          <p>Empresa Prestadora: {service.name}</p> {/* Assuming service.name is the provider's name */}
          <button onClick={() => onEdit(service.id)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Editar</button>
          <button onClick={() => onView(service)} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2">Visualizar</button>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
