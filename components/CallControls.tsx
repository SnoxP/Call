import React from 'react';
import Icon from './Icon';

interface CallControlsProps {
  isMicOn: boolean;
  isCameraOn: boolean;
  isSharingScreen: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare: () => void;
  onDisconnect: () => void;
}

const ControlButton: React.FC<{ onClick: () => void; isActive: boolean; activeIcon: string; inactiveIcon?: string; activeClass?: string; inactiveClass?: string; className?: string; ariaLabel: string }> = 
({ onClick, isActive, activeIcon, inactiveIcon, activeClass = 'bg-gray-600 hover:bg-gray-500', inactiveClass = 'bg-gray-600 hover:bg-gray-500', className, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${isActive ? activeClass : inactiveClass} ${className}`}
  >
    <Icon icon={isActive ? activeIcon : (inactiveIcon || activeIcon)} />
  </button>
);

const CallControls: React.FC<CallControlsProps> = ({ isMicOn, isCameraOn, isSharingScreen, onToggleMic, onToggleCamera, onToggleScreenShare, onDisconnect }) => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 z-50">
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-full p-2 flex justify-center items-center space-x-3 shadow-lg">
        <ControlButton
          onClick={onToggleMic}
          isActive={isMicOn}
          activeIcon="fa-microphone"
          inactiveIcon="fa-microphone-slash"
          inactiveClass="bg-red-600 hover:bg-red-500"
          ariaLabel={isMicOn ? "Desativar microfone" : "Ativar microfone"}
        />
        <ControlButton
          onClick={onToggleCamera}
          isActive={isCameraOn}
          activeIcon="fa-video"
          inactiveIcon="fa-video-slash"
          inactiveClass="bg-red-600 hover:bg-red-500"
          ariaLabel={isCameraOn ? "Desativar câmera" : "Ativar câmera"}
        />
        <ControlButton
          onClick={onToggleScreenShare}
          isActive={isSharingScreen}
          activeIcon="fa-display"
          activeClass="bg-green-600 hover:bg-green-500"
          ariaLabel={isSharingScreen ? "Parar compartilhamento" : "Compartilhar tela"}
        />
        <button
          onClick={onDisconnect}
          aria-label="Desconectar da chamada"
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <Icon icon="fa-phone-slash" />
        </button>
      </div>
    </div>
  );
};

export default CallControls;
