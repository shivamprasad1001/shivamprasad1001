import axios from 'axios';

const gwen = axios.create({
  baseURL: import.meta.env.VITE_GWEN_API_URL || 'https://gwen-ccgg.onrender.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Gwen-API-Key': import.meta.env.VITE_GWEN_API_KEY || ''
  }
});

export interface ChatRequest {
  message: string;
  history: { role: 'user' | 'model' | 'assistant'; content: string }[];
  session_id: string | null;
  app_id?: string;
}

export interface ChatResponse {
  reply: string;
  session_id: string;
}

export interface SuggestionRequest {
  last_user_message: string;
  last_assistant_reply: string;
}

export interface SuggestionResponse {
  suggestions: string[];
}

export const sendMessage = ({ message, history, session_id, app_id = 'portfolio' }: ChatRequest): Promise<ChatResponse> =>
  gwen.post('/api/chat', { message, history, session_id, app_id }).then((r) => r.data);

export const fetchSuggestions = ({
  last_user_message,
  last_assistant_reply,
}: SuggestionRequest): Promise<SuggestionResponse> =>
  gwen.post('/api/suggestions', { last_user_message, last_assistant_reply }).then((r) => r.data);

export const checkHealth = (): Promise<{ status: string }> =>
  gwen.get('/api/health').then((r) => r.data);

export default gwen;
