import React, { useState } from "react";
import { ImagePlus, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// 🔹 Animation Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// 🔹 Upload Section
const UploadSection = ({ title }) => {
  return (
    <motion.div variants={itemVariants} className="flex-1">
      <h2 className="text-xl font-semibold mb-4 text-center text-[#3B5249]">
        {title}
      </h2>

      {/* Upload Box */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="border-2 border-dashed border-gray-500 rounded-xl h-72 flex flex-col items-center justify-center text-gray-300 cursor-pointer hover:bg-gray-800/10 transition"
      >
        <ImagePlus size={40} />

        <p className="mt-3 text-md text-[#3B5249] text-center">
          Upload Image <br /> Or
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#3B5249] text-white mt-2 px-6 py-2 rounded-2xl font-medium hover:bg-[#3a5a40]"
        >
          Upload File
        </motion.button>
      </motion.div>

      {/* Examples */}
      <p className="text-gray-400 mt-4 mb-2">Examples</p>

      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.05 }}
            className="w-full h-24 bg-gray-300 rounded-lg overflow-hidden"
          >
            <img
              src={`https://picsum.photos/200?random=${item}`}
              alt="example"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// 🔹 FAQ DATA
const faqs = [
  {
    q: "How accurate is the virtual try-on?",
    a: "Our AI gives highly realistic results using body mapping and cloth simulation.",
  },
  {
    q: "What clothing can I try?",
    a: "You can try shirts, dresses, jackets, and more.",
  },
  {
    q: "How long does generation take?",
    a: "Usually just a few seconds depending on server load.",
  },
  {
    q: "Can I use images commercially?",
    a: "Yes, depending on your subscription plan.",
  },
];

// 🔹 FAQ COMPONENT
const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-bold text-center mb-4 text-[#3B5249]"
      >
        Frequently Asked{" "}
        <span className="text-[#588157]">Questions</span>
      </motion.h2>

      <p className="text-center text-gray-500 mb-10">
        Everything you need to know about virtual try-on
      </p>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="border border-gray-300 rounded-xl overflow-hidden bg-white"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center px-6 py-4"
            >
              <span className="font-medium text-[#3B5249]">
                {faq.q}
              </span>

              <ChevronDown
                className={`transition-transform duration-300 ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`px-6 transition-all duration-300 ${
                open === i
                  ? "max-h-40 pb-4 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <p className="text-gray-500 text-sm">{faq.a}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 🔹 MAIN UI
const TryOnUI = () => {
  return (
    <>
    <div className="min-h-screen bg-[#ededea] py-8 mx-7 my-30 rounded-2xl">
      <motion.div
        className="max-w-6xl mx-auto rounded-2xl p-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Upload Sections */}
        <div className="flex flex-col md:flex-row gap-10">
          <UploadSection title="Step 1: Upload Your Model" />
          <UploadSection title="Step 2: Select Your Outfit" />
        </div>

        {/* Generate Button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#3B5249] text-white mt-8 px-10 py-2 rounded-2xl font-medium hover:bg-[#3a5a40] block mx-auto"
        >
          Generate
        </motion.button>

        {/* FAQ SECTION 🔥 */}
      </motion.div>
    </div>
     <FAQ />
     </>
  );
};

export default TryOnUI;