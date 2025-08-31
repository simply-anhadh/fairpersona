import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthService } from '../services/authService';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const signInSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const signUpSchema = yup.object({
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const { darkMode, setUser, setIsAuthenticated } = useStore();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(mode === 'signin' ? signInSchema : signUpSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (mode === 'signin') {
        const user = await AuthService.signIn(data.email, data.password);
        setUser(user);
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${user.username}!`);
      } else {
        const user = await AuthService.signUp(data.email, data.password, data.username);
        setUser(user);
        setIsAuthenticated(true);
        toast.success(`Welcome to FairPersona, ${user.username}!`);
      }
      onClose();
      reset();
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    reset();
  };

  if (!isOpen) return null;

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
            'w-full max-w-md rounded-2xl p-8 relative',
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
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">FP</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className={clsx(
              'text-sm',
              darkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              {mode === 'signin' 
                ? 'Sign in to access your skill certifications' 
                : 'Join FairPersona and start building your reputation'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {mode === 'signup' && (
              <div>
                <label className={clsx(
                  'block text-sm font-medium mb-2',
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                )}>
                  Username
                </label>
                <div className="relative">
                  <User size={20} className={clsx(
                    'absolute left-3 top-1/2 transform -translate-y-1/2',
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  )} />
                  <input
                    {...register('username')}
                    type="text"
                    placeholder="Enter your username"
                    className={clsx(
                      'w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                      errors.username ? 'border-red-500' : '',
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    )}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>
            )}

            <div>
              <label className={clsx(
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              )}>
                Email
              </label>
              <div className="relative">
                <Mail size={20} className={clsx(
                  'absolute left-3 top-1/2 transform -translate-y-1/2',
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                )} />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email"
                  className={clsx(
                    'w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                    errors.email ? 'border-red-500' : '',
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className={clsx(
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              )}>
                Password
              </label>
              <div className="relative">
                <Lock size={20} className={clsx(
                  'absolute left-3 top-1/2 transform -translate-y-1/2',
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                )} />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={clsx(
                    'w-full pl-10 pr-12 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                    errors.password ? 'border-red-500' : '',
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={clsx(
                    'absolute right-3 top-1/2 transform -translate-y-1/2',
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {mode === 'signup' && (
              <div>
                <label className={clsx(
                  'block text-sm font-medium mb-2',
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                )}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={20} className={clsx(
                    'absolute left-3 top-1/2 transform -translate-y-1/2',
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  )} />
                  <input
                    {...register('confirmPassword')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className={clsx(
                      'w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                      errors.confirmPassword ? 'border-red-500' : '',
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    )}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>{mode === 'signin' ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : (
                <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="text-center mt-6">
            <p className={clsx(
              'text-sm',
              darkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={switchMode}
                className="ml-1 text-indigo-500 hover:text-indigo-600 font-medium"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}