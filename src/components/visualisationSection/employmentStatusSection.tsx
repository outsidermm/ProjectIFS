import { FloatingParticles } from "@/components/floatingParticles";
import { motion } from "framer-motion";

export default function EmploymentStatusSection() {
  return (
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
  );
}
