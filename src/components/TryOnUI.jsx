import React from "react";
import { ImagePlus } from "lucide-react";

const UploadSection = ({ title }) => {
  return (
    <div className="flex-1">
      <h2 className="text-xl font-semibold text-white mb-4 text-center">
        {title}
      </h2>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-gray-500 rounded-xl h-72 flex flex-col items-center justify-center text-gray-300 cursor-pointer hover:bg-gray-800/30 transition">
        <ImagePlus size={40} />
        <p className="mt-3 text-lg">Upload Image</p>
      </div>

      {/* Examples */}
      <p className="text-gray-400 mt-4 mb-2">Examples</p>

      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="w-full h-24 bg-gray-700 rounded-lg overflow-hidden border border-gray-600"
          >
            <img
              src={`https://picsum.photos/200?random=${item}`}
              alt="example"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const TryOnUI = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] to-[#1e293b] p-10">
      <div className="max-w-6xl mx-auto border border-gray-700 rounded-2xl p-8">
        
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Step 1 */}
          <UploadSection title="Step 1: Upload Your Model" />

          {/* Step 2 */}
          <UploadSection title="Step 2: Select Your Outfit" />

        </div>

      </div>
    </div>
  );
};

export default TryOnUI;