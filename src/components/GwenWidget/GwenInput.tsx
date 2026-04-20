import React, { useState, useRef, useEffect } from 'react';

interface GwenInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
  onType: () => void;
}

const GwenInput: React.FC<GwenInputProps> = ({ onSend, isLoading, onType }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="gwen-input-container">
      <div className="gwen-input-wrapper">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            onType();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask Gwen anything..."
          className="gwen-input-textarea"
          disabled={isLoading}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={isLoading || !input.trim()}
          className={`gwen-input-send-btn ${isLoading || !input.trim() ? 'disabled' : ''}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 11V3M7 3L3.5 6.5M7 3L10.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <p className="gwen-input-disclaimer">
        Gwen may make mistakes · Powered by Gemini
      </p>
    </div>
  );
};

export default GwenInput;
