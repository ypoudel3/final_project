import React, { useState } from 'react';
import { Check, X, Zap, ChevronDown } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- Configuration Object ---
const PLANS = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: "10",
    images: "2",
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
    <div
      className={cn(
        "relative flex flex-col p-8 rounded-3xl border bg-transparent backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300",
        plan.isPopular && "border-[#588157] scale-[1.03]"
      )}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#588157] rounded-full text-[10px] font-bold uppercase text-white shadow">
          Most Popular
        </div>
      )}

      <header className="mb-6">
        <h3 className="text-lg font-bold mb-2 uppercase tracking-tight text-gray-600">
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-[#3B5249]">${price}</span>
          <span className="text-gray-500 text-sm">/month</span>
        </div>
      </header>

      <button
        className={cn(
          "w-full py-3 rounded-xl font-semibold text-sm mb-8 flex items-center justify-center gap-2 transition-all",
          plan.isPopular
            ? "bg-[#588157] text-white hover:bg-[#4a6f4a]"
            : "bg-gray-100 text-[#3B5249] hover:bg-gray-200"
        )}
      >
        <Zap size={16} />
        Subscribe Now
      </button>

      <div className="space-y-6 grow">
        <div className="pb-5 border-b border-gray-200">
          <p className="text-[#3B5249] text-sm font-semibold">
            {plan.credits} credits /year
          </p>
          <p className="text-gray-500 text-xs mt-1">
            equals {plan.images} images
          </p>
        </div>

        <ul className="space-y-4">
          {plan.features.map((feat, i) => (
            <li
              key={i}
              className={cn(
                "flex items-start gap-3 text-sm",
                feat.included ? "text-gray-700" : "text-gray-400"
              )}
            >
              {feat.included ? (
                <Check size={16} className="text-[#588157]" />
              ) : (
                <X size={16} className="text-gray-300" />
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
    <div className="relative my-2 min-h-screen mx-7 rounded-2xl overflow-hidden">

      {/* 🔥 Background Image */}
      <div className="absolute inset-0 bg-[url('/cloth.jpg')] bg-cover bg-center brightness-110" />

      {/* 🔥 Content */}
      <div className="relative z-10 text-[#3B5249] font-sans">
        <div className="max-w-7xl mx-auto px-6 py-24">

          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
              Virtual Try-On Pricing Plans
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Choose the best plan for your needs and experience AI-powered virtual styling.
            </p>

            {/* Toggle */}
            <div className="mt-12 inline-flex p-1 bg-white rounded-2xl border border-gray-200 shadow-sm">
              {['monthly', 'yearly'].map((type) => (
                <button
                  key={type}
                  onClick={() => setBilling(type)}
                  className={cn(
                    "px-10 py-3 rounded-xl text-sm font-bold transition-all",
                    billing === type
                      ? "bg-[#588157] text-white shadow-md"
                      : "text-gray-500 hover:text-[#3B5249]"
                  )}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  {type === 'yearly' && (
                    <span className="ml-2 text-[10px] bg-green-100 text-[#588157] px-2 py-0.5 rounded-full border border-green-200">
                      20% off
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan, idx) => (
              <PriceCard key={idx} plan={plan} isYearly={billing === 'yearly'} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;

