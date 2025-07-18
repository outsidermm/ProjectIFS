import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/floatingParticles";

export default function IsGraduatedSection() {
  return (
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
            Applicants who have graduated from high school are
            {" "}<span className="text-emerald-600 font-semibold">
              equally likely to be approved
            </span>{" "}
            than applicants who have not graduated.
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
  );
}
