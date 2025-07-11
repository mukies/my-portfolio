"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { socialMedia } from "@/static/socialMedias";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Enhanced parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.8]);

  // Smooth spring animations for mouse tracking
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      mouseX.set((clientX - innerWidth / 2) * 0.02);
      mouseY.set((clientY - innerHeight / 2) * 0.02);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 px-4 sm:px-6 lg:px-8"
    >
      {/* Enhanced Background with Multiple Parallax Layers */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        {/* Animated mesh gradient background - Responsive sizes */}
        <div className="absolute inset-0 opacity-40 sm:opacity-60">
          {/* Mobile: Smaller blobs, Desktop: Larger blobs */}
          <div className="absolute top-0 -left-4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Geometric pattern overlay - Responsive grid size */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                className="sm:w-[60px] sm:h-[60px]"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="sm:d-['M 60 0 L 0 0 0 60']"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto relative z-10 w-full">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          style={{ y: textY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Status badge - Responsive padding and text */}
          <motion.div
            className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg mb-6 sm:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Available for freelance work
            </span>
          </motion.div>

          <motion.h2
            className="text-base sm:text-lg md:text-xl font-light mb-3 sm:mb-4 text-gray-300 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hello, I'm
          </motion.h2>

          {/* Responsive heading sizes */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent font-black">
              Mukesh Bhattarai
            </span>
          </motion.h1>

          {/* TypeAnimation container with proper responsive heights */}
          <motion.div
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 sm:mb-8 text-gray-800 dark:text-gray-200 h-8 sm:h-10 md:h-12 lg:h-16 flex items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <TypeAnimation
              sequence={[
                "Frontend Developer",
                1000,
                "React Specialist",
                1000,
                "Next.js Expert",
                1000,
                "Web Developer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          {/* Responsive paragraph */}
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Crafting exceptional digital experiences with cutting-edge
            technologies and pixel-perfect design.
          </motion.p>

          {/* Responsive button layout */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden text-center text-sm sm:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>

            <motion.a
              href="#contact"
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 text-center text-sm sm:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Get In Touch
              </span>
            </motion.a>
          </motion.div>

          {/* Social links with responsive sizing */}
          <motion.div
            className="flex justify-center space-x-4 sm:space-x-6 mt-8 sm:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              x: useTransform(mouseX, (x) => x * 0.1),
              y: useTransform(mouseY, (y) => y * 0.1),
            }}
          >
            {socialMedia.map((social, index) => (
              <motion.a
                key={social.id}
                target="_blank"
                href={social.url}
                className="w-10 h-10 sm:w-12 sm:h-12 relative overflow-hidden rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Image
                  src={social.image}
                  alt={social.name}
                  fill
                  className={`object-cover h-full w-full ${
                    social?.className ?? ""
                  }`}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator - Responsive positioning */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          whileHover={{ y: -5 }}
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            Scroll
          </span>
          <motion.div
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-current rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-2 sm:h-3 bg-current rounded-full mt-1 sm:mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Scroll overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 dark:to-black/20 pointer-events-none z-5"
        style={{ opacity: overlayOpacity }}
      />
    </section>
  );
}
