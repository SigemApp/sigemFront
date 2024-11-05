'use client';

import React, { useState, useEffect } from 'react';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import StockForm from '../../components/especificComponents/stockForm';
import Button from '../../components/interfaceComponents/button';
import Notification from '../../components/interfaceComponents/customNotification';
import { StockItem } from './types';
import jsPDF from 'jspdf';

const StockPage: React.FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [reportVisible, setReportVisible] = useState(false);
  const [reportContent, setReportContent] = useState('');

  useEffect(() => {
    const mockStockItems: StockItem[] = [
      { id: 1, name: 'Item A', code: 'A001', supplier: 'Supplier X', quantity: 10, unitPrice: 20.0 },
      { id: 2, name: 'Item B', code: 'B002', supplier: 'Supplier Y', quantity: 5, unitPrice: 50.0 },
    ];
    setStockItems(mockStockItems);
    setFilteredItems(mockStockItems);
  }, []);

  const handleSearch = () => {
    setFilteredItems(stockItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleSave = async (item: Omit<StockItem, 'id'>) => {
    try {
      if (formMode === 'create') {
        const newItem = { id: stockItems.length + 1, ...item };
        setStockItems([...stockItems, newItem]);
        setNotification({ message: 'Stock item added successfully!', type: 'success' });
      } else if (selectedItem) {
        setStockItems(stockItems.map(i => i.id === selectedItem.id ? { ...item, id: selectedItem.id } : i));
        setNotification({ message: 'Stock item updated successfully!', type: 'success' });
      }
      setFormOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error saving stock item:', error);
      setNotification({ message: 'Error saving stock item!', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setStockItems(stockItems.filter(item => item.id !== id));
      setNotification({ message: 'Stock item deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting stock item:', error);
      setNotification({ message: 'Error deleting stock item!', type: 'error' });
    }
  };

  const handleEdit = (item: StockItem) => {
    setSelectedItem(item);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleCloseModal = () => {
    setFormOpen(false);
    setSelectedItem(null);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const generateMockReport = () => {
    let report = 'Relatório de Estoque\n\n';
    stockItems.forEach(item => {
      report += `Nome: ${item.name}\nCódigo: ${item.code}\nFornecedor: ${item.supplier}\nQuantidade: ${item.quantity}\nPreço Unit.: $${item.unitPrice.toFixed(2)}\n\n`;
    });
    setReportContent(report);
    setReportVisible(true);
  };

  const handleSaveAsPDF = () => {
    const doc = new jsPDF();
    doc.text("SIGEM - Relatório de Estoque", 10, 10);
    doc.text(`Emitido em: ${getCurrentDateTime()}`, 10, 20);
    doc.text("Conteúdo do Relatório:", 10, 30);
    
    const lines = reportContent.split('\n');
    let y = 40;
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Button label="Adicionar Item" onClick={handleCreate} />
        <Button label="Gerar Relatório" onClick={generateMockReport} />
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          placeholder="Procurar Itens"
        />
      </div>

      <Table 
        columns={['Nome', 'Código', 'Fornecedor', 'Quantidade', 'Preço Unit.', 'Ações']}
        data={filteredItems}
        renderRow={(item) => (
          <>
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.code}</td>
            <td className="p-2">{item.supplier}</td>
            <td className="p-2">{item.quantity}</td>
            <td className="p-2">${item.unitPrice.toFixed(2)}</td>
            <td className="p-2">
              <Button label="Editar" onClick={() => handleEdit(item)} />
              <Button className='ml-4' label="Excluir" onClick={() => handleDelete(item.id)} />
            </td>
          </>
        )}
      />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}

      <Modal isOpen={isFormOpen} onClose={handleCloseModal}>
        <StockForm
          isOpen={isFormOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          initialData={selectedItem ? {
            name: selectedItem.name,
            code: selectedItem.code,
            supplier: selectedItem.supplier,
            quantity: selectedItem.quantity,
            unitPrice: selectedItem.unitPrice,
          } : null}
          mode={formMode}
        />
      </Modal>

      <Modal isOpen={reportVisible} onClose={() => setReportVisible(false)}>
        <div className="p-4">
          <header className="mb-4">
            <h1 className="text-xl font-semibold">Relatório de Estoque</h1>
            <p className="text-sm text-gray-600">Emitido em: {getCurrentDateTime()}</p>
            <p className="text-sm text-gray-600">Usuário: [Nome do Usuário]</p>
          </header>
          <div className="overflow-x-auto">
            <pre className="whitespace-pre-wrap">{reportContent}</pre>
          </div>
          <footer className="mt-6 text-sm text-gray-600">
            <p>Relatório gerado pelo sistema SIGEM</p>
            <p>Para mais informações, entre em contato com o suporte.</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleSaveAsPDF} className="bg-blue-500 text-white px-4 py-2 rounded">Salvar como PDF</button>
              <button onClick={() => setReportVisible(false)} className="bg-gray-300 px-4 py-2 rounded">Fechar</button>
            </div>
          </footer>
        </div>
      </Modal>
    </div>
  );
};

export default StockPage;
