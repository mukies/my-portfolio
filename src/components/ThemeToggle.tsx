'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center p-1 overflow-hidden"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className="w-4 h-4 rounded-full bg-white shadow-md z-10"
        animate={{ x: theme === 'dark' ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
        <span className="text-xs text-yellow-500">☀️</span>
        <span className="text-xs text-blue-300">🌙</span>
      </div>
    </motion.button>
  );
}
