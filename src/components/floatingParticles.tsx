"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface FloatingParticlesProps {
  color: string;
  count: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  color,
  count,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));

    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full opacity-60"
          style={{ backgroundColor: color }}
          initial={{ x: p.x, y: p.y }}
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
