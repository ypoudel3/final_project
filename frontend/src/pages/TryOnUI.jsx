import React, { useContext, useState, useRef } from "react";
import { ImagePlus, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

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

const UploadSection = ({ title }) => {
  const { user, setIsAuthModalOpen } = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  // ✅ Only allow upload if logged in
  const handleUploadClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div variants={itemVariants} className="flex-1">
      <h2 className="text-xl font-semibold mb-4 text-center text-[#3B5249]">
        {title}
      </h2>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={!user} // ✅ prevent if not logged in
      />

      {/* Upload Box */}
      <motion.div
        whileHover={user ? { scale: 1.03 } : {}}
        onClick={handleUploadClick}
        className={`border-2 border-dashed border-gray-500 rounded-xl h-72 flex flex-col items-center justify-center text-gray-300 transition overflow-hidden relative
          ${user ? "cursor-pointer hover:bg-gray-800/10" : "cursor-not-allowed opacity-60"}
        `}
      >
        {preview ? (
          <img
            src={preview}
            alt="Uploaded preview"
            className="w-full h-full object-cover absolute inset-0"
          />
        ) : (
          <>
            <ImagePlus size={40} />

            <p className="mt-3 text-md text-[#3B5249] text-center">
              {user
                ? image
                  ? image.name
                  : "Upload Image"
                : "Login to upload images"}
              <br /> Or
            </p>

            <motion.button
              whileHover={user ? { scale: 1.1 } : {}}
              whileTap={user ? { scale: 0.95 } : {}}
              onClick={(e) => {
                e.stopPropagation();
                handleUploadClick();
              }}
              className={`mt-2 px-6 py-2 rounded-2xl font-medium
                ${user
                  ? "bg-[#3B5249] text-white hover:bg-[#3a5a40]"
                  : "bg-gray-400 text-white cursor-not-allowed"}
              `}
            >
              Upload File
            </motion.button>
          </>
        )}
      </motion.div>

      {/* Remove Image */}
      {image && (
        <button
          onClick={() => {
            setImage(null);
            setPreview(null);
          }}
          className="mt-2 text-sm text-red-400 hover:text-red-600 transition block mx-auto"
        >
          ✕ Remove image
        </button>
      )}

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
    a: "Our AI-powered virtual try-on delivers highly realistic results.",
  },
  {
    q: "What clothing can I try?",
    a: "You can explore shirts, dresses, jackets, and more.",
  },
  {
    q: "How long does generation take?",
    a: "Usually just a few seconds.",
  },
  {
    q: "Can I use images commercially?",
    a: "Yes, based on your subscription plan.",
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
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="border rounded-xl bg-white"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between px-6 py-4"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`${open === i ? "rotate-180" : ""}`}
              />
            </button>

            {open === i && (
              <div className="px-6 pb-4 text-sm text-gray-500">
                {faq.a}
              </div>
            )}
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
          className="max-w-6xl mx-auto p-6"
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
            className="bg-[#3B5249] text-white mt-8 px-10 py-2 rounded-2xl block mx-auto"
          >
            Generate
          </motion.button>
        </motion.div>
      </div>

      <FAQ />
    </>
  );
};

export default TryOnUI;