import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ChatInterface } from '../components/ChatInterface';
import clsx from 'clsx';

export function ChatPage() {
  const { darkMode } = useStore();

  return (
    <div className={clsx(
      'min-h-screen py-8',
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle size={24} className="text-white" />
            </div>
            <h1 className={clsx(
              'text-4xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              AI Chat Assistant
            </h1>
          </div>
          <p className={clsx(
            'text-xl max-w-2xl mx-auto',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            Engage with our advanced AI assistant to learn about fairness metrics, 
            Web3 technologies, and the future of decentralized AI systems.
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChatInterface />
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: '🤖',
              title: 'Smart Responses',
              description: 'Advanced AI with context awareness and specialized knowledge',
            },
            {
              icon: '🔒',
              title: 'Privacy First',
              description: 'Secure conversations with no data retention or tracking',
            },
            {
              icon: '⚡',
              title: 'Real-time',
              description: 'Instant responses with natural conversation flow',
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className={clsx(
                'p-6 rounded-xl transition-all duration-300',
                darkMode ? 'bg-gray-800' : 'bg-white'
              )}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className={clsx(
                'font-semibold mb-2',
                darkMode ? 'text-white' : 'text-gray-900'
              )}>
                {feature.title}
              </h3>
              <p className={clsx(
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}