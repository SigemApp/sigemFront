import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = '', width, height }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-lg shadow-lg ${className} p-4 max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl h-auto ${width ? `w-[${width}]` : 'w-full'} ${height ? `h-[${height}]` : 'h-auto'}`}
        style={{ width, height }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
