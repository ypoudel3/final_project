
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ImagePlus, ChevronDown, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

// ==========================
// ANIMATIONS
// ==========================

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// ==========================
// FAQ DATA
// ==========================

const faqs = [
  {
    q: "How accurate is the virtual try-on?",
    a: "Our AI-powered system generates realistic clothing fitting results using advanced body landmark detection and garment warping.",
  },

  {
    q: "Can I upload my own photo?",
    a: "Yes. You can upload your own image after logging into your account.",
  },

  {
    q: "How long does generation take?",
    a: "Usually between 3 to 10 seconds depending on image size.",
  },

  {
    q: "Can I try different dresses?",
    a: "Yes. Select any dress from the gallery before generating the result.",
  },
];

// ==========================
// CLOTHES
// Put these images inside:
// public/clothes/
// ==========================

const clothes = [
  {
    id: 1,
    image: "/clothes/dress1.jpg",
  },

  {
    id: 2,
    image: "/clothes/dress2.jpg",
  },

  {
    id: 3,
    image: "/clothes/dress3.jpg",
  },

  {
    id: 4,
    image: "/clothes/dress4.jpg",
  },
];

// ==========================
// FAQ COMPONENT
// ==========================

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-4xl mx-auto mt-20 mb-20 px-5">
      <motion.h2
        variants={itemVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-10 text-[#3B5249]"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white rounded-2xl border overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
            >
              <span className="font-medium text-[#3B5249]">
                {faq.q}
              </span>

              <ChevronDown
                className={`transition duration-300 ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === i && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 pb-5 text-gray-600 text-sm"
              >
                {faq.a}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ==========================
// MAIN COMPONENT
// ==========================

const TryOnUI = () => {
  const { user, setIsAuthModalOpen } =
    useContext(AuthContext);

  const [personImage, setPersonImage] = useState(null);

  const [personPreview, setPersonPreview] =
    useState(null);

  const [selectedCloth, setSelectedCloth] =
    useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // ==========================
  // OPEN FILE INPUT
  // ==========================

  const handleUploadClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    fileInputRef.current?.click();
  };

  // ==========================
  // HANDLE IMAGE
  // ==========================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setPersonImage(file);

      setPersonPreview(
        URL.createObjectURL(file)
      );
    }
  };

  // ==========================
  // GENERATE TRY ON
  // ==========================

  const runTryOn = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!personImage || !selectedCloth) {
      alert(
        "Please upload your image and select a dress."
      );

      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // PERSON IMAGE
      formData.append(
        "person",
        personImage
      );

      // CLOTH IMAGE
      const clothBlob = await fetch(
        selectedCloth.image
      ).then((r) => r.blob());

      formData.append(
        "cloth",
        clothBlob,
        selectedCloth.name + ".jpg"
      );

      // API CALL
      const response = await axios.post(
        "http://127.0.0.1:5000/tryon",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setResult(response.data.image);
    } catch (error) {
      console.error(error);

      alert("Try-on failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#ededea] py-12 px-5 md:px-10 rounded-3xl mx-4 md:mx-8 mt-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto"
        >
          {/* ========================= */}
          {/* TITLE */}
          {/* ========================= */}

          <motion.div
            variants={itemVariants}
            className="text-center mb-14"
          >
            <h1 className="text-4xl font-bold text-[#3B5249]">
               Virtual Try-On Studio
            </h1>

            <p className="text-gray-600 mt-4">
              Upload your image and try
              clothes instantly.
            </p>
          </motion.div>

          {/* ========================= */}
          {/* MAIN GRID */}
          {/* ========================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ========================= */}
            {/* UPLOAD SECTION */}
            {/* ========================= */}

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-[#3B5249] mb-6">
                Upload Your Image
              </h2>

              {/* HIDDEN INPUT */}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* UPLOAD BOX */}

              <motion.div
                whileHover={
                  user
                    ? {
                        scale: 1.02,
                      }
                    : {}
                }
                onClick={handleUploadClick}
                className={`border-2 border-dashed rounded-3xl h-170 flex flex-col items-center justify-center overflow-hidden relative transition
                  
                  ${
                    user
                      ? "cursor-pointer border-[#3B5249]"
                      : "cursor-not-allowed opacity-80 border-gray-400"
                  }
                `}
              >
                {personPreview ? (
                  <img
                    src={personPreview}
                    alt="preview"
                    className="w-full h-full object-cover absolute inset-0"
                  />
                ) : (
                  <>
                    <ImagePlus
                      size={55}
                      className="text-[#3B5249]"
                    />

                    <p className="mt-5 text-center text-[#3B5249] font-medium">
                      {user
                        ? "Click to upload your image"
                        : "Login to upload image"}
                    </p>

                    <motion.button
                      whileHover={
                        user
                          ? {
                              scale: 1.05,
                            }
                          : {}
                      }
                      whileTap={
                        user
                          ? {
                              scale: 0.95,
                            }
                          : {}
                      }
                      className={`mt-5 px-8 py-3 rounded-2xl font-medium transition
                        
                        ${
                          user
                            ? "bg-[#3B5249] text-white hover:bg-[#2f433b]"
                            : "bg-gray-300 text-gray-500"
                        }
                      `}
                    >
                      Upload
                    </motion.button>
                  </>
                )}
              </motion.div>

              {/* REMOVE */}

              {personImage && (
                <button
                  onClick={() => {
                    setPersonImage(null);
                    setPersonPreview(null);
                    setResult(null);
                  }}
                  className="mt-4 p-3 rounded-2xl font-medium transition bg-[#588157] text-white hover:bg-[#2f433b]"
                >
                  Remove Image
                </button>
              )}
            </motion.div>

            {/* ========================= */}
            {/* CLOTHES SECTION */}
            {/* ========================= */}

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-[#3B5249] mb-6">
                Select Your Outfit
              </h2>

              <div className="grid grid-cols-2 gap-5">
                {clothes.map((cloth) => (
                  <motion.div
                    key={cloth.id}
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    onClick={() =>
                      setSelectedCloth(cloth)
                    }
                    className={`rounded-2xl overflow-hidden border-4 cursor-pointer transition
                      
                      ${
                        selectedCloth?.id ===
                        cloth.id
                          ? "border-[#3B5249]"
                          : "border-transparent"
                      }
                    `}
                  >
                    <img
                      src={cloth.image}
                      alt={cloth.name}
                      className="w-full h-64 object-cover"
                    />

                    
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ========================= */}
          {/* GENERATE BUTTON */}
          {/* ========================= */}

          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={runTryOn}
              disabled={loading}
              className="bg-[#3B5249] text-white px-12 py-4 rounded-2xl text-lg font-medium shadow-lg hover:bg-[#2f433b] transition flex items-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Generate Try-On"
              )}
            </motion.button>
          </motion.div>

          {/* ========================= */}
          {/* RESULT */}
          {/* ========================= */}

          {result && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mt-20 bg-white p-8 rounded-3xl shadow-xl"
            >
              <h2 className="text-3xl font-bold text-center text-[#3B5249] mb-8">
                Generated Result
              </h2>

              <img
                src={result}
                alt="Result"
                className="rounded-3xl mx-auto max-h-[800px] object-contain"
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* FAQ */}
      <FAQ />
    </>
  );
};

export default TryOnUI;

