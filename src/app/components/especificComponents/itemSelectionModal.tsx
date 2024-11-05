import React, { useState } from 'react';
import Modal from '../interfaceComponents/modal';
import SearchBar from '../interfaceComponents/searchBar'; 
import Table from '../interfaceComponents/table'; 
import { StockItem } from '../../pages/stock/types'; 

interface ItemSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockItems: StockItem[];
  selectedItems: StockItem[];
  onSelectItem: (item: StockItem) => void;
}

const ItemSelectionModal: React.FC<ItemSelectionModalProps> = ({ isOpen, onClose, stockItems, selectedItems, onSelectItem }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="800px" height="auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Selecionar Itens</h2>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={() => {}}
          placeholder="Buscar itens..."
          className="mb-4"
        />
        <Table
          columns={['Nome', 'Ações']}
          data={filteredItems}
          renderRow={(item: StockItem) => (
            <>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onSelectItem(item)}
                  className={`px-4 py-2 rounded-md ${selectedItems.find(selectedItem => selectedItem.id === item.id) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                >
                  {selectedItems.find(selectedItem => selectedItem.id === item.id) ? 'Remover' : 'Adicionar'}
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

export default ItemSelectionModal;
