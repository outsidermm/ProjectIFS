"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storyData } from "@/components/storyData";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);

  // Create a more natural puddle-like distribution
  const getPositions = (sectionIndex) => {
    const data = storyData[sectionIndex];
    const positions = [];
    const labelPositions = [];

    if (sectionIndex !== 0 && sectionIndex !== storyData.length - 1) {
      // Natural grouped puddles for other sections
      let dotIndex = 0;
      const spacing = 150;

      data.groups.forEach((group, groupIndex) => {
        const groupCenterX = 50 + groupIndex * spacing;
        const groupCenterY = 140;

        // Add label position above each group
        labelPositions.push({
          x: groupCenterX,
          y: 40,
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

  return (
    <div
      ref={containerRef}
      className="font-sans overflow-x-hidden text-gray-800"
    >
      {/* Fixed Dot Visualization */}
      <div className="fixed top-96 pt-32 right-8 transform z-40 p-6">
        <div className="flex flex-col items-center">
          <div className="relative w-200 h-100 overflow-hidden">
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
                  className="absolute text-center text-gray-700 whitespace-nowrap"
                  style={{
                    left: -50,
                    top: label.y,
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

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-6 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"
        />

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-6 relative z-10"
        >
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-300% "
          >
            Who Gets Approved?
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl text-lg relative z-10"
        >
          Over 40% of applicants at Imagine Financial Services are ineligible
          due to unknown criteria. This tool reveals the truth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-500"
          >
            <svg
              className="w-6 h-6"
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

      {/* Education Level */}
      <section className="h-screen bg-gradient-to-r from-purple-100 to-indigo-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-purple-400/20 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            Education Level
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg mb-2"
          >
            Applicants with a Master&apos;s or PhD qualification have the
            highest approval rates.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full opacity-20"
        />
      </section>

      {/* Age Trends */}
      <section className="h-screen bg-gradient-to-r from-purple-100 to-indigo-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-l from-purple-400/20 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            Age Trends
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg"
          >
            Approval rates rise with age, especially between 40 and 60 years
            old.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full opacity-20"
        />
      </section>

      {/* Marital Status */}
      <section className="h-screen bg-gradient-to-r from-pink-100 to-red-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-pink-400/10 to-red-400/10"
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
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            Marital Status
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg mb-2"
          >
            Married applicants show higher approval probabilities, while widowed
            or separated individuals have the lowest approval rate segment.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-pink-300 to-red-300 rounded-full opacity-30"
        />
      </section>

      {/* Gender Influence */}
      <section className="h-screen bg-gradient-to-r from-pink-100 to-red-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-pink-400/10 to-red-400/10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            Gender Influence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg"
          >
            Female applicants, especially those married, tend to have higher
            approval rates compared to males.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-200 to-red-200 rounded-full opacity-30"
        />
      </section>

      {/* Income Influence */}
      <section className="h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            Income Influence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, rotateX: 90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg mb-2"
          >
            Higher income directly increases approval chances.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 shadow-lg hover:shadow-xl transition-all"
          >
            Simulate Income Slider
          </motion.button>
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-40 h-40 border-4 border-yellow-300 rounded-full opacity-20"
        />
      </section>

      {/* Dependents Effect */}
      <section className="h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["100% 0%", "0% 100%", "100% 0%"],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            Dependents Effect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, rotateX: 90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg"
          >
            Having fewer dependents significantly boosts approval rates.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-32 h-32 border-4 border-yellow-200 rounded-full opacity-20"
        />
      </section>

      {/* CIBIL Score */}
      <section className="h-screen bg-gradient-to-b from-sky-50 to-sky-200 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-t from-sky-400/20 to-blue-400/20"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            CIBIL Score Matters
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg mb-4"
          >
            The average approved applicant has a CIBIL score of 703.85. A score
            above 700 drastically improves your chances.
          </motion.p>
        </motion.div>

        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-1/4 w-16 h-16 bg-sky-300 rounded-full opacity-40"
        />
      </section>

      {/* Asset Strength */}
      <section className="h-screen bg-gradient-to-br from-green-50 to-emerald-100 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-400/10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, rotateY: 90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            Asset Strength
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg"
          >
            Applicants with assets above $100,000 had 68–80% approval rates.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-32 right-32 w-20 h-20 bg-gradient-to-r from-emerald-300 to-green-300 rounded-full opacity-25"
        />
      </section>

      {/* Loan Term Length */}
      <section className="h-screen bg-gradient-to-br from-green-50 to-emerald-100 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-400/10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, rotateY: -90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            Loan Term Length
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg"
          >
            Shorter loan terms are often viewed more favourably by the system.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-32 left-32 w-20 h-20 bg-gradient-to-r from-emerald-200 to-green-200 rounded-full opacity-25"
        />
      </section>

      {/* Loan Purpose Trends */}
      <section className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 16, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            Loan Purpose Trends
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg"
          >
            Home and car loans have higher approval rates, while education and
            personal loans see stricter assessment.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-25"
        />
      </section>

      {/* Employment Status Impact */}
      <section className="h-screen bg-gradient-to-br from-orange-50 to-yellow-100 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-400/10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold mb-4"
          >
            Employment Status Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg"
          >
            Employed applicants are more likely to be approved than
            self-employed or unemployed individuals.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-32 left-32 w-24 h-24 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full opacity-25"
        />
      </section>

      {/* DSS Tool Summary */}
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
          className="relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Meet the DSS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-lg mb-4"
          >
            Our Decision Support System uses data from over 10,000 profiles to
            predict your approval chance before you apply.
          </motion.p>
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

      {/* Predict Approval Chance */}
      <section className="h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-blue-400/10"
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
            Predict Your Loan Approval
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-lg mb-4"
          >
            Based on your profile, our system calculates the likelihood of loan
            approval before you even apply — saving time and stress.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-1/4 w-24 h-24 border-2 border-indigo-300 rounded-full opacity-20"
        />
      </section>

      {/* Rejection Reason & Default Risk */}
      <section className="h-screen bg-gradient-to-br from-red-50 to-orange-100 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-orange-400/10"
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
            Understand Rejections & Default Risk
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-lg mb-4"
          >
            If you’re predicted to be rejected, the DSS explains why — from low
            CIBIL scores to income instability. It also assesses whether you're
            at risk of default, helping you prepare better.
          </motion.p>
        </motion.div>
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-1/4 w-24 h-24 border-2 border-red-300 rounded-full opacity-20"
        />
      </section>
      {/* Conclusion */}
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
            What We've Learned
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg mb-4"
          >
            Loan eligibility isn’t just a number — it's a combination of age,
            income, education, credit behaviour, and much more. Through
            data-driven storytelling, Imagine Financial Services and its clients
            gain transparency, equity, and the tools to make smarter lending
            decisions.
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
