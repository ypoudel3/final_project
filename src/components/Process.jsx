import React from 'react';

const Process = () => {
  const steps = [
    {
      id: "01",
      title: "Upload Your Photo",
      desc: "Simply take or upload a full-body photo to get started with the virtual mirror."
    },
    {
      id: "02",
      title: "Select Your Style",
      desc: "Browse through our curated collection of tops, bottoms, and full outfits."
    },
    {
      id: "03",
      title: "AI Measurement",
      desc: "Our engine analyzes your proportions to ensure the garment drapes perfectly."
    },
    {
      id: "04",
      title: "Instant Confidence",
      desc: "See how you look and buy with certainty, knowing exactly how it fits."
    }
  ];

  return (
    <section className="bg-white py-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      
      {/* Left Content Column */}
      <div className="flex-1 space-y-8">
        <h2 className="text-5xl font-serif text-slate-900">See the Big Picture</h2>

        <p className="text-gray-500 text-lg max-w-md leading-relaxed">
          Experience fashion without the friction. Our AI turns your camera into a personal fitting room.
        </p>

        {/* Numbered List */}
        <div className="divide-y divide-gray-100 border-t border-gray-100 mt-10">
          {steps.map((step) => (
            <div key={step.id} className="py-6 flex gap-6 items-start group">
              <span className="text-xs font-mono text-gray-400 mt-1">{step.id}</span>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-base">
                  {step.title}:{" "}
                  <span className="font-normal text-gray-500">
                    {step.desc}
                  </span>
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="mt-8 bg-[#E3F2C1] text-black px-10 py-4 rounded-full font-medium hover:brightness-95 transition-all">
          Discover More
        </button>
      </div>

      {/* Right Image Column */}
      <div className="flex-1 w-full">
        <div className="relative rounded-[3rem] overflow-hidden bg-[#D9CDB7] aspect-[4/5]">
          <img
            src="/tryon.jpg"
            alt="Virtual Fitting Process"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </section>
  );
};

export default Process;