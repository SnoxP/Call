import React from 'react';
import { Channel, User } from '../types';
import Icon from './Icon';
import VideoFeed from './VideoFeed';
import CallControls from './CallControls';
import { useMedia } from '../hooks/useMedia';

interface CallPanelProps {
  user: User;
  channel: Channel;
  onDisconnect: () => void;
}

const CallPanel: React.FC<CallPanelProps> = ({ user, channel, onDisconnect }) => {
    // FIX: Destructure startMedia, stopMedia, and stopScreenShare from the useMedia hook.
    const { 
        localStream, 
        screenStream,
        isMicOn, 
        isCameraOn, 
        isSharingScreen,
        toggleMic,
        toggleCamera,
        toggleScreenShare,
        startMedia,
        stopMedia,
        stopScreenShare
    } = useMedia();

    React.useEffect(() => {
        // Automatically start media when joining a voice channel
        if(localStream === null) {
            // A small delay to allow the component to mount before asking for permission
            setTimeout(() => (window as any).useMediaHook.startMedia(), 100);
        }
        return () => {
            if(isSharingScreen) (window as any).useMediaHook.stopScreenShare();
            (window as any).useMediaHook.stopMedia();
        }
    }, []);

    // Expose media controls globally for simplicity in this simulation
    // FIX: `startMedia`, `stopMedia` and `stopScreenShare` are now in scope.
    React.useEffect(() => {
        (window as any).useMediaHook = { startMedia, stopMedia, stopScreenShare };
    }, [isSharingScreen, startMedia, stopMedia, stopScreenShare]);

    const participants = [
        { name: user.name, stream: localStream, isMuted: !isMicOn },
        { name: 'Ana', stream: null },
        { name: 'Carlos', stream: null },
    ];
    if (screenStream) {
        participants.push({ name: user.name, stream: screenStream, isMuted: true });
    }

    const gridCols = participants.length === 1 ? 'grid-cols-1' : 'grid-cols-2';
    const gridRows = participants.length <= 2 ? 'grid-rows-1' : 'grid-rows-2';


    return (
        <div className="flex-1 flex flex-col bg-gray-900 relative">
             <header className="h-12 px-4 flex items-center border-b-2 border-gray-950 z-10">
                <Icon icon="fa-volume-up" className="text-xl text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-white">{channel.name}</h2>
                <span className="ml-auto text-sm text-green-400 flex items-center"><div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>Conectado</span>
            </header>
            <main className="flex-1 p-4 overflow-y-auto">
                 <div className={`grid ${gridCols} ${gridRows} gap-4 w-full h-full`}>
                    <VideoFeed name={user.name} stream={localStream} isMuted />
                    {screenStream && <VideoFeed name={user.name} stream={screenStream} isScreen/>}
                    <VideoFeed name="Ana" stream={null} />
                    <VideoFeed name="Carlos" stream={null} />
                </div>
            </main>
            <CallControls 
                isMicOn={isMicOn}
                isCameraOn={isCameraOn}
                isSharingScreen={isSharingScreen}
                onToggleMic={toggleMic}
                onToggleCamera={toggleCamera}
                onToggleScreenShare={toggleScreenShare}
                onDisconnect={onDisconnect}
            />
        </div>
    );
};

export default CallPanel;