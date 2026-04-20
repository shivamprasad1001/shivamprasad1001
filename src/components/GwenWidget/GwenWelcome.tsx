import React from 'react';
import gwenAvatar from '../../assets/gwen-avatar.svg';

interface GwenWelcomeProps {
  onChipClick: (text: string) => void;
}

const GwenWelcome: React.FC<GwenWelcomeProps> = ({ onChipClick }) => {
  const starters = [
    "Who is Shivam? 👤",
    "What is TriviLabs? 🏢",
    "His research 🧠",
    "Projects 💻",
    "PhD goals 🎯"
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        flex: 1,
      }}
    >
      <img
        src={gwenAvatar}
        alt="Gwen"
        width="52"
        height="52"
        style={{
          borderRadius: '50%',
          border: '1.5px solid rgba(193,125,74,0.3)',
          marginBottom: '12px',
        }}
      />
      <h3
        style={{
          fontSize: '17px',
          fontWeight: 600,
          color: 'var(--gw-text-primary)',
          textAlign: 'center',
          margin: 0,
        }}
      >
        Hey, I'm Gwen 👋
      </h3>
      <p
        style={{
          fontSize: '13px',
          color: 'var(--gw-text-secondary)',
          textAlign: 'center',
          lineHeight: 1.6,
          margin: '6px 0 16px',
        }}
      >
        Ask me anything about Shivam — his projects, research, TriviLabs, or his journey into AI.
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          justifyContent: 'center',
        }}
      >
        {starters.map((text) => (
          <button
            key={text}
            onClick={() => onChipClick(text)}
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(193,125,74,0.25)',
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
              fontSize: '12px',
              color: 'var(--gw-text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(193,125,74,0.1)';
              e.currentTarget.style.borderColor = 'rgba(193,125,74,0.5)';
              e.currentTarget.style.color = 'var(--gw-accent)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
              e.currentTarget.style.borderColor = 'rgba(193,125,74,0.25)';
              e.currentTarget.style.color = 'var(--gw-text-secondary)';
            }}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GwenWelcome;
