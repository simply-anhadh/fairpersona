import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { darkMode } = useStore();

  return (
    <div className={clsx(
      'min-h-screen transition-colors duration-300',
      darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    )}>
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16"
      >
        {children}
      </motion.main>
    </div>
  );
}