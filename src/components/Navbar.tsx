import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, User, Menu, X, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { WalletButton } from './WalletButton';
import { AuthModal } from './AuthModal';
import { AuthService } from '../services/authService';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Navbar({ currentPage = 'home', onNavigate }: NavbarProps) {
  const { darkMode, toggleDarkMode, user, isAuthenticated, setUser, setIsAuthenticated } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'characterverse', label: 'Characterverse' },
    { id: 'chat', label: 'AI Chat' },
    { id: 'skills', label: 'Skill Testing' },
    { id: 'profile', label: 'Profile' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'mint', label: 'Mint Avatar' },
    { id: 'community', label: 'Community' },
  ];

  const handleNavigation = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await AuthService.signOut();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Signed out successfully');
      handleNavigation('home');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300',
          darkMode 
            ? 'bg-gray-900/80 border-gray-700 text-white' 
            : 'bg-white/80 border-gray-200 text-gray-900'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleNavigation('home')}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FP</span>
              </div>
              <span className="font-bold text-xl">FairPersona</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(item.id)}
                  className={clsx(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    currentPage === item.id
                      ? 'bg-indigo-500 text-white'
                      : darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className={clsx(
                  'p-2 rounded-lg transition-colors duration-200',
                  darkMode
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Authentication */}
              {isAuthenticated && user ? (
                <>
                  {/* Wallet Button */}
                  <WalletButton />

                  {/* User Profile */}
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleNavigation('profile')}
                      className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    >
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium hidden sm:block">
                        {user.username}
                      </span>
                    </motion.button>

                    {/* Sign Out */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSignOut}
                      className={clsx(
                        'p-2 rounded-lg transition-colors duration-200',
                        darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      <LogOut size={16} />
                    </motion.button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openAuthModal('signin')}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
                      darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={clsx(
                      'block w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                      currentPage === item.id
                        ? 'bg-indigo-500 text-white'
                        : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}