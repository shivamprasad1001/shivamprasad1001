import axios from 'axios';

const gwen = axios.create({
  baseURL: import.meta.env.VITE_GWEN_API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
});

export interface ChatRequest {
  message: string;
  history: { role: 'user' | 'model'; content: string }[];
  session_id: string | null;
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

export const sendMessage = ({ message, history, session_id }: ChatRequest): Promise<ChatResponse> =>
  gwen.post('/api/chat', { message, history, session_id }).then((r) => r.data);

export const fetchSuggestions = ({
  last_user_message,
  last_assistant_reply,
}: SuggestionRequest): Promise<SuggestionResponse> =>
  gwen.post('/api/suggestions', { last_user_message, last_assistant_reply }).then((r) => r.data);

export const checkHealth = (): Promise<{ status: string }> =>
  gwen.get('/api/health').then((r) => r.data);

export default gwen;
