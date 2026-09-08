import React, { useEffect, useRef } from 'react';
import GwenMessage from './GwenMessage';
import GwenTyping from './GwenTyping';
import GwenWelcome from './GwenWelcome';
import GwenSuggestions from './GwenSuggestions';
import GwenInput from './GwenInput';
import gwenAvatar from '../../assets/gwen-avatar.svg';

interface GwenChatWindowProps { isOpen: boolean; setIsOpen: (open: boolean) => void; messages: any[]; isLoading: boolean; error: string | null; send: (text: string) => void; clearChat: () => void; suggestions: string[]; suggestionsVisible: boolean; setSuggestionsVisible: (visible: boolean) => void; appId: 'portfolio' | 'gwen-site'; setAppId: (appId: 'portfolio' | 'gwen-site') => void; }

const GwenChatWindow: React.FC<GwenChatWindowProps> = ({ isOpen, setIsOpen, messages, isLoading, error, send, clearChat, suggestions, suggestionsVisible, setSuggestionsVisible, appId, setAppId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading, suggestionsVisible]);
  return <section className={`gwen-window-container ${isOpen ? 'gwen-open' : 'gwen-closed'}`} aria-label="Gwen portfolio assistant">
    <header className="gwen-header"><img src={gwenAvatar} alt="Gwen" className="gwen-header-avatar" /><div><strong>Gwen</strong><span><i /> Shivam’s AI assistant</span></div><div className="gwen-header-actions"><button onClick={clearChat} title="Start a new chat" aria-label="Start a new chat">↻</button><button onClick={() => setIsOpen(false)} title="Close chat" aria-label="Close chat">×</button></div></header>
    <div className="gwen-mode"><span>Conversation</span><div><button onClick={() => setAppId('portfolio')} className={appId === 'portfolio' ? 'active' : ''}>Portfolio</button><button onClick={() => setAppId('gwen-site')} className={appId === 'gwen-site' ? 'active' : ''}>Research</button></div></div>
    <div className="gwen-message-area gwen-scrollbar">{messages.length === 0 ? <GwenWelcome onChipClick={send} /> : messages.map(msg => <GwenMessage key={msg.id} role={msg.role} content={msg.content} ts={msg.ts} />)}{isLoading && <GwenTyping />}{error && <p className="gwen-error">{error}</p>}<div ref={messagesEndRef} /></div>
    <GwenSuggestions suggestions={suggestions} visible={suggestionsVisible} onSelect={(text) => { setSuggestionsVisible(false); send(text); }} /><GwenInput onSend={send} isLoading={isLoading} onType={() => setSuggestionsVisible(false)} />
  </section>;
};
export default GwenChatWindow;
