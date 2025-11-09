import React, { useState } from 'react';
import Icon from '../components/Icon';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800">
        <div className="w-full max-w-sm p-8 bg-gray-700 rounded-lg shadow-xl">
            <div className="text-center mb-8">
                <Icon icon="fa-users" className="text-5xl text-cyan-400 mb-4" />
                <h1 className="text-3xl font-bold text-white">Bem-vindo ao AmigoCord</h1>
                <p className="text-gray-400">Seu espaço para conversar.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wider">
                        Nome de usuário
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 text-white bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Como seus amigos te chamam?"
                        required
                        autoFocus
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
                    disabled={!username.trim()}
                >
                    Entrar
                </button>
            </form>
        </div>
    </div>
  );
};

export default LoginScreen;
