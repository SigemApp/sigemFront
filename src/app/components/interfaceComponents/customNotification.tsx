import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  className?: string;
}

const CustomNotification: React.FC<NotificationProps> = ({ message, type, onClose, className }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`p-4 text-white ${getBackgroundColor()} ${className}`}>
      <p>{message}</p>
      <button onClick={onClose} className="mt-2 text-gray-200 underline">Close</button>
    </div>
  );
};

export default CustomNotification;
