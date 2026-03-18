import React from 'react';

const Choose = () => {
  const features = [
    {
      label: "Fitting Accuracy",
      area: "Ultra-precise AI mapping",
      competitor1: "Basic overlays",
      competitor2: "Manual estimation"
    },
    {
      label: "Body Analysis",
      area: "Advanced 3D insights",
      competitor1: "Simple 2D scaling",
      competitor2: "No AI assistance"
    },
    {
      label: "Platform Flow",
      area: "Seamless integration",
      competitor1: "Restricts customization",
      competitor2: "Steep learning curve"
    },
    {
      label: "Personalization",
      area: "AI-driven style curation",
      competitor1: "Generic recommendations",
      competitor2: "No personalization"
    },
    {
      label: "Processing Speed",
      area: "Instant virtual rendering",
      competitor1: "Buffering delays",
      competitor2: "Moderate speeds"
    }
  ];

  return (
    <section className="bg-white py-24 px-6 text-center">

      {/* Header Section */}
      <div className="max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-[#A3B18A] font-mono text-sm uppercase tracking-widest">
          Efficiency
        </span>

        <h2 className="text-6xl font-serif text-slate-900 leading-tight">
          Why Choose Virtual Try-On?
        </h2>

        <p className="text-gray-500 text-lg">
          Traditional shopping is slow. Our developer-friendly approach streamlines your style discovery 
          with precision and speed.
        </p>

        <button className="mt-6 bg-[#E3F2C1] text-black px-10 py-4 rounded-full font-medium hover:brightness-95 transition-all">
          Discover More
        </button>
      </div>

      {/* Comparison Table */}
      <div className="max-w-6xl mx-auto border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-md">
        <div className="grid grid-cols-3 bg-white">
          
          {/* Column 1 */}
          <div className="border-r border-gray-200 flex flex-col bg-[#F9FBF4]">
            <div className="py-10 border-b border-gray-200">
              <h3 className="text-2xl font-serif font-semibold text-slate-900">
                Our Platform
              </h3>
            </div>

            {features.map((f, i) => (
              <div key={i} className="py-8 px-8 border-b border-gray-200 flex items-center gap-3 text-left">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm font-medium text-slate-800">
                  {f.area}
                </span>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="border-r border-gray-200 flex flex-col bg-[#F4F6FA]">
            <div className="py-10 border-b border-gray-200">
              <h3 className="text-2xl font-serif font-semibold text-slate-900">
                RetailSync
              </h3>
            </div>

            {features.map((f, i) => (
              <div key={i} className="py-8 px-8 border-b border-gray-200 flex items-center gap-3 text-left">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-sm font-medium text-slate-800">
                  {f.competitor1}
                </span>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col bg-[#FDF4F4]">
            <div className="py-10 border-b border-gray-200">
              <h3 className="text-2xl font-serif font-semibold text-slate-900">
                StyleView
              </h3>
            </div>

            {features.map((f, i) => (
              <div key={i} className="py-8 px-8 border-b border-gray-200 flex items-center gap-3 text-left">
                <span className="text-red-600 font-bold">×</span>
                <span className="text-sm font-medium text-slate-800">
                  {f.competitor2}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default Choose;