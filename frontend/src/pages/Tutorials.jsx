import React from 'react';

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-[#1e232b] text-slate-200 font-sans antialiased selection:bg-purple-950 selection:text-purple-200">
      
      {/* Premium Minimal Navigation */}
      <nav className="w-full bg-[#1e232b]/80 backdrop-blur-md border-b border-slate-800/60 px-8 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full border border-slate-400 flex items-center justify-center font-serif text-[10px] text-white font-bold tracking-wider">
            P
          </div>
          <span className="font-medium text-white text-xs tracking-widest uppercase">Pluto</span>
        </div>
        <ul className="hidden md:flex gap-10 text-[11px] font-medium tracking-widest uppercase text-slate-400">
          <li className="cursor-pointer hover:text-white transition duration-300">Virtual Try-On Studio</li>
          <li className="cursor-pointer hover:text-white transition duration-300">Pricing</li>
          <li className="cursor-pointer text-white border-b border-white pb-1 font-semibold">Tutorials</li>
          <li className="cursor-pointer hover:text-white transition duration-300">My Gallery</li>
        </ul>
        <div className="flex items-center gap-4">
          <button className="text-[11px] font-medium tracking-widest uppercase text-slate-400 hover:text-white transition duration-300">
            Switch to Seller
          </button>
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-white flex items-center justify-center font-mono text-xs">
            A
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-40 pb-32">
        
        {/* Elegant Header Section */}
        <div className="max-w-2xl mb-24 border-l border-slate-700 pl-6">
          <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase block mb-2">Documentation</span>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            How to Use <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-slate-200">Pluto Virtual Try-On</span>
          </h1>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xl">
            Learn how to use our high-fidelity virtual fitting environment in three sequential phases: stage your reference canvas, curate clothing layers, and execute the final render pipeline.
          </p>
        </div>

        {/* Minimalist Editorial Flow Layout */}
        <div className="space-y-16">
          
          {/* Phase 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10 border-t border-slate-800/80">
            <div className="md:col-span-3 flex flex-row md:flex-col justify-between items-baseline md:items-start">
              <span className="font-serif text-3xl font-light text-slate-600">01</span>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">Staging</span>
            </div>
            
            <div className="md:col-span-4">
              <h3 className="text-base font-semibold text-white tracking-tight">Upload Your Model</h3>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                Begin by uploading a clear, front-facing image of yourself or a studio template model. This visual serve as the baseline matrix for all subsequent cloth mapping.
              </p>
            </div>
            
            <div className="md:col-span-5 bg-slate-900/40 rounded-xl p-5 border border-slate-800 text-[11px] text-slate-400 space-y-2 leading-relaxed">
              <p className="text-slate-300 font-medium">To avoid generation distortion:</p>
              <p>• Wear form-fitting base garments so the AI accurately captures body contour limits.</p>
              <p>• Avoid strong directional down-lighting or deep shadows across the torso area.</p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10 border-t border-slate-800/80">
            <div className="md:col-span-3 flex flex-row md:flex-col justify-between items-baseline md:items-start">
              <span className="font-serif text-3xl font-light text-slate-600">02</span>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">Curation</span>
            </div>
            
            <div className="md:col-span-4">
              <h3 className="text-base font-semibold text-white tracking-tight">Select Your Outfit</h3>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                Browse through your assets or our integrated vendor catalog collections. Pick matching items to overlay directly over your custom avatar template.
              </p>
            </div>
            
            <div className="md:col-span-5 bg-slate-900/40 rounded-xl p-5 border border-slate-800 text-[11px] text-slate-400 space-y-2 leading-relaxed">
              <p className="text-slate-300 font-medium">Layering controls:</p>
              <p>• You can process a standalone garment or pair a top and bottom element concurrently.</p>
              <p>• Use the optional style modifier sliders in the sidebar panel to test relaxed or tailored drapery.</p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10 border-t border-slate-800/80">
            <div className="md:col-span-3 flex flex-row md:flex-col justify-between items-baseline md:items-start">
              <span className="font-serif text-3xl font-light text-slate-600">03</span>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">Execution</span>
            </div>
            
            <div className="md:col-span-4">
              <h3 className="text-base font-semibold text-white tracking-tight">Generate High-Fidelity Fit</h3>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                Execute the render pipeline. The network calculates textile fold logic, texture shadows, and seam patterns to compute a realistic image output.
              </p>
            </div>
            
            <div className="md:col-span-5 bg-slate-900/40 rounded-xl p-5 border border-slate-800 text-[11px] text-slate-400 space-y-2 leading-relaxed">
              <p className="text-slate-300 font-medium">Output processing:</p>
              <p>• Rendering pipelines finalize frames within roughly 5 to 12 seconds.</p>
              <p>• Renders automatically commit straight to your secure cloud archive folder.</p>
            </div>
          </div>

        </div>

        {/* Elegant Minimal Footer Section */}
        <div className="mt-28 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500">
            Encountering rendering anomalies? Review our support database or reach out directly.
          </p>
          <button className="text-[11px] font-semibold tracking-widest uppercase text-white hover:text-purple-400 transition duration-300 border-b border-slate-500 hover:border-purple-400 pb-0.5">
            Contact Support &rarr;
          </button>
        </div>

      </main>
    </div>
  );
}