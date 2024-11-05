// Form.tsx
import React from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, children, className = '', width, height }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-4 ${className}`}
      style={{ width, height }} 
    >
      {children}
    </form>
  );
};

export default Form;
