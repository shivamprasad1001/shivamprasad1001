import React, { useState, useEffect } from 'react';

interface GwenTypingTextProps {
  text: string;
  speed?: number;
}

const GwenTypingText: React.FC<GwenTypingTextProps> = ({ text, speed = 40 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    
    // Tiny delay before starting to type
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
        }
      }, speed);
      
      return () => clearInterval(interval);
    }, 100);

    return () => clearTimeout(startDelay);
  }, [text, speed]);

  return <span>{displayText}<span className="gwen-typing-cursor">|</span></span>;
};

export default GwenTypingText;
