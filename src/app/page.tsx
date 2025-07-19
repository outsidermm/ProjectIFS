"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { storyData } from "@/components/storyData";
import AgeSection from "@/components/visualisationSection/ageSection";
import MaritalStatusSection from "@/components/visualisationSection/maritalStatusSection";
import GenderSection from "@/components/visualisationSection/genderSection";
import IsGraduatedSection from "@/components/visualisationSection/isGraduatedSection";
import EducationSection from "@/components/visualisationSection/educationSection";
import IncomeSection from "@/components/visualisationSection/incomeSection";
import LoanAmountSection from "@/components/visualisationSection/loanAmountSection";
import DependentSection from "@/components/visualisationSection/dependentSection";
import CIBILSection from "@/components/visualisationSection/CIBILSection";
import EmploymentStatusSection from "@/components/visualisationSection/employmentStatusSection";
import TotalAssetValueSection from "@/components/visualisationSection/totalAssetValueSection";
import DssSummary from "@/components/DSS/dssSummary";
import DssDetail from "@/components/DSS/dssDetail";
import ConclusionSection from "@/components/conclusionSection";
import { CircleDots } from "@/components/circleDots";
import { FloatingParticles } from "@/components/floatingParticles";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);

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

  return (
    <div
      ref={containerRef}
      className="font-sans overflow-x-hidden text-gray-800"
    >
      <ProgressBar />
      <SectionIndicator />
      {/* Fixed Dot Visualization */}
      <div className="fixed top-1/4 right-8 transform z-40">
        <div className="flex flex-col items-center">
          <div className="relative w-200 h-1/2 overflow-hidden">
            {currentSection !== 0 && currentSection < storyData.length - 3 ? (
              <CircleDots
                groups={storyData[currentSection].groups}
                size={200}
                dotRadius={3}
                totalDots={100}
                horizontalSpacing={40}
                maxVerticalShift={60}
                animationDuration={50}
                animationDelay={0}
              />
            ) : (
              <></>
            )}
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

      {/* Age Section */}
      <AgeSection />

      {/* Marital Status */}
      <MaritalStatusSection />

      {/* Gender */}
      <GenderSection />

      {/* Is Graduated */}
      <IsGraduatedSection />

      {/* Education */}
      <EducationSection />

      {/* Income */}
      <IncomeSection />

      {/* Loan Amount */}
      <LoanAmountSection />

      {/* Dependents */}
      <DependentSection />

      {/* CIBIL Score */}
      <CIBILSection />

      {/* Employment Status */}
      <EmploymentStatusSection />

      {/* Total Asset Value */}
      <TotalAssetValueSection />

      {/* Section 1: DSS Summary (Enhanced) */}
      <DssSummary />

      {/* Section 2: What You'll Uncover (New Creative Section) */}
      <DssDetail />

      {/* Section 3: Conclusion (Enhanced) */}
      <ConclusionSection />
    </div>
  );
}
