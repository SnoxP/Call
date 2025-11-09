import React, { useState, useEffect, useRef } from 'react';
import { Message, User, Channel } from '../types';
import Icon from './Icon';

interface ChatPanelProps {
    user: User;
    channel: Channel;
}

const initialMessages: Message[] = [
    { id: 1, user: { name: 'AmigoBot', tag: '#0001' }, content: 'Bem-vindo à sala! Usem este canal para conversar.', timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
    { id: 2, user: { name: 'Ana', tag: '#1234' }, content: 'E aí, pessoal! Tudo bem?', timestamp: new Date(Date.now() - 60000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
];

const ChatPanel: React.FC<ChatPanelProps> = ({ user, channel }) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        setMessages(initialMessages);
    }, [channel]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const msg: Message = {
                id: Date.now(),
                user: user,
                content: newMessage.trim(),
                timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, msg]);
            setNewMessage('');

            // Simulate a reply
            setTimeout(() => {
                const reply: Message = {
                    id: Date.now() + 1,
                    user: { name: 'Carlos', tag: '#5678' },
                    content: 'Opa, legal!',
                    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, reply]);
            }, 1500);
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-700">
            <header className="h-12 px-4 shadow-lg flex items-center border-b-2 border-gray-900">
                <Icon icon="fa-hashtag" className="text-xl text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-white">{channel.name}</h2>
            </header>
            <main className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                         <div key={msg.id} className={`flex items-start ${index > 0 && messages[index-1].user.name === msg.user.name ? 'mt-1' : 'mt-4'}`}>
                            { index === 0 || messages[index-1].user.name !== msg.user.name ?
                                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold mr-4">{msg.user.name[0]}</div>
                                : <div className="w-10 mr-4"></div>
                            }
                            <div className="flex-1">
                                { index === 0 || messages[index-1].user.name !== msg.user.name ?
                                    <div className="flex items-baseline">
                                        <p className="font-semibold text-white mr-2">{msg.user.name}</p>
                                        <p className="text-xs text-gray-400">{msg.timestamp}</p>
                                    </div> : null
                                }
                                <p className="text-gray-200">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                 <div ref={messagesEndRef} />
            </main>
            <footer className="p-4">
                <form onSubmit={handleSendMessage} className="bg-gray-800 rounded-lg px-4 py-2 flex items-center">
                    <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={`Conversar em #${channel.name}`}
                        className="w-full bg-transparent focus:outline-none text-gray-200"
                    />
                    <button type="submit" className="text-gray-400 hover:text-cyan-400 transition">
                        <Icon icon="fa-paper-plane" />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default ChatPanel;
