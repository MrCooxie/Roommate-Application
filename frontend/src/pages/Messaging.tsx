import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

const SendIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

interface Message {
    id: number;
    text: string;
    fromMe: boolean;
}

// Placeholder messages to match the design mockup
const placeholderMessages: Message[] = [
    { id: 1, text: 'Hey, is the room still available?', fromMe: false },
    { id: 2, text: 'Yes it is! Would you like to see it?', fromMe: true },
    { id: 3, text: 'That would be great!', fromMe: false },
    { id: 4, text: 'Sure, when works for you?', fromMe: true },
    { id: 5, text: 'How about this weekend?', fromMe: false },
    { id: 6, text: 'Works for me 👍', fromMe: true },
];

export default function Messaging() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [messages, setMessages] = useState<Message[]>(placeholderMessages);
    const [input, setInput] = useState('');

    // Get contact info from navigation state if available
    const contactName: string = state?.contactName ?? 'Chat';
    const contactAvatar: string | undefined = state?.contactAvatar;

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: input.trim(), fromMe: true },
        ]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white max-w-xl mx-auto">
            {/* Header */}
            <div className="flex flex-col items-center pt-6 pb-4 border-b border-gray-100 relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-5 top-6 text-gray-700 hover:text-gray-900 transition-colors p-1"
                >
                    <BackIcon />
                </button>

                {/* Avatar */}
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 mb-2">
                    {contactAvatar ? (
                        <img src={contactAvatar} alt={contactName} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xl font-bold">
                            {contactName.charAt(0)}
                        </div>
                    )}
                </div>
                <h2 className="text-base font-semibold text-gray-900">{contactName}</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${msg.fromMe
                                    ? 'bg-gray-200 text-gray-800 rounded-br-md'
                                    : 'bg-gray-200 text-gray-800 rounded-bl-md'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input bar */}
            <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-3 bg-white">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="text-gray-600 hover:text-gray-900 disabled:text-gray-300 transition-colors p-1"
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}
