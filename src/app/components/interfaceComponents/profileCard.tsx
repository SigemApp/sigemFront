import React from 'react';

interface ProfileCardProps {
  name: string;
  email: string;
  avatarUrl: string;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, avatarUrl, className = '' }) => {
  return (
    <div className={`flex items-center p-4 bg-white border rounded-md shadow-md ${className}`}>
      <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
      <div className="ml-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
