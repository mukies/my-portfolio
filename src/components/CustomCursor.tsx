'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Short delay before showing cursor to prevent initial animation from wrong position
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsActive(true);
    };

    const handleMouseUp = () => {
      setIsActive(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if the target is clickable
      const target = e.target as HTMLElement;
      const clickableElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL'];
      const isClickable = 
        clickableElements.includes(target.tagName) || 
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
    //   setIsPointer(isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Clean up event listeners
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

  // Hide the default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    // Add cursor: none to all clickable elements
    const elements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    elements.forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      document.body.style.cursor = 'auto';
      elements.forEach((el) => {
        (el as HTMLElement).style.cursor = '';
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - (isPointer ? 16 : 8),
          y: mousePosition.y - (isPointer ? 16 : 8),
          scale: isActive ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 800,
          damping: 20,
          ease: "circOut"
        }}
      >
        <div 
          className={`
            bg-white rounded-full 
            ${isPointer ? 'w-8 h-8 border-2 border-white bg-transparent' : 'w-4 h-4'}
            transition-all duration-100
          `}
        />
      </motion.div>
      
      {/* Secondary larger cursor with more delay for interesting effect */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isActive ? 1.5 : isPointer ? 1.2 : 0,
          opacity: (isActive || isPointer) && isVisible ? 0.3 : 0,
        }}
        transition={{
          type: "spring",
          mass: 1.5,
          stiffness: 200,
          damping: 25,
          ease: "circOut",
          opacity: { duration: 0.2 }
        }}
      >
        <div className="w-12 h-12 bg-white rounded-full" />
      </motion.div>
    </>
  );
}