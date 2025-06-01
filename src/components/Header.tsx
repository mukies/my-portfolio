'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { SlideTabs } from './SlideNavMenus';

// Position type for sliding tabs
type Position = {
  left: number;
  width: number;
  opacity: number;
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const headerVariants = {
    initial: { 
      y: -100, 
      opacity: 0,
      backdropFilter: "blur(0px)"
    },
    animate: { 
      y: 0, 
      opacity: 1,
      backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const logoVariants = {
    initial: { 
      scale: 0,
      rotate: -180
    },
    animate: { 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }
    },
    hover: {
      scale: 1.08,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const mobileMenuVariants = {
    initial: {
      opacity: 0,
      height: 0,
      y: -20
    },
    animate: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const mobileItemVariants = {
    initial: {
      x: -20,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      x: -20,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    hover: {
      x: 8,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      transition: {
        duration: 0.2
      }
    }
  };

  const hamburgerVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.9,
      transition: {
        duration: 0.1
      }
    }
  };

  const navItems = [
    { name: 'home', href: '#home' },
    { name: 'about', href: '#about' },
    { name: 'projects', href: '#projects' },
    { name: 'skills', href: '#skills' },
    { name: 'contact', href: '#contact' }
  ];

  // Sliding Tab Component
  const SlidingTab = ({ 
    children, 
    href,
    index
  }: { 
    children: string; 
    href: string;
    index: number;
  }) => {
    const ref = useRef<null | HTMLLIElement>(null);
    
    return (
      <li
        ref={ref}
        onMouseEnter={() => {
          if (!ref?.current) return;
          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        className="relative z-10 block cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 mix-blend-difference transition-colors duration-300 md:px-6 md:py-2.5 md:text-base"
      >
        <a href={href} className="block w-full h-full">
          {children}
        </a>
      </li>
    );
  };

  // Cursor Component
  const Cursor = ({ position }: { position: Position }) => {
    return (
      <motion.div
        animate={{
          left: position.left,
          width: position.width,
          opacity: position.opacity,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.6,
          velocity: 2
        }}
        className="absolute z-0 h-8 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400 md:h-10"
        style={{
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      />
    );
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 dark:bg-black/85 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20'
          : 'bg-transparent border-transparent'
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold relative"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          <motion.a 
            href="#" 
            className="relative inline-block"
          >
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              MY
            </motion.span>
            <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400">
              PORTFOLIO
            </span>
          </motion.a>
        </motion.div>

        {/* Desktop Navigation - Sliding Tabs */}
        <nav className="hidden md:flex items-center space-x-6">
          <motion.ul
            onMouseLeave={() => {
              setPosition((pv) => ({
                ...pv,
                opacity: 0,
              }));
            }}
            className="relative flex w-fit rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: {
                duration: 0.6,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
          >
            <SlideTabs navLinks={navItems}/>

            {/* {navItems.map((item, index) => (
              <SlidingTab 
                key={item} 
                href={`#${item.toLowerCase()}`}
                index={index}
              >
                {item}
              </SlidingTab>
            ))} */}
            <Cursor position={position} />
          </motion.ul>
          
          {/* Theme Toggle */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              transition: {
                duration: 0.6,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 180,
              transition: { duration: 0.3 }
            }}
          >
          </motion.div>
        </nav>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              transition: {
                duration: 0.6,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 180,
              transition: { duration: 0.3 }
            }}
          >
          </motion.div>
          
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
            variants={hamburgerVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <div className="w-6 flex flex-col items-end justify-center gap-1.5">
              <motion.span 
                className="block h-0.5 bg-current"
                animate={{
                  width: mobileMenuOpen ? "24px" : "24px",
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span 
                className="block h-0.5 bg-current"
                animate={{
                  width: mobileMenuOpen ? "0px" : "16px",
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span 
                className="block h-0.5 bg-current"
                animate={{
                  width: mobileMenuOpen ? "24px" : "20px",
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="md:hidden absolute left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-t border-gray-200/20 dark:border-gray-700/20 overflow-hidden"
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ul className="flex flex-col py-4">
              {navItems.map((item, index) => (
                <motion.li 
                  key={index}
                  variants={mobileItemVariants}
                  custom={index}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.a
                    href={`${item.href.toLowerCase()}`}
                    className="block py-4 px-6 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium relative"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    <motion.div
                      className="absolute left-0 top-0 w-1 h-full bg-blue-600 dark:bg-blue-400"
                      initial={{ scaleY: 0 }}
                      whileHover={{
                        scaleY: 1,
                        transition: { duration: 0.2 }
                      }}
                      style={{ originY: 0.5 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}