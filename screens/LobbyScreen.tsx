
import React, { useState } from 'react';
import { User } from '../types';
import Icon from '../components/Icon';

interface LobbyScreenProps {
  user: User;
  onEnterRoom: () => void;
  onLogout: () => void;
  onInstall: () => void;
  installPromptEvent: any;
}

const LobbyScreen: React.FC<LobbyScreenProps> = ({ user, onEnterRoom, onLogout, onInstall, installPromptEvent }) => {
  const [roomCode, setRoomCode] = useState('');
  const [showCreatedCode, setShowCreatedCode] = useState(false);
  const generatedCode = React.useMemo(() => Math.random().toString(36).substring(2, 8).toUpperCase(), []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 p-4 relative">
       <div className="absolute top-4 left-4">
        {installPromptEvent && (
            <button onClick={onInstall} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                <Icon icon="fa-download" className="mr-2" />
                Instalar App
            </button>
        )}
      </div>
       <div className="absolute top-4 right-4">
        <button onClick={onLogout} className="text-gray-400 hover:text-white transition">
            <Icon icon="fa-right-from-bracket" className="mr-2" />
            Sair
        </button>
      </div>
      <div className="w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-2">Olá, {user.name}<span className="text-gray-400">{user.tag}</span>!</h1>
        <p className="text-gray-300 mb-10">Crie uma sala para seus amigos ou entre em uma existente.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Room */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Criar uma Sala</h2>
            <div className="flex-grow flex flex-col justify-center">
                {showCreatedCode ? (
                    <div className="text-center">
                        <p className="text-gray-400 mb-2">Compartilhe este código:</p>
                        <div className="bg-gray-900 p-3 rounded-md text-2xl font-mono tracking-widest my-4">{generatedCode}</div>
                        <button onClick={onEnterRoom} className="w-full bg-green-600 hover:bg-green-500 font-bold py-2 px-4 rounded-md transition">
                            Entrar na Sala
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setShowCreatedCode(true)} className="w-full bg-cyan-600 hover:bg-cyan-500 font-bold py-2 px-4 rounded-md transition">
                        <Icon icon="fa-plus" className="mr-2" />
                        Gerar Codigo
                    </button>
                )}
            </div>
          </div>

          {/* Join Room */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col">
             <h2 className="text-2xl font-semibold mb-4">Entrar em uma Sala</h2>
             <form onSubmit={(e) => { e.preventDefault(); onEnterRoom(); }} className="flex-grow flex flex-col justify-center">
                <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 text-center text-white bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono tracking-widest"
                    placeholder="INSIRA O CÓDIGO"
                    required
                />
                <button type="submit" disabled={!roomCode} className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 font-bold py-2 px-4 rounded-md transition disabled:bg-gray-600 disabled:cursor-not-allowed">
                    <Icon icon="fa-arrow-right-to-bracket" className="mr-2" />
                    Entrar
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
