import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface Group {
  name: string;
  count: number;
}

interface CircleDotsProps {
  groups?: Group[];
  size?: number;
  dotRadius?: number;
  totalDots?: number;
  horizontalSpacing?: number;
  maxVerticalShift?: number;
  label?: string;
  animationDuration?: number;
  animationDelay?: number;
}

interface DotPosition {
  x: number;
  y: number;
  id: string;
}

export const CircleDots: React.FC<CircleDotsProps> = ({
  groups = [{ name: "Default Group", count: 50 }],
  size = 300,
  dotRadius = 6,
  totalDots = 100,
  horizontalSpacing = 80,
  maxVerticalShift = 120,
  animationDuration = 800,
  animationDelay = 50,
}) => {
  // Track previous groups for smooth transitions
  const [animatedGroups, setAnimatedGroups] = useState(groups);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousGroupsRef = useRef(groups);
  const containerControls = useAnimation();

  // Generate shuffling vertical shifts that change when groups update
  const verticalShifts = useMemo(() => {
    return groups.map((group, index) => {
      // Use group name and count as seed for positioning that changes with updates
      const seed =
        group.name.charCodeAt(0) * 12345 + group.count * 789 + index * 456;
      const random = Math.sin(seed) * 10000;
      return (
        (random - Math.floor(random)) * maxVerticalShift * 2 - maxVerticalShift
      );
    });
  }, [groups, maxVerticalShift]);

  // Generate stable dot positions for each group
  const generateStablePositions = (
    groupIndex: number,
    offsetX: number,
    offsetY: number,
  ): DotPosition[] => {
    const positions: DotPosition[] = [];
    const circleRadius = (size - dotRadius * 4) / 2;
    const centerX = size / 2 + offsetX;
    const centerY = size / 2 + offsetY;
    const maxRadius = circleRadius - dotRadius;
    let attempts = 0;
    const maxAttempts = 1000;
    const minDistance = dotRadius * 2.5;
    const tempPositions: { x: number; y: number }[] = [];

    // Use group index as seed for consistent dot placement
    const seedBase = groupIndex * 9999;
    let seedCounter = 0;

    while (tempPositions.length < totalDots && attempts < maxAttempts) {
      attempts++;
      seedCounter++;

      // Generate deterministic "random" numbers based on seed
      const angleSeed = Math.sin(seedBase + seedCounter) * 10000;
      const radiusSeed = Math.sin(seedBase + seedCounter * 2) * 10000;

      const angle = (angleSeed - Math.floor(angleSeed)) * 2 * Math.PI;
      const radius = Math.sqrt(radiusSeed - Math.floor(radiusSeed)) * maxRadius;

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const isValidPosition = tempPositions.every((pos) => {
        const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
        return distance >= minDistance;
      });

      if (isValidPosition) {
        tempPositions.push({ x, y });
      }
    }

    // Convert to stable positions with IDs
    tempPositions.forEach((pos, i) => {
      positions.push({
        x: pos.x,
        y: pos.y,
        id: `${groupIndex}-${i}`,
      });
    });

    return positions;
  };

  // Animate when groups change
  useEffect(() => {
    if (JSON.stringify(groups) !== JSON.stringify(previousGroupsRef.current)) {
      setIsAnimating(true);

      // Trigger container shake animation (less intense)
      containerControls.start({
        x: [0, -1, 1, -1, 1, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      // Animate each group's count change
      groups.forEach((group, index) => {
        const previousGroup = previousGroupsRef.current[index];
        const startCount = previousGroup?.count || 0;
        const endCount = group.count;

        if (startCount !== endCount) {
          // Animate count change over time
          const steps = Math.abs(endCount - startCount);
          const stepDuration = animationDuration / steps;

          for (let step = 0; step <= steps; step++) {
            setTimeout(
              () => {
                setAnimatedGroups((prev) => {
                  const newGroups = [...prev];
                  if (newGroups[index]) {
                    const progress = step / steps;
                    newGroups[index] = {
                      ...newGroups[index],
                      count: Math.round(
                        startCount + (endCount - startCount) * progress,
                      ),
                    };
                  }
                  return newGroups;
                });
              },
              step * stepDuration + index * animationDelay,
            );
          }
        }
      });

      // Update final state and reset animation flag
      setTimeout(
        () => {
          setAnimatedGroups(groups);
          setIsAnimating(false);
          previousGroupsRef.current = groups;
        },
        animationDuration + groups.length * animationDelay,
      );
    }
  }, [groups, animationDuration, animationDelay, containerControls]);

  // Initialize animated groups
  useEffect(() => {
    setAnimatedGroups(groups);
    previousGroupsRef.current = groups;
  }, [groups]);

  // Calculate total SVG dimensions with extra space for labels
  const totalWidth = Math.max(
    groups.length * (size + horizontalSpacing) - horizontalSpacing,
    600,
  );
  const totalHeight = size + maxVerticalShift * 2 + 180; // Extra space for labels above

  return (
    <motion.div
      className="p-8 overflow-x-auto"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div className="flex justify-center" animate={containerControls}>
        <motion.svg
          width={totalWidth}
          height={totalHeight}
          className="drop-shadow-lg"
          style={{ minWidth: totalWidth }}
          initial={{ opacity: 0, rotateX: 8 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          {/* Add CSS animation styles */}
          <defs>
            <style>{`
              .dot-green { 
                fill: #22c55e;
                stroke: #16a34a;
                filter: drop-shadow(0 2px 4px rgba(34, 197, 94, 0.3));
              }
              .dot-red { 
                fill: #ef4444;
                stroke: #dc2626;
                filter: drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3));
              }
              .circle-glow {
                filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4));
              }
            `}</style>

            {/* Gradient definitions for enhanced visuals */}
            <linearGradient
              id="greenGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient
              id="redGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <AnimatePresence mode="wait">
            {animatedGroups.map((group, index) => {
              if (index >= groups.length) return null;

              const offsetX = index * (size + horizontalSpacing);
              const offsetY = verticalShifts[index] + maxVerticalShift + 60; // Extra offset for labels
              const centerX = size / 2 + offsetX;
              const centerY = size / 2 + offsetY;
              const circleRadius = (size - dotRadius * 4) / 2;

              const positions = generateStablePositions(
                index,
                offsetX,
                offsetY,
              );
              const targetGroup = groups[index];
              const approvalPercentage = group.count;

              return (
                <motion.g
                  key={targetGroup?.name || `group-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                >
                  {/* Approval Rate Label with enhanced animation */}
                  <motion.text
                    x={centerX}
                    y={offsetY - 50}
                    textAnchor="middle"
                    className="text-xl font-bold fill-gray-800"
                    style={{
                      fontSize: "20px",
                      dominantBaseline: "middle",
                      filter: isAnimating ? "url(#glow)" : "none",
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                      opacity: isAnimating ? 0.7 : 1, // reduce glow opacity
                      y: 0,
                      scale: isAnimating ? 1.03 : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: index * 0.1,
                    }}
                  >
                    {approvalPercentage}% Approval Rate
                  </motion.text>

                  {/* Group Name with staggered animation */}
                  <motion.text
                    x={centerX}
                    y={offsetY - 30}
                    textAnchor="middle"
                    className="text-lg font-semibold fill-gray-600"
                    style={{
                      fontSize: "16px",
                      dominantBaseline: "middle",
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: isAnimating ? 0.8 : 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: index * 0.1 + 0.1,
                    }}
                  >
                    {targetGroup?.name || group.name}
                  </motion.text>

                  {/* Animated Circle boundary with pulse effect */}
                  <motion.circle
                    cx={centerX}
                    cy={centerY}
                    r={circleRadius}
                    fill="none"
                    stroke="#d1d5db"
                    strokeWidth="3"
                    strokeDasharray="8,8"
                    className={isAnimating ? "circle-glow" : ""}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: isAnimating ? 0.8 : 0.6,
                      scale: isAnimating ? 1.02 : 1,
                      rotate: isAnimating ? 30 : 0,
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      delay: index * 0.1 + 0.2,
                      rotate: {
                        duration: 1,
                        ease: "linear",
                        repeat: isAnimating ? Infinity : 0,
                      },
                    }}
                  />

                  {/* Generate animated dots with sophisticated animations */}
                  {positions.slice(0, totalDots).map((pos, dotIndex) => {
                    const isGreen = dotIndex < group.count;
                    const wasGreen =
                      dotIndex < (previousGroupsRef.current[index]?.count || 0);
                    const isChanging = isGreen !== wasGreen;

                    return (
                      <motion.circle
                        key={pos.id}
                        cx={pos.x}
                        cy={pos.y}
                        r={dotRadius}
                        fill={
                          isGreen ? "url(#greenGradient)" : "url(#redGradient)"
                        }
                        stroke={isGreen ? "#16a34a" : "#dc2626"}
                        strokeWidth="1"
                        className={`${isGreen ? "dot-green" : "dot-red"}`}
                        style={{ cursor: "pointer" }}
                        initial={{
                          opacity: 0,
                          scale: 0,
                          rotate: -180,
                        }}
                        animate={{
                          opacity: 1,
                          scale: isChanging && isAnimating ? [1, 1.2, 1] : 1,
                          rotate: isChanging && isAnimating ? [0, 45, 90] : 0,
                        }}
                        whileHover={{
                          scale: 1.4,
                          rotate: 15,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{
                          scale: 0.9,
                          rotate: -15,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: index * 0.1 + dotIndex * 0.005,
                          scale:
                            isChanging && isAnimating
                              ? {
                                  duration: 0.8,
                                  ease: "easeInOut",
                                  times: [0, 0.5, 1],
                                }
                              : { duration: 0.6 },
                          rotate:
                            isChanging && isAnimating
                              ? { duration: 0.8, ease: "easeInOut" }
                              : { duration: 0.6 },
                        }}
                      />
                    );
                  })}
                </motion.g>
              );
            })}
          </AnimatePresence>
        </motion.svg>
      </motion.div>

      {/* Enhanced Legend with motion */}
      <motion.div
        className="mt-8 flex justify-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-lg"
            animate={{
              boxShadow: isAnimating
                ? "0 0 20px rgba(34, 197, 94, 0.6)"
                : "0 4px 6px rgba(34, 197, 94, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          />
          <span className="text-base font-medium text-gray-700">Approval</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-5 h-5 rounded-full bg-gradient-to-r from-red-400 to-red-600 shadow-lg"
            animate={{
              boxShadow: isAnimating
                ? "0 0 20px rgba(239, 68, 68, 0.6)"
                : "0 4px 6px rgba(239, 68, 68, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          />
          <span className="text-base font-medium text-gray-700">
            Disapproval
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
