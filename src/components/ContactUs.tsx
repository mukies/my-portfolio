"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { sendContactMessage } from "@/services/contactApi";
import { socialMedia } from "@/static/socialMedias";
import Image from "next/image";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms with spring physics
  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -50]),
    {
      stiffness: 100,
      damping: 30,
    }
  );

  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 30]), {
    stiffness: 100,
    damping: 30,
  });

  const floatingY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -20]), {
    stiffness: 100,
    damping: 30,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // FIX: Generate particle positions once on client side to avoid hydration mismatch
  const [particlePositions, setParticlePositions] = useState<
    Array<{ left: number; top: number; duration: number; delay: number }>
  >([]);

  useEffect(() => {
    // Generate positions only on client side after hydration
    const positions = Array.from({ length: 6 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticlePositions(positions);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await sendContactMessage(formData);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(true);
      console.log("res", res);
    } catch (error) {
      alert("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#3B82F6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <section
      id="contact"
      className="relative py-0  md:py-20 overflow-hidden bg-gradient-to-b  from-cyan-900 via-blue-900/10 to-gray-800"
    >
      {/* Animated background elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Floating particles - FIXED to avoid hydration mismatch */}
      {particlePositions.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      <div
        className="container mx-auto px-0 lg:px-5 relative z-10"
        ref={containerRef}
      >
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="relative inline-block">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Let's Create Something
              <br />
              <span className="text-blue-600 dark:text-blue-400">
                Amazing Together
              </span>
            </motion.h2>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 border-2 border-blue-400 rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
              }
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Ready to bring your vision to life? Let's discuss your project and
              explore how we can collaborate to create something extraordinary.
            </motion.p>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            style={{ y: cardY }}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {[
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                title: "Email",
                info: "muk.yess@gmail.com",
                action: "Send an email",
                href: "mailto:muk.yess@gmail.com",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                title: "Location",
                info: "Kathmandu, Nepal",
                action: null,
                href: undefined,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                ),
                title: "Let's Connect",
                info: "Follow my work",
                action: "Social Media",
                href: undefined,
                gradient: "from-indigo-500 to-blue-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                className="group relative"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30 overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute -z-10 inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    initial={false}
                  />

                  {/* Floating icon container */}
                  <motion.div
                    className={`relative w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white">{item.icon}</span>
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                    {item.info}
                  </p>

                  {item.action && (
                    <motion.a
                      href={item.href}
                      className={`inline-flex cursor-pointer z-[9999] items-center text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text font-semibold hover:opacity-80 transition-opacity group`}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {item.action}
                      <motion.svg
                        className="w-4 h-4 ml-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </motion.a>
                  )}

                  {index === 2 && (
                    <div className="flex space-x-4 mt-6">
                      {socialMedia.map((social, i) => (
                        <motion.a
                          target="_blank"
                          key={social.id}
                          href={social.url}
                          className="w-10 h-10 sm:w-12 sm:h-12 relative overflow-hidden rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer hover:border-blue-500/50 transition-all duration-300 shadow-lg"
                          whileHover={{
                            scale: 1.2,
                            rotate: 10,
                            backgroundColor: "#3B82F6",
                            color: "#FFFFFF",
                          }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 400 }}
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
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3 mt-10 lg:mt-0"
            style={{ y: floatingY }}
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="relative bg-gray-800/80 backdrop-blur-xl p-5 lg:p-10 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"
                animate={{
                  background: [
                    "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))",
                    "linear-gradient(to bottom right, rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05))",
                    "linear-gradient(to bottom right, rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05))",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10">
                <motion.h3
                  className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.3 }}
                >
                  Send Me a Message
                </motion.h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 p-6 rounded-2xl mb-6 border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center">
                      <motion.svg
                        className="w-6 h-6 mr-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                      <p className="text-lg font-medium">
                        Message sent successfully! I'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          name: "name",
                          label: "Your Name",
                          type: "text",
                          placeholder: "John Doe",
                        },
                        {
                          name: "email",
                          label: "Your Email",
                          type: "email",
                          placeholder: "john@example.com",
                        },
                      ].map((field, index) => (
                        <motion.div
                          key={field.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            isInView
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 20 }
                          }
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <label
                            htmlFor={field.name}
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                          >
                            {field.label}
                          </label>
                          <motion.input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={
                              formData[field.name as keyof typeof formData]
                            }
                            onChange={handleChange}
                            required
                            className="w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white backdrop-blur-sm transition-all duration-300"
                            placeholder={field.placeholder}
                            variants={inputVariants}
                            whileFocus="focus"
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.6 }}
                    >
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                      >
                        Subject
                      </label>
                      <motion.input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white backdrop-blur-sm transition-all duration-300"
                        placeholder="How can I help you?"
                        variants={inputVariants}
                        whileFocus="focus"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.7 }}
                    >
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                      >
                        Message
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white backdrop-blur-sm resize-none transition-all duration-300"
                        placeholder="Tell me about your project, ideas, or how we can collaborate..."
                        variants={inputVariants}
                        whileFocus="focus"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.8 }}
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-8 py-5 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 overflow-hidden ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {/* Button background animation */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                          animate={{
                            x: isSubmitting ? 0 : [-100, 100],
                            opacity: isSubmitting ? 0 : [0, 0.3, 0],
                          }}
                          transition={{
                            x: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            },
                            opacity: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            },
                          }}
                        />

                        <span className="relative z-10 flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <motion.svg
                                className="animate-spin -ml-1 mr-4 h-6 w-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </motion.svg>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              Send Message
                              <motion.svg
                                className="w-5 h-5 ml-3 rotate-90"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                              </motion.svg>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
