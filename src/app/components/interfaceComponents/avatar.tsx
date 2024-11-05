// components/Avatar.tsx
import React, { useState } from 'react';
import Modal from '../interfaceComponents/modal'; 
import FileUpload from '../interfaceComponents/fileUpload'; 
interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 56 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (file: File | null) => {
    setImage(file);
  };

  const handleSave = () => {
    // Aqui você pode adicionar lógica para salvar a nova imagem
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #fff',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={image ? URL.createObjectURL(image) : src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="500px" height="250px">
          <div className="flex flex-col h-full p-4">
            <h2 className="text-xl font-bold mb-4">Atualizar Foto</h2>
            <FileUpload label="Selecione uma nova foto" onChange={(e) => handleImageUpload(e.target.files ? e.target.files[0] : null)} width="100%" />
            <div className="flex justify-end mt-4">
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Salvar</button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancelar</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Avatar;
