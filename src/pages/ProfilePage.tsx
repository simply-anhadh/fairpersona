import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Zap, Calendar, TrendingUp, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export function ProfilePage() {
  const { user, isConnected, darkMode } = useStore();

  if (!isConnected || !user) {
    return (
      <div className={clsx(
        'min-h-screen flex items-center justify-center',
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      )}>
        <div className="text-center">
          <div className={clsx(
            'text-6xl mb-4',
            darkMode ? 'text-gray-600' : 'text-gray-300'
          )}>
            🔒
          </div>
          <h2 className={clsx(
            'text-2xl font-bold mb-4',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Connect Your Wallet
          </h2>
          <p className={clsx(
            'text-lg',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            Please connect your wallet to view your profile
          </p>
        </div>
      </div>
    );
  }

  const levelProgress = (user.xp % 2000) / 2000 * 100;

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-purple-500';
      case 'epic': return 'bg-blue-500';
      case 'rare': return 'bg-green-500';
      default: return 'bg-gray-500';
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
          className={clsx(
            'bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 mb-8 text-white',
            'relative overflow-hidden'
          )}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          <div className="relative flex items-start space-x-6">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-24 h-24 rounded-full ring-4 ring-white/20"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
              <p className="text-blue-100 mb-4">CARV ID: {user.carvId}</p>
              <div className="flex items-center space-x-6">
                <div>
                  <div className="text-2xl font-bold">Level {user.level}</div>
                  <div className="text-sm text-blue-100">
                    {user.xp.toLocaleString()} XP
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{user.reputationScore}</div>
                  <div className="text-sm text-blue-100">Reputation</div>
                </div>
              </div>
              
              {/* Level Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress to Level {user.level + 1}</span>
                  <span>{Math.round(levelProgress)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <div className={clsx(
            'p-6 rounded-xl',
            darkMode ? 'bg-gray-800' : 'bg-white'
          )}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-white" />
              </div>
              <h3 className={clsx(
                'font-semibold',
                darkMode ? 'text-white' : 'text-gray-900'
              )}>
                Activity
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Total Interactions
                </span>
                <span className={clsx(
                  'font-semibold',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {user.totalInteractions}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Member Since
                </span>
                <span className={clsx(
                  'font-semibold',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {new Date(user.joinedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className={clsx(
            'p-6 rounded-xl',
            darkMode ? 'bg-gray-800' : 'bg-white'
          )}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <h3 className={clsx(
                'font-semibold',
                darkMode ? 'text-white' : 'text-gray-900'
              )}>
                Trust Metrics
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Verification Status
                </span>
                <span className="text-green-500 font-semibold">Verified</span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Trust Score
                </span>
                <span className={clsx(
                  'font-semibold',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  92/100
                </span>
              </div>
            </div>
          </div>

          <div className={clsx(
            'p-6 rounded-xl',
            darkMode ? 'bg-gray-800' : 'bg-white'
          )}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Award size={20} className="text-white" />
              </div>
              <h3 className={clsx(
                'font-semibold',
                darkMode ? 'text-white' : 'text-gray-900'
              )}>
                Achievements
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Badges Earned
                </span>
                <span className={clsx(
                  'font-semibold',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {user.badges.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Roles
                </span>
                <span className={clsx(
                  'font-semibold',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {user.roles.length}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Roles & Badges */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={clsx(
              'p-6 rounded-xl',
              darkMode ? 'bg-gray-800' : 'bg-white'
            )}
          >
            <h3 className={clsx(
              'text-xl font-semibold mb-4',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              Community Roles
            </h3>
            <div className="space-y-3">
              {user.roles.map((role, index) => (
                <div
                  key={index}
                  className={clsx(
                    'flex items-center space-x-3 p-3 rounded-lg',
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  )}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className={clsx(
                    'font-medium',
                    darkMode ? 'text-white' : 'text-gray-900'
                  )}>
                    {role}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={clsx(
              'p-6 rounded-xl',
              darkMode ? 'bg-gray-800' : 'bg-white'
            )}
          >
            <h3 className={clsx(
              'text-xl font-semibold mb-4',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              Badges & Achievements
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={clsx(
                    'flex items-center space-x-3 p-3 rounded-lg',
                    getBadgeColor(badge.rarity)
                  )}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <div>
                    <div className="text-white font-medium text-sm">
                      {badge.name}
                    </div>
                    <div className="text-white/70 text-xs capitalize">
                      {badge.rarity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wallet Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={clsx(
            'mt-8 p-6 rounded-xl',
            darkMode ? 'bg-gray-800' : 'bg-white'
          )}
        >
          <h3 className={clsx(
            'text-xl font-semibold mb-4',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Wallet & Identity
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={clsx(
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                Wallet Address
              </label>
              <div className={clsx(
                'p-3 rounded-lg font-mono text-sm',
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'
              )}>
                {user.address}
              </div>
            </div>
            <div>
              <label className={clsx(
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                CARV Identity
              </label>
              <div className={clsx(
                'p-3 rounded-lg font-mono text-sm',
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'
              )}>
                {user.carvId}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}