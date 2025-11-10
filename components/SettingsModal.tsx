import React, { useState } from 'react';
import Icon from './Icon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  if (!isOpen) return null;

  const SettingRow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="py-4 border-b border-gray-700">
      <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">{title}</h3>
      {children}
    </div>
  );

  const Toggle: React.FC<{ label: string; enabled: boolean; onToggle: () => void; }> = ({ label, enabled, onToggle }) => (
    <div className="flex items-center justify-between">
      <span className="text-gray-200">{label}</span>
      <button onClick={onToggle} className={`w-12 h-6 rounded-full flex items-center transition-colors ${enabled ? 'bg-green-500' : 'bg-gray-600'}`}>
        <span className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}></span>
      </button>
    </div>
  );

  const Select: React.FC<{ label: string; options: string[] }> = ({ label, options }) => (
     <div>
      <label className="block text-gray-300 text-sm mb-1">{label}</label>
      <select className="w-full p-2 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="p-4 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-xl font-bold">Configurações</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center">
            <Icon icon="fa-times" />
          </button>
        </header>
        <main className="p-6 overflow-y-auto max-h-[70vh]">
            <SettingRow title="Aparência">
                <Toggle label="Modo Escuro" enabled={isDarkMode} onToggle={() => setIsDarkMode(p => !p)} />
            </SettingRow>

            <SettingRow title="Notificações">
                <Toggle label="Notificações de Desktop" enabled={notifications} onToggle={() => setNotifications(p => !p)} />
            </SettingRow>

             <SettingRow title="Voz & Vídeo">
                <div className="space-y-4">
                    <Select label="Dispositivo de Entrada (Microfone)" options={['Padrão - Microfone (Realtek)', 'Microfone (NVIDIA Broadcast)']}/>
                    <Select label="Dispositivo de Saída (Alto-falante)" options={['Padrão - Alto-falantes (Realtek)', 'Headset (Logitech G432)']}/>
                    <Select label="Câmera" options={['Câmera Integrada', 'Logitech C920']}/>
                </div>
            </SettingRow>

        </main>
        <footer className="p-4 bg-gray-900 rounded-b-lg text-right">
             <button onClick={onClose} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                Feito
            </button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;
