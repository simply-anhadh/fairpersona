import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateAIResponse, suggestedPrompts } from '../utils/aiResponses';
import { ChatMessage } from '../types';
import clsx from 'clsx';

export function ChatInterface() {
  const { darkMode, chatMessages, addChatMessage, selectedPersona } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = async (message?: string) => {
    const messageText = message || input.trim();
    if (!messageText) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    addChatMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(messageText, selectedPersona?.name),
        timestamp: new Date().toISOString(),
        personaId: selectedPersona?.id,
      };

      addChatMessage(aiResponse);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className={clsx(
      'flex flex-col h-full max-h-[600px] rounded-xl border',
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    )}>
      {/* Header */}
      <div className={clsx(
        'px-6 py-4 border-b',
        darkMode ? 'border-gray-700' : 'border-gray-200'
      )}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className={clsx(
              'font-semibold',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              AI Assistant
              {selectedPersona && (
                <span className={clsx(
                  'ml-2 text-sm font-normal',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  • {selectedPersona.name}
                </span>
              )}
            </h3>
            <p className={clsx(
              'text-sm',
              darkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              Ask me about AI fairness, Web3, or anything else!
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 && (
          <div className="text-center py-8">
            <div className={clsx(
              'text-6xl mb-4',
              darkMode ? 'text-gray-600' : 'text-gray-300'
            )}>
              💬
            </div>
            <p className={clsx(
              'text-lg font-medium mb-2',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            )}>
              Start a conversation
            </p>
            <p className={clsx(
              'text-sm',
              darkMode ? 'text-gray-500' : 'text-gray-500'
            )}>
              Try one of the suggested prompts below
            </p>
          </div>
        )}

        <AnimatePresence>
          {chatMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={clsx(
                'flex space-x-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              
              <div
                className={clsx(
                  'max-w-[70%] px-4 py-3 rounded-2xl',
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-100'
                    : 'bg-gray-100 text-gray-900'
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={clsx(
                  'text-xs mt-2 opacity-70',
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                )}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className={clsx(
              'px-4 py-3 rounded-2xl',
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            )}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {chatMessages.length === 0 && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.slice(0, 4).map((prompt, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSend(prompt)}
                className={clsx(
                  'px-3 py-2 text-xs rounded-full transition-colors duration-200',
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                )}
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className={clsx(
        'px-4 py-4 border-t',
        darkMode ? 'border-gray-700' : 'border-gray-200'
      )}>
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className={clsx(
              'flex-1 px-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            )}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200"
          >
            <Send size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}