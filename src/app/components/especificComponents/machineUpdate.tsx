// MachineUpdate.tsx (Formulário de Edição)
import React, { useState, useEffect } from 'react';
import Modal from '../interfaceComponents/modal';
import Form from '../interfaceComponents/form';
import DatePicker from '../interfaceComponents/datePicker';
import FileUpload from '../interfaceComponents/fileUpload';
import { Machine } from '../../pages/machines/types';

interface MachineUpdateProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (machine: Omit<Machine, 'id' | 'maintenanceHistory'> & { image: File | null }) => Promise<void>;
  initialData: Machine;
}

const MachineUpdate: React.FC<MachineUpdateProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [name, setName] = useState(initialData.name);
  const [type, setType] = useState(initialData.type);
  const [machineModel, setMachineModel] = useState(initialData.machineModel);
  const [serialNumber, setSerialNumber] = useState(initialData.serialNumber);
  const [location, setLocation] = useState(initialData.location);
  const [manufacturingDate, setManufacturingDate] = useState(initialData.manufacturingDate);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const machineData = {
      name,
      type,
      machineModel,
      serialNumber,
      location,
      manufacturingDate,
      image: image || initialData.image, 
    };

    await onSave(machineData);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
    >
      <div className="flex flex-col h-full p-4">
        <h2 className="text-xl font-bold mb-2">Editar Máquina</h2>
        <Form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex flex-col mb-4">
                Nome:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="flex flex-col mb-4">
                Tipo:
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="flex flex-col mb-4">
                Modelo:
                <input
                  type="text"
                  value={machineModel}
                  onChange={(e) => setMachineModel(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <DatePicker label="Data de Fabricação" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} width="full" />
            </div>

            <div>
              <label className="flex flex-col mb-4">
                Número de Série:
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="flex flex-col mb-4">
                Localização:
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <FileUpload label="Imagem" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} width="full" />
            </div>
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Salvar</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancelar</button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default MachineUpdate;
