import { motion } from "framer-motion";

export default function DssSummary() {
  return (
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
          className="max-w-3xl text-xl mb-8"
        >
          Our Decision Support System analyzes over 10,000 profiles to give you
          a clear picture of your loan eligibility before you apply.
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
          <p className="text-xl text-gray-600 mt-1">
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
  );
}
