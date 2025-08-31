import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Award, RefreshCw, Home, Share2, Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import { SkillTest } from '../types';
import clsx from 'clsx';

interface TestResultsPageProps {
  testResult: {
    test: SkillTest;
    result: {
      score: number;
      totalPoints: number;
      passed: boolean;
      feedback: string[];
    };
    skill: any;
  };
  onRetake: () => void;
  onHome: () => void;
}

export function TestResultsPage({ testResult, onRetake, onHome }: TestResultsPageProps) {
  const { darkMode, userCertifications, setUserCertifications } = useStore();
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const { test, result, skill } = testResult;
  const { score, passed, feedback } = result;

  const handleMintBadge = async () => {
    if (!passed) return;

    setIsMinting(true);

    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create certification
      const certification = {
        id: `cert_${Date.now()}`,
        userId: test.userId,
        skillId: skill.id,
        testId: test.id,
        score,
        certifiedAt: new Date().toISOString(),
        nftTokenId: `nft_${Math.random().toString(36).substr(2, 9)}`,
        verified: true
      };

      setUserCertifications([...userCertifications, certification]);
      setIsMinted(true);
    } catch (error) {
      console.error('Error minting badge:', error);
    } finally {
      setIsMinting(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 80) return 'from-blue-500 to-blue-600';
    if (score >= 70) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
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
          <div className={clsx(
            'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6',
            passed ? 'bg-green-500' : 'bg-red-500'
          )}>
            {passed ? (
              <CheckCircle size={48} className="text-white" />
            ) : (
              <XCircle size={48} className="text-white" />
            )}
          </div>

          <h1 className={clsx(
            'text-4xl font-bold mb-4',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            {passed ? 'Congratulations!' : 'Test Not Passed'}
          </h1>

          <p className={clsx(
            'text-xl',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            {passed 
              ? `You've successfully passed the ${skill.name} certification test!`
              : `You scored ${score}% but need ${skill.passThreshold}% to pass.`
            }
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={clsx(
            'p-8 rounded-2xl border mb-8',
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          )}
        >
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-4xl">{skill.icon}</div>
              <div>
                <h2 className={clsx(
                  'text-2xl font-bold',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {skill.name}
                </h2>
                <p className={clsx(
                  'text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Certification Test Results
                </p>
              </div>
            </div>

            {/* Score Display */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={darkMode ? '#374151' : '#E5E7EB'}
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 314} 314`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className={`stop-color-${passed ? 'green' : 'red'}-500`} />
                    <stop offset="100%" className={`stop-color-${passed ? 'green' : 'red'}-600`} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={clsx(
                    'text-3xl font-bold',
                    getScoreColor(score)
                  )}>
                    {score}%
                  </div>
                  <div className={clsx(
                    'text-xs',
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  )}>
                    Score
                  </div>
                </div>
              </div>
            </div>

            {/* Test Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={clsx(
                  'text-2xl font-bold mb-1',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {test.questions.length}
                </div>
                <div className={clsx(
                  'text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Questions
                </div>
              </div>
              <div className="text-center">
                <div className={clsx(
                  'text-2xl font-bold mb-1',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {Math.floor(test.timeSpent / 60)}m
                </div>
                <div className={clsx(
                  'text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Time Taken
                </div>
              </div>
              <div className="text-center">
                <div className={clsx(
                  'text-2xl font-bold mb-1',
                  passed ? 'text-green-500' : 'text-red-500'
                )}>
                  {passed ? 'PASS' : 'FAIL'}
                </div>
                <div className={clsx(
                  'text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Result
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={clsx(
            'p-6 rounded-xl border mb-8',
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          )}
        >
          <h3 className={clsx(
            'text-xl font-semibold mb-4',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Detailed Feedback
          </h3>
          <div className="space-y-2">
            {feedback.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  'p-3 rounded-lg text-sm',
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                )}
              >
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {passed ? (
            <>
              {!isMinted ? (
                <button
                  onClick={handleMintBadge}
                  disabled={isMinting}
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 text-white rounded-xl font-semibold text-lg transition-all duration-200"
                >
                  {isMinting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Minting NFT Badge...</span>
                    </>
                  ) : (
                    <>
                      <Award size={20} />
                      <span>Mint Certification Badge</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center space-x-2 px-8 py-4 bg-green-500 text-white rounded-xl font-semibold text-lg">
                  <CheckCircle size={20} />
                  <span>Badge Minted Successfully!</span>
                </div>
              )}

              <button
                onClick={onHome}
                className={clsx(
                  'flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200',
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                )}
              >
                <Home size={20} />
                <span>Back to Dashboard</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onRetake}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-200"
              >
                <RefreshCw size={20} />
                <span>Retake Test (Available in 7 days)</span>
              </button>

              <button
                onClick={onHome}
                className={clsx(
                  'flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200',
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                )}
              >
                <Home size={20} />
                <span>Back to Dashboard</span>
              </button>
            </>
          )}
        </motion.div>

        {/* Certificate Preview (if passed and minted) */}
        {passed && isMinted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={clsx(
              'mt-8 p-8 rounded-2xl border-2 border-dashed',
              darkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50/50'
            )}
          >
            <div className="text-center">
              <h3 className={clsx(
                'text-2xl font-bold mb-4',
                darkMode ? 'text-white' : 'text-gray-900'
              )}>
                🏆 Certification NFT Minted
              </h3>
              <p className={clsx(
                'text-sm mb-4',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                Your verified skill badge has been minted as an NFT and added to your profile.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200">
                  <Download size={16} />
                  <span>Download Certificate</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}