import React from 'react';
import { Upload, Shirt, Sparkles, ArrowRight } from 'lucide-react';

// Simple Navbar
const Navbar = () => (
  <nav className="w-full bg-white/10 backdrop-blur-md px-6 py-4 flex justify-between items-center">
    <h2 className="text-white font-bold text-xl">My Brand</h2>
    <ul className="flex gap-6 text-white font-medium">
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  </nav>
);

// StepCard Component
const StepCard = ({ number, title, description, Icon }) => (
  <div className="group relative flex flex-col items-start p-8 rounded-2xl 
    bg-white/10 border border-white/20
    hover:bg-white/20
    transition-all duration-500">

    {/* Number */}
    <div className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center 
      rounded-full bg-white text-purple-600 font-bold shadow-lg">
      {number}
    </div>

    {/* Icon */}
    <div className="mb-6 p-4 rounded-xl bg-white/20 text-white 
      group-hover:scale-110 transition-transform duration-500">
      <Icon size={28} strokeWidth={1.5} />
    </div>

    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-white/90 text-sm leading-relaxed">{description}</p>
  </div>
);

const Tutorials = () => {
  const steps = [
    {
      title: "Upload Your Model",
      description: "Upload a clear image of yourself or a model for best AI fitting results.",
      Icon: Upload
    },
    {
      title: "Select Your Outfit",
      description: "Pick outfits from our collection and instantly preview them on your avatar.",
      Icon: Shirt
    },
    {
      title: "Generate Look",
      description: "Click generate and view a realistic try-on experience in seconds.",
      Icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-6 pb-4">

      {/* Navbar */}
      <Navbar />

      {/* Gap between Navbar and Body */}
      <div className="w-full max-w-7xl border-t border-white/40 my-4" />

      {/* Body */}
      <div className="w-full max-w-7xl 
        bg-gradient-to-r from-[#7e7d9f] via-[#a8a4d0] to-[#cbb7f0]
        rounded-2xl 
        px-6 md:px-16 lg:px-24 py-10 
        text-white relative">

        {/* Header */}
        <header className="max-w-3xl mx-auto text-center mb-10 space-y-5
          bg-white/5 backdrop-blur-sm rounded-lg shadow-md p-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Virtual Try-On Guide
          </h1>
          <p className="text-white/90 text-lg">
            Experience fashion in <span className="font-semibold">three simple steps</span>.
          </p>
        </header>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Arrows */}
          <div className="hidden md:block absolute top-1/2 left-[32%] -translate-y-1/2 text-white/40">
            <ArrowRight size={32} />
          </div>
          <div className="hidden md:block absolute top-1/2 left-[66%] -translate-y-1/2 text-white/40">
            <ArrowRight size={32} />
          </div>

          {steps.map((step, index) => (
            <StepCard 
              key={step.title}
              number={index + 1}
              title={step.title}
              description={step.description}
              Icon={step.Icon}
            />
          ))}
        </div>

        {/* Footer (tight gap) */}
        <footer className="mt-1 text-center">
          <button className="px-12 py-4 rounded-full 
            bg-gradient-to-r from-[#a8a4d0] via-[#cbb7f0] to-[#d8b4f5]
            text-white font-semibold 
            hover:scale-105 hover:shadow-lg hover:shadow-purple-300/50
            transition-all duration-300">
            Start Your Fitting
          </button>
        </footer>

      </div>
    </div>
  );
};

export default Tutorials;