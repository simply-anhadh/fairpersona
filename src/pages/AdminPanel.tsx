import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Settings, 
  Shield, 
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { availableSkills } from '../utils/skillsData';
import clsx from 'clsx';

export function AdminPanel() {
  const { darkMode, systemStats, setSystemStats, user } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'skills' | 'tests' | 'settings'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading system stats
    setTimeout(() => {
      setSystemStats({
        totalUsers: 1247,
        totalTests: 3892,
        totalCertifications: 2156,
        averageScore: 78.5,
        popularSkills: [
          { skillId: 'react-dev', count: 342 },
          { skillId: 'ui-ux-design', count: 298 },
          { skillId: 'data-scientist', count: 267 },
          { skillId: 'solidity-dev', count: 189 },
          { skillId: 'cybersecurity', count: 156 }
        ],
        recentActivity: []
      });
      setIsLoading(false);
    }, 1000);
  }, [setSystemStats]);

  // Check if user is admin
  if (!user || !user.roles.includes('Admin')) {
    return (
      <div className={clsx(
        'min-h-screen flex items-center justify-center',
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      )}>
        <div className="text-center">
          <Shield size={64} className="mx-auto mb-4 text-red-500" />
          <h2 className={clsx(
            'text-2xl font-bold mb-2',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Access Denied
          </h2>
          <p className={clsx(
            'text-lg',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            You don't have permission to access the admin panel.
          </p>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: systemStats?.totalUsers || 0, icon: Users, color: 'blue' },
          { label: 'Total Tests', value: systemStats?.totalTests || 0, icon: Award, color: 'green' },
          { label: 'Certifications', value: systemStats?.totalCertifications || 0, icon: Shield, color: 'purple' },
          { label: 'Avg Score', value: `${systemStats?.averageScore || 0}%`, icon: TrendingUp, color: 'yellow' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={clsx(
              'p-6 rounded-xl border',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={clsx(
                  'text-sm font-medium',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {stat.label}
                </p>
                <p className={clsx(
                  'text-2xl font-bold mt-1',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {stat.value}
                </p>
              </div>
              <div className={clsx(
                'w-12 h-12 rounded-lg flex items-center justify-center',
                stat.color === 'blue' && 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
                stat.color === 'green' && 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
                stat.color === 'purple' && 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
                stat.color === 'yellow' && 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
              )}>
                <stat.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popular Skills */}
      <div className={clsx(
        'p-6 rounded-xl border',
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      )}>
        <h3 className={clsx(
          'text-xl font-semibold mb-4',
          darkMode ? 'text-white' : 'text-gray-900'
        )}>
          Popular Skills
        </h3>
        <div className="space-y-3">
          {systemStats?.popularSkills.map((skill, index) => {
            const skillData = availableSkills.find(s => s.id === skill.skillId);
            return (
              <div key={skill.skillId} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{skillData?.icon || '🎯'}</span>
                  <span className={clsx(
                    'font-medium',
                    darkMode ? 'text-white' : 'text-gray-900'
                  )}>
                    {skillData?.name || skill.skillId}
                  </span>
                </div>
                <span className={clsx(
                  'text-sm font-medium',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {skill.count} tests
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={clsx(
          'text-xl font-semibold',
          darkMode ? 'text-white' : 'text-gray-900'
        )}>
          User Management
        </h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200">
          <Plus size={16} />
          <span>Add User</span>
        </button>
      </div>

      <div className={clsx(
        'rounded-xl border overflow-hidden',
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      )}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={clsx(
              'border-b',
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            )}>
              <tr>
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium">Email</th>
                <th className="text-left p-4 font-medium">Certifications</th>
                <th className="text-left p-4 font-medium">Joined</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Mock user data */}
              {[
                { id: '1', username: 'john_doe', email: 'john@example.com', certifications: 3, joined: '2024-01-15' },
                { id: '2', username: 'jane_smith', email: 'jane@example.com', certifications: 5, joined: '2024-01-20' },
                { id: '3', username: 'bob_wilson', email: 'bob@example.com', certifications: 2, joined: '2024-02-01' },
              ].map((user, index) => (
                <tr key={user.id} className={clsx(
                  'border-b',
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                )}>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                        alt={user.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className={clsx(
                        'font-medium',
                        darkMode ? 'text-white' : 'text-gray-900'
                      )}>
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className={clsx(
                    'p-4',
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  )}>
                    {user.email}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-sm">
                      {user.certifications}
                    </span>
                  </td>
                  <td className={clsx(
                    'p-4',
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  )}>
                    {new Date(user.joined).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-500 hover:text-blue-600">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-yellow-500 hover:text-yellow-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-red-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={clsx(
          'text-xl font-semibold',
          darkMode ? 'text-white' : 'text-gray-900'
        )}>
          Skill Management
        </h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200">
          <Plus size={16} />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableSkills.slice(0, 9).map((skill) => (
          <div
            key={skill.id}
            className={clsx(
              'p-6 rounded-xl border',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{skill.icon}</div>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-blue-500 hover:text-blue-600">
                  <Edit size={16} />
                </button>
                <button className="p-1 text-red-500 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h4 className={clsx(
              'font-semibold mb-2',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              {skill.name}
            </h4>
            <p className={clsx(
              'text-sm mb-3',
              darkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              {skill.description}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className={clsx(
                'px-2 py-1 rounded-full',
                skill.difficulty === 'beginner' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                skill.difficulty === 'intermediate' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                skill.difficulty === 'advanced' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              )}>
                {skill.difficulty}
              </span>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {skill.estimatedTime}min
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className={clsx(
        'min-h-screen flex items-center justify-center',
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      )}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className={clsx(
      'min-h-screen py-8',
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={clsx(
            'text-3xl font-bold mb-2',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Admin Panel
          </h1>
          <p className={clsx(
            'text-lg',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            Manage users, skills, and platform settings
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-1 mb-8"
        >
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'skills', label: 'Skills', icon: Award },
            { id: 'tests', label: 'Tests', icon: Shield },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={clsx(
                'flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              )}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'skills' && renderSkills()}
          {activeTab === 'tests' && (
            <div className="text-center py-16">
              <AlertTriangle size={64} className="mx-auto mb-4 text-yellow-500" />
              <h3 className={clsx(
                'text-xl font-semibold mb-2',
                darkMode ? 'text-white' : 'text-gray-900'
              )}>
                Test Management
              </h3>
              <p className={clsx(
                'text-lg',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                Coming soon...
              </p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-16">
              <Settings size={64} className="mx-auto mb-4 text-gray-500" />
              <h3 className={clsx(
                'text-xl font-semibold mb-2',
                darkMode ? 'text-white' : 'text-gray-900'
              )}>
                System Settings
              </h3>
              <p className={clsx(
                'text-lg',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                Coming soon...
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}