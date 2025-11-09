
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
    const storedUser = localStorage.getItem('amigoCordUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setAppState(AppState.LOBBY);
    }
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleLogin = (username: string) => {
    const newUser: User = {
      name: username,
      tag: `#${Math.floor(1000 + Math.random() * 9000)}`,
    };
    localStorage.setItem('amigoCordUser', JSON.stringify(newUser));
    setUser(newUser);
    setAppState(AppState.LOBBY);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('amigoCordUser');
    setUser(null);
    setAppState(AppState.LOGIN);
  };

  const handleEnterRoom = () => {
    setAppState(AppState.IN_APP);
  };
  
  const handleLeaveRoom = () => {
    setAppState(AppState.LOBBY);
  }

  const handleInstall = () => {
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

  const renderContent = () => {
    switch (appState) {
      case AppState.LOGIN:
        return <LoginScreen onLogin={handleLogin} />;
      case AppState.LOBBY:
        return user && <LobbyScreen user={user} onEnterRoom={handleEnterRoom} onLogout={handleLogout} onInstall={handleInstall} installPromptEvent={installPromptEvent}/>;
      case AppState.IN_APP:
        return user && <MainScreen user={user} onLeaveRoom={handleLeaveRoom} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return <div className="h-screen bg-gray-700 text-gray-200 font-sans">{renderContent()}</div>;
};

export default App;
