import React from 'react';

export default function Tutorials() {
  return (
    /* Outer layout matching the main page canvas */
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans antialiased pt-24 pb-6 px-4">
      
      {/* Updated Main Section Container with a lightened, clean cream color balance */}
      <div className="max-w-7xl mx-auto bg-[#fdfdfb] rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden p-8 md:p-16 min-h-[calc(100vh-8.5rem)] flex flex-col items-center justify-center">
        
        {/* Simple, Elegant Main Header */}
        <div className="text-center max-w-2xl mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            How to Use Virtual Try On
          </h1>
          <p className="text-base font-medium text-slate-600/90 leading-relaxed px-4">
            Learn how to use Virtual Try On in three simple steps: upload your photo, select your outfit, and press generate to see instant results.
          </p>
        </div>

        {/* Horizontal Format Layout Sequence */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative max-w-5xl">
          
          {/* Step 1 Card */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-wide text-center pb-2 border-b border-slate-100 group-hover:text-purple-600 transition-colors duration-200">
                Step 1: Upload Your Model
              </h2>
              <p className="text-sm font-medium text-slate-700/90 leading-relaxed">
                Begin by uploading a clear photo of your model or yourself . This image will serve as the base for your virtual Try On experience, ensuring a personalized and accurate fitting. Whether it's a full-body shot or a close-up, make sure the photo is clear to get the best results with our AI-powered system.
              </p>
            </div>
          </div>

          {/* Step 2 Card */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-wide text-center pb-2 border-b border-slate-100 group-hover:text-purple-600 transition-colors duration-200">
                Step 2: Select Your Outfit
              </h2>
              <p className="text-sm font-medium text-slate-700/90 leading-relaxed">
                Browse through a wide range of outfits available on virtual system. Whether you're looking for casual, formal, or trendy styles, you can easily choose the perfect outfit to visualize. Our AI virtual Try On technology makes it simple to select and pair outfits with your model or avatar in just a few clicks.
              </p>
            </div>
          </div>

          {/* Step 3 Card */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-wide text-center pb-2 border-b border-slate-100 group-hover:text-purple-600 transition-colors duration-200">
                Step 3: Press Generate
              </h2>
              <p className="text-sm font-medium text-slate-700/90 leading-relaxed">
                Once you've selected your desired outfit, simply press the "Generate" button. Ours Virtual's advanced AI virtual Try On technology will create a realistic image or video of how the outfit looks on your model or yourself. Enjoy the instant results, allowing you to see your fashion choices come to life with just a few clicks.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}