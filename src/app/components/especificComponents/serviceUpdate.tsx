import React, { useState, useEffect } from 'react';
import Modal from '../interfaceComponents/modal';
import Form from '../interfaceComponents/form';
import { Service } from '../../pages/services/types';

interface ServiceUpdateProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => Promise<void>;
  initialData: Service | null;  
  suppliers: { id: string; name: string }[];  
}

const ServiceUpdate: React.FC<ServiceUpdateProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  suppliers = [],
}) => {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState('');
  const [supplierId, setSupplierId] = useState<string>('');  
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setId(initialData.id || '');
      setName(initialData.name);
      setSupplierId(initialData.supplierName);  
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedService: Service = {
      id,
      name,
      supplierName: supplierId,
      description,
    };

    await onSave(updatedService);  
    onClose();  
  };

  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      width="800px"
      height="auto"
    >
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-3">Editar Serviço</h2>
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>
                ID do Serviço:
                <input
                  type="text"
                  value={id || ''}
                  onChange={(e) => setId(e.target.value)}  
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              </label>
              <label>
                Nome do Serviço:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label>
                Empresa Prestadora:
                <select
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}  
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Selecione a empresa</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>  
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>
                Descrição do Serviço:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Salvar</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancelar</button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ServiceUpdate;
