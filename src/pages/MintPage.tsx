import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload, Zap, Check, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AIPersona, Badge } from '../types';
import clsx from 'clsx';

export function MintPage() {
  const { darkMode, personas, setPersonas, userCertifications } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    aiType: 'GPT-4' as 'GPT-4' | 'Claude' | 'Gemini' | 'LLaMA' | 'Custom',
    description: '',
    specialties: '',
    avatar: '',
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [mintedPersona, setMintedPersona] = useState<AIPersona | null>(null);
  const [showSkillWarning, setShowSkillWarning] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Check if specialties require skill verification
    if (field === 'specialties') {
      const specialtiesList = value.split(',').map(s => s.trim().toLowerCase());
      const hasUnverifiedSkills = specialtiesList.some(specialty => {
        return !userCertifications.some(cert => 
          cert.verified && cert.skillId.toLowerCase().includes(specialty)
        );
      });
      setShowSkillWarning(hasUnverifiedSkills && value.trim() !== '');
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const generateRandomAvatar = () => {
    const avatarId = Math.floor(Math.random() * 1000000) + 1000000;
    return `https://images.pexels.com/photos/${avatarId}/pexels-photo-${avatarId}.jpeg?auto=compress&cs=tinysrgb&w=200`;
  };

  const handleMint = async () => {
    // Check for skill verification
    const specialtiesList = formData.specialties.split(',').map(s => s.trim());
    const unverifiedSkills = specialtiesList.filter(specialty => {
      return !userCertifications.some(cert => 
        cert.verified && cert.skillId.toLowerCase().includes(specialty.toLowerCase())
      );
    });

    if (unverifiedSkills.length > 0) {
      alert(`Please verify these skills first: ${unverifiedSkills.join(', ')}`);
      return;
    }

    setIsLoading(true);
    
    // Simulate minting process
    setTimeout(() => {
      // Create verified badges from certifications
      const verifiedBadges: Badge[] = userCertifications
        .filter(cert => cert.verified)
        .map(cert => ({
          id: cert.id,
          name: `Verified ${cert.skillId}`,
          icon: '✅',
          color: 'green',
          rarity: 'epic' as const,
          verified: true,
          score: cert.score,
          verifiedAt: cert.certifiedAt
        }));

      // Create the new persona
      const newPersona: AIPersona = {
        id: (personas.length + 1).toString(),
        name: formData.name,
        role: formData.role,
        aiType: formData.aiType,
        avatar: formData.avatar || generateRandomAvatar(),
        fairnessScore: Math.floor(Math.random() * 20) + 80,
        trustScore: Math.floor(Math.random() * 20) + 80,
        contributionIndex: Math.floor(Math.random() * 20) + 80,
        description: formData.description,
        specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
        createdAt: new Date().toISOString(),
        interactions: 0,
        reputation: Math.floor(Math.random() * 1000) + 1000,
        badges: [
          ...verifiedBadges,
          {
            id: 'new-1',
            name: 'Newcomer',
            icon: '🌟',
            color: 'blue',
            rarity: 'common'
          }
        ],
      };

      // Add to personas list
      setPersonas([...personas, newPersona]);
      setMintedPersona(newPersona);
      setIsLoading(false);
      setIsComplete(true);
    }, 3000);
  };

  const handleMintAnother = () => {
    setFormData({
      name: '',
      role: '',
      aiType: 'GPT-4',
      description: '',
      specialties: '',
      avatar: '',
    });
    setStep(1);
    setIsComplete(false);
    setMintedPersona(null);
    setShowSkillWarning(false);
  };

  // Validation functions for each step
  const isStep1Valid = () => {
    return formData.name.trim() !== '' && 
           formData.role.trim() !== '' && 
           formData.description.trim() !== '';
  };

  const isStep2Valid = () => {
    return formData.specialties.trim() !== '';
  };

  const canProceedToNext = () => {
    if (step === 1) return isStep1Valid();
    if (step === 2) return isStep2Valid();
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className={clsx(
              'text-xl font-semibold',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              Basic Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={clsx(
                  'block text-sm font-medium mb-2',
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                )}>
                  Persona Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Dr. Alex Smith"
                  className={clsx(
                    'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  )}
                />
              </div>

              <div>
                <label className={clsx(
                  'block text-sm font-medium mb-2',
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                )}>
                  Role/Title *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="AI Research Scientist"
                  className={clsx(
                    'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  )}
                />
              </div>
            </div>

            <div>
              <label className={clsx(
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              )}>
                AI Type *
              </label>
              <select
                value={formData.aiType}
                onChange={(e) => handleInputChange('aiType', e.target.value)}
                className={clsx(
                  'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                )}
              >
                <option value="GPT-4">GPT-4</option>
                <option value="Claude">Claude</option>
                <option value="Gemini">Gemini</option>
                <option value="LLaMA">LLaMA</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className={clsx(
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              )}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your AI persona's expertise and personality..."
                rows={4}
                className={clsx(
                  'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                )}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className={clsx(
              'text-xl font-semibold',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              Skills & Verification
            </h3>

            {/* Skill Verification Warning */}
            <div className={clsx(
              'p-4 rounded-lg border-l-4 border-amber-500',
              darkMode ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-800'
            )}>
              <div className="flex items-start">
                <AlertTriangle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Skill Verification Required</h4>
                  <p className="text-sm">
                    All claimed specialties must be verified through our skill testing system before minting. 
                    Unverified skills will prevent the minting process.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className={clsx(
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              )}>
                Specialties (comma-separated) *
              </label>
              <input
                type="text"
                value={formData.specialties}
                onChange={(e) => handleInputChange('specialties', e.target.value)}
                placeholder="React Developer, UI/UX Designer, Data Scientist"
                className={clsx(
                  'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  showSkillWarning ? 'border-red-500' : '',
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                )}
              />
              {showSkillWarning && (
                <p className="text-red-500 text-sm mt-2">
                  ⚠️ Some specialties require skill verification. Please complete skill tests first.
                </p>
              )}
            </div>

            {/* Verified Skills Display */}
            {userCertifications.length > 0 && (
              <div>
                <h4 className={clsx(
                  'font-medium mb-3',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  Your Verified Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userCertifications.map(cert => (
                    <span
                      key={cert.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      <Check size={12} className="mr-1" />
                      {cert.skillId} ({cert.score}%)
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className={clsx(
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              )}>
                Avatar URL (optional)
              </label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => handleInputChange('avatar', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className={clsx(
                  'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                )}
              />
              <p className={clsx(
                'text-sm mt-2',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                Leave empty to auto-generate a random avatar
              </p>
            </div>

            <div className={clsx(
              'border-2 border-dashed rounded-lg p-8 text-center',
              darkMode ? 'border-gray-600' : 'border-gray-300'
            )}>
              <Upload size={48} className={clsx(
                'mx-auto mb-4',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              )} />
              <p className={clsx(
                'text-lg font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              )}>
                Upload Avatar Image
              </p>
              <p className={clsx(
                'text-sm',
                darkMode ? 'text-gray-500' : 'text-gray-500'
              )}>
                Drag and drop or click to browse (JPG, PNG, GIF up to 5MB)
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
                Choose File
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className={clsx(
              'text-xl font-semibold',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              Review & Mint
            </h3>

            <div className={clsx(
              'p-6 rounded-lg border',
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            )}>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={clsx(
                    'font-semibold text-lg mb-1',
                    darkMode ? 'text-white' : 'text-gray-900'
                  )}>
                    {formData.name || 'Unnamed Persona'}
                  </h4>
                  <p className={clsx(
                    'text-sm mb-2',
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  )}>
                    {formData.role || 'No role specified'} • {formData.aiType}
                  </p>
                  <p className={clsx(
                    'text-sm',
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  )}>
                    {formData.description || 'No description provided'}
                  </p>
                  {formData.specialties && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.specialties.split(',').map((specialty, index) => {
                        const isVerified = userCertifications.some(cert => 
                          cert.verified && cert.skillId.toLowerCase().includes(specialty.trim().toLowerCase())
                        );
                        return (
                          <span
                            key={index}
                            className={clsx(
                              'px-2 py-1 text-xs rounded-full flex items-center',
                              isVerified
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            )}
                          >
                            {isVerified ? <Check size={10} className="mr-1" /> : <AlertTriangle size={10} className="mr-1" />}
                            {specialty.trim()}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={clsx(
              'p-4 rounded-lg',
              darkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'
            )}>
              <h5 className={clsx(
                'font-medium mb-2',
                darkMode ? 'text-blue-300' : 'text-blue-800'
              )}>
                Minting Details
              </h5>
              <ul className={clsx(
                'text-sm space-y-1',
                darkMode ? 'text-blue-200' : 'text-blue-700'
              )}>
                <li>• All claimed skills have been verified through testing</li>
                <li>• Initial fairness score will be calculated based on community feedback</li>
                <li>• Your persona will be added to the Characterverse</li>
                <li>• You'll receive a unique NFT representing ownership</li>
                <li>• Minting cost: 0.01 ETH + gas fees</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <div className={clsx(
        'min-h-screen py-8',
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      )}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={48} className="text-white" />
            </div>
            <h1 className={clsx(
              'text-4xl font-bold mb-4',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              Persona Minted Successfully!
            </h1>
            <p className={clsx(
              'text-xl mb-8',
              darkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              Your AI persona "{mintedPersona?.name}" has been successfully minted with verified skills and added to the Characterverse.
            </p>
            
            {/* Show minted persona preview */}
            {mintedPersona && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={clsx(
                  'p-6 rounded-xl border mb-8 max-w-md mx-auto',
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                )}
              >
                <img
                  src={mintedPersona.avatar}
                  alt={mintedPersona.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 ring-4 ring-blue-500/20"
                />
                <h3 className={clsx(
                  'font-semibold text-lg mb-1',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {mintedPersona.name}
                </h3>
                <p className={clsx(
                  'text-sm mb-3',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {mintedPersona.role}
                </p>
                <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                  <div className="text-center">
                    <div className="font-bold text-green-500">{mintedPersona.fairnessScore}</div>
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Fairness</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-500">{mintedPersona.trustScore}</div>
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Trust</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-500">{mintedPersona.contributionIndex}</div>
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Contribution</div>
                  </div>
                </div>
                
                {/* Verified Badges */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {mintedPersona.badges.filter(b => b.verified).map(badge => (
                    <span
                      key={badge.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      {badge.icon} Verified
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleMintAnother}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200"
              >
                Mint Another
              </button>
              <button 
                onClick={() => window.location.href = '#characterverse'}
                className={clsx(
                  'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                )}
              >
                View in Characterverse
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(
      'min-h-screen py-8',
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Zap size={24} className="text-white" />
            </div>
            <h1 className={clsx(
              'text-4xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              Mint AI Avatar
            </h1>
          </div>
          <p className={clsx(
            'text-xl max-w-2xl mx-auto',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            Create your own AI persona with verified skills, custom attributes, and fairness metrics.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center mb-8"
        >
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                step >= stepNumber
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-200 text-gray-500'
              )}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={clsx(
                  'w-16 h-1 mx-2',
                  step > stepNumber
                    ? 'bg-blue-500'
                    : darkMode
                    ? 'bg-gray-700'
                    : 'bg-gray-200'
                )} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={clsx(
            'bg-white dark:bg-gray-800 rounded-xl p-8 border',
            darkMode ? 'border-gray-700' : 'border-gray-200'
          )}
        >
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className={clsx(
                'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
                step === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              )}
            >
              Previous
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceedToNext()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleMint}
                disabled={isLoading || !isStep1Valid() || !isStep2Valid() || showSkillWarning}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Minting...</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    <span>Mint Persona</span>
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}