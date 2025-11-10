import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Previne que o mini-infobar apareça no Chrome
      e.preventDefault();
      // Guarda o evento para que possa ser disparado depois
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      // Mostra o prompt de instalação
      installPromptEvent.prompt();
      // Espera o usuário responder ao prompt
      installPromptEvent.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        // O prompt só pode ser usado uma vez.
        setInstallPromptEvent(null);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-center p-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
        <i className="fa-solid fa-rocket text-6xl text-cyan-400 mb-6"></i>
        <h1 className="text-4xl font-bold text-white mb-3">Meu Novo App PWA</h1>
        <p className="text-gray-300 mb-8">
          Esta é uma aplicação novinha em folha, pronta para ser instalada no seu dispositivo.
        </p>
        
        {installPromptEvent ? (
          <button
            onClick={handleInstallClick}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg shadow-lg transform hover:scale-105"
          >
            <i className="fa-solid fa-download mr-2"></i>
            Instalar App
          </button>
        ) : (
          <p className="text-green-400">O app já está instalado ou não pode ser instalado neste navegador.</p>
        )}
      </div>
       <footer className="absolute bottom-4 text-gray-500 text-sm">
        Criado do zero para você!
      </footer>
    </div>
  );
};

export default App;
