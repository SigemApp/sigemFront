'use client';

import React from 'react';
import Card from '../../src/app/components/interfaceComponents/card'; // Ajuste o caminho conforme necessário

export default function HomePage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Bem-vindo ao SIGeM!</h2>
      <p className="text-lg mb-6">
        Este é o sistema de gerenciamento de manutenção da empresa. Utilize o menu de navegação para acessar as diferentes funcionalidades.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card
          title="Registrar Manutenção"
          description="Adicione novas solicitações de manutenção e acompanhe o progresso."
          link="/pages/maintenance"
          linkText="Acessar"
          className="bg-blue-100"
        />
        <Card
          title="Visualizar Relatórios"
          description="Confira relatórios detalhados sobre o estado e histórico das manutenções."
          link="/reports"
          linkText="Acessar"
          className="bg-blue-100"
        />
        <Card
          title="Gerenciar Equipamentos"
          description="Visualize e gerencie o estoque de equipamentos e suas condições."
          link="/pages/stock"
          linkText="Acessar"
          className="bg-blue-100"
        />
      </div>
      
      <Card
        title="Atualizações Recentes"
        description="Aqui você encontrará as últimas atualizações sobre o sistema e novos recursos."
        link="#"
        linkText=""
        className="bg-gray-300"
      >
        <ul className="list-disc list-inside ml-4">
          <li>Nova funcionalidade de relatórios avançados.</li>
          <li>Correção de bugs e melhorias de desempenho.</li>
        </ul>
      </Card>
    </div>
  );
}
