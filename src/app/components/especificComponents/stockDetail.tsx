import React, { useState } from 'react';
import jsPDF from 'jspdf'; 
import saveAs  from 'file-saver';
import Modal from '../interfaceComponents/modal'; 
import Notification from '../interfaceComponents/customNotification'; 
import Table from '../interfaceComponents/table'; 

interface Part {
  id: number;
  name: string;
  code: string;
  supplier: string;
  quantity: number;
  unitPrice: number;
}

interface StockMovement {
  id: number;
  partId: number;
  date: string;
  type: 'entry' | 'exit';
  quantity: number;
}

interface StockDetailProps {
  parts: Part[];
  movements: StockMovement[];
  onAddPart: (part: Omit<Part, 'id'>) => void;
  onRegisterMovement: (movement: Omit<StockMovement, 'id'>) => void;
  onGenerateReport: () => string; 
}

const StockDetail: React.FC<StockDetailProps> = ({ parts, movements, onAddPart, onRegisterMovement, onGenerateReport }) => {
  const [newPart, setNewPart] = useState<Partial<Omit<Part, 'id'>>>({});
  const [newMovement, setNewMovement] = useState<Partial<Omit<StockMovement, 'id'>>>({});
  const [reportVisible, setReportVisible] = useState(false);
  const [reportContent, setReportContent] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info'; } | null>(null);

  const handleAddPart = () => {
    if (newPart.name && newPart.code && newPart.supplier && newPart.quantity !== undefined && newPart.unitPrice !== undefined) {
      onAddPart({
        ...newPart as Omit<Part, 'id'>,
      });
      setNewPart({});
      setNotification({ message: 'Peça adicionada com sucesso!', type: 'success' });
    } else {
      setNotification({ message: 'Erro ao adicionar peça. Verifique os dados fornecidos.', type: 'error' });
    }
  };

  const handleRegisterMovement = () => {
    if (newMovement.partId !== undefined && newMovement.date && newMovement.type && newMovement.quantity !== undefined) {
      onRegisterMovement({
        partId: newMovement.partId as number,
        date: newMovement.date as string,
        type: newMovement.type as 'entry' | 'exit',
        quantity: newMovement.quantity as number,
      });
      setNewMovement({});
      setNotification({ message: 'Movimentação registrada com sucesso!', type: 'success' });
    } else {
      setNotification({ message: 'Erro ao registrar movimentação. Verifique os dados fornecidos.', type: 'error' });
    }
  };

  const handleGenerateReport = () => {
    const generatedReport = onGenerateReport(); 
    setReportContent(generatedReport);
    setReportVisible(true);
  };

  const handleSaveAsPDF = () => {
    const doc = new jsPDF();
    doc.text("SIGEM - Relatório de Estoque", 10, 10);
    doc.text(`Emitido em: ${getCurrentDateTime()}`, 10, 20);
    doc.text(`Usuário: [Nome do Usuário]`, 10, 30);
    doc.text("Conteúdo do Relatório:", 10, 40);
    
    const lines = reportContent.split('\n');
    let y = 50;
    lines.forEach((line) => {
      doc.text(line, 10, y);
      y += 10;
    });

    doc.save('relatorio_estoque.pdf');
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  };

  return (
    <div className="p-4">
      {/* Notificação */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          className="mb-4"
        />
      )}

      {/* Adicionar Nova Peça */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Adicionar Nova Peça</h3>
        <input
          type="text"
          placeholder="Nome"
          value={newPart.name || ''}
          onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Código"
          value={newPart.code || ''}
          onChange={(e) => setNewPart({ ...newPart, code: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Fornecedor"
          value={newPart.supplier || ''}
          onChange={(e) => setNewPart({ ...newPart, supplier: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={newPart.quantity || ''}
          onChange={(e) => setNewPart({ ...newPart, quantity: Number(e.target.value) })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          placeholder="Valor Unitário"
          value={newPart.unitPrice || ''}
          onChange={(e) => setNewPart({ ...newPart, unitPrice: Number(e.target.value) })}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAddPart} className="px-4 py-2 bg-blue-500 text-white rounded-md">Adicionar</button>
      </div>

      {/* Registrar Movimentação */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Registrar Movimentação</h3>
        <input
          type="number"
          placeholder="ID da Peça"
          value={newMovement.partId || ''}
          onChange={(e) => setNewMovement({ ...newMovement, partId: Number(e.target.value) })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="date"
          placeholder="Data"
          value={newMovement.date || ''}
          onChange={(e) => setNewMovement({ ...newMovement, date: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <select
          value={newMovement.type || ''}
          onChange={(e) => setNewMovement({ ...newMovement, type: e.target.value as 'entry' | 'exit' })}
          className="border px-2 py-1 mr-2"
        >
          <option value="">Tipo</option>
          <option value="entry">Entrada</option>
          <option value="exit">Saída</option>
        </select>
        <input
          type="number"
          placeholder="Quantidade"
          value={newMovement.quantity || ''}
          onChange={(e) => setNewMovement({ ...newMovement, quantity: Number(e.target.value) })}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleRegisterMovement} className="px-4 py-2 bg-blue-500 text-white rounded-md">Registrar</button>
      </div>

      {/* Tabelas */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Estoque de Peças</h3>
        <Table
          columns={['Nome', 'Código', 'Fornecedor', 'Quantidade', 'Valor Unitário']}
          data={parts}
          renderRow={(row) => (
            <>
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.code}</td>
              <td className="px-4 py-2">{row.supplier}</td>
              <td className="px-4 py-2">{row.quantity}</td>
              <td className="px-4 py-2">{row.unitPrice}</td>
            </>
          )}
        />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Movimentações de Estoque</h3>
        <Table
          columns={['ID da Peça', 'Data', 'Tipo', 'Quantidade']}
          data={movements}
          renderRow={(row) => (
            <>
              <td className="px-4 py-2">{row.partId}</td>
              <td className="px-4 py-2">{row.date}</td>
              <td className="px-4 py-2">{row.type}</td>
              <td className="px-4 py-2">{row.quantity}</td>
            </>
          )}
        />
      </div>

      {/* Botão para gerar e salvar o relatório */}
      <div className="mb-4">
        <button onClick={handleGenerateReport} className="px-4 py-2 bg-green-500 text-white rounded-md">Gerar Relatório</button>
      </div>

      {/* Modal para exibir e salvar o relatório */}
      <Modal
        isOpen={reportVisible}
        onClose={() => setReportVisible(false)}        
      >
        <div className="p-4">
          <header className="mb-4">
            <h1 className="text-xl font-semibold">Relatório de Estoque</h1>
            <p className="text-sm text-gray-600">Emitido em: {getCurrentDateTime()}</p>
            <p className="text-sm text-gray-600">Usuário: [Nome do Usuário]</p>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coluna 1</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coluna 2</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coluna 3</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coluna 4</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportContent.split('\n').map((line, index) => (
                  <tr key={index}>
                    {line.split(';').map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer className="mt-6 text-sm text-gray-600">
            <p>Relatório gerado pelo sistema SIGEM</p>
            <p>Para mais informações, entre em contato com o suporte.</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleSaveAsPDF} className="px-4 py-2 bg-blue-500 text-white rounded-md">Salvar como PDF</button>
            </div>
          </footer>
        </div>
      </Modal>
    </div>
  );
};

export default StockDetail;
