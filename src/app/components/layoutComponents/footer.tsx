'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-md">
          <ul className="flex space-x-4 text-xs mb-2 md:mb-0">
            <li>
              <Link href="/about" className="hover:text-gray-400">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Fale Conosco
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-gray-400">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gray-400">
                Termos de Serviço
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
