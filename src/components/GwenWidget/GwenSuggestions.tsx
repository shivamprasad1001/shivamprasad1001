import React from 'react';

interface GwenSuggestionsProps {
  suggestions: string[];
  visible: boolean;
  onSelect: (text: string) => void;
}

const GwenSuggestions: React.FC<GwenSuggestionsProps> = ({ suggestions, visible, onSelect }) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="gwen-suggestions-container">
      <span
        style={{
          width: '100%',
          fontSize: '10px',
          color: 'var(--gw-text-muted)',
          letterSpacing: '0.04em',
          marginBottom: '2px',
        }}
      >
        Continue exploring →
      </span>
      {suggestions.map((text) => (
        <button
          key={text}
          onClick={() => onSelect(text)}
          className="gwen-suggestion-chip"
        >
          <span style={{ color: 'var(--gw-accent)', marginRight: '4px' }}>›</span>
          {text}
        </button>
      ))}
    </div>
  );
};

export default GwenSuggestions;
