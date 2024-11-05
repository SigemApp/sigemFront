import React from 'react';
import { SupplierItem } from '../../pages/suppliers/types';

interface SupplierListProps {
  suppliers: SupplierItem[];
  onEdit: (id: number) => void;
  onView: (supplier: SupplierItem) => void;
}

const SupplierList: React.FC<SupplierListProps> = ({ suppliers, onEdit, onView }) => {
  return (
    <div>
      {suppliers.map(supplier => (
        <div key={supplier.id} className="border p-4 mb-4">
          <h3 className="text-lg font-bold">{supplier.name}</h3>
          <p>Código: {supplier.code}</p>
          <p>Tipo: {supplier.type === 'part' ? 'Peça' : 'Serviço'}</p>
          <button onClick={() => onEdit(supplier.id)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Editar</button>
          <button onClick={() => onView(supplier)} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2">Visualizar</button>
        </div>
      ))}
    </div>
  );
};

export default SupplierList;
