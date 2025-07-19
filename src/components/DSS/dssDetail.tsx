import { motion } from "framer-motion";
import { cardVariants } from "../cardVariants";

export default function DssDetail() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-6 py-20 flex flex-col justify-center items-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Your Personalized Insights
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-xl mb-12"
        >
          Our DSS doesn&apos;t just give you a &quot;yes&quot; or
          &quot;no.&quot; It provides a complete analysis to empower your
          financial decisions.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
      >
        {/* Card 1: Approval Prediction */}
        <motion.div
          variants={cardVariants}
          className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border"
        >
          <div className="text-4xl text-indigo-500 mb-4">
            {/* <FiCheckCircle /> */}✅
          </div>
          <h3 className="text-xl font-bold mb-2">Approval Prediction</h3>
          <p className="text-gray-600">
            Get an accurate percentage chance of your loan being approved.
          </p>
        </motion.div>

        {/* Card 2: Rejection Analysis */}
        <motion.div
          variants={cardVariants}
          className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border"
        >
          <div className="text-4xl text-red-500 mb-4">
            {/* <FiXCircle /> */}❌
          </div>
          <h3 className="text-xl font-bold mb-2">Rejection Analysis</h3>
          <p className="text-gray-600">
            If rejection is likely, we&apos;ll pinpoint the reasons, like CIBIL
            score or income.
          </p>
        </motion.div>

        {/* Card 3: Default Risk */}
        <motion.div
          variants={cardVariants}
          className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border"
        >
          <div className="text-4xl text-amber-500 mb-4">
            {/* <FiShield /> */}🛡️
          </div>
          <h3 className="text-xl font-bold mb-2">Default Risk Score</h3>
          <p className="text-gray-600">
            Understand your risk profile for defaulting on the loan in the
            future.
          </p>
        </motion.div>

        {/* Card 4: Recommendations */}
        <motion.div
          variants={cardVariants}
          className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border"
        >
          <div className="text-4xl text-green-500 mb-4">
            {/* <FiTrendingUp /> */}📈
          </div>
          <h3 className="text-xl font-bold mb-2">Actionable Steps</h3>
          <p className="text-gray-600">
            Receive personalized tips on how to strengthen your profile for a
            better outcome.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
