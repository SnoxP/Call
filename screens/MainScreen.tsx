import React, { useState, useMemo } from 'react';
import { User, Channel } from '../types';
import ServerSidebar from '../components/ServerSidebar';
import ChannelPanel from '../components/ChannelPanel';
import ChatPanel from '../components/ChatPanel';
import CallPanel from '../components/CallPanel';

interface MainScreenProps {
  user: User;
  onLeaveRoom: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ user, onLeaveRoom }) => {
  const channels: Channel[] = useMemo(() => [
    { id: 'general', name: 'geral', type: 'text' },
    { id: 'random', name: 'aleatório', type: 'text' },
    { id: 'voice-chat', name: 'Bate-papo', type: 'voice' },
  ], []);

  const [activeChannel, setActiveChannel] = useState<Channel>(channels[0]);

  const handleSelectChannel = (channel: Channel) => {
    setActiveChannel(channel);
  };

  const renderMainPanel = () => {
    if (activeChannel.type === 'text') {
      return <ChatPanel user={user} channel={activeChannel} />;
    }
    if (activeChannel.type === 'voice') {
      return <CallPanel user={user} channel={activeChannel} onDisconnect={() => setActiveChannel(channels[0])} />;
    }
    return null;
  };

  return (
    <div className="flex h-screen">
      <ServerSidebar />
      <ChannelPanel 
        channels={channels}
        activeChannel={activeChannel}
        onSelectChannel={handleSelectChannel}
        user={user}
        onLeaveRoom={onLeaveRoom}
      />
      {renderMainPanel()}
    </div>
  );
};

export default MainScreen;
