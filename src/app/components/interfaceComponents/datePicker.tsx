// DatePicker.tsx
import React from 'react';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  width?: string; // Adicionar largura ajustável
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, className = '', width }) => {
  return (
    <div className={`mb-4 ${className}`} style={{ width }}>
      <label className="block text-gray-700">{label}</label>
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default DatePicker;
