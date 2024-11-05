import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit, placeholder = '', className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-blue-950 text-white rounded-r-md hover:bg-blue-600"
      >
        Procurar
      </button>
    </div>
  );
};

export default SearchBar;
