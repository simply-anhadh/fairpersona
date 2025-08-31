import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Award } from 'lucide-react';
import { AIPersona } from '../types';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

interface PersonaCardProps {
  persona: AIPersona;
  onClick: () => void;
}

export function PersonaCard({ persona, onClick }: PersonaCardProps) {
  const { darkMode } = useStore();

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-purple-500';
      case 'epic': return 'bg-blue-500';
      case 'rare': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        'relative cursor-pointer rounded-xl p-6 transition-all duration-300 hover:shadow-2xl',
        darkMode
          ? 'bg-gray-800 border border-gray-700 hover:border-blue-500'
          : 'bg-white border border-gray-200 hover:border-blue-300',
        'backdrop-blur-sm'
      )}
    >
      {/* Avatar and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <img
            src={persona.avatar}
            alt={persona.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500/20"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        <div className="flex flex-col items-end">
          <span className={clsx(
            'px-2 py-1 text-xs font-medium rounded-full',
            darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
          )}>
            {persona.aiType}
          </span>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <MessageCircle size={12} className="mr-1" />
            {persona.interactions}
          </div>
        </div>
      </div>

      {/* Name and Role */}
      <div className="mb-3">
        <h3 className={clsx(
          'font-bold text-lg mb-1',
          darkMode ? 'text-white' : 'text-gray-900'
        )}>
          {persona.name}
        </h3>
        <p className={clsx(
          'text-sm',
          darkMode ? 'text-gray-400' : 'text-gray-600'
        )}>
          {persona.role}
        </p>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center">
          <div className={clsx(
            'text-lg font-bold',
            getScoreColor(persona.fairnessScore)
          )}>
            {persona.fairnessScore}
          </div>
          <div className={clsx(
            'text-xs',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          )}>
            Fairness
          </div>
        </div>
        <div className="text-center">
          <div className={clsx(
            'text-lg font-bold',
            getScoreColor(persona.trustScore)
          )}>
            {persona.trustScore}
          </div>
          <div className={clsx(
            'text-xs',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          )}>
            Trust
          </div>
        </div>
        <div className="text-center">
          <div className={clsx(
            'text-lg font-bold',
            getScoreColor(persona.contributionIndex)
          )}>
            {persona.contributionIndex}
          </div>
          <div className={clsx(
            'text-xs',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          )}>
            Contribution
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {persona.badges.slice(0, 3).map((badge) => (
            <div
              key={badge.id}
              className={clsx(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs',
                getBadgeColor(badge.rarity)
              )}
            >
              {badge.icon}
            </div>
          ))}
        </div>
        <div className="flex items-center text-sm">
          <Star size={12} className="text-yellow-500 mr-1" />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            {(persona.reputation / 1000).toFixed(1)}k
          </span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
}