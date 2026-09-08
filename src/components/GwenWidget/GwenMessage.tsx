import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import gwenAvatar from '../../assets/gwen-avatar.svg';

interface GwenMessageProps { role: 'user' | 'assistant'; content: string; ts: number; }
const GwenMessage: React.FC<GwenMessageProps> = ({ role, content, ts }) => {
  const isUser = role === 'user';
  const time = new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return <div className={`gwen-message ${isUser ? 'is-user' : 'is-assistant'}`}>{!isUser && <img src={gwenAvatar} alt="" />}<div><div className="gwen-bubble">{isUser ? content : <div className="gwen-markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></div>}</div><time>{time}</time></div></div>;
};
export default GwenMessage;
