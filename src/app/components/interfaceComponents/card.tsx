import React from 'react';

interface CardProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
  className?: string;
  children?: React.ReactNode; 
}

const Card: React.FC<CardProps> = ({ title, description, link, linkText, className = '', children }) => {
  return (
    <div className={`p-4 bg-white rounded-md shadow-md ${className}`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-2">{description}</p>
      {link && linkText ? (
        <a href={link} className="text-blue-600 hover:underline">
          {linkText}
        </a>
      ) : null}
      {children} 
    </div>
  );
};

export default Card;
