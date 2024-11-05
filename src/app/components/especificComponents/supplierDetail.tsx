import React from 'react';
import { PartSupplier, ServiceSupplier, SupplierItem } from '../../pages/suppliers/types';

interface SupplierDetailProps {
  supplier: SupplierItem;
  onClose: () => void;
}

const SupplierDetail: React.FC<SupplierDetailProps> = ({ supplier, onClose }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-bold">{supplier.name}</h2>
      <p>Código: {supplier.code}</p>
      <p>Endereço: {supplier.address}</p>
      <p>Nome do Contato: {supplier.contactName}</p>
      <p>Email do Contato: {supplier.contactEmail}</p>
      <p>Telefone do Contato: {supplier.contactPhone}</p>
      {supplier.website && <p>Website: <a href={supplier.website} target="_blank" rel="noopener noreferrer">{supplier.website}</a></p>}
      {supplier.notes && <p>Notas: {supplier.notes}</p>}
      {'serviceDescription' in supplier && (
        <p>Descrição do Serviço: {supplier.serviceDescription}</p>
      )}
      {supplier.type === 'part' && (
        <p>Tipo: Peça</p>
      )}
      {supplier.type === 'service' && (
        <p>Tipo: Serviço</p>
      )}
      <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md mt-4">Fechar</button>
    </div>
  );
};

export default SupplierDetail;
