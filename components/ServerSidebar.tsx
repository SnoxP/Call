import React from 'react';
import Icon from './Icon';

const ServerSidebar: React.FC = () => {
  return (
    <div className="w-16 bg-gray-900 p-2 flex flex-col items-center space-y-4">
      <button className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-2xl text-white focus:outline-none transition-all duration-300 hover:rounded-xl">
        <Icon icon="fa-user-friends" />
      </button>
       <div className="w-8 h-1 bg-gray-700 rounded-full"></div>
    </div>
  );
};

export default ServerSidebar;
