'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  // Disable parallax on mobile to prevent overlap issues
  const backgroundY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "20%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "5%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Simplified image variants to reduce glitchiness
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const statsData = [
    { number: "2+", label: "Years Experience", icon: "🚀" },
    { number: "50+", label: "Projects Completed", icon: "💼" },
    { number: "25+", label: "Happy Clients", icon: "😊" },
    { number: "24/7", label: "Support Available", icon: "⏰" }
  ];

  const [particlePositions, setParticlePositions] = useState<Array<{left: number, top: number, duration: number, delay: number}>>([]);
  
  useEffect(() => {
    // Generate fewer particles on mobile for better performance
    const particleCount = isMobile ? 3 : 6;
    const positions = Array.from({ length: particleCount }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2
    }));
    setParticlePositions(positions);
  }, [isMobile]);

  return (
    <section 
      id='about'
      ref={parallaxRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-900 px-4 sm:px-6 lg:px-8"
    >
      {/* Simplified Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-10 sm:opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-blue-600/10 to-purple-600/10" />
        <div className="absolute inset-0">
          {particlePositions.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Reduced Floating Shapes on Mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: isMobile ? 3 : 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-sm"
            style={{
              width: `${40 + i * 15}px`,
              height: `${40 + i * 15}px`,
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10" ref={containerRef}>
        <motion.div
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Content Section - First on Mobile */}
          <motion.div 
            className="order-1 lg:order-2"
            style={{ y: textY }}
          >
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent leading-tight">
                About Me
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-full" />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                Hello! I'm <span className="text-blue-400 font-semibold">Mukesh Bhattarai</span>, a passionate Frontend Developer with 2 years+ of experience building responsive, user-friendly web applications using React.js, Next.js, and Tailwind CSS.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed">
                I specialize in turning UI designs into clean, performant code and have worked on several live e-commerce and CMS platforms with integrated payment systems like Stripe, eSewa, and Khalti. My focus is always on delivering smooth user experiences, optimized performance, and scalable frontends.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed">
                Whether it's crafting pixel-perfect components, integrating APIs, or collaborating with teams to bring ideas to life, I enjoy the process of solving real-world problems through code.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.a
                href="#contact"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg overflow-hidden text-center"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
                  Let's Collaborate 
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>

              <motion.a
                href="/cv/mukesh-cv-frontend.pdf"
                target='_blank'
                className="group px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-center"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                  Download CV 
                  <span className="text-sm">📄</span>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image Section - Second on Mobile */}
          <motion.div 
            variants={imageVariants} 
            className="relative order-2 lg:order-1 mt-8 lg:mt-0"
            ref={imageRef}
            style={{ y: imageY }}
          >
            {/* Simplified Background Effects */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-emerald-500/20 transform rotate-3 sm:rotate-6 scale-105 sm:scale-110 blur-xl opacity-20 sm:opacity-30" />
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-bl from-emerald-500/15 via-blue-500/15 to-purple-500/15 transform -rotate-2 sm:-rotate-3 scale-102 sm:scale-105 blur-lg opacity-30 sm:opacity-40" />
            
            {/* Main Image Container */}
            <motion.div
              className="relative rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"
              whileHover={{ 
                scale: isMobile ? 1 : 1.02,
                transition: { duration: 0.4 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl" />
              
              {/* Profile Image */}
              <div className="relative p-4 sm:p-6 lg:p-8">
                <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src="/images/profile.png"
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Image Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Floating Status Badge */}
                <motion.div
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg"
                  animate={{
                    y: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-1 sm:mr-2 animate-pulse" />
                  Available
                </motion.div>
              </div>
            </motion.div>

            {/* Simplified Decorative Element */}
            {!isMobile && (
              <motion.div
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </motion.div>
        </motion.div>

     
      </div>
    </section>
  );
}