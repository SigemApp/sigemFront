import React from 'react';
import { Machine } from '../../pages/machines/types'; 

interface MachineListProps {
  machines: Machine[];
  onEdit: (id: number) => void;
  onView: (machine: Machine) => void;
}

const MachineList: React.FC<MachineListProps> = ({ machines, onEdit, onView }) => {
  return (
    <div>
      {machines.map(machine => (
        <div key={machine.id} className="border p-4 mb-4">
          <h3 className="text-lg font-bold">{machine.name}</h3>
          <button onClick={() => onEdit(machine.id)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Editar</button>
          <button onClick={() => onView(machine)} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2">Visualizar</button>
        </div>
      ))}
    </div>
  );
};

export default MachineList;
