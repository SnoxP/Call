import React, { useState, useEffect } from 'react';
import { AppState, User } from './types';
import LoginScreen from './screens/LoginScreen';
import LobbyScreen from './screens/LobbyScreen';
import MainScreen from './screens/MainScreen';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  
  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setInstallPromptEvent(null);
      });
    }
  };

  const handleLogin = (username: string) => {
    const newUser: User = {
        name: username,
        tag: `#${Math.floor(1000 + Math.random() * 9000)}`
    };
    setUser(newUser);
    setAppState(AppState.LOBBY);
  };
  
  const handleLogout = () => {
      setUser(null);
      setAppState(AppState.LOGIN);
  }

  const handleEnterRoom = () => {
      setAppState(AppState.IN_APP);
  }

  const handleLeaveRoom = () => {
      setAppState(AppState.LOBBY);
  }

  const renderContent = () => {
    switch (appState) {
      case AppState.LOGIN:
        return <LoginScreen onLogin={handleLogin} />;
      case AppState.LOBBY:
        // This should not happen if logic is correct, but as a fallback
        if (!user) return <LoginScreen onLogin={handleLogin} />; 
        return <LobbyScreen user={user} onEnterRoom={handleEnterRoom} onLogout={handleLogout} />;
      case AppState.IN_APP:
         // This should not happen if logic is correct, but as a fallback
        if (!user) return <LoginScreen onLogin={handleLogin} />;
        return <MainScreen user={user} onLeaveRoom={handleLeaveRoom} onInstall={handleInstallClick} installPromptEvent={installPromptEvent} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return <div className="h-screen w-screen bg-gray-800 text-white overflow-hidden">{renderContent()}</div>;
};

export default App;