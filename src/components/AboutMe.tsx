'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const statsData = [
    { number: "5+", label: "Years Experience", icon: "🚀" },
    { number: "100+", label: "Projects Completed", icon: "💼" },
    { number: "50+", label: "Happy Clients", icon: "😊" },
    { number: "24/7", label: "Support Available", icon: "⏰" }
  ];
 const [particlePositions, setParticlePositions] = useState<Array<{left: number, top: number, duration: number, delay: number}>>([]);
  
  useEffect(() => {
    // Generate positions only on client side after hydration
    const positions = Array.from({ length: 6 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2
    }));
    setParticlePositions(positions);
  }, []);
  return (
    <section 
    id='about'
      ref={parallaxRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-900 "
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
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
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-sm"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10" ref={containerRef}>
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Image Section */}
          <motion.div 
            variants={itemVariants} 
            className="relative order-2 lg:order-1"
            ref={imageRef}
            style={{ y: imageY }}
          >
            {/* Background Glow Effects */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-emerald-500/20 transform rotate-6 scale-110 blur-xl opacity-30" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-bl from-emerald-500/15 via-blue-500/15 to-purple-500/15 transform -rotate-3 scale-105 blur-lg opacity-40" />
            
            {/* Main Image Container */}
            <motion.div
              className="relative rounded-3xl  shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"
             
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.4 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              
              {/* Profile Image */}
              <div className="relative p-8">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src="/images/profile.png"
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Image Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Floating Status Badge */}
                <motion.div
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                  animate={{
                    y: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  Available
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="order-1 lg:order-2"
            style={{ y: textY }}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-full" />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 mb-10">
              <p className="text-xl text-gray-300 leading-relaxed">
                Hello! I'm <span className="text-blue-400 font-semibold">Mukesh Bhattarai</span>, a passionate Frontend Developer with 2 years+ of experience building responsive, user-friendly web applications using React.js, Next.js, and Tailwind CSS.
              </p>

              <p className="text-lg text-gray-400 leading-relaxed">
               I specialize in turning UI designs into clean, performant code and have worked on several live e-commerce and CMS platforms with integrated payment systems like Stripe, eSewa, and Khalti. My focus is always on delivering smooth user experiences, optimized performance, and scalable frontends.
              </p>

              <p className="text-lg text-gray-400 leading-relaxed">
                Whether it's crafting pixel-perfect components, integrating APIs, or collaborating with teams to bring ideas to life, I enjoy the process of solving real-world problems through code.


              </p>
            </motion.div>

            {/* Info Grid */}
          
            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact"
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
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
                className="group px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  Download CV 
                  <span className="text-sm">📄</span>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-24 hidden grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group text-center p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}