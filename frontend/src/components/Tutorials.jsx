import React from 'react';
import { Upload, Shirt, Sparkles, ArrowRight } from 'lucide-react';
import Navbar from "./Navbar.jsx";

const StepCard = ({ number, title, description, Icon }) => (
  <div className="group relative flex flex-col items-start p-8 rounded-2xl bg-linear-to-b from-white/10 to-transparent border border-black/10 hover:border-purple-500/50 transition-all duration-500 backdrop-blur-sm">
    {/* Step Number Badge */}
    <div className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a2e] border border-purple-500/30 text-purple-400 font-bold shadow-xl">
      {number}
    </div>

    {/* Icon & Title */}
    <div className="mb-6 p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform duration-500">
      <Icon size={28} strokeWidth={1.5} />
    </div>

    <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
      {title}
    </h3>

    <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
      {description}
    </p>
  </div>
);

const Tutorials = () => {
  const steps = [
    {
      title: "Upload Your Model",
      description: "Begin by uploading a clear photo of your model or yourself. A full-body or close-up shot works best for our AI-powered fitting system.",
      Icon: Upload
    },
    {
      title: "Select Your Outfit",
      description: "Browse through a curated range of styles. Whether casual or formal, our AI makes it simple to pair outfits with your avatar in seconds.",
      Icon: Shirt
    },
    {
      title: "Press Generate",
      description: "Watch your fashion choices come to life. Our advanced technology creates a realistic visualization of how the outfit looks on you.",
      Icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0a0a0f] to-[#1c0b2a] text-white flex flex-col items-center justify-center px-6 py-20 font-sans selection:bg-purple-500/30">
      {/* Background Glow Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      {/* Header Section */}
      <header className="max-w-3xl text-center mb-20 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white to-gray-400">
          How to Use Virtual Try on System 
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
          Experience the future of fashion in three simple steps: 
          <span className="text-purple-400 font-medium italic"> upload, select, and generate.</span>
        </p>
      </header>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full relative">
        {/* Connection Arrows (Visible on Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-[30%] -translate-y-1/2 text-white/20">
            <ArrowRight size={32} />
        </div>
        <div className="hidden md:block absolute top-1/2 left-[64%] -translate-y-1/2 text-white/20">
            <ArrowRight size={32} />
        </div>

        {steps.map((step, index) => (
          <StepCard 
            key={index}
            number={index + 1}
            title={step.title}
            description={step.description}
            Icon={step.Icon}
          />
        ))}
      </div>

      {/* Call to Action */}
      <footer className="mt-20">
        <button className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-purple-500/10">
          Start Your Fitting
        </button>
      </footer>
    </div>
  );
};

export default Tutorials;