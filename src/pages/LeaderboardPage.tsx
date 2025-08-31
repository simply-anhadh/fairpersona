import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Minus, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export function LeaderboardPage() {
  const { leaderboard, darkMode } = useStore();
  const [selectedMetric, setSelectedMetric] = useState<'fairness' | 'trust' | 'contribution' | 'reputation'>('reputation');

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp size={16} className="text-green-500" />;
    if (change < 0) return <TrendingDown size={16} className="text-red-500" />;
    return <Minus size={16} className="text-gray-400" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-400';
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown size={20} className="text-yellow-500" />;
      case 2:
        return <Trophy size={20} className="text-gray-400" />;
      case 3:
        return <Trophy size={20} className="text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{position}</span>;
    }
  };

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
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
              <Trophy size={24} className="text-white" />
            </div>
            <h1 className={clsx(
              'text-4xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              Leaderboard
            </h1>
          </div>
          <p className={clsx(
            'text-xl max-w-2xl mx-auto',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            Top-performing AI personas and community members ranked by their 
            fairness, trust, contribution, and overall reputation scores.
          </p>
        </motion.div>

        {/* Metric Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={clsx(
            'bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border',
            darkMode ? 'border-gray-700' : 'border-gray-200'
          )}
        >
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'reputation', label: 'Overall Reputation', icon: '⭐' },
              { key: 'fairness', label: 'Fairness Score', icon: '⚖️' },
              { key: 'trust', label: 'Trust Score', icon: '🛡️' },
              { key: 'contribution', label: 'Contribution Index', icon: '🤝' },
            ].map((metric) => (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key as any)}
                className={clsx(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                  selectedMetric === metric.key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                <span>{metric.icon}</span>
                <span className="font-medium">{metric.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={clsx(
                'p-6 rounded-xl transition-all duration-300 hover:shadow-lg',
                darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-xl',
                index < 3 && 'ring-2 ring-yellow-500/20'
              )}
            >
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  {getRankIcon(index + 1)}
                </div>

                {/* Avatar */}
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20"
                />

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={clsx(
                      'font-semibold text-lg',
                      darkMode ? 'text-white' : 'text-gray-900'
                    )}>
                      {entry.name}
                    </h3>
                    <span className={clsx(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      entry.type === 'persona'
                        ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                        : darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                    )}>
                      {entry.type === 'persona' ? 'AI Persona' : 'User'}
                    </span>
                  </div>
                  <p className={clsx(
                    'text-sm',
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  )}>
                    {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Score
                  </p>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-500">
                    {entry.score}
                  </div>
                  <div className="flex items-center space-x-1">
                    {getChangeIcon(entry.change)}
                    <span className={clsx(
                      'text-sm font-medium',
                      getChangeColor(entry.change)
                    )}>
                      {entry.change > 0 ? '+' : ''}{entry.change}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${entry.score}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={clsx(
            'mt-12 p-6 rounded-xl',
            darkMode ? 'bg-gray-800' : 'bg-white'
          )}
        >
          <h3 className={clsx(
            'text-xl font-semibold mb-4',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Competition Stats
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">
                {leaderboard.filter(e => e.type === 'persona').length}
              </div>
              <div className={clsx(
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                AI Personas
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-1">
                {leaderboard.filter(e => e.type === 'user').length}
              </div>
              <div className={clsx(
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                Community Members
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-1">
                {Math.round(leaderboard.reduce((sum, e) => sum + e.score, 0) / leaderboard.length)}
              </div>
              <div className={clsx(
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                Average Score
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}