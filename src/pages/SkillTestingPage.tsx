import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Clock, Award, Filter, Search, Play, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { availableSkills, skillCategories, getDifficultyColor } from '../utils/skillsData';
import { Skill } from '../types';
import clsx from 'clsx';

interface SkillTestingPageProps {
  onNavigate?: (page: string) => void;
}

export function SkillTestingPage({ onNavigate }: SkillTestingPageProps) {
  const { darkMode, userCertifications } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills = availableSkills.filter(skill => {
    const matchesCategory = selectedCategory === 'All Categories' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isSkillCertified = (skillId: string) => {
    return userCertifications.some(cert => cert.skillId === skillId && cert.verified);
  };

  const handleStartTest = (skill: Skill) => {
    // Set the URL hash to navigate to test
    window.location.hash = `test/${skill.id}`;
    
    // If onNavigate is provided, use it to navigate
    if (onNavigate) {
      onNavigate('test');
    }
  };

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
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain size={24} className="text-white" />
            </div>
            <h1 className={clsx(
              'text-4xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              Skill Certification
            </h1>
          </div>
          <p className={clsx(
            'text-xl max-w-3xl mx-auto',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            Prove your expertise through AI-generated skill tests and earn verified NFT badges. 
            Only those who pass our rigorous assessments receive certification.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Available Skills', value: availableSkills.length, icon: '🎯' },
            { label: 'Your Certifications', value: userCertifications.length, icon: '🏆' },
            { label: 'Pass Rate', value: '73%', icon: '📊' },
            { label: 'Avg. Test Time', value: '22 min', icon: '⏱️' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={clsx(
                'p-6 rounded-xl text-center',
                darkMode ? 'bg-gray-800' : 'bg-white'
              )}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-indigo-500 mb-1">
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
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={clsx(
            'bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border',
            darkMode ? 'border-gray-700' : 'border-gray-200'
          )}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className={clsx(
                'absolute left-3 top-1/2 transform -translate-y-1/2',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              )} />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={clsx(
                  'w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                )}
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={clsx(
                'px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
              )}
            >
              {skillCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => {
            const isCertified = isSkillCertified(skill.id);
            
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={clsx(
                  'relative p-6 rounded-xl border transition-all duration-300 hover:shadow-lg',
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
                  isCertified && 'ring-2 ring-green-500/20'
                )}
              >
                {/* Certification Badge */}
                {isCertified && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle size={24} className="text-green-500" />
                  </div>
                )}

                {/* Skill Icon */}
                <div className="text-4xl mb-4">{skill.icon}</div>

                {/* Skill Info */}
                <h3 className={clsx(
                  'text-xl font-bold mb-2',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {skill.name}
                </h3>

                <p className={clsx(
                  'text-sm mb-4',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {skill.description}
                </p>

                {/* Skill Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className={clsx(
                      'text-sm',
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    )}>
                      Category
                    </span>
                    <span className={clsx(
                      'text-sm font-medium',
                      darkMode ? 'text-white' : 'text-gray-900'
                    )}>
                      {skill.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={clsx(
                      'text-sm',
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    )}>
                      Difficulty
                    </span>
                    <span className={clsx(
                      'px-2 py-1 text-xs font-medium rounded-full capitalize',
                      getDifficultyColor(skill.difficulty)
                    )}>
                      {skill.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={clsx(
                      'text-sm',
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    )}>
                      Est. Time
                    </span>
                    <span className={clsx(
                      'text-sm font-medium flex items-center',
                      darkMode ? 'text-white' : 'text-gray-900'
                    )}>
                      <Clock size={12} className="mr-1" />
                      {skill.estimatedTime} min
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={clsx(
                      'text-sm',
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    )}>
                      Pass Rate
                    </span>
                    <span className={clsx(
                      'text-sm font-medium',
                      darkMode ? 'text-white' : 'text-gray-900'
                    )}>
                      {skill.passThreshold}%
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartTest(skill)}
                  disabled={isCertified}
                  className={clsx(
                    'w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2',
                    isCertified
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                  )}
                >
                  {isCertified ? (
                    <>
                      <Award size={16} />
                      <span>Certified</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      <span>Start Test</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className={clsx(
              'text-6xl mb-4',
              darkMode ? 'text-gray-600' : 'text-gray-300'
            )}>
              🔍
            </div>
            <h3 className={clsx(
              'text-xl font-semibold mb-2',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            )}>
              No skills found
            </h3>
            <p className={clsx(
              'text-sm',
              darkMode ? 'text-gray-500' : 'text-gray-500'
            )}>
              Try adjusting your search terms or filters
            </p>
          </motion.div>
        )}
      </div>

      {/* Test Modal would go here */}
      <AnimatePresence>
        {selectedSkill && (
          <TestModal 
            skill={selectedSkill} 
            onClose={() => setSelectedSkill(null)}
            onStartTest={handleStartTest}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Test Modal Component
function TestModal({ 
  skill, 
  onClose, 
  onStartTest 
}: { 
  skill: Skill; 
  onClose: () => void;
  onStartTest: (skill: Skill) => void;
}) {
  const { darkMode } = useStore();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartTest = () => {
    setIsStarting(true);
    // Navigate to test interface
    setTimeout(() => {
      onClose();
      onStartTest(skill);
    }, 1000);
  };

  return (
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
          'max-w-md w-full rounded-2xl p-6',
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        )}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">{skill.icon}</div>
          <h2 className="text-2xl font-bold mb-2">{skill.name}</h2>
          <p className={clsx(
            'text-sm mb-6',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            {skill.description}
          </p>

          <div className={clsx(
            'p-4 rounded-lg mb-6',
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          )}>
            <h3 className="font-semibold mb-3">Test Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Questions:</span>
                <span>8-10</span>
              </div>
              <div className="flex justify-between">
                <span>Time Limit:</span>
                <span>{skill.estimatedTime} minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Pass Threshold:</span>
                <span>{skill.passThreshold}%</span>
              </div>
              <div className="flex justify-between">
                <span>Retake Policy:</span>
                <span>7 days</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className={clsx(
                'flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-200',
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              )}
            >
              Cancel
            </button>
            <button
              onClick={handleStartTest}
              disabled={isStarting}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white rounded-lg font-medium transition-all duration-200"
            >
              {isStarting ? 'Starting...' : 'Start Test'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}