import React, { useState, useEffect } from 'react';
import GwenChatWindow from './GwenChatWindow';
import GwenTypingText from './GwenTypingText';
import { useGwenChat } from '../../hooks/useGwenChat';
import gwenAvatar from '../../assets/gwen-avatar.svg';
import './gwen.css';

const HOOKS = [
  "Hey! Need help navigating? 👋",
  "Ask me about Shivam's research! 🧠",
  "Want to see his latest projects? 💻",
  "I'm Gwen, ask me anything! ✨",
  "Curious about TriviLabs? 🏢"
];

const GwenWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showHook, setShowHook] = useState(false);
  const [hookIndex, setHookIndex] = useState(0);
  const {
    messages,
    isLoading,
    error,
    send,
    clearChat,
    suggestions,
    suggestionsVisible,
    setSuggestionsVisible,
  } = useGwenChat();

  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (isOpen) {
      setShowHook(false);
      return;
    }

    // Initial delay before showing the first hook
    const initialDelay = setTimeout(() => {
      setShowHook(true);
    }, 8000);

    // Rotate hooks every 6 seconds
    const interval = setInterval(() => {
      setHookIndex((prev) => (prev + 1) % HOOKS.length);
    }, 6000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [isOpen]);

  return (
    <div className="gwen-widget">
      {/* COSMIC ORBITS */}
      {!isOpen && (
        <svg
          className="gwen-orbits-svg"
          viewBox="0 0 100 100"
        >
          <g className="orbit3">
            <ellipse cx="50" cy="50" rx="46" ry="16" fill="none" stroke="var(--gw-accent)" strokeWidth="0.4" opacity="0.3" transform="rotate(-20,50,50)"/>
          </g>
          <g className="orbit2">
            <ellipse cx="50" cy="50" rx="38" ry="13" fill="none" stroke="var(--gw-accent)" strokeWidth="0.6" opacity="0.4" transform="rotate(35,50,50)"/>
          </g>
          <g className="orbit1">
            <ellipse cx="50" cy="50" rx="30" ry="11" fill="none" stroke="var(--gw-accent)" strokeWidth="0.8" opacity="0.5" transform="rotate(-15,50,50)"/>
          </g>

          {/* TWINKLING PARTICLES */}
          <g className="float-a">
            <polygon points="20,20 22,25 27,25 23,28 24,33 20,30 16,33 17,28 13,25 18,25" fill="var(--gw-accent)" opacity="0.4" className="tw1" />
          </g>
          <g className="float-b">
            <polygon points="80,15 82,20 87,20 83,23 84,28 80,25 76,28 77,23 73,20 78,20" fill="#8B5E3C" opacity="0.4" className="tw2" />
          </g>

          {/* SPARKS */}
          <g className="tw3">
            <line x1="15" y1="70" x2="15" y2="78" stroke="var(--gw-accent)" strokeWidth="1.5" opacity="0.5"/>
            <line x1="11" y1="74" x2="19" y2="74" stroke="var(--gw-accent)" strokeWidth="1.5" opacity="0.5"/>
          </g>
          <g className="tw4 float-a">
            <line x1="85" y1="75" x2="85" y2="82" stroke="#8B5E3C" strokeWidth="1.5" opacity="0.4"/>
            <line x1="81" y1="78" x2="89" y2="78" stroke="#8B5E3C" strokeWidth="1.5" opacity="0.4"/>
          </g>

          {/* DOTS */}
          <circle cx="25" cy="40" r="2" fill="var(--gw-accent)" opacity="0.4" className="tw5" />
          <circle cx="75" cy="55" r="1.5" fill="#8B5E3C" opacity="0.3" className="tw1" />
          <circle cx="50" cy="15" r="1.5" fill="var(--gw-accent)" opacity="0.5" className="tw2" />
        </svg>
      )}

      {/* FAB BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="gwen-fab-btn"
        style={{
          boxShadow: isHovered
            ? 'var(--gw-glass-shadow-lg), 0 0 28px rgba(193,125,74,0.35)'
            : 'var(--gw-glass-shadow-lg), var(--gw-accent-glow)',
          transform: isHovered ? (isOpen ? 'scale(1)' : 'scale(1.08)') : 'scale(1)',
        }}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gw-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <img src={gwenAvatar} alt="Gwen" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        )}

        {/* NOTIFICATION DOT */}
        {!isOpen && hasMessages && (
          <div
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#C17D4A',
              border: '2px solid white',
              animation: 'gwenPulse 2s infinite',
            }}
          />
        )}

        {/* TOOLTIP */}
        {!isOpen && isHovered && (
          <div
            style={{
              position: 'absolute',
              right: '72px',
              whiteSpace: 'nowrap',
              background: 'var(--gw-glass-bg-deep)',
              backdropFilter: 'var(--gw-backdrop)',
              border: '1px solid var(--gw-glass-border)',
              borderRadius: '10px',
              padding: '6px 12px',
              fontSize: '13px',
              color: 'var(--gw-text-primary)',
              boxShadow: 'var(--gw-glass-shadow)',
              pointerEvents: 'none',
              animation: 'msgIn 0.2s ease forwards',
            }}
          >
            Ask Gwen anything ✨
          </div>
        )}
      </button>

      {/* PROACTIVE HOOK BUBBLE */}
      {showHook && !isOpen && (
        <div
          className="gwen-hook-bubble"
          onClick={() => setIsOpen(true)}
        >
          <button
            className="gwen-hook-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowHook(false);
            }}
          >
            ✕
          </button>
          <div style={{ fontWeight: 600, fontSize: '11px', color: 'var(--gw-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Gwen says:
          </div>
          <GwenTypingText text={HOOKS[hookIndex]} />
        </div>
      )}

      {/* CHAT WINDOW */}
      <GwenChatWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        messages={messages}
        isLoading={isLoading}
        error={error}
        send={send}
        clearChat={clearChat}
        suggestions={suggestions}
        suggestionsVisible={suggestionsVisible}
        setSuggestionsVisible={setSuggestionsVisible}
      />
    </div>
  );
};

export default GwenWidget;
