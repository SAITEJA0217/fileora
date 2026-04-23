"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, X, Loader2, Sparkles, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  onClose: () => void;
  fileName: string;
  initialSummary?: string[];
}

const AIChat = ({ onClose, fileName, initialSummary }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const baseMsg = { id: '1', role: 'assistant' as const, content: `Hi! I've analyzed **${fileName}**. How can I help you with it?` };
    if (initialSummary) {
      return [
        baseMsg,
        { 
          id: 'summary', 
          role: 'assistant' as const, 
          content: `Here is a quick summary:\n\n${initialSummary.map(s => `• ${s}`).join('\n')}` 
        }
      ];
    }
    return [baseMsg];
  });
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

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response for now - in production this would call the backend
    setTimeout(() => {
      const assistantMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: `Based on **${fileName}**, here's what I found: The document appears to be a formal record. ${input.toLowerCase().includes('summarize') ? 'In summary, it outlines the key objectives and requirements for the project.' : 'I can provide more detailed insights if you specify which section you are interested in.'}`
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white dark:bg-[#112240] shadow-2xl z-[150] flex flex-col border-l border-gray-100 dark:border-white/5"
    >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-xl">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 leading-none">FileOra AI</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Chatting with {fileName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-primary' : 'bg-gray-100'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-primary" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.content.split('**').map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] flex space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Actions */}
          <div className="px-6 py-2 flex overflow-x-auto space-x-2 no-scrollbar border-t border-gray-100 bg-gray-50/30">
            {['Summarize', 'Key Insights', 'Professional Tone', 'Translate to Spanish'].map((action) => (
              <button 
                key={action}
                onClick={() => { setInput(action); handleSend(); }}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-white border border-gray-100 text-xs font-bold text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about the file..."
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-2 bottom-2 w-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest font-bold flex items-center justify-center">
              <Sparkles className="w-3 h-3 mr-1" /> Powered by FileOra Intelligence
            </p>
          </div>
        </motion.div>
  );
};

export default AIChat;
