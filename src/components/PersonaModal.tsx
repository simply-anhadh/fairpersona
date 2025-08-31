import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MessageCircle, Award, Calendar, Users } from 'lucide-react';
import { AIPersona } from '../types';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

interface PersonaModalProps {
  persona: AIPersona | null;
  onClose: () => void;
}

export function PersonaModal({ persona, onClose }: PersonaModalProps) {
  const { darkMode } = useStore();

  if (!persona) return null;

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            'relative max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6',
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          )}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={clsx(
              'absolute top-4 right-4 p-2 rounded-full transition-colors duration-200',
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            )}
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-start space-x-4 mb-6">
            <img
              src={persona.avatar}
              alt={persona.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-500/20"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{persona.name}</h2>
              <p className={clsx(
                'text-lg mb-2',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                {persona.role}
              </p>
              <span className={clsx(
                'px-3 py-1 text-sm font-medium rounded-full',
                darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
              )}>
                {persona.aiType}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className={clsx(
              'text-sm leading-relaxed',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            )}>
              {persona.description}
            </p>
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {persona.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className={clsx(
                    'px-3 py-1 text-sm rounded-full',
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  )}
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className={clsx(
              'p-4 rounded-lg',
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            )}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Fairness Score</span>
                <span className={clsx('text-lg font-bold', getScoreColor(persona.fairnessScore))}>
                  {persona.fairnessScore}
                </span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${persona.fairnessScore}%` }}
                ></div>
              </div>
            </div>

            <div className={clsx(
              'p-4 rounded-lg',
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            )}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Trust Score</span>
                <span className={clsx('text-lg font-bold', getScoreColor(persona.trustScore))}>
                  {persona.trustScore}
                </span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${persona.trustScore}%` }}
                ></div>
              </div>
            </div>

            <div className={clsx(
              'p-4 rounded-lg',
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            )}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Contribution Index</span>
                <span className={clsx('text-lg font-bold', getScoreColor(persona.contributionIndex))}>
                  {persona.contributionIndex}
                </span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${persona.contributionIndex}%` }}
                ></div>
              </div>
            </div>

            <div className={clsx(
              'p-4 rounded-lg',
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            )}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Reputation</span>
                <span className="text-lg font-bold text-yellow-500">
                  {(persona.reputation / 1000).toFixed(1)}k
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Star size={12} className="mr-1" />
                <span>Based on {persona.interactions} interactions</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <MessageCircle size={16} className="text-blue-500" />
              </div>
              <div className="text-lg font-bold">{persona.interactions}</div>
              <div className={clsx(
                'text-xs',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              )}>
                Interactions
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Award size={16} className="text-purple-500" />
              </div>
              <div className="text-lg font-bold">{persona.badges.length}</div>
              <div className={clsx(
                'text-xs',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              )}>
                Badges
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Calendar size={16} className="text-green-500" />
              </div>
              <div className="text-lg font-bold">
                {new Date(persona.createdAt).toLocaleDateString()}
              </div>
              <div className={clsx(
                'text-xs',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              )}>
                Created
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Badges & Achievements</h3>
            <div className="flex flex-wrap gap-3">
              {persona.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={clsx(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg',
                    getBadgeColor(badge.rarity)
                  )}
                >
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-sm font-medium text-white">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200"
            >
              Start Conversation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={clsx(
                'px-4 py-3 rounded-lg font-medium transition-colors duration-200',
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              )}
            >
              Follow
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}