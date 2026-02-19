
import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { getEventAdvice } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSend, setMessages }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput('');
    onSend(text);

    // AI Response Logic
    setIsTyping(true);
    const aiResponse = await getEventAdvice(text);
    setIsTyping(false);

    const botMsg: ChatMessage = {
      id: Date.now().toString() + "-bot",
      senderId: 'kts-assistant',
      senderName: 'KTS Assistant',
      text: aiResponse || "How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
      isKTSStaff: true
    };
    setMessages(prev => [...prev, botMsg]);
  };

  return (
    <div className="glass rounded-3xl h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-white/5">
        <div className="w-10 h-10 gold-bg rounded-full flex items-center justify-center text-black font-bold">K</div>
        <div>
          <h3 className="font-bold text-sm">KTS Support Team</h3>
          <p className="text-[10px] text-green-500">Online • Active Response</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-10 opacity-50 space-y-2">
            <Sparkles className="mx-auto text-yellow-500" size={32} />
            <p className="text-sm">Hi! I'm your AI event concierge.<br/>Ask me about pricing, themes, or decor ideas!</p>
          </div>
        )}
        
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.isKTSStaff ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                msg.isKTSStaff ? 'bg-white/10 text-white rounded-tl-none' : 'gold-bg text-black font-medium rounded-tr-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-[9px] mt-1 ${msg.isKTSStaff ? 'text-gray-500' : 'text-black/60'}`}>{msg.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-2xl p-3 flex space-x-1">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-black/40 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 outline-none focus:ring-1 ring-[#d4af37]"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-3 gold-bg text-black rounded-full hover:scale-105 disabled:opacity-50 transition-transform"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
