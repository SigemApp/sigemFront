import React, { useState, useEffect } from 'react';
import Modal from '../interfaceComponents/modal'; 
import Form from '../interfaceComponents/form'; 
import { Service } from '../../pages/services/types'; 
import axios from 'axios';

interface Supplier {
  name: string;
  code: string;  
}

interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => Promise<void>;
  initialData: Service | null;
  mode: 'create' | 'edit';
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}) => {
  const [name, setName] = useState('');
  const [supplierCode, setSupplierCode] = useState('');  
  const [description, setDescription] = useState('');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]); 

  // Carrega os dados do serviço se em modo de edição
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSupplierCode(initialData.supplierCode || '');  
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/suppliers');
        setSuppliers(response.data);  
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };

    fetchSuppliers();
  }, []);

  // Função que lida com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const service: Service = {
      name,
      supplierCode,  
      supplierName: supplierCode,  
      description, 
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
                Nome do Serviço:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label>
                Nome do Fornecedor:
                <select
                  value={supplierCode}  
                  onChange={(e) => setSupplierCode(e.target.value)}  
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione um fornecedor</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.code} value={supplier.code}>
                      {supplier.name}  
                    </option>
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
