import React, { useState } from 'react';
import { Check, X, Zap } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- Configuration Object ---
const PLANS = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: "10",
    images: "2",
    accent: "text-slate-400",
    features: [
      { text: "Unlimited Generation (Unstable)", included: true },
      { text: "High quality generation", included: true },
      { text: "Faster image generations", included: false },
      { text: "Private Generation", included: false },
      { text: "Download images", included: false },
      { text: "Legacy features", included: false },
      { text: "Priority email support", included: false },
    ]
  },
  {
    name: "Basic",
    monthlyPrice: 9.99,
    yearlyPrice: 7.99,
    credits: "6000",
    images: "1200",
    accent: "text-blue-400",
    features: [
      { text: "Unlimited Generation (Unstable)", included: true },
      { text: "High quality generation", included: true },
      { text: "Faster image generations", included: true },
      { text: "Private Generation", included: true },
      { text: "Download images", included: true },
      { text: "Legacy features", included: true },
      { text: "Priority email support", included: false },
    ]
  },
  {
    name: "Standard",
    monthlyPrice: 19.99,
    yearlyPrice: 15.99,
    isPopular: true,
    credits: "18000",
    images: "3600",
    accent: "text-emerald-400",
    features: [
      { text: "Unlimited Generation (Unstable)", included: true },
      { text: "High quality generation", included: true },
      { text: "Faster image generations", included: true },
      { text: "Private Generation", included: true },
      { text: "Download images", included: true },
      { text: "Legacy features", included: true },
      { text: "Priority email support", included: false },
    ]
  },
  {
    name: "Pro",
    monthlyPrice: 59.99,
    yearlyPrice: 47.99,
    credits: "60000",
    images: "12000",
    accent: "text-orange-400",
    features: [
      { text: "Unlimited Generation (Unstable)", included: true },
      { text: "High quality generation", included: true },
      { text: "Faster image generations", included: true },
      { text: "Private Generation", included: true },
      { text: "Download images", included: true },
      { text: "Legacy features", included: true },
      { text: "Priority email support", included: true },
    ]
  }
];

const PriceCard = ({ plan, isYearly }) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  
  return (
    <div className={cn(
      "relative flex flex-col p-8 rounded-[2rem] border transition-all duration-500",
      plan.isPopular 
        ? "bg-[#111116] border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)] scale-[1.03] z-10" 
        : "bg-white/[0.02] border-white/5 hover:border-white/20"
    )}>
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
          Most Popular
        </div>
      )}

      <header className="mb-8">
        <h3 className={cn("text-lg font-bold mb-4 uppercase tracking-tight", plan.accent)}>
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">${price}</span>
          <span className="text-gray-500 text-sm font-light">/month</span>
        </div>
      </header>

      <button className={cn(
        "w-full py-4 rounded-2xl font-bold text-sm mb-10 flex items-center justify-center gap-2 transition-all active:scale-95",
        plan.isPopular 
          ? "bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-900/20" 
          : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
      )}>
        <Zap size={16} fill="currentColor" />
        Subscribe Now
      </button>

      <div className="space-y-6 flex-grow">
        <div className="pb-5 border-b border-white/5">
          <p className="text-white text-sm font-semibold">{plan.credits} credits /year</p>
          <p className="text-gray-500 text-xs mt-1">equals {plan.images} images</p>
        </div>

        <ul className="space-y-4">
          {plan.features.map((feat, i) => (
            <li key={i} className={cn(
              "flex items-start gap-3 text-sm leading-tight transition-opacity", 
              feat.included ? "text-gray-300" : "text-gray-600 opacity-50"
            )}>
              {feat.included ? (
                <Check size={16} className="text-purple-400 mt-0.5 shrink-0" /> 
              ) : (
                <X size={16} className="mt-0.5 shrink-0" />
              )}
              <span>{feat.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [billing, setBilling] = useState('yearly');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0b2a] text-white font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto px-6 py-24">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Virtual try on Pricing Process
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Choose the best plan for your needs and experience the full power of AI-driven image creation.
          </p>

          {/* Billing Toggle */}
          <div className="mt-12 inline-flex p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            {['monthly', 'yearly'].map((type) => (
              <button
                key={type}
                onClick={() => setBilling(type)}
                className={cn(
                  "px-10 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                  billing === type 
                    ? "bg-white text-black shadow-xl scale-[1.02]" 
                    : "text-gray-500 hover:text-gray-300"
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                {type === 'yearly' && (
                  <span className="ml-2 text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20">
                    20% off
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, idx) => (
            <PriceCard key={idx} plan={plan} isYearly={billing === 'yearly'} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;