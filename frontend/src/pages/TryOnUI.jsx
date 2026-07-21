import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ImagePlus, ChevronDown, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

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
  const { user, setIsAuthModalOpen } = useContext(AuthContext);
  const location = useLocation();

  const [personImage, setPersonImage] = useState(null);
  const [personPreview, setPersonPreview] = useState(null);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // If the user arrived here from a gallery page with a pre-selected
  // image passed via navigate(..., { state: { galleryImage } }),
  // pre-fill the model image/preview with it.
  useEffect(() => {
    const incoming = location.state?.galleryImage;
    if (incoming) {
      setPersonImage(incoming);
      setPersonPreview(incoming);
    }
  }, [location.state]);

  // Example models data based on your target layout row structure
  const modelExamples = [
    { id: 2, image: "/models/model2.jpg" },
    { id: 3, image: "/models/model3.jpg" },
    { id: 4, image: "/models/model4.jpg" },
  ];

  // Outfits are pulled live from every seller's listings and grouped
  // by shop name, e.g. { "Zara": [...], "H&M": [...] }
  const [shopListings, setShopListings] = useState({});
  const [listingsLoading, setListingsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // NOTE: adjust this path to match wherever seller_bp is registered
        // in your Flask app (e.g. app.register_blueprint(seller_bp, url_prefix="/seller"))
        const res = await axios.get("http://127.0.0.1:5000/seller/public/listings");
        setShopListings(res.data.shops || {});
      } catch (error) {
        console.error("Failed to load outfits:", error);
      } finally {
        setListingsLoading(false);
      }
    };

    fetchListings();
  }, []);

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

      // --- FIX FOR PERSON IMAGE ---
      if (typeof personImage === "string") {
        const personBlob = await fetch(personImage).then((r) => r.blob());
        formData.append("person", personBlob, "model_example.jpg");
      } else {
        formData.append("person", personImage);
      }

      // --- CLOTH IMAGE ---
      const clothBlob = await fetch(selectedCloth.image_url).then((r) => r.blob());
      formData.append("cloth", clothBlob, (selectedCloth.name || "cloth") + ".jpg");

      // Attach ownership/context info when the user is logged in
      if (user?.id) {
        formData.append("user_id", user.id);
        formData.append("cloth_name", selectedCloth.name || "cloth");
      }

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* STEP 1: UPLOAD MODEL */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 shadow-lg flex flex-col gap-6 max-h-150 overflow-y-auto"
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
                  className={`border-2 border-dashed rounded-3xl h-86 flex flex-col items-center justify-center overflow-hidden relative transition bg-gray-50 ${
                    user ? "cursor-pointer border-[#3B5249]" : "cursor-not-allowed opacity-80 border-gray-400"
                  }`}
                >
                  {personPreview ? (
                    <img
                      src={personPreview}
                      alt="preview"
                      className="w-full h-full object-contain absolute inset-0"
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
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Examples</p>
                <div className="grid grid-cols-4 gap-3">
                  {modelExamples.map((ex) => (
                    <div
                      key={ex.id}
                      onClick={() => {
                        setPersonPreview(ex.image);
                        setPersonImage(ex.image);
                      }}
                      className={`h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition active:scale-95 shadow-sm ${
                        personImage === ex.image ? "border-[#3B5249]" : "border-transparent hover:border-gray-300"
                      }`}
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

                    className="mt-3 text-sm font-semibold text-red-600 hover:underline block"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </motion.div>

            {/* STEP 2: SELECT OUTFIT */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 shadow-lg flex flex-col gap-6 max-h-150 overflow-y-auto"
            >
              <div>
                <h2 className="text-xl font-semibold text-[#3B5249] mb-4 text-center">
                  Step 2: Select Your Outfit
                </h2>

                {/* DISPLAY WINDOW */}
                <div className="border-2 border-dashed border-gray-200 rounded-3xl h-86 flex flex-col items-center justify-center overflow-hidden relative bg-gray-50">
                  {selectedCloth ? (
                    <img
                      src={selectedCloth.image_url}
                      alt="Selected outfit"
                      className="w-full h-full object-contain p-4 absolute inset-0"
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

              {/* OUTFITS GROUPED BY SHOP */}
              <div className="max-h-96 overflow-y-auto pr-1">
                {listingsLoading ? (
                  <p className="text-sm text-gray-400 text-center py-6">
                    Loading outfits...
                  </p>
                ) : Object.keys(shopListings).length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">
                    No outfits available yet.
                  </p>
                ) : (
                  Object.entries(shopListings).map(([shopName, items]) => (
                    <div key={shopName} className="mb-6 last:mb-0">
                      <p className="text-sm font-semibold text-[#3B5249] mb-2">
                        {shopName}
                      </p>
                      <div className="grid grid-cols-4 gap-3">
                        {items.map((cloth) => {
                          const clothId = cloth._id?.$oid || cloth._id;
                          const isSelected =
                            (selectedCloth?._id?.$oid || selectedCloth?._id) === clothId;

                          return (
                            <div
                              key={clothId}
                              onClick={() =>
                                setSelectedCloth({ ...cloth, shop_name: shopName })
                              }
                              title={cloth.name}
                              className={`h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition active:scale-95 shadow-sm ${
                                isSelected
                                  ? "border-[#3B5249]"
                                  : "border-transparent hover:border-gray-300"
                              }`}
                            >
                              <img
                                src={cloth.image_url}
                                alt={cloth.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
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

              {/* BUY NOW — links out to the seller for the item just tried on */}
              {selectedCloth && (
                <div className="flex flex-col items-center mt-8 gap-2">
                  <p className="text-gray-600 text-lg font-semibold">
                    Liking the fit?{" "}
                    {selectedCloth.shop_name
                      ? `Get this "${selectedCloth.name}" from ${selectedCloth.shop_name}.`
                      : `Get this "${selectedCloth.name}" now.`}
                  </p>

                  {selectedCloth.product_url ? (
                    <a
                      href={selectedCloth.product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#3B5249] text-white px-10 py-3 rounded-2xl font-medium shadow-md hover:bg-[#2f433b] transition"
                    >
                      Buy This Top
                    </a>
                  ) : (
                    // Fallback while sellers/backend don't yet supply product_url per listing
                    <button
                      disabled
                      title="This item does not have a purchase link yet"
                      className="bg-[#3B5249] text-white px-10 py-3 rounded-2xl font-medium cursor-not-allowed"
                    >
                      Buy This Top
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      <FAQ />
    </>
  );
};

export default TryOnUI;