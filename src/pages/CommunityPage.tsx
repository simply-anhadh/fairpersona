import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Vote, MessageSquare, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export function CommunityPage() {
  const { proposals, darkMode } = useStore();
  const [activeTab, setActiveTab] = useState<'proposals' | 'feedback' | 'admin'>('proposals');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock size={16} className="text-blue-500" />;
      case 'passed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'passed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const renderProposals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={clsx(
          'text-xl font-semibold',
          darkMode ? 'text-white' : 'text-gray-900'
        )}>
          Governance Proposals
        </h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200">
          <Plus size={16} />
          <span>New Proposal</span>
        </button>
      </div>

      {proposals.map((proposal) => (
        <motion.div
          key={proposal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={clsx(
            'p-6 rounded-xl border transition-all duration-300 hover:shadow-lg',
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          )}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className={clsx(
                  'font-semibold text-lg',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {proposal.title}
                </h4>
                <span className={clsx(
                  'flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full',
                  getStatusColor(proposal.status)
                )}>
                  {getStatusIcon(proposal.status)}
                  <span className="capitalize">{proposal.status}</span>
                </span>
              </div>
              <p className={clsx(
                'text-sm mb-3',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                {proposal.description}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  By {proposal.proposer}
                </span>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Created {new Date(proposal.createdAt).toLocaleDateString()}
                </span>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Ends {new Date(proposal.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Voting Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Voting Results
              </span>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {proposal.votesFor + proposal.votesAgainst} total votes
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-green-500 font-medium">For</span>
                <span className="text-green-500 font-medium">{proposal.votesFor}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` 
                  }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-red-500 font-medium">Against</span>
                <span className="text-red-500 font-medium">{proposal.votesAgainst}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>

            {proposal.status === 'active' && (
              <div className="flex space-x-3 mt-4">
                <button className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200">
                  Vote For
                </button>
                <button className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200">
                  Vote Against
                </button>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <h3 className={clsx(
        'text-xl font-semibold',
        darkMode ? 'text-white' : 'text-gray-900'
      )}>
        Community Feedback
      </h3>
      
      <div className={clsx(
        'p-6 rounded-xl border',
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      )}>
        <h4 className={clsx(
          'font-semibold mb-4',
          darkMode ? 'text-white' : 'text-gray-900'
        )}>
          Submit Feedback
        </h4>
        <textarea
          placeholder="Share your thoughts about the platform, suggest improvements, or report issues..."
          rows={4}
          className={clsx(
            'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4',
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
          )}
        />
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200">
          Submit Feedback
        </button>
      </div>

      <div className="space-y-4">
        {[
          {
            user: 'web3_explorer',
            feedback: 'The fairness scoring system is really innovative! Would love to see more transparency in how the scores are calculated.',
            timestamp: '2 hours ago',
            likes: 12,
          },
          {
            user: 'ai_researcher',
            feedback: 'Suggestion: Add a feature to compare different AI personas side by side to better understand their strengths.',
            timestamp: '1 day ago',
            likes: 8,
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              'p-4 rounded-lg border',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={clsx(
                'font-medium',
                darkMode ? 'text-white' : 'text-gray-900'
              )}>
                {item.user}
              </span>
              <span className={clsx(
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                {item.timestamp}
              </span>
            </div>
            <p className={clsx(
              'text-sm mb-3',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            )}>
              {item.feedback}
            </p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600">
                <span>👍</span>
                <span>{item.likes}</span>
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-600">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdmin = () => (
    <div className="space-y-6">
      <h3 className={clsx(
        'text-xl font-semibold',
        darkMode ? 'text-white' : 'text-gray-900'
      )}>
        Admin Panel
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={clsx(
          'p-6 rounded-xl border',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        )}>
          <h4 className={clsx(
            'font-semibold mb-4',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Manage Characters
          </h4>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
              Add New Character
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-200">
              Edit Existing Characters
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200">
              Remove Characters
            </button>
          </div>
        </div>

        <div className={clsx(
          'p-6 rounded-xl border',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        )}>
          <h4 className={clsx(
            'font-semibold mb-4',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Platform Settings
          </h4>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-200">
              Update Fairness Algorithm
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-200">
              Manage User Permissions
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200">
              System Maintenance
            </button>
          </div>
        </div>
      </div>

      <div className={clsx(
        'p-6 rounded-xl border',
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      )}>
        <h4 className={clsx(
          'font-semibold mb-4',
          darkMode ? 'text-white' : 'text-gray-900'
        )}>
          Platform Statistics
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: '1,234' },
            { label: 'Active Personas', value: '20' },
            { label: 'Total Interactions', value: '15,678' },
            { label: 'Avg. Fairness Score', value: '89.2' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">
                {stat.value}
              </div>
              <div className={clsx(
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
            <h1 className={clsx(
              'text-4xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              Community Hub
            </h1>
          </div>
          <p className={clsx(
            'text-xl max-w-2xl mx-auto',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            Participate in governance, share feedback, and help shape the future of FairPersona.
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
            { id: 'proposals', label: 'Proposals', icon: Vote },
            { id: 'feedback', label: 'Feedback', icon: MessageSquare },
            { id: 'admin', label: 'Admin', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={clsx(
                'flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
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
          {activeTab === 'proposals' && renderProposals()}
          {activeTab === 'feedback' && renderFeedback()}
          {activeTab === 'admin' && renderAdmin()}
        </motion.div>
      </div>
    </div>
  );
}