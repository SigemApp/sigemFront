import React, { useState, useEffect } from 'react';
import Modal from '../interfaceComponents/modal';
import Form from '../interfaceComponents/form';
import { SupplierItem } from '../../pages/suppliers/types';

interface SupplierFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: SupplierItem) => Promise<void>;
  initialData: SupplierItem | null;
  mode: 'create' | 'edit';
}

const SupplierForm: React.FC<SupplierFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}) => {
  // Definindo o estado inicial dos campos
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState<'part' | 'service'>('part');
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [notes, setNotes] = useState('');

  // Carregando os dados iniciais quando o modal for aberto
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
      setCode(initialData.code);
      setType(initialData.type);
      setAddress(initialData.address);
      setContactName(initialData.contactName);
      setContactEmail(initialData.contactEmail);
      setContactPhone(initialData.contactPhone);
      setWebsite(initialData.website || '');
      setNotes(initialData.notes || '');
      if (initialData.type === 'service' && 'serviceDescription' in initialData) {
        setServiceDescription(initialData.serviceDescription);
      }
    }
  }, [initialData, mode]);

  // Função de envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se o tipo é "service" e se a descrição do serviço foi preenchida
    if (type === 'service' && !serviceDescription) {
      return; // Pode exibir um erro ou mensagem de validação aqui
    }

    // Criação do objeto supplier com base no tipo
    const supplier: SupplierItem = type === 'service'
      ? {
          id: initialData?.id || Date.now(),
          name,
          code,
          type,
          address,
          contactName,
          contactEmail,
          contactPhone,
          website,
          serviceDescription,
          notes,
        }
      : {
          id: initialData?.id || Date.now(),
          name,
          code,
          type,
          address,
          contactName,
          contactEmail,
          contactPhone,
          website,
          notes,
        };

    // Chama a função onSave passando os dados do fornecedor
    await onSave(supplier);
    onClose(); // Fecha o modal após salvar
  };

  // Não exibe o modal se isOpen for falso
  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      width="800px"
      height="auto"
    >
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-3">
          {mode === 'create' ? 'Adicionar Fornecedor' : 'Editar Fornecedor'}
        </h2>
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
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
                Tipo:
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'part' | 'service')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="part">Peça</option>
                  <option value="service">Serviço</option>
                </select>
              </label>
              <label>
                Endereço:
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label>
                Nome do Contato:
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
            </div>
            <div>
              <label>
                Email do Contato:
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label>
                Telefone do Contato:
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label>
                Website:
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label>
                Notas:
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              {type === 'service' && (
                <label>
                  Descrição do Serviço:
                  <input
                    type="text"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </label>
              )}
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

export default SupplierForm;
