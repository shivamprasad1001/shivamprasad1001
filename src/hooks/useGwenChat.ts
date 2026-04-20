import { useState, useEffect, useCallback } from 'react';
import { sendMessage, fetchSuggestions } from '../api/gwenClient';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ts: number;
}

export const useGwenChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>(() => {
    const saved = localStorage.getItem('gwen_session_id');
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem('gwen_session_id', newId);
    return newId;
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      // 1. Clear suggestions immediately
      setSuggestionsVisible(false);

      // 2. Append user message
      const userMsg: Message = {
        id: uuidv4(),
        role: 'user',
        content: text,
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setError(null);

      try {
        // 4. Build history: last 10 messages
        // map 'assistant' -> 'model' for Gemini compatibility
        const history = messages
          .slice(-10)
          .map((msg) => ({
            role: (msg.role === 'assistant' ? 'model' : 'user') as 'model' | 'user',
            content: msg.content,
          }));

        // 5. Call API
        const response = await sendMessage({ message: text, history, session_id: sessionId });

        // 6. On success
        const botMsg: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: response.reply,
          ts: Date.now(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);

        if (response.session_id !== sessionId) {
          setSessionId(response.session_id);
          localStorage.setItem('gwen_session_id', response.session_id);
        }

        // Fetch suggestions after a delay
        setTimeout(async () => {
          try {
            const sugResponse = await fetchSuggestions({
              last_user_message: text,
              last_assistant_reply: response.reply,
            });
            if (sugResponse.suggestions && sugResponse.suggestions.length > 0) {
              setSuggestions(sugResponse.suggestions);
              setSuggestionsVisible(true);
            }
          } catch (e) {
            console.error('Failed to fetch suggestions:', e);
          }
        }, 400);

      } catch (err: any) {
        console.error('Chat error:', err);
        setError('Gwen is unavailable right now. Try again.');
        setIsLoading(false);
      }
    },
    [messages, sessionId]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    const newId = uuidv4();
    setSessionId(newId);
    localStorage.setItem('gwen_session_id', newId);
    setSuggestions([]);
    setSuggestionsVisible(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    send,
    clearChat,
    suggestions,
    suggestionsVisible,
    setSuggestionsVisible,
  };
};
