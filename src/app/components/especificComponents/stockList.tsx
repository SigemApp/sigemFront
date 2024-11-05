import React from 'react';
import { StockItem } from '../../pages/stock/types'; 

interface StockListProps {
  items: StockItem[];
  onEdit: (id: number) => void;
  onView: (item: StockItem) => void;
}

const StockList: React.FC<StockListProps> = ({ items, onEdit, onView }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id} className="border p-4 mb-4">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p>Código: {item.code}</p>
          <p>Fornecedor: {item.supplier}</p>
          <p>Quantidade: {item.quantity}</p>
          <p>Valor Unitário: ${item.unitPrice.toFixed(2)}</p>
          <button onClick={() => onEdit(item.id)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Editar</button>
          <button onClick={() => onView(item)} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2">Visualizar</button>
        </div>
      ))}
    </div>
  );
};

export default StockList;
