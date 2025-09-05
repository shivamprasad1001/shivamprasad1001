import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon, ArrowRightIcon } from './Icons';

type Message = {
    sender: 'user' | 'bot';
    text: string;
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<any | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;

                console.log("API Key:", apiKey);

                if (!apiKey) {
                    console.error("API_KEY is not available. Chatbot will not be initialized.");
                    setMessages([{ sender: 'bot', text: "I'm currently unavailable due to a configuration issue. Please check back later." }]);
                    return;
                }

                setIsLoading(true);

                const { GoogleGenAI } = await import('@google/genai');

                const ai = new GoogleGenAI({ apiKey });
                const systemInstruction = `You are a friendly and professional AI assistant for Shivam Prasad's front-end developer portfolio website. Your goal is to answer questions about Shivam, his skills, experience, and work in a concise and engaging manner. Use the following information to answer user questions. Do not make up information. If you don't know the answer, politely say that the information isn't available.

**Personal Info:**
- Name: Shivam Prasad
- Role: Front-End Developer
- Location: New Delhi, India
- Email: shivamprasad1001@gmail.com

**Biography:**
Shivam is a passionate Front-End Developer dedicated to building elegant and efficient web applications. He thrives on turning complex problems into simple, beautiful, and intuitive designs.

**Main Skills:**
- Languages: React.js, Next.js, TypeScript, JavaScript (ES6+)
- Styling: Tailwind CSS, HTML5, CSS3
- Tools: Git, GitHub, REST APIs
- Concepts: Responsive Design, State Management, Problem Solving

**Work Experience:**
- **Software Engineer at Celebal Technologies (May 2022 - Present):** Develops and maintains scalable web applications using React and Next.js, collaborating with cross-functional teams.
- **Full Stack Web Developer (Trainee) at Masai School (Aug 2021 - Apr 2022):** Completed an intensive 30-week program focusing on the MERN stack, data structures, and algorithms.

**Education & Certifications:**
- **Bachelor of Technology, Computer Science** from Dr. A.P.J. Abdul Kalam Technical University (2017-2021).
- **Full Stack Web Development Certificate** from Masai School (2021-2022).

**Projects:**
Shivam has built several projects including a Crypto Tracker, Expense Tracker, and a React Movie App. You can find more on his GitHub.

Keep your answers brief and to the point. You can use emojis to make the conversation more friendly. Start the conversation by introducing yourself and asking how you can help.`;

                const chatInstance = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction,
                    },
                });
                setChat(chatInstance);

                const response = await chatInstance.sendMessage({ message: "Hello" });
                setMessages([{ sender: 'bot', text: response.text }]);

            } catch (error) {
                console.error("Failed to initialize chatbot:", error);
                setMessages([{ sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
            } finally {
                setIsLoading(false);
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: input });
            setMessages(prev => [...prev, { sender: 'bot', text: response.text }]);
        } catch (error) {
            console.error("Failed to send message:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "Oops! Something went wrong. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-0 right-0 m-6 transition-transform duration-300 ${isOpen ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-pink-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
                    aria-label="Open chatbot"
                >
                    <ChatIcon className="w-8 h-8" />
                </button>
            </div>

            <div className={`fixed bottom-0 right-0 m-6 w-full max-w-sm h-[70vh] flex flex-col bg-white dark:bg-gray-800 shadow-2xl rounded-lg transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-white">AI Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">&times;</button>
                </header>

                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="flex flex-col space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-pink-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                                    <div className="flex items-center space-x-1">
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-1 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white"
                        disabled={isLoading}
                    />
                    <button type="submit" className="ml-3 w-10 h-10 flex-shrink-0 flex items-center justify-center bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors disabled:bg-gray-400" disabled={isLoading || !input.trim()}>
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </>
    );
};

export default Chatbot;