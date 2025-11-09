import React from 'react';
import { User } from '../types';
import Icon from './Icon';

interface UserPanelProps {
  user: User;
}

const UserPanel: React.FC<UserPanelProps> = ({ user }) => {
  return (
    <div className="h-14 bg-gray-800 px-2 flex items-center justify-between">
      <div className="flex items-center">
        <div className="relative">
            <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">{user.name[0].toUpperCase()}</div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center">
                 <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
        </div>
        <div className="ml-2">
          <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
          <p className="text-xs text-gray-400 leading-tight">{user.tag}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-gray-400">
        <button className="hover:bg-gray-700 w-8 h-8 rounded-md flex items-center justify-center transition"><Icon icon="fa-microphone" /></button>
        <button className="hover:bg-gray-700 w-8 h-8 rounded-md flex items-center justify-center transition"><Icon icon="fa-headphones" /></button>
        <button className="hover:bg-gray-700 w-8 h-8 rounded-md flex items-center justify-center transition"><Icon icon="fa-cog" /></button>
      </div>
    </div>
  );
};

export default UserPanel;
