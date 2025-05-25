'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Enhanced skills data with modern tech stack
type ProficiencyLevel = 'Expert' | "Advanced" | "Intermediate" | "Beginner"; 


type TechItem = {
  name: string;
  proficiency: ProficiencyLevel;
  icon: string;
  years: string; 
};

type TechCategory = {
  category: string;
  gradient: string;
  items: TechItem[];
};
export const skills : TechCategory[] = [
  {
    category: 'Frontend',
    gradient: 'from-blue-500 to-cyan-500',
    items: [
      { name: 'React', proficiency: 'Expert', icon: '⚛️', years: '4+' },
      { name: 'Next.js', proficiency: 'Expert', icon: '▲', years: '3+' },
      { name: 'TypeScript', proficiency: 'Advanced', icon: '📘', years: '3+' },
      { name: 'Vue.js', proficiency: 'Advanced', icon: '💚', years: '2+' },
      { name: 'Tailwind CSS', proficiency: 'Expert', icon: '💨', years: '4+' },
      { name: 'Framer Motion', proficiency: 'Advanced', icon: '🎬', years: '2+' },
      { name: 'Three.js', proficiency: 'Intermediate', icon: '🎯', years: '1+' },
      { name: 'React Native', proficiency: 'Intermediate', icon: '📱', years: '2+' },
    ],
  },
  {
    category: 'Backend',
    gradient: 'from-emerald-500 to-teal-500',
    items: [
      { name: 'Node.js', proficiency: 'Advanced', icon: '🟢', years: '3+' },
      { name: 'Express', proficiency: 'Advanced', icon: '🚀', years: '3+' },
      { name: 'GraphQL', proficiency: 'Advanced', icon: '📊', years: '2+' },
      { name: 'MongoDB', proficiency: 'Advanced', icon: '🍃', years: '3+' },
      { name: 'PostgreSQL', proficiency: 'Intermediate', icon: '🐘', years: '2+' },
      { name: 'Redis', proficiency: 'Intermediate', icon: '🔴', years: '1+' },
      { name: 'Python', proficiency: 'Intermediate', icon: '🐍', years: '2+' },
      { name: 'Microservices', proficiency: 'Advanced', icon: '🏗️', years: '2+' },
    ],
  },
  {
    category: 'DevOps & Cloud',
    gradient: 'from-purple-500 to-pink-500',
    items: [
      { name: 'Docker', proficiency: 'Advanced', icon: '🐳', years: '2+' },
      { name: 'AWS', proficiency: 'Intermediate', icon: '☁️', years: '2+' },
      { name: 'Kubernetes', proficiency: 'Intermediate', icon: '⚙️', years: '1+' },
      { name: 'CI/CD', proficiency: 'Advanced', icon: '🔄', years: '3+' },
      { name: 'Terraform', proficiency: 'Beginner', icon: '🏗️', years: '1' },
      { name: 'Nginx', proficiency: 'Intermediate', icon: '🌐', years: '2+' },
      { name: 'Monitoring', proficiency: 'Intermediate', icon: '📊', years: '2+' },
      { name: 'Linux', proficiency: 'Advanced', icon: '🐧', years: '4+' },
    ],
  },
];

type ProficiencyDetails = {
  color: string;
  dots: number;
  glow: string;
  border: string;
};
const proficiencyConfig:Record<ProficiencyLevel, ProficiencyDetails>  = {
  'Expert': { 
    color: 'from-emerald-400 to-emerald-600', 
    dots: 4, 
    glow: 'shadow-emerald-500/25',
    border: 'border-emerald-400/30'
  },
  'Advanced': { 
    color: 'from-blue-400 to-blue-600', 
    dots: 3, 
    glow: 'shadow-blue-500/25',
    border: 'border-blue-400/30'
  },
  'Intermediate': { 
    color: 'from-amber-400 to-amber-600', 
    dots: 2, 
    glow: 'shadow-amber-500/25',
    border: 'border-amber-400/30'
  },
  'Beginner': { 
    color: 'from-gray-400 to-gray-600', 
    dots: 1, 
    glow: 'shadow-gray-500/25',
    border: 'border-gray-400/30'
  },
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('Frontend');

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.9,
      rotateX: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const currentCategory = skills.find(skill => skill.category === activeCategory);

  return (
    <section 
    id='skills'
      ref={parallaxRef}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-sm"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          style={{ y: textY }}
        >
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
          </motion.div>
          
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mx-auto mb-10 rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <motion.p
            className="text-xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Crafting digital experiences with cutting-edge technologies
          </motion.p>
        </motion.div>
        
        {/* Category Tabs */}
        <motion.div 
          className="mb-16 flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {skills.map((skill) => (
            <motion.button
              key={skill.category}
              onClick={() => setActiveCategory(skill.category)}
              className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 overflow-hidden ${
                activeCategory === skill.category
                  ? 'text-white shadow-2xl'
                  : 'text-gray-400 hover:text-white bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeCategory === skill.category && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} rounded-2xl`}
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{skill.category}</span>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          ))}
        </motion.div>
        
        {/* Skills Grid */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {currentCategory && (
              <motion.div
                key={currentCategory.category}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6"
              >
                {currentCategory.items.map((skill, index) => {
                  const config = proficiencyConfig[skill.proficiency as ProficiencyLevel];
                  return (
                    <motion.div 
                      key={skill.name} 
                      variants={skillVariants}
                      className="group perspective-1000"
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        z: 50,
                        transition: { duration: 0.3 }
                      }}
                     
                    >
                      <div className={`
                        relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 
                        border ${config.border} shadow-xl ${config.glow} 
                        hover:shadow-2xl transition-all duration-500 overflow-hidden
                        group-hover:border-white/30
                      `}>
                        {/* Card glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                                {skill.icon}
                              </div>
                              <div>
                                <h3 className="font-bold text-white text-lg group-hover:text-white/90 transition-colors">
                                  {skill.name}
                                </h3>
                                <p className="text-gray-400 text-sm">{skill.years} experience</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Proficiency Badge */}
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${config.color} text-white text-sm font-medium mb-4`}>
                            {skill.proficiency}
                          </div>
                          
                          {/* Skill Level Dots */}
                          <div className="flex items-center gap-2">
                            {Array.from({ length: 4 }, (_, i) => (
                              <motion.div
                                key={i}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                  i < config.dots
                                    ? `bg-gradient-to-r ${config.color} shadow-lg`
                                    : 'bg-white/20'
                                }`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 + i * 0.05 }}
                                whileHover={{ scale: 1.2 }}
                              />
                            ))}
                            <span className="ml-2 text-gray-400 text-sm font-medium">
                              {config.dots}/4
                            </span>
                          </div>
                        </div>

                        {/* Animated corner accent */}
                        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                          <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${config.color} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Bottom Stats */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[
            { title: 'Problem Solving', icon: '🧩', desc: 'Complex challenge resolution', metric: '500+' },
            { title: 'Clean Architecture', icon: '🏗️', desc: 'Scalable system design', metric: '50+' },
            { title: 'Performance', icon: '⚡', desc: 'Optimized applications', metric: '99%' },
            { title: 'Innovation', icon: '🚀', desc: 'Cutting-edge solutions', metric: '24/7' }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="group text-center"
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1 + (index * 0.1) }}
            >
              <div className="relative mx-auto mb-6 w-24 h-24 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-500">
                <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                {item.desc}
              </p>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {item.metric}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}