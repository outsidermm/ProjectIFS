"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storyData } from "@/components/storyData";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
};

  // Create a more natural puddle-like distribution
  const getPositions = (sectionIndex) => {
    const data = storyData[sectionIndex];
    const positions = [];
    const labelPositions = [];

    if (sectionIndex !== 0 && sectionIndex < storyData.length) {
      // Natural grouped puddles for other sections
      let dotIndex = 0;
      const spacing = 250;

      data.groups.forEach((group, groupIndex) => {
        const groupCenterX = 100 + groupIndex * spacing;
        const groupCenterY = 140;

        // Add label position above each group
        labelPositions.push({
          x: groupCenterX,
          y: 20,
          text: group.name,
          count: group.count,
        });

        for (let i = 0; i < group.count; i++) {
          // Create natural clustering with random positioning
          const clusterRadius = Math.sqrt(group.count) * 10;
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * clusterRadius;

          // Add natural jitter
          const jitterX = (Math.random() - 0.5) * 15;
          const jitterY = (Math.random() - 0.5) * 15;

          positions.push({
            x: Math.cos(angle) * distance + groupCenterX + jitterX,
            y: Math.sin(angle) * distance + groupCenterY + jitterY,
            color: group.color,
            group: groupIndex,
          });
          dotIndex++;
        }
      });
    }

    return { positions, labelPositions };
  };

  // Generate dots with consistent IDs
  const generateDots = () => {
    const dots = [];
    for (let i = 0; i < 100; i++) {
      dots.push({ id: i });
    }
    return dots;
  };

  const dots = generateDots();

  // Handle scroll-based section changes with better timing
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Add offset to trigger section change earlier
      const offset = windowHeight * 0.5;
      const adjustedScroll = scrollY + offset;
      const newSection = Math.min(
        Math.floor(adjustedScroll / windowHeight),
        storyData.length - 1,
      );

      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection]);

  const { positions: currentPositions, labelPositions } =
    getPositions(currentSection);
  const currentData = storyData[currentSection];

  // Progress indicator
  const ProgressBar = () => (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/20 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: "0%" }}
        animate={{
          width: `${(currentSection / (storyData.length - 1)) * 100}%`,
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );

  // Section indicator
  const SectionIndicator = () => (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-2">
        {storyData.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSection
                ? "bg-black shadow-lg shadow-black/50"
                : "bg-black/30 hover:bg-black/50"
            }`}
            whileHover={{ scale: 1.5 }}
            onClick={() => {
              window.scrollTo({
                top: index * window.innerHeight,
                behavior: "smooth",
              });
            }}
          />
        ))}
      </div>
    </div>
  );

  // FloatingParticles component
  const FloatingParticles = ({ color, count }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-60"
            style={{ backgroundColor: color }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="font-sans overflow-x-hidden text-gray-800"
    >
      <ProgressBar />
      <SectionIndicator />
      {/* Fixed Dot Visualization */}
      <div className="fixed top-1/2 -mt-20 right-8 transform z-40">
        <div className="flex flex-col items-center">
          <div className="relative w-200 h-75 overflow-hidden">
            {/* Animated Labels */}
            <AnimatePresence mode="wait">
              {labelPositions.map((label, index) => (
                <motion.div
                  key={`${currentSection}-label-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    x: label.x,
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="absolute text-center text-gray-700 whitespace-normal break-words"
                  style={{
                    left: -50,
                    top: label.y,
                    maxWidth: "125px",
                    transform: "translateX(-50%)",
                  }}
                >
                  {label.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Animated Dots */}
            <AnimatePresence mode="wait">
              {dots.map((dot, index) => {
                const position = currentPositions[index];
                if (!position) return null;

                return (
                  <motion.div
                    key={`${currentSection}-dot-${dot.id}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 0.85,
                      x: position.x,
                      y: position.y,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.005,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    className={`absolute w-2.5 h-2.5 rounded-full bg-black`}
                    style={{
                      left: 0,
                      top: 0,
                      transformOrigin: "center",
                      filter: "none",
                    }}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 text-center relative overflow-hidden">
        <FloatingParticles color="rgba(255,255,255,0.1)" count={30} />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"
        />

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-10 max-w-6xl"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 relative"
            style={{
              background: "linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))",
            }}
          >
            Who Gets Approved?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed"
          >
            Over 40% of applicants at Imagine Financial Services are ineligible
            due to{" "}
            <span className="text-yellow-400 font-semibold">
              unknown criteria
            </span>
            . This tool reveals the truth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              Explore the Data
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/70"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Age Section */}
      <section className="h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(168, 85, 247, 0.2)" count={25} />

        {/* Enhanced right side area for dot animation visibility */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-blue-200/30 to-transparent"
        />

        {/* Light overlay on the right side removed - not needed with light background */}

        {/* Additional subtle backdrop for visual interest */}
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-5xl md:text-7xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Age
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              Approval rates are particularly low between
              <span className="text-red-400 font-semibold">
                {" "}
                15-29 years old
              </span>{" "}
              and loans are more likely to be approved with applicant&apos;s age
              ranging from
              <span className="text-green-400 font-semibold">
                {" "}
                30-44 years old
              </span>
              .
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-300/30 to-purple-300/30 rounded-full blur-xl"
        />
      </section>

      {/* Marital Status */}
      <section className="h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(244, 63, 94, 0.3)" count={20} />

        {/* Enhanced animated background overlay */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-rose-300/15 to-orange-300/15"
        />

        {/* Additional flowing gradient overlay */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/20 to-transparent"
        />

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Marital Status
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-rose-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="text-green-600 font-semibold">
                Married applicants
              </span>{" "}
              show higher approval probabilities, while
              <span className="text-red-500 font-semibold">
                {" "}
                widowed or separated individuals
              </span>{" "}
              have the lowest approval rate segment.
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced floating elements */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-r from-rose-300/40 to-pink-300/40 rounded-full blur-sm"
        />

        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 15, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-orange-200/50 to-rose-200/50 rounded-full blur-sm"
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-16 w-16 h-16 bg-gradient-to-tr from-pink-300/30 to-rose-300/30 rounded-full blur-xl"
        />
      </section>

      {/* Gender */}
      <section className="h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(245, 158, 11, 0.3)" count={18} />

        {/* Enhanced animated background overlay */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-amber-300/12 to-orange-300/12"
        />

        {/* Flowing wave effect */}
        <motion.div
          animate={{
            x: [-100, 100, -100],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/15 to-transparent"
        />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1)_1px,transparent_1px)] bg-[length:40px_40px] opacity-30" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Gender
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/75 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="text-blue-600 font-semibold">
                Male applicants
              </span>{" "}
              typically have a higher chance of approval compared to
              <span className="text-pink-600 font-semibold">
                {" "}
                female applicants
              </span>
              .
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced floating elements */}
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-28 h-28 bg-gradient-to-r from-amber-200/50 to-orange-200/50 rounded-full blur-sm"
        />

        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-yellow-300/40 to-amber-300/40 rounded-full blur-md"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-16 w-16 h-16 bg-gradient-to-tr from-orange-200/30 to-amber-200/30 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-16 right-1/3 w-24 h-24 bg-gradient-to-bl from-amber-300/35 to-orange-300/35 rounded-full blur-lg"
        />
      </section>

      {/* Is Graduated */}
      <section className="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(16, 185, 129, 0.3)" count={22} />

        {/* Enhanced animated background overlay */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-emerald-300/15 to-transparent"
        />

        {/* Pulsing wave effect */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-200/10 to-transparent"
        />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(16,185,129,0.05)_25%,transparent_25%,transparent_75%,rgba(16,185,129,0.05)_75%,rgba(16,185,129,0.05)),linear-gradient(45deg,rgba(16,185,129,0.05)_25%,transparent_25%,transparent_75%,rgba(16,185,129,0.05)_75%,rgba(16,185,129,0.05))] bg-[length:30px_30px] bg-[position:0_0,15px_15px] opacity-30" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Graduation Status
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/75 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="text-emerald-600 font-semibold">
                Applicants who have graduated
              </span>{" "}
              are slightly more likely to be approved.
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced rotating element */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-r from-emerald-200/40 to-teal-200/40 rounded-full blur-md"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-20 w-24 h-24 bg-gradient-to-br from-teal-300/30 to-cyan-300/30 rounded-full blur-lg"
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 left-1/3 w-18 h-18 bg-gradient-to-tr from-emerald-300/35 to-teal-300/35 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            rotate: [0, -180, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-1/4 w-20 h-20 bg-gradient-to-bl from-cyan-200/40 to-emerald-200/40 rounded-full blur-sm"
        />

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-2/3 right-16 w-16 h-16 bg-gradient-to-tl from-teal-300/30 to-emerald-300/30 rounded-full blur-2xl"
        />
      </section>

      {/* Education */}
      <section className="h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(139, 92, 246, 0.3)" count={20} />

        {/* Enhanced animated background overlay */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-violet-300/15 to-transparent"
        />

        {/* Oscillating gradient wave */}
        <motion.div
          animate={{
            x: [-50, 50, -50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/12 to-transparent"
        />

        {/* Hexagonal pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(139,92,246,0.08)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.08)_2px,transparent_2px)] bg-[length:50px_50px] opacity-40" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
              Education Qualification
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/75 backdrop-blur-sm rounded-2xl p-8 border border-violet-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              Applicants with a{" "}
              <span className="text-violet-600 font-semibold">
                Master's or PhD qualification
              </span>{" "}
              have the highest approval rates.
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced rotating element */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-r from-violet-200/40 to-purple-200/40 rounded-full blur-md"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-16 w-26 h-26 bg-gradient-to-br from-purple-300/35 to-fuchsia-300/35 rounded-full blur-lg"
        />

        <motion.div
          animate={{
            x: [0, 45, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute top-1/3 left-1/4 w-22 h-22 bg-gradient-to-tr from-violet-300/40 to-purple-300/40 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-1/3 w-28 h-28 bg-gradient-to-bl from-fuchsia-200/30 to-violet-200/30 rounded-full blur-sm"
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -35, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-2/3 right-20 w-18 h-18 bg-gradient-to-tl from-purple-300/35 to-violet-300/35 rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-12 w-20 h-20 bg-gradient-to-br from-violet-300/30 to-fuchsia-300/30 rounded-full blur-lg"
        />
      </section>

      {/* Income */}
      <section className="h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(251, 191, 36, 0.3)" count={20} />

        {/* Enhanced animated background overlay */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-amber-300/15 to-transparent"
        />

        {/* Oscillating gradient wave */}
        <motion.div
          animate={{
            x: [-50, 50, -50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/12 to-transparent"
        />

        {/* Hexagonal pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(251,191,36,0.08)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(251,191,36,0.08)_2px,transparent_2px)] bg-[length:50px_50px] opacity-40" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Income
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/75 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              Surprisingly,{" "}
              <span className="text-amber-600 font-semibold">
                income alone does not significantly impact approval rates
              </span>
              . However, higher income applicants tend to have better overall
              profiles.
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced rotating element */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-r from-amber-200/40 to-yellow-200/40 rounded-full blur-md"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-16 w-26 h-26 bg-gradient-to-br from-yellow-300/35 to-orange-300/35 rounded-full blur-lg"
        />

        <motion.div
          animate={{
            x: [0, 45, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute top-1/3 left-1/4 w-22 h-22 bg-gradient-to-tr from-amber-300/40 to-yellow-300/40 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-1/3 w-28 h-28 bg-gradient-to-bl from-orange-200/30 to-amber-200/30 rounded-full blur-sm"
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -35, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-2/3 right-20 w-18 h-18 bg-gradient-to-tl from-yellow-300/35 to-amber-300/35 rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-12 w-20 h-20 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-lg"
        />
      </section>

      {/* Loan Amount */}
      <section className="h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(20, 184, 166, 0.3)" count={20} />

        {/* Enhanced animated background overlay */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-teal-300/15 to-transparent"
        />

        {/* Oscillating gradient wave */}
        <motion.div
          animate={{
            x: [-50, 50, -50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/12 to-transparent"
        />

        {/* Hexagonal pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(20,184,166,0.08)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(20,184,166,0.08)_2px,transparent_2px)] bg-[length:50px_50px] opacity-40" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Loan Amount
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/75 backdrop-blur-sm rounded-2xl p-8 border border-teal-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="text-teal-600 font-semibold">
                Lower loan amounts are often viewed more favourably
              </span>{" "}
              by the system.
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced rotating element */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-r from-teal-200/40 to-emerald-200/40 rounded-full blur-md"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-16 w-26 h-26 bg-gradient-to-br from-emerald-300/35 to-cyan-300/35 rounded-full blur-lg"
        />

        <motion.div
          animate={{
            x: [0, 45, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute top-1/3 left-1/4 w-22 h-22 bg-gradient-to-tr from-teal-300/40 to-emerald-300/40 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-1/3 w-28 h-28 bg-gradient-to-bl from-cyan-200/30 to-teal-200/30 rounded-full blur-sm"
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -35, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-2/3 right-20 w-18 h-18 bg-gradient-to-tl from-emerald-300/35 to-teal-300/35 rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-12 w-20 h-20 bg-gradient-to-br from-teal-300/30 to-cyan-300/30 rounded-full blur-lg"
        />
      </section>

      {/* Dependents */}
      <section className="h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(244, 63, 94, 0.3)" count={20} />

        {/* Enhanced animated background overlay */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-rose-300/15 to-transparent"
        />

        {/* Oscillating gradient wave */}
        <motion.div
          animate={{
            x: [-50, 50, -50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/12 to-transparent"
        />

        {/* Hexagonal pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(244,63,94,0.08)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(244,63,94,0.08)_2px,transparent_2px)] bg-[length:50px_50px] opacity-40" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Dependents
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/75 backdrop-blur-sm rounded-2xl p-8 border border-rose-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="text-rose-600 font-semibold">
                Having fewer dependents significantly boosts approval rates
              </span>
              .
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced rotating element */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-r from-rose-200/40 to-pink-200/40 rounded-full blur-md"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-16 w-26 h-26 bg-gradient-to-br from-pink-300/35 to-red-300/35 rounded-full blur-lg"
        />

        <motion.div
          animate={{
            x: [0, 45, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute top-1/3 left-1/4 w-22 h-22 bg-gradient-to-tr from-rose-300/40 to-pink-300/40 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-1/3 w-28 h-28 bg-gradient-to-bl from-red-200/30 to-rose-200/30 rounded-full blur-sm"
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -35, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-2/3 right-20 w-18 h-18 bg-gradient-to-tl from-pink-300/35 to-rose-300/35 rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-12 w-20 h-20 bg-gradient-to-br from-rose-300/30 to-red-300/30 rounded-full blur-lg"
        />
      </section>

      {/* CIBIL Score */}
      <section className="h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(59, 130, 246, 0.3)" count={20} />

        {/* Enhanced animated background overlay */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-indigo-300/15 to-transparent"
        />

        {/* Oscillating gradient wave */}
        <motion.div
          animate={{
            x: [-50, 50, -50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/12 to-transparent"
        />

        {/* Hexagonal pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.08)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.08)_2px,transparent_2px)] bg-[length:50px_50px] opacity-40" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
              CIBIL Score
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/75 backdrop-blur-sm rounded-2xl p-8 border border-indigo-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              The average approved applicant has a{" "}
              <span className="text-indigo-600 font-semibold">
                CIBIL score of 703.85
              </span>
              . A score above 700 drastically improves loan approval chances.
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced rotating element */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-r from-indigo-200/40 to-blue-200/40 rounded-full blur-md"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-16 w-26 h-26 bg-gradient-to-br from-blue-300/35 to-sky-300/35 rounded-full blur-lg"
        />

        <motion.div
          animate={{
            x: [0, 45, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute top-1/3 left-1/4 w-22 h-22 bg-gradient-to-tr from-indigo-300/40 to-blue-300/40 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-1/3 w-28 h-28 bg-gradient-to-bl from-sky-200/30 to-indigo-200/30 rounded-full blur-sm"
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -35, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-2/3 right-20 w-18 h-18 bg-gradient-to-tl from-blue-300/35 to-indigo-300/35 rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-12 w-20 h-20 bg-gradient-to-br from-indigo-300/30 to-sky-300/30 rounded-full blur-lg"
        />
      </section>

      {/* Employment Status */}
      <section className="h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-coral-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(251, 146, 60, 0.3)" count={20} />

        {/* Enhanced animated background overlay */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-orange-300/15 to-transparent"
        />

        {/* Oscillating gradient wave */}
        <motion.div
          animate={{
            x: [-50, 50, -50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/12 to-transparent"
        />

        {/* Diamond pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(251,146,60,0.08)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(251,146,60,0.08)_2px,transparent_2px)] bg-[length:60px_60px] opacity-40" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Employment Status
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/75 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="text-orange-600 font-semibold">
                Employed applicants equally likely to be approved
              </span>{" "}
              than self-employed.
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced rotating diamond */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-r from-orange-200/40 to-red-200/40 rounded-lg blur-md transform rotate-45"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-16 w-26 h-26 bg-gradient-to-br from-red-300/35 to-orange-300/35 rounded-lg blur-lg transform rotate-12"
        />

        <motion.div
          animate={{
            x: [0, 45, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute top-1/3 left-1/4 w-22 h-22 bg-gradient-to-tr from-orange-300/40 to-red-300/40 rounded-lg blur-xl transform -rotate-12"
        />

        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-1/3 w-28 h-28 bg-gradient-to-bl from-red-200/30 to-orange-200/30 rounded-lg blur-sm transform rotate-45"
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -35, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-2/3 right-20 w-18 h-18 bg-gradient-to-tl from-orange-300/35 to-red-300/35 rounded-lg blur-2xl transform rotate-30"
        />

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-12 w-20 h-20 bg-gradient-to-br from-orange-300/30 to-red-300/30 rounded-lg blur-lg transform rotate-45"
        />
      </section>

      {/* Total Asset Value */}
      <section className="h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(100, 116, 139, 0.3)" count={20} />

        {/* Enhanced animated background overlay */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-slate-300/15 to-transparent"
        />

        {/* Oscillating gradient wave */}
        <motion.div
          animate={{
            x: [-50, 50, -50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/12 to-transparent"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.03)_1px,transparent_1px)] bg-[length:40px_40px] opacity-50" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
              Total Asset Value
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/75 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              Unless applicant is{" "}
              <span className="text-slate-600 font-semibold">
                ultra wealthy
              </span>
              , total asset value does not significantly impact approval rates,
              consistently averaging about{" "}
              <span className="text-slate-600 font-semibold">
                60% - 65% loan approval rates
              </span>
              .
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced rotating hexagon */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-r from-slate-200/40 to-gray-200/40 blur-md"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-16 w-26 h-26 bg-gradient-to-br from-gray-300/35 to-zinc-300/35 blur-lg"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />

        <motion.div
          animate={{
            x: [0, 45, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute top-1/3 left-1/4 w-22 h-22 bg-gradient-to-tr from-slate-300/40 to-gray-300/40 blur-xl"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />

        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-1/3 w-28 h-28 bg-gradient-to-bl from-zinc-200/30 to-slate-200/30 blur-sm"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -35, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-2/3 right-20 w-18 h-18 bg-gradient-to-tl from-gray-300/35 to-slate-300/35 blur-2xl rounded-full"
        />

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-12 w-20 h-20 bg-gradient-to-br from-slate-300/30 to-zinc-300/30 blur-lg"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
      </section>
            {/* Section 1: DSS Summary (Enhanced) */}
      <section className="h-screen bg-gradient-to-b from-white to-gray-100 px-6 py-20 flex flex-col justify-center items-center text-center relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-gray-400/10 to-black/10"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Meet the DSS 💡
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg mb-8"
          >
            Our Decision Support System analyzes over 10,000 profiles to give
            you a clear picture of your loan eligibility before you apply.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm border border-emerald-300 rounded-lg p-4 shadow-lg text-center"
          >
            <p className="text-xl md:text-2xl font-semibold text-emerald-600">
              94% Predictive Accuracy
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Based on historical application data.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 border-2 border-gray-300 rounded-full opacity-20"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-40 h-40 border-2 border-gray-400 rounded-full opacity-15"
        />
      </section>

      {/* Section 2: What You'll Uncover (New Creative Section) */}
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-6 py-20 flex flex-col justify-center items-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Your Personalized Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg mb-12"
          >
            Our DSS doesn't just give you a "yes" or "no." It provides a
            complete analysis to empower your financial decisions.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {/* Card 1: Approval Prediction */}
          <motion.div variants={cardVariants} className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border">
            <div className="text-4xl text-indigo-500 mb-4">{/* <FiCheckCircle /> */}✅</div>
            <h3 className="text-xl font-bold mb-2">Approval Prediction</h3>
            <p className="text-gray-600">
              Get an accurate percentage chance of your loan being approved.
            </p>
          </motion.div>

          {/* Card 2: Rejection Analysis */}
          <motion.div variants={cardVariants} className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border">
            <div className="text-4xl text-red-500 mb-4">{/* <FiXCircle /> */}❌</div>
            <h3 className="text-xl font-bold mb-2">Rejection Analysis</h3>
            <p className="text-gray-600">
              If rejection is likely, we'll pinpoint the reasons, like CIBIL score or income.
            </p>
          </motion.div>

          {/* Card 3: Default Risk */}
          <motion.div variants={cardVariants} className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border">
            <div className="text-4xl text-amber-500 mb-4">{/* <FiShield /> */}🛡️</div>
            <h3 className="text-xl font-bold mb-2">Default Risk Score</h3>
            <p className="text-gray-600">
              Understand your risk profile for defaulting on the loan in the future.
            </p>
          </motion.div>
          
          {/* Card 4: Recommendations */}
          <motion.div variants={cardVariants} className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border">
            <div className="text-4xl text-green-500 mb-4">{/* <FiTrendingUp /> */}📈</div>
            <h3 className="text-xl font-bold mb-2">Actionable Steps</h3>
            <p className="text-gray-600">
              Receive personalized tips on how to strengthen your profile for a better outcome.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 3: Conclusion (Enhanced) */}
      <section className="h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-6 py-20 flex flex-col justify-center items-center text-center relative overflow-hidden">
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-black/10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Data-Driven Decisions 📊
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg mb-4"
          >
            Loan eligibility is a complex story told by your age, income, credit behavior, and more. We use data to bring transparency and equity to lending, helping both applicants and Imagine Financial Services make smarter, more confident decisions.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/3 w-32 h-32 border-2 border-gray-400 rounded-full opacity-15"
        />
      </section>
    </div>
  );
}
