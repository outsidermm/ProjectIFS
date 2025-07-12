import { FloatingParticles } from "@/app/page";
import { motion } from "framer-motion";

export default function GenderSection() {
  return (
    <section className="h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 px-6 py-20 flex flex-col justify-center relative overflow-hidden">
        <FloatingParticles color="rgba(245, 158, 11, 0.3)" count={18} />

        {/* Enhanced animated background overlay */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-amber-300/12 to-orange-300/12"
        />

        {/* Flowing wave effect */}
        <motion.div
          animate={{
            x: [-100, 100, -100],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/15 to-transparent"
        />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1)_1px,transparent_1px)] bg-[length:40px_40px] opacity-30" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-4xl md:text-6xl font-bold mb-8 mx-5 text-gray-800"
          >
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Gender
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-5 bg-white/75 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 shadow-lg"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="text-blue-600 font-semibold">
                Male applicants
              </span>{" "}
              typically have a higher chance of approval compared to
              <span className="text-pink-600 font-semibold">
                {" "}
                female applicants
              </span>
              .
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced floating elements */}
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-28 h-28 bg-gradient-to-r from-amber-200/50 to-orange-200/50 rounded-full blur-sm"
        />

        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-yellow-300/40 to-amber-300/40 rounded-full blur-md"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-16 w-16 h-16 bg-gradient-to-tr from-orange-200/30 to-amber-200/30 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-16 right-1/3 w-24 h-24 bg-gradient-to-bl from-amber-300/35 to-orange-300/35 rounded-full blur-lg"
        />
      </section>
  )
}