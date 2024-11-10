import React from 'react';
import { PartSupplier, ServiceSupplier } from '../../pages/suppliers/types';

interface SupplierDetailProps {
  supplier: PartSupplier | ServiceSupplier;
  onClose: () => void;
}

const SupplierDetail: React.FC<SupplierDetailProps> = ({ supplier, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
      
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-semibold">{supplier.name}</h2>
        </div>

        <div>
          <div className="space-y-4">
            <div>
              <strong>Código:</strong> {supplier.code}
            </div>
            <div>
              <strong>Endereço:</strong> {supplier.address}
            </div>
            <div>
              <strong>Nome do Contato:</strong> {supplier.contactName}
            </div>
            <div>
              <strong>Email do Contato:</strong> {supplier.contactEmail}
            </div>
            <div>
              <strong>Telefone do Contato:</strong> {supplier.contactPhone}
            </div>
            {supplier.website && (
              <div>
                <strong>Website:</strong> 
                <a 
                  href={supplier.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {supplier.website}
                </a>
              </div>
            )}
            {supplier.notes && (
              <div>
                <strong>Notas:</strong> {supplier.notes}
              </div>
            )}
       
            {'serviceDescription' in supplier && (
              <div>
                <strong>Descrição do Serviço:</strong> {(supplier as ServiceSupplier).serviceDescription}
              </div>
            )}
            <div>
              <strong>Tipo:</strong> {supplier.type === 'part' ? 'Peça' : 'Serviço'}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
