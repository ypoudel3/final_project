import React, { useState } from 'react';
import { Upload, Shirt, Sparkles, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function Tutorials() {
  const [openSection, setOpenSection] = useState(0);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 antialiased">
      
      {/* Navbar Match from Screenshot */}
      <nav className="w-full bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center font-bold text-sm">
            T
          </div>
          <span className="font-semibold text-slate-800 text-sm">Virtual Try-On Studio</span>
        </div>
        <ul className="flex gap-8 text-slate-600 font-medium text-xs tracking-wide">
          <li className="cursor-pointer hover:text-slate-900">Virtual Try-On Studio</li>
          <li className="cursor-pointer hover:text-slate-900">Pricing</li>
          <li className="cursor-pointer text-purple-600 font-semibold">Tutorials</li>
          <li className="cursor-pointer hover:text-slate-900">My Gallery</li>
        </ul>
        <div className="flex items-center gap-4">
          <button className="text-xs font-medium text-slate-500 hover:text-slate-900">Switch to Seller</button>
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
            A
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto pt-32 pb-16 px-4">
        
        <div className="mb-10 pb-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Guide & Documentation</h1>
          <p className="text-sm text-slate-500 mt-1">
            Step-by-step instructions on how to use the AI try-on tool effectively and avoid generation errors.
          </p>
        </div>

        {/* Documentation Accordion Container */}
        <div className="space-y-4">

          {/* Section 1 */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSection(0)}
              className="w-full flex items-center justify-between p-5 text-left font-medium text-sm hover:bg-slate-50 transition"
            >
              <span className="flex items-center gap-3">
                <Upload size={16} className="text-slate-500" />
                Step 1: Preparing and Uploading Your Model Image
              </span>
              {openSection === 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {openSection === 0 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-600 space-y-4 leading-relaxed">
                <p>To ensure the AI molds the clothing accurately to your frame, your base image must follow these criteria:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Pose:</strong> Stand straight, facing directly at the camera. Keep your arms slightly away from your sides (a slight A-pose is ideal). Avoid cross-legged positions or angled body profiles.</li>
                  <li><strong>Clothing:</strong> Wear tight or form-fitting clothing (like a t-shirt and leggings). Baggy hoodies or wide dresses throw off the AI's weight and shape calculation.</li>
                  <li><strong>Lighting:</strong> Use clear, even lighting. Avoid strong backlights or heavy shadows cast over your face and body.</li>
                </ul>
                <div className="flex gap-2 p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 text-[11px]">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span><strong>Supported Files:</strong> Only standard formats (.jpg, .png) up to 10MB are accepted. High-contrast plain backgrounds produce the crispest renders.</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 2 */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSection(1)}
              className="w-full flex items-center justify-between p-5 text-left font-medium text-sm hover:bg-slate-50 transition"
            >
              <span className="flex items-center gap-3">
                <Shirt size={16} className="text-slate-500" />
                Step 2: Selecting and Layering Garments
              </span>
              {openSection === 1 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {openSection === 1 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-600 space-y-4 leading-relaxed">
                <p>Navigate the left-hand clothing catalog panels to select your desired pieces:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Single-item Fitting:</strong> Select any individual garment (Top or Bottom). The platform automatically maps it to your uploaded model.</li>
                  <li><strong>Full Outfits:</strong> You can choose both a top and a bottom item simultaneously. Ensure you are not selecting conflicting items (like trying to wear two dresses at once).</li>
                  <li><strong>Sizing Selection:</strong> Use the fit modifier toggle in the sidebar to switch between a standard fit, slim fit, or oversized look before moving to production.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Section 3 */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSection(2)}
              className="w-full flex items-center justify-between p-5 text-left font-medium text-sm hover:bg-slate-50 transition"
            >
              <span className="flex items-center gap-3">
                <Sparkles size={16} className="text-slate-500" />
                Step 3: Rendering the Final Output
              </span>
              {openSection === 2 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {openSection === 2 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-600 space-y-4 leading-relaxed">
                <p>Once your model and clothes are staged, click the <strong>Generate Look</strong> action button:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Processing Time:</strong> Generations typically take between 5 to 12 seconds depending on server load. Do not refresh or back out of the page during processing.</li>
                  <li><strong>Managing Results:</strong> Renders are instantly saved to your personal history cache. You can download high-resolution exports directly or copy a secure sharing link.</li>
                  <li><strong>Credits:</strong> Each unique generation consumes exactly 1 processing credit. You can monitor your active balance at the top of your studio dashboard.</li>
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Minimal Footer Support Note */}
        <div className="mt-12 p-4 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600 flex justify-between items-center">
          <span>Still getting warped results or generation errors?</span>
          <button className="font-semibold text-purple-600 hover:underline">Contact Support</button>
        </div>

      </div>
    </div>
  );
}