'use client';

import React, { useState } from 'react';
import Modal from '../../components/interfaceComponents/modal';
import Table from '../../components/interfaceComponents/table';
import InputField from '../../components/interfaceComponents/inputFielf';
import Form from '../../components/interfaceComponents/form';
import { StockItem } from '../../pages/stock/types';

// Definição fictícia de itens para inicializar o estado
const initialItems: StockItem[] = [
  { id: 1, name: 'Item 1', code: '001', supplier: 'Fornecedor A', quantity: 10, unitPrice: 100 },
  { id: 2, name: 'Item 2', code: '002', supplier: 'Fornecedor B', quantity: 20, unitPrice: 200 },
  // Adicione mais itens conforme necessário
];

interface CostControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (costs: StockItem[]) => void;
}

const CostControlModal: React.FC<CostControlModalProps> = ({ isOpen, onClose, onSave }) => {
  const [items, setItems] = useState<StockItem[]>(initialItems);
  const [editItem, setEditItem] = useState<StockItem | null>(null);

  const handleAddItem = () => {
    setEditItem({ id: Date.now(), name: '', code: '', supplier: '', quantity: 0, unitPrice: 0 });
  };

  const handleSaveItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editItem) {
      if (editItem.id === undefined) {
        setItems([...items, editItem]);
      } else {
        setItems(items.map(item => item.id === editItem.id ? editItem : item));
      }
      onSave(items);
      setEditItem(null);
    }
  };

  const handleCancelEdit = () => {
    setEditItem(null);
  };

  const calculateTotal = (items: StockItem[]): number => {
    return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="auto" height="auto">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-2 py-1 bg-gray-500 text-white rounded-md"
        >
          Fechar
        </button>
        <h2 className="text-xl font-bold mb-4">Controle de Custos</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Itens</h3>
            <Table
              columns={['Nome', 'Código', 'Fornecedor', 'Quantidade', 'Preço Unitário', 'Total', 'Ações']}
              data={items}
              renderRow={(item: StockItem, index: number) => (
                <>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.code}</td>
                  <td className="p-2">{item.supplier}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{item.unitPrice}</td>
                  <td className="p-2">{item.unitPrice * item.quantity}</td>
                  <td className="p-2">
                    <button
                      onClick={() => setEditItem(item)}
                      className="px-4 py-2 bg-blue-950 text-white rounded-md mr-2"
                    >
                      Editar
                    </button>
                  </td>
                </>
              )}
            />
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-blue-950 text-white rounded-md mt-2"
            >
              Adicionar Item
            </button>
          </div>
          <div className="mt-4">
            <strong>Total:</strong> {calculateTotal(items).toFixed(2)}
          </div>
        </div>

        {editItem && (
          <Modal isOpen={!!editItem} onClose={handleCancelEdit} width="500px" height="auto">
            <Form onSubmit={handleSaveItem}>
              <InputField
                label="Nome"
                type="text"
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
              />
              <InputField
                label="Código"
                type="text"
                value={editItem.code}
                onChange={(e) => setEditItem({ ...editItem, code: e.target.value })}
              />
              <InputField
                label="Fornecedor"
                type="text"
                value={editItem.supplier}
                onChange={(e) => setEditItem({ ...editItem, supplier: e.target.value })}
              />
              <InputField
                label="Quantidade"
                type="number"
                value={editItem.quantity}
                onChange={(e) => setEditItem({ ...editItem, quantity: Number(e.target.value) })}
              />
              <InputField
                label="Preço Unitário"
                type="number"
                value={editItem.unitPrice}
                onChange={(e) => setEditItem({ ...editItem, unitPrice: Number(e.target.value) })}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-950 text-white rounded-md"
                >
                  Salvar
                </button>
              </div>
            </Form>
          </Modal>
        )}
      </div>
    </Modal>
  );
};

export default CostControlModal;
