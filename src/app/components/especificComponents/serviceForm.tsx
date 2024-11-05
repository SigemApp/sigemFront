import React, { useState, useEffect } from 'react';
import Modal from '../interfaceComponents/modal'; 
import Form from '../interfaceComponents/form'; 
import { ServiceSupplier, SupplierItem } from '../../pages/suppliers/types'; 

interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: ServiceSupplier) => Promise<void>;
  initialData: ServiceSupplier | null;
  mode: 'create' | 'edit';
  suppliers: SupplierItem[];
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
  suppliers = [], 
}) => {
  const [id, setId] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [description, setDescription] = useState('');
  const [supplierOptions, setSupplierOptions] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    if (initialData) {
      setId(initialData.id);
      setName(initialData.name);
      setSupplierName(initialData.contactName); 
      setDescription(initialData.serviceDescription);
    }

    // Prepare supplier options for the dropdown
    if (suppliers) {
      const options = suppliers.map(supplier => ({
        id: supplier.id,
        name: supplier.name,
      }));
      setSupplierOptions(options);
    }
  }, [initialData, suppliers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const service: ServiceSupplier = {
      id: id || Date.now(), 
      name,
      code: '', 
      type: 'service',
      address: '', 
      contactName: supplierName,
      contactEmail: '', 
      contactPhone: '',
      website: '', 
      serviceDescription: description,
      notes: '', 
    };

    await onSave(service);
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
        <h2 className="text-xl font-bold mb-3">{mode === 'create' ? 'Adicionar Serviço' : 'Editar Serviço'}</h2>
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>
                ID do Serviço:
                <input
                  type="number"
                  value={id || ''}
                  onChange={(e) => setId(Number(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Selecione a empresa</option>
                  {supplierOptions.map(supplier => (
                    <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
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

export default ServiceForm;
