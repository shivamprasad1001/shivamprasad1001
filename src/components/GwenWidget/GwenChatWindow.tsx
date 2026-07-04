import React, { useRef, useEffect } from 'react';
import GwenMessage from './GwenMessage';
import GwenTyping from './GwenTyping';
import GwenWelcome from './GwenWelcome';
import GwenSuggestions from './GwenSuggestions';
import GwenInput from './GwenInput';
import gwenAvatar from '../../assets/gwen-avatar.svg';

interface GwenChatWindowProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: any[];
  isLoading: boolean;
  error: string | null;
  send: (text: string) => void;
  clearChat: () => void;
  suggestions: string[];
  suggestionsVisible: boolean;
  setSuggestionsVisible: (visible: boolean) => void;
  appId: 'portfolio' | 'gwen-site';
  setAppId: (appId: 'portfolio' | 'gwen-site') => void;
}

const GwenChatWindow: React.FC<GwenChatWindowProps> = ({
  isOpen,
  setIsOpen,
  messages,
  isLoading,
  error,
  send,
  clearChat,
  suggestions,
  suggestionsVisible,
  setSuggestionsVisible,
  appId,
  setAppId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, suggestionsVisible]);

  return (
    <div
      className={`gwen-window-container ${isOpen ? 'gwen-open' : 'gwen-closed'}`}
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        pointerEvents: isOpen ? 'all' : 'none',
        animation: isOpen ? 'gwenSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none',
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid rgba(255,255,255,0.5)',
          background: 'rgba(255,255,255,0.3)',
          flexShrink: 0,
        }}
      >
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden' }}>
          <img src={gwenAvatar} alt="Gwen" width="32" height="32" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--gw-text-primary)' }}>Gwen</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '11px', color: 'var(--gw-text-secondary)' }}>Shivam's AI · online</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button
            onClick={clearChat}
            title="Clear Chat"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--gw-text-muted)',
              padding: '4px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--gw-accent)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--gw-text-muted)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            title="Close"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--gw-text-muted)',
              padding: '4px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--gw-accent)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--gw-text-muted)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* PERSONA MODE TOGGLE */}
      <div
        style={{
          display: 'flex',
          padding: '6px 12px',
          background: 'rgba(255,255,255,0.2)',
          borderBottom: '1px solid rgba(255,255,255,0.3)',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--gw-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Mode:</span>
        <div
          style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.05)',
            padding: '2px',
            borderRadius: '999px',
          }}
        >
          <button
            onClick={() => setAppId('portfolio')}
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              border: 'none',
              fontSize: '11px',
              fontWeight: appId === 'portfolio' ? 600 : 500,
              cursor: 'pointer',
              background: appId === 'portfolio' ? 'var(--gw-accent)' : 'transparent',
              color: appId === 'portfolio' ? 'white' : 'var(--gw-text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            💼 Pro Mode
          </button>
          <button
            onClick={() => setAppId('gwen-site')}
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              border: 'none',
              fontSize: '11px',
              fontWeight: appId === 'gwen-site' ? 600 : 500,
              cursor: 'pointer',
              background: appId === 'gwen-site' ? 'var(--gw-accent)' : 'transparent',
              color: appId === 'gwen-site' ? 'white' : 'var(--gw-text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            🧠 Research Mode
          </button>
        </div>
      </div>

      {/* MESSAGE AREA */}
      <div
        className="gwen-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          scrollBehavior: 'smooth',
        }}
      >
        {messages.length === 0 ? (
          <GwenWelcome onChipClick={send} />
        ) : (
          messages.map((msg) => (
            <GwenMessage key={msg.id} role={msg.role} content={msg.content} ts={msg.ts} />
          ))
        )}
        {isLoading && <GwenTyping />}
        {error && (
          <div
            style={{
              alignSelf: 'center',
              padding: '8px 12px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              fontSize: '12px',
              textAlign: 'center',
              margin: '8px 0',
            }}
          >
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* SUGGESTIONS AREA */}
      <GwenSuggestions
        suggestions={suggestions}
        visible={suggestionsVisible}
        onSelect={(text) => {
          setSuggestionsVisible(false);
          send(text);
        }}
      />

      {/* INPUT AREA */}
      <GwenInput onSend={send} isLoading={isLoading} onType={() => setSuggestionsVisible(false)} />
    </div>
  );
};

export default GwenChatWindow;
