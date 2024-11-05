import React, { useState, useEffect } from 'react';
import Modal from '../interfaceComponents/modal'; 
import Form from '../interfaceComponents/form'; 
import { StockItem } from '../../pages/stock/types'; 

interface StockFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<StockItem, 'id'>) => Promise<void>;
  initialData: Omit<StockItem, 'id'> | null;
  mode: 'create' | 'edit';
}

const StockForm: React.FC<StockFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [supplier, setSupplier] = useState('');
  const [quantity, setQuantity] = useState<number>(0); 
  const [unitPrice, setUnitPrice] = useState<number>(0); 

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCode(initialData.code);
      setSupplier(initialData.supplier);
      setQuantity(initialData.quantity || 0); 
      setUnitPrice(initialData.unitPrice || 0); 
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ name, code, supplier, quantity, unitPrice });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      width="500px"
      height="480px" 
    >
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold mb-3">{mode === 'create' ? 'Adicionar Item' : 'Editar Item'}</h2>
        <Form onSubmit={handleSubmit} className="flex-1" width="100%" height="100%">
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Código:
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Fornecedor:
            <input
              type="text"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Quantidade:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Valor Unitário:
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Salvar</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancelar</button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default StockForm;
