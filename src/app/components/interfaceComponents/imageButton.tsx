import React from 'react';

interface ImageButtonProps {
  svg: React.ReactNode; // Alterado para receber SVG como JSX
  onClick: () => void;
  width?: number;
  height?: number;
  color?: string; // Adiciona a propriedade de cor
  marginLeft?: number; // Adiciona a propriedade de margin-left
}

const ImageButton: React.FC<ImageButtonProps> = ({ svg, onClick, width = 50, height = 50, color, marginLeft }) => {
  return (
    <button 
      onClick={onClick} 
      style={{ 
        background: 'none', 
        border: 'none', 
        padding: 0, 
        cursor: 'pointer',
        outline: 'none'
      }}
      className="image-button"
    >
      <div
        style={{
          width: width,
          height: height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: marginLeft // Aplica o marginLeft aqui
        }}
      >
        {React.cloneElement(svg as React.ReactElement, {
          width,
          height,
          style: { color }
        })}
      </div>
    </button>
  );
};

export default ImageButton;
