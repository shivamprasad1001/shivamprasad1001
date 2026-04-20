import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import gwenAvatar from '../../assets/gwen-avatar.svg';

interface GwenMessageProps {
  role: 'user' | 'assistant';
  content: string;
  ts: number;
}

const GwenMessage: React.FC<GwenMessageProps> = ({ role, content, ts }) => {
  const isUser = role === 'user';
  const timeStr = new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className={`gwen-message-container ${isUser ? 'gwen-msg-user-wrapper' : 'gwen-msg-bot-wrapper'}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: isUser ? '80%' : '88%',
        animation: 'msgIn 0.25s ease forwards',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        {!isUser && (
          <img
            src={gwenAvatar}
            alt="Gwen"
            width="24"
            height="24"
            style={{ borderRadius: '50%', flexShrink: 0, marginTop: '2px' }}
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            className={isUser ? 'gwen-bubble-user' : 'gwen-bubble-bot'}
            style={{
              background: isUser ? 'var(--gw-user-bubble)' : 'var(--gw-bot-bubble)',
              backdropFilter: isUser ? 'blur(8px)' : 'blur(12px)',
              border: isUser ? '1px solid rgba(193, 125, 74, 0.3)' : '1px solid var(--gw-glass-border)',
              borderRadius: isUser ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
              padding: '10px 14px',
              color: isUser ? '#ffffff' : 'var(--gw-text-primary)',
              fontSize: '14px',
              lineHeight: isUser ? '1.55' : '1.6',
            }}
          >
            {isUser ? (
              content
            ) : (
              <div className="gwen-markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            )}
          </div>
          <span
            style={{
              fontSize: '10px',
              color: isUser ? 'rgba(255,255,255,0.6)' : 'var(--gw-text-muted)',
              textAlign: isUser ? 'right' : 'left',
              marginTop: '3px',
              marginLeft: isUser ? '0' : '2px',
            }}
          >
            {timeStr}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GwenMessage;
