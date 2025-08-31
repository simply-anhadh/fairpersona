import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, LogOut, Link } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Web3Service } from '../services/web3Service';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export function WalletButton() {
  const { isConnected, setIsConnected, user, setUser, darkMode } = useStore();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    setIsConnecting(true);
    try {
      const address = await Web3Service.connectWallet();
      
      // Update user profile with wallet address
      const updatedUser = { ...user, address, walletConnected: true };
      setUser(updatedUser);
      setIsConnected(true);
      
      toast.success('Wallet connected successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    if (user) {
      const updatedUser = { ...user, address: '', walletConnected: false };
      setUser(updatedUser);
    }
    setIsConnected(false);
    toast.success('Wallet disconnected');
  };

  if (isConnected && user?.address) {
    return (
      <div className="flex items-center space-x-2">
        <div className={clsx(
          'px-3 py-2 rounded-lg text-sm font-mono',
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
        )}>
          {user.address.slice(0, 6)}...{user.address.slice(-4)}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={disconnectWallet}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
        >
          <LogOut size={16} />
          <span className="text-sm font-medium">Disconnect</span>
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={connectWallet}
      disabled={isConnecting || !user}
      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200"
    >
      {isConnecting ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Connecting...</span>
        </>
      ) : (
        <>
          <Wallet size={16} />
          <span className="text-sm font-medium">Connect Wallet</span>
        </>
      )}
    </motion.button>
  );
}