import React from "react";
import { ImagePlus } from "lucide-react";
import { motion } from "framer-motion";

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

const UploadSection = ({ title }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex-1"
    >
      <h2 className="text-xl font-semibold mb-4 text-center text-[#3B5249]">
        {title}
      </h2>

      {/* Upload Box */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="border-2 border-dashed border-gray-500 rounded-xl h-72 flex flex-col items-center justify-center text-gray-300 cursor-pointer hover:bg-gray-800/30 transition"
      >
        <ImagePlus size={40} />

        <p className="mt-3 text-md text-[#3B5249] text-center">
          Upload Image <br />Or
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#3B5249] text-white mt-2 px-6 py-2 rounded-2xl font-medium hover:bg-[#3a5a40] transition-all shadow-lg"
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
            className="w-full h-24 bg-gray-700 rounded-lg overflow-hidden border border-gray-600"
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

const TryOnUI = () => {
  return (
    <div className="min-h-screen bg-[#ededea] p-8 mx-7 my-3 rounded-2xl">
      <motion.div
        className="max-w-6xl mx-auto border-2 border-[#3B5249] rounded-2xl p-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col md:flex-row gap-10">
          <UploadSection title="Step 1: Upload Your Model" />
          <UploadSection title="Step 2: Select Your Outfit" />
        </div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#3B5249] text-white mt-8 mb-1 px-10 py-2 rounded-2xl font-medium hover:bg-[#3a5a40] transition-all shadow-lg block mx-auto"
        >
          Generate
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TryOnUI;