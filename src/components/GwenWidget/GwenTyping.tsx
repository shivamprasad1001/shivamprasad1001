import React from 'react';
import gwenAvatar from '../../assets/gwen-avatar.svg';

const GwenTyping: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        animation: 'msgIn 0.25s ease forwards',
      }}
    >
      <img
        src={gwenAvatar}
        alt="Gwen"
        width="24"
        height="24"
        style={{ borderRadius: '50%', flexShrink: 0, marginTop: '2px' }}
      />
      <div
        className="gwen-bubble-bot"
        style={{
          background: 'var(--gw-bot-bubble)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--gw-glass-border)',
          borderRadius: '4px 16px 16px 16px',
          padding: '12px 14px',
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--gw-accent)',
            animation: 'gwenBounce 1.2s infinite',
          }}
        />
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--gw-accent)',
            animation: 'gwenBounce 1.2s infinite',
            animationDelay: '0.15s',
          }}
        />
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--gw-accent)',
            animation: 'gwenBounce 1.2s infinite',
            animationDelay: '0.30s',
          }}
        />
      </div>
    </div>
  );
};

export default GwenTyping;
