'use client';
import { useState, useEffect, useRef, JSX } from 'react';
import { motion } from 'framer-motion';

interface MousePosition {
  x: number;
  y: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface CursorSizes {
  main: number;
  secondary: number;
}

type CursorVariant = 'default' | 'pointer' | 'text';

export default function CustomCursor(): JSX.Element {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef<number>(0);

  // Create ripple effect on click
  const createRipple = (x: number, y: number): void => {
    const id = rippleIdRef.current++;
    const newRipple: Ripple = { id, x, y };
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 800);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const updateMousePosition = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent): void => {
      setIsActive(true);
      createRipple(e.clientX, e.clientY);
    };

    const handleMouseUp = (): void => {
      setIsActive(false);
    };

    const handleMouseLeave = (): void => {
      setIsVisible(false);
    };

    const handleMouseEnter = (): void => {
      setIsVisible(true);
    };

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const isHoverable = target.matches('a, button, input, textarea, select, [role="button"], .hoverable, [data-cursor="pointer"]');
      const isText = target.matches('p, h1, h2, h3, h4, h5, h6, span, div[contenteditable], textarea');
      
      if (isHoverable) {
        setIsHovering(true);
        setCursorVariant('pointer');
      } else if (isText) {
        setIsHovering(false);
        setCursorVariant('text');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    // Event listeners
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Hide default cursor
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
      body { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const getCursorSize = (): CursorSizes => {
    switch (cursorVariant) {
      case 'pointer': 
        return { main: 20, secondary: 60 };
      case 'text': 
        return { main: 2, secondary: 40 };
      default: 
        return { main: 12, secondary: 50 };
    }
  };

  const sizes: CursorSizes = getCursorSize();

  return (
    <>
      {/* Ripple effects */}
      {ripples.map((ripple: Ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed hidden lg:block top-0 left-0 z-[99998] pointer-events-none"
          initial={{ 
            x: ripple.x - 15,
            y: ripple.y - 15,
            scale: 0,
            opacity: 0.6
          }}
          animate={{ 
            scale: 3,
            opacity: 0
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          <div className="w-8 h-8 border-2 border-white/50 rounded-full mix-blend-difference" />
        </motion.div>
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed hidden lg:block top-0 left-0 z-[99999] pointer-events-none"
        animate={{
          x: mousePosition.x - sizes.main / 2,
          y: mousePosition.y - sizes.main / 2,
          scale: isActive ? 0.7 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.05,
          stiffness: 2000,
          damping: 30,
          opacity: { duration: 0.2 }
        }}
      >
        <div className="relative">
          {cursorVariant === 'text' ? (
            <div className="w-0.5 h-6 bg-white mix-blend-difference rounded-full" />
          ) : cursorVariant === 'pointer' ? (
            <div className="w-5 h-5 border-2 border-white bg-white/10 rounded-full mix-blend-difference backdrop-blur-sm" />
          ) : (
            <div className="w-3 h-3 bg-white rounded-full mix-blend-difference shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-80 animate-pulse" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Secondary cursor with trail effect */}
      <motion.div
        className="fixed hidden lg:block top-0 left-0 z-[99998] pointer-events-none"
        animate={{
          x: mousePosition.x - sizes.secondary / 2,
          y: mousePosition.y - sizes.secondary / 2,
          scale: isActive ? 1.8 : isHovering ? 1.5 : cursorVariant === 'text' ? 2 : 1,
          opacity: isVisible ? (isHovering || isActive ? 0.15 : 0.08) : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 2000,
          damping: 30,
          opacity: { duration: 0.3 }
        }}
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-full mix-blend-difference">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full" />
            <div className="absolute inset-2 bg-gradient-to-tl from-cyan-300 to-blue-200 rounded-full opacity-60" />
          </div>
        </div>
      </motion.div>

      {/* Tertiary ambient glow */}
      <motion.div
        className="fixed top-0 left-0 z-[99997] pointer-events-none"
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          scale: isActive ? 2.5 : isHovering ? 2 : 1.2,
          opacity: isVisible ? (isActive ? 0.12 : isHovering ? 0.06 : 0.03) : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.8,
          stiffness: 2000,
          damping: 30,
          opacity: { duration: 0.5 }
        }}
      >
        <div className="w-20 h-20 bg-gradient-radial from-white/20 via-blue-200/10 to-transparent rounded-full blur-xl" />
      </motion.div>
    </>
  );
}