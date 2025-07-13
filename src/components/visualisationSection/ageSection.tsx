import { FloatingParticles } from "@/components/floatingParticles";
import { motion } from "framer-motion";

export default function AgeSection() {
  return (
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
  );
}
