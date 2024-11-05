import React, { useState } from 'react';
import Modal from '../interfaceComponents/modal';
import SearchBar from '../interfaceComponents/searchBar';
import Table from '../interfaceComponents/table'; 
import { Machine } from '../../pages/machines/types'; 

interface MachineSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  machines: Machine[]; // Certifique-se de que `machines` é uma lista, não undefined
  selectedMachine: Machine | null;
  onSelectMachine: (machine: Machine) => void;
}

const MachineSelectionModal: React.FC<MachineSelectionModalProps> = ({ isOpen, onClose, machines = [], selectedMachine, onSelectMachine }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Verifique se machines é uma lista antes de tentar filtrar
  const filteredMachines = (machines || []).filter(machine =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="800px" height="auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Selecionar Máquina</h2>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={() => {}}
          placeholder="Buscar máquina..."
          className="mb-4"
        />
        <Table
          columns={['Nome', 'Ações']}
          data={filteredMachines}
          renderRow={(machine: Machine) => (
            <>
              <td className="px-4 py-2">{machine.name}</td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onSelectMachine(machine)}
                  className={`px-4 py-2 rounded-md ${selectedMachine && selectedMachine.id === machine.id ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                >
                  {selectedMachine && selectedMachine.id === machine.id ? 'Selecionado' : 'Selecionar'}
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

export default MachineSelectionModal;
