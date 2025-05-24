'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '@/lib/data';

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Enhanced parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Multiple parallax layers with different speeds
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x * 50);
        mouseY.set(y * 50);
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section 
      id="projects" 
      className="relative py-32 md:py-40 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-blue-950/30 dark:to-indigo-950 overflow-hidden" 
      ref={containerRef}
    >
      {/* Dynamic parallax background elements */}
      <motion.div 
        className="absolute inset-0 opacity-60"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/15 to-pink-400/15 rounded-full blur-2xl"></div>
      </motion.div>

      {/* Mouse-following spotlight effect */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 50%)`
        }}
      />

      {/* Floating geometric shapes with parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: floatingY, x: mouseXSpring }}
      >
        <div className="absolute top-20 right-1/4 w-4 h-4 bg-blue-500/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/5 w-6 h-6 bg-purple-500/20 rotate-45"></div>
        <div className="absolute top-1/3 left-3/4 w-8 h-1 bg-cyan-500/40 rounded-full"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header with enhanced parallax */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-24"
          style={{ 
            y: headerY,
            x: useTransform(mouseXSpring, [-50, 50], [-10, 10])
          }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-8 border border-blue-200/50 dark:border-blue-800/50 shadow-lg"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Featured Portfolio
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-300 dark:to-purple-300 mb-8 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Creative{' '}
            <motion.span 
              className="relative inline-block"
              whileHover={{ rotateY: 15, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Projects
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-80"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Discover innovative solutions and creative implementations that push the boundaries of modern web development.
          </motion.p>
        </motion.div>
        
        {/* Enhanced Projects Grid with Parallax Cards */}
        <motion.div 
          className="space-y-40"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-20`}
              variants={itemVariants}
              style={{ 
                y: useTransform(scrollYProgress, [0, 1], [0, (index + 1) * -30])
              }}
            >
              {/* Enhanced Project Card */}
              <div className="flex-1 relative group perspective-1000">
                <motion.div
                  className="relative"
                  style={{
                    y: cardY,
                    x: useTransform(mouseXSpring, [-50, 50], [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20])
                  }}
                  whileHover={{ 
                    rotateY: index % 2 === 0 ? 5 : -5,
                    rotateX: -2,
                    z: 50
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Card glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Main card */}
                  <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl  shadow-2xl border border-white/20 dark:border-gray-700/30">
                    {/* Image section with enhanced parallax */}
                    <div className="relative  aspect-[16/10] ">
                      <motion.div
                        className="absolute inset-0 rounded-3xl overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </motion.div>
                      
                      {/* Floating action buttons with parallax */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0.8, y: 20 }}
                        whileHover={{ scale: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.a
                          href={project.demoUrl}
                          className="px-8 py-4 bg-white/95 backdrop-blur-sm text-gray-900 rounded-2xl font-bold hover:bg-white transition-all duration-300 shadow-xl border border-white/50"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Live Demo
                          </span>
                        </motion.a>
                        
                        <motion.a
                          href={project.codeUrl}
                          className="px-8 py-4 bg-gray-900/95 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-gray-800 transition-all duration-300 shadow-xl border border-gray-700/50"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Source
                          </span>
                        </motion.a>
                      </motion.div>

                      {/* Floating project number with parallax */}
                      <motion.div
                        className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-2xl border-4 border-white dark:border-gray-900"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.2 + 0.6, duration: 0.8, type: "spring", bounce: 0.4 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        style={{
                          y: useTransform(scrollYProgress, [0, 1], [0, -20])
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.div>
                    </div>

                    {/* Enhanced card content */}
                    <div className="p-8 lg:p-10">
                      {/* Status indicator */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          Live Project
                        </span>
                      </div>

                      {/* Tech stack preview */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-semibold border border-blue-200/50 dark:border-blue-800/50"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: tagIndex * 0.1 + 0.4 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-medium">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Project Content with Parallax */}
              <motion.div 
                className="flex-1 space-y-8"
                style={{
                  y: useTransform(scrollYProgress, [0, 1], [0, (index + 1) * 20]),
                  x: useTransform(mouseXSpring, [-50, 50], [index % 2 === 0 ? 10 : -10, index % 2 === 0 ? -10 : 10])
                }}
              >
                <div className="space-y-6">
                  <motion.h3 
                    className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
                    layoutId={`title-${project.id}`}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Full tech stack */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Technical Implementation
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tagIndex}
                        className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: tagIndex * 0.1 + 0.5 }}
                        whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {tag}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Enhanced action buttons */}
                <div className="flex gap-6 pt-6">
                  <motion.a
                    href={project.demoUrl}
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Explore Live</span>
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </motion.svg>
                  </motion.a>
                  
                  <motion.a
                    href={project.codeUrl}
                    className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Code
                    </span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced CTA with Parallax */}
        <motion.div
          className="text-center mt-40 pt-20 border-t border-gray-200/50 dark:border-gray-800/50"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            y: useTransform(scrollYProgress, [0.8, 1], [0, -50])
          }}
        >
          <motion.div
            className="max-w-3xl mx-auto space-y-8"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
              Ready to bring your vision to life?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Let's collaborate on your next groundbreaking project and create something extraordinary together.
            </p>
            
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-100 text-white dark:text-gray-900 rounded-2xl font-bold hover:from-gray-800 hover:to-blue-800 dark:hover:from-gray-100 dark:hover:to-blue-200 transition-all duration-300 shadow-2xl"
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">Start Your Project</span>
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}