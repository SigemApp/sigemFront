'use client';

import React from 'react';
import Image from 'next/image';
import Avatar from '../interfaceComponents/avatar';
import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';

const Header: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const user = {
    name: 'João da Silva',
    position: 'Analista de Sistemas',
    avatarUrl: 'https://i.pinimg.com/474x/2e/4f/d3/2e4fd3fd8f2aff9c26b15c1f1c23b11e.jpg',
  };

  return (
    <header
      className="text-white p-4 flex justify-between items-center shadow-md"
      style={{
        maxHeight: '65px',
        background: 'linear-gradient(135deg, #031821, #092c45)',
      }}
    >
      <div className="flex items-center space-x-4">
        {/* Ícone da empresa */}
        <div>
          <Image src="/sigem.svg" alt="Logo" width={120} height={120} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Botão para voltar para a página inicial */}
        <button
          onClick={handleGoHome}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <HomeIcon className="w-6 h-6 text-gray-400 hover:text-white" />
        </button>

        {/* Foto do usuário e card de informações */}
        <div className="flex items-center space-x-3">
          <Avatar src={user.avatarUrl} alt={user.name} size={40} className="border-2 border-white" />
          <div className="flex flex-col text-sm">
            <span className="font-bold">{user.name}</span>
            <span className="text-xs text-gray-300">{user.position}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
