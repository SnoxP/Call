import React from 'react';
import { Channel } from '../types';
import Icon from './Icon';
import UserPanel from './UserPanel';
import { User } from '../types';

interface ChannelPanelProps {
  channels: Channel[];
  activeChannel: Channel | null;
  onSelectChannel: (channel: Channel) => void;
  user: User;
  onLeaveRoom: () => void;
}

const ChannelPanel: React.FC<ChannelPanelProps> = ({ channels, activeChannel, onSelectChannel, user, onLeaveRoom }) => {
  return (
    <div className="w-64 bg-gray-800 flex flex-col">
        <header className="h-12 px-4 shadow-lg flex items-center">
            <h1 className="text-lg font-bold text-white">Sala dos Amigos</h1>
        </header>
        <div className="flex-grow p-2 overflow-y-auto">
            <div className="mb-4">
                <h2 className="text-xs font-bold uppercase text-gray-400 px-2 mb-1">Canais de Texto</h2>
                {channels.filter(c => c.type === 'text').map(channel => (
                    <button 
                        key={channel.id} 
                        onClick={() => onSelectChannel(channel)}
                        className={`w-full text-left flex items-center px-2 py-1 rounded-md transition ${activeChannel?.id === channel.id ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'}`}
                    >
                        <Icon icon="fa-hashtag" className="w-5 mr-2" />
                        <span>{channel.name}</span>
                    </button>
                ))}
            </div>
             <div>
                <h2 className="text-xs font-bold uppercase text-gray-400 px-2 mb-1">Canais de Voz</h2>
                {channels.filter(c => c.type === 'voice').map(channel => (
                    <button 
                        key={channel.id} 
                        onClick={() => onSelectChannel(channel)}
                        className={`w-full text-left flex items-center px-2 py-1 rounded-md transition ${activeChannel?.id === channel.id ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'}`}
                    >
                        <Icon icon="fa-volume-up" className="w-5 mr-2" />
                        <span>{channel.name}</span>
                    </button>
                ))}
            </div>
        </div>
        <button onClick={onLeaveRoom} className='text-sm text-red-400 hover:bg-red-900/50 py-2 transition-colors'>
            <Icon icon="fa-arrow-right-from-bracket" className='mr-2' /> Sair da Sala
        </button>
        <UserPanel user={user} />
    </div>
  );
};

export default ChannelPanel;
