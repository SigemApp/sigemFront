import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded ${disabled ? 'bg-gray-400' : 'bg-blue-950 hover:bg-blue-600'} text-white ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
