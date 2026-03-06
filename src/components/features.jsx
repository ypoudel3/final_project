import React from 'react';

const features = () => {
  const benefits = [
    {
      title: "Seamless Fitting",
      desc: "Our AI accurately maps clothing to your body shape for a realistic 360° preview.",
      icon: "👕"
    },
    {
      title: "Global Style Access",
      desc: "Try on the latest collections from international designers without leaving home.",
      icon: "🌍"
    },
    {
      title: "Size Accuracy",
      desc: "Reduce returns by visualizing exactly how different sizes drap across your frame.",
      icon: "📏"
    },
    {
      title: "Instant Visualization",
      desc: "High-speed rendering provides real-time feedback as you switch styles.",
      icon: "⚡"
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Trusted By Section */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">Trusted by:</p>
          <div className="flex flex-wrap justify-between items-center opacity-50 grayscale gap-8">
            {/* Replace with your logo components/images */}
            <div className="flex flex-wrap justify-between items-center opacity-50 grayscale gap-8">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" className="h-6 w-auto" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg" alt="Zara" className="h-6 w-auto" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" alt="H&M" className="h-6 w-auto" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" alt="Adidas" className="h-6 w-auto" />
</div>
          </div>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <span className="text-green-600 font-semibold text-sm">Benefits</span>
        <h1 className="text-5xl md:text-6xl font-serif mt-6 mb-4">We’ve cracked the code.</h1>
        <p className="text-gray-500 text-lg max-w-xl">
          Virtual Fitting provides real confidence, without the dressing room hassle.
        </p>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-4 gap-12 mt-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="space-y-4 border-t border-gray-100 pt-6">
              <span className="text-xl">{benefit.icon}</span>
              <h3 className="font-bold text-lg">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hero Image / Video Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-3xl shadow-2xl">
          <img 
            src="../.jpg"
            alt="Virtual Try On Interface" 
            className="w-full h-[600px] object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default features;