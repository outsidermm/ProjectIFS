import { FloatingParticles } from "@/components/floatingParticles";
import { motion } from "framer-motion";

export default function MaritalStatusSection() {
  return (
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
  );
}
