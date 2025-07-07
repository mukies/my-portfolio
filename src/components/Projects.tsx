"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { projects } from "@/lib/data";
import { CodeXml, ExternalLink, Video } from "lucide-react";

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refined parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // More subtle parallax effects to prevent overlapping
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  // Mouse parallax with reduced intensity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x * 20); // Reduced from 30 to 20
        mouseY.set(y * 20);
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    },
    [mouseX, mouseY]
  );

  // Throttled mouse move handler
  useEffect(() => {
    let ticking = false;
    let lastMouseEvent: MouseEvent;

    const throttledMouseMove = (e: MouseEvent) => {
      lastMouseEvent = e;
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(lastMouseEvent);
          ticking = false;
        });
        ticking = true;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", throttledMouseMove, {
        passive: true,
      });
      return () =>
        container.removeEventListener("mousemove", throttledMouseMove);
    }
  }, [handleMouseMove]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Reduced from 0.3
        delayChildren: 0.2, // Reduced from 0.4
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60, // Reduced from 80
      scale: 0.95, // Reduced from 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6, // Reduced from 0.8
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-20 md:py-32 bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950 overflow-hidden"
      ref={containerRef}
      style={{ willChange: "auto" }} // Optimize for performance
    >
      {/* Simplified background elements */}
      <motion.div
        className="absolute inset-0 opacity-30" // Reduced from 40
        style={{ y: backgroundY, willChange: "transform" }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/8 to-pink-400/8 rounded-full blur-2xl"></div>
      </motion.div>

      {/* Optimized mouse-following effect */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-700" // Increased duration for smoother transition
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.06), transparent 70%)`,
          willChange: "background-position",
        }}
      />

      {/* Simplified floating elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: floatingY,
          x: useTransform(mouseXSpring, [-20, 20], [-5, 5]), // Reduced range
          willChange: "transform",
        }}
      >
        <div className="absolute top-20 right-1/4 w-2 h-2 bg-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/5 w-3 h-3 bg-purple-500/15 rotate-45"></div>
        <div className="absolute top-1/3 left-3/4 w-4 h-1 bg-cyan-500/30 rounded-full"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Optimized header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          style={{
            y: headerY,
            x: useTransform(mouseXSpring, [-20, 20], [-3, 3]), // Reduced range
            willChange: "transform",
          }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/80 backdrop-blur-xl text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-8 border border-blue-200/50 dark:border-blue-800/50 shadow-lg"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 20, scale: 0.9 }
            }
            transition={{ duration: 0.6 }} // Reduced from 0.8
            whileHover={{ scale: 1.03 }} // Reduced from 1.05
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Featured Portfolio
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </motion.div>

          <motion.div
            className="text-center max-w-4xl mx-auto mb-8"
            style={{ y: textY, willChange: "transform" }}
          >
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
              }
              transition={{ duration: 0.6, type: "spring" }} // Reduced duration
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-5 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Creative Projects
              </h2>
            </motion.div>

            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mx-auto mb-10 rounded-full"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={
                isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
              }
              transition={{ duration: 0.8, delay: 0.2 }} // Reduced delay
            />
          </motion.div>

          <motion.p
            className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }} // Reduced delay
          >
            Discover innovative solutions and creative implementations that push
            the boundaries of modern web development.
          </motion.p>
        </motion.div>

        {/* Optimized Projects Grid */}
        <motion.div
          className="space-y-24 md:space-y-32"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative"
              variants={itemVariants}
              id={`project-${project.id}`}
              style={{ willChange: "transform, opacity" }}
            >
              {/* Project Container with proper spacing */}
              <div
                className={`
                grid grid-cols-1  lg:grid-cols-2 gap-12 lg:gap-16 items-center
                ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}
              `}
              >
                {/* Project Image Section */}
                <motion.div
                  className={`
                    relative group perspective-1000 rounded-3xl
                    ${index % 2 === 1 ? "lg:col-start-2" : ""}
                  `}
                  whileHover={{ scale: 1.01 }} // Reduced from 1.02
                  transition={{ duration: 0.4, ease: "easeOut" }} // Reduced duration
                >
                  {/* Simplified glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-cyan-600/15 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Main image card */}
                  <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl  rounded-3xl shadow-2xl border border-gray-700/30 ">
                    {/* Image container with fixed aspect ratio */}
                    <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 rounded-3xl  group-hover:scale-105" // Reduced scale and duration
                        loading="lazy" // Add lazy loading
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Quick tech preview in card */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-200/50 dark:border-blue-800/50"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.03 }} // Reduced scale
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project number badge */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold shadow-xl border-2 border-white dark:border-gray-900"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.6, // Reduced duration
                        type: "spring",
                        bounce: 0.3, // Reduced bounce
                      }}
                      whileHover={{ scale: 1.05, rotate: 3 }} // Reduced effects
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Project Content Section */}
                <motion.div
                  className={`
                    space-y-6
                    ${index % 2 === 1 ? "lg:col-start-1" : ""}
                  `}
                >
                  {/* Status indicator */}
                  <div className="flex items-center  gap-2">
                    {project.status === "live" ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          Live Project
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-orange-500 dark:text-orange-400">
                          Ongoing Project
                        </span>
                      </>
                    )}
                  </div>

                  {/* Project title and description */}
                  <div className="space-y-4">
                    <motion.h3
                      className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight"
                      whileHover={{ x: 3 }} // Reduced from 5
                      transition={{ duration: 0.2 }} // Reduced duration
                    >
                      {project.title}
                    </motion.h3>

                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Full tech stack */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tech Stack
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tagIndex}
                          className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{
                            y: -1, // Reduced from -2
                            backgroundColor: "rgba(59, 130, 246, 0.05)",
                          }}
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {tag}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {project.demoUrl && (
                      <motion.a
                        href={project?.demoUrl}
                        className="inline-flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -1, scale: 1.01 }} // Reduced effects
                        whileTap={{ scale: 0.99 }} // Reduced effect
                      >
                        <span>Explore Live</span>
                        <ExternalLink />
                      </motion.a>
                    )}

                    {project.codeUrl && (
                      <motion.a
                        href={project?.codeUrl}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -1, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <CodeXml />
                        <span>View Code</span>
                      </motion.a>
                    )}

                    {project.videoUrl && (
                      <motion.a
                        href={project?.videoUrl}
                        className="inline-flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-violet-700 transition-all duration-300 shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -1, scale: 1.01 }} // Reduced effects
                        whileTap={{ scale: 0.99 }} // Reduced effect
                      >
                        <Video />
                        <span>Video Clip</span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Optimized CTA Section */}
        <motion.div
          className="text-center mt-14 lg:mt-32  border-t border-gray-200/50 dark:border-gray-800/50"
          initial={{ opacity: 0, y: 30 }} // Reduced from 50
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }} // Reduced delay
        >
          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            whileHover={{ scale: 1.005 }} // Reduced from 1.01
            transition={{ duration: 0.2 }} // Reduced duration
          >
            <motion.a
              href="https://www.linkedin.com/in/mukesh-bhattarai-720238157/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 lg:px-8 py-4 bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-100 text-white dark:text-gray-900 rounded-xl font-semibold hover:from-gray-800 hover:to-blue-800 dark:hover:from-gray-100 dark:hover:to-blue-200 transition-all duration-300 shadow-xl"
              whileHover={{ y: -2, scale: 1.03 }} // Reduced effects
              whileTap={{ scale: 0.97 }} // Reduced effect
            >
              <span>More Projects on my LinkedIn</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 2 }} // Reduced from 3
                transition={{ duration: 0.15 }} // Reduced duration
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
