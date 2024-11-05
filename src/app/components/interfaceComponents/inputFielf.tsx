import React from 'react';

interface InputFieldProps {
  label: string;
  type: 'text' | 'number' | 'email' | 'password';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, placeholder = '', className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default InputField;
