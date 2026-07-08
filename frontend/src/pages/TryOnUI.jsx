
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

// ==========================
// MAIN COMPONENT
// ==========================

const TryOnUI = () => {
  const { user, setIsAuthModalOpen } = useContext(AuthContext);

  const [personImage, setPersonImage] = useState(null);
  const [personPreview, setPersonPreview] = useState(null);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Example models data based on your target layout row structure
  const modelExamples = [
    { id: 1, image: "/models/model1.jpg" },
    { id: 2, image: "/models/model2.jpg" },
    { id: 3, image: "/models/model3.jpg" },
    { id: 4, image: "/models/model4.jpg" },
    { id: 5, image: "/models/model5.jpg" },
    { id: 6, image: "/models/model6.jpg" },
    { id: 7, image: "/models/model7.jpg" },
    { id: 8, image: "/models/model8.jpg" },
  ];

  // Example outfits data matched to a 2-row layout structure
  const clothesExamples = [
    { id: 1, image: "/clothes/dress1.jpg", name: "dress1" },
    { id: 2, image: "/clothes/dress2.jpg", name: "dress2" },
    { id: 3, image: "/clothes/dress3.jpg", name: "dress3" },
    { id: 4, image: "/clothes/dress4.jpg", name: "dress4" },
    { id: 5, image: "/clothes/dress5.jpg", name: "dress5" },
    { id: 6, image: "/clothes/dress6.jpg", name: "dress6" },
    { id: 7, image: "/clothes/dress7.jpg", name: "dress7" },
    { id: 8, image: "/clothes/dress8.jpg", name: "dress8" },
  ];

  const handleUploadClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPersonImage(file);
      setPersonPreview(URL.createObjectURL(file));
    }
  };

  const runTryOn = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!personImage || !selectedCloth) {
      alert("Please upload your image and select a dress.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("person", personImage);

      const clothBlob = await fetch(selectedCloth.image).then((r) => r.blob());
      formData.append("cloth", clothBlob, selectedCloth.name + ".jpg");

      const response = await axios.post("http://127.0.0.1:5000/tryon", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
          {/* TITLE */}
          <motion.div variants={itemVariants} className="text-center mb-14">
            <h1 className="text-4xl font-bold text-[#3B5249]">
              Virtual Try-On Studio
            </h1>
            <p className="text-gray-600 mt-4">
              Upload your image and try clothes instantly.
            </p>
          </motion.div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* STEP 1: UPLOAD MODEL */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-[#3B5249] mb-4 text-center">
                  Step 1: Upload Your Model
                </h2>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* DISPLAY WINDOW */}
                <motion.div
                  whileHover={user ? { scale: 1.01 } : {}}
                  onClick={handleUploadClick}
                  className={`border-2 border-dashed rounded-3xl h-96 flex flex-col items-center justify-center overflow-hidden relative transition bg-gray-50 ${
                    user ? "cursor-pointer border-[#3B5249]" : "cursor-not-allowed opacity-80 border-gray-400"
                  }`}
                >
                  {personPreview ? (
                    <img
                      src={personPreview}
                      alt="preview"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  ) : (
                    <div className="flex flex-col items-center p-4 text-center">
                      <ImagePlus size={45} className="text-[#3B5249]" />
                      <p className="mt-3 text-[#3B5249] font-medium text-sm">
                        {user ? "Click to upload your image" : "Login to upload image"}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* TWO-ROW MODEL THUMBNAIL BOX */}
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-500 mb-2">Examples</p>
                <div className="grid grid-cols-4 gap-3">
                  {modelExamples.map((ex) => (
                    <div
                      key={ex.id}
                      onClick={() => {
                        setPersonPreview(ex.image);
                        setPersonImage(ex.image);
                      }}
                      className="h-24 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#3B5249] active:scale-95 cursor-pointer transition shadow-sm"
                    >
                      <img src={ex.image} alt="Example Model" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                {personImage && (
                  <button
                    onClick={() => {
                      setPersonImage(null);
                      setPersonPreview(null);
                      setResult(null);
                    }}
                    className="mt-3 text-xs font-semibold text-red-600 hover:underline"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </motion.div>

            {/* STEP 2: SELECT OUTFIT */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-[#3B5249] mb-4 text-center">
                  Step 2: Select Your Outfit
                </h2>

                {/* DISPLAY WINDOW */}
                <div className="border-2 border-dashed border-gray-200 rounded-3xl h-96 flex flex-col items-center justify-center overflow-hidden relative bg-gray-50">
                  {selectedCloth ? (
                    <img
                      src={selectedCloth.image}
                      alt="Selected outfit"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center p-4 text-center">
                      <ImagePlus size={45} className="text-gray-400" />
                      <p className="mt-3 text-gray-400 text-sm font-medium">
                        Select an outfit below
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* TWO-ROW CLOTHING THUMBNAIL BOX */}
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-500 mb-2">Examples</p>
                <div className="grid grid-cols-4 gap-3">
                  {clothesExamples.map((cloth) => (
                    <div
                      key={cloth.id}
                      onClick={() => setSelectedCloth(cloth)}
                      className={`h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition active:scale-95 shadow-sm ${
                        selectedCloth?.id === cloth.id ? "border-[#3B5249]" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={cloth.image}
                        alt="Clothing snippet"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

          {/* GENERATE BUTTON */}
          <motion.div variants={itemVariants} className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={runTryOn}
              disabled={loading}
              className="bg-[#3B5249] text-white px-16 py-4 rounded-2xl text-lg font-medium shadow-lg hover:bg-[#2f433b] transition flex items-center gap-3"
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

          {/* RESULT */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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

