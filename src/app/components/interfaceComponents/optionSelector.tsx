import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface OptionSelectorProps {
  options: Option[];
  onChange: (selectedValue: string) => void;
  defaultSelected?: string; // Valor padrão selecionado, se houver
  className?: string; // Classe opcional para customização
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  onChange,
  defaultSelected = '',
  className = '',
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultSelected);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleOptionClick(option.value)}
          className={`px-4 py-2 rounded-md border-2 transition-colors duration-200 ${
            selectedValue === option.value
              ? 'bg-blue-950 text-white border-blue-950'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default OptionSelector;
