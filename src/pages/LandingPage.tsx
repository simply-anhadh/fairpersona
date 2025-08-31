import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users, Star, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ThreeScene } from '../components/ThreeScene';
import clsx from 'clsx';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { darkMode } = useStore();

  const features = [
    {
      icon: Shield,
      title: 'Fair AI Systems',
      description: 'Advanced algorithms ensure ethical and unbiased AI interactions with transparent scoring metrics.',
    },
    {
      icon: Zap,
      title: 'Web3 Integration',
      description: 'Blockchain-based identity and reputation system powered by ERC-7231 standards.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Decentralized governance where community members shape the future of AI personas.',
    },
    {
      icon: Star,
      title: 'Dynamic Reputation',
      description: 'Real-time reputation scoring based on interactions, contributions, and community feedback.',
    },
  ];

  const stats = [
    { label: 'AI Personas', value: '20+' },
    { label: 'Active Users', value: '1.2K' },
    { label: 'Interactions', value: '15K+' },
    { label: 'Trust Score', value: '95%' },
  ];

  return (
    <div className={clsx(
      'min-h-screen',
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    )}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center space-x-2 mb-6"
              >
                <Sparkles className="text-blue-500" size={24} />
                <span className={clsx(
                  'text-sm font-medium px-3 py-1 rounded-full',
                  darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                )}>
                  Web3 × AI Innovation
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  FairPersona
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={clsx(
                  'text-xl leading-relaxed mb-8',
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                )}
              >
                Where AI meets fairness and blockchain powers trust. Experience the future of 
                decentralized AI personas with transparent reputation systems and community governance.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('characterverse')}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg"
                >
                  <span>Explore Characters</span>
                  <ArrowRight size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('chat')}
                  className={clsx(
                    'flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 border-2',
                    darkMode
                      ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                  )}
                >
                  <span>Try AI Chat</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column - 3D Scene */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative h-96 lg:h-[500px]"
            >
              <ThreeScene />
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-10 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 blur-xl"
        />
      </section>

      {/* Stats Section */}
      <section className={clsx(
        'py-16 border-t',
        darkMode ? 'border-gray-800 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-blue-500 mb-2">
                  {stat.value}
                </div>
                <div className={clsx(
                  'text-sm font-medium',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Revolutionary AI × Web3 Platform
            </h2>
            <p className={clsx(
              'text-xl max-w-3xl mx-auto',
              darkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              Experience the next generation of AI interactions with transparent fairness metrics,
              blockchain-powered reputation, and community-driven governance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className={clsx(
                  'p-6 rounded-xl transition-all duration-300 hover:shadow-lg',
                  darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-xl'
                )}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className={clsx(
                  'text-sm leading-relaxed',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={clsx(
        'py-20 border-t',
        darkMode ? 'border-gray-800' : 'border-gray-200'
      )}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Enter the Future?
            </h2>
            <p className={clsx(
              'text-xl mb-8',
              darkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              Join thousands of users exploring fair AI, building reputation, and shaping 
              the future of decentralized intelligence.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('characterverse')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-semibold text-xl transition-all duration-200 shadow-lg"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}