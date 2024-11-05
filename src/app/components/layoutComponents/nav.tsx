'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaCogs, FaTools, FaBoxes, FaAddressBook, FaChartLine, FaUser, FaBars, FaTachometerAlt, FaUsers, FaPeopleCarry, FaBriefcase, FaInfoCircle } from 'react-icons/fa';

const Nav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSubmenu = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <nav className={`bg-gray-800 text-white ${isExpanded ? 'w-59' : 'w-15'} p-3 transition-all duration-300 flex flex-col`}>
      <button 
        className="text-white mb-4 ml-2" 
        onClick={toggleNav}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <FaBars size={28} />
      </button>
      <ul className="flex flex-col space-y-2 overflow-hidden text-sm">
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/maintenance" className="flex items-center">
            <FaTools size={24} />
            {isExpanded && <span className="ml-3">Manutenções</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/machines" className="flex items-center">
            <FaCogs size={24} />
            {isExpanded && <span className="ml-3">Máquinas</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/stock" className="flex items-center">
            <FaBoxes size={24} />
            {isExpanded && <span className="ml-3">Estoque</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/services" className="flex items-center"> 
            <FaBriefcase size={24} />
            {isExpanded && <span className="ml-3">Serviços</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/collaborator" className="flex items-center">
            <FaAddressBook size={24} />
            {isExpanded && <span className="ml-3">Colaboradores</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/teams" className="flex items-center">
            <FaUsers size={24} />
            {isExpanded && <span className="ml-3">Equipes</span>}
          </Link>
        </li>   
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/suppliers" className="flex items-center">
            <FaPeopleCarry size={24} />
            {isExpanded && <span className="ml-3">Fornecedores</span>}
          </Link>
        </li>   
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/dashboard" className="flex items-center">
            <FaTachometerAlt size={24} />
            {isExpanded && <span className="ml-3">Dashboard</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/profile" className="flex items-center">
            <FaUser size={24} />
            {isExpanded && <span className="ml-3">Perfil</span>}
          </Link>
        </li>
        <li className="flex flex-col">
          <button 
            onClick={toggleSubmenu} 
            className="flex items-center hover:bg-gray-700 p-2 rounded focus:outline-none"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <FaInfoCircle size={24} />
            {isExpanded && <span className="ml-3">Informações</span>}
          </button>
          {isExpanded && isSubmenuOpen && (
            <ul className="ml-8 flex flex-col space-y-2 mt-2 text-xs">
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link href="/about" className="hover:text-gray-400">
                  Sobre
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link href="/contact" className="hover:text-gray-400">
                  Help Desk
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link href="/privacy" className="hover:text-gray-400">
                  Política de Privacidade
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link href="/terms" className="hover:text-gray-400">
                  Termos de Serviço
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
