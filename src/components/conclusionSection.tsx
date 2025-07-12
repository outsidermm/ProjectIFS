import { motion } from "framer-motion";

export default function ConclusionSection() {
  return (
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
  )
}