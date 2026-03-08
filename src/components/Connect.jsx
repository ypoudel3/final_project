import React from 'react';

const Connect = () => {
  return (
    <section className="bg-white py-24 px-6 text-center">

      {/* Top Numbered Steps */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-left">
        {[
          { num: "01", text: "Fill out our quick form with your needs." },
          { num: "02", text: "Receive a personalized style analysis." },
          { num: "03", text: "Connect with a stylist in real-time." }
        ].map((item, index) => (
          <div key={index} className="space-y-4">
            <span className="text-6xl font-serif text-gray-100 block">{item.num}</span>
            <p className="text-gray-600 text-sm leading-relaxed max-w-[200px]">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Main Visual Centerpiece */}
      <div className="max-w-7xl mx-auto mb-16 px-4">
        <div className="rounded-[3rem] overflow-hidden aspect-[21/9] shadow-sm">
          <img
            src="/aerial-landscape.jpg"
            alt="Nature Aerial Perspective"
            className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110"
          />
        </div>
      </div>

      {/* Footer Content & Call to Action */}
      <div className="space-y-6">
        <h2 className="text-5xl md:text-6xl font-serif text-slate-900">Connect with us</h2>

        <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.2em]">
          Experience fashion without the friction
        </p>

        <div className="pt-4">
          <button className="bg-[#588157] text-white px-12 py-5 rounded-full font-medium hover:bg-[#3a5a40] transition-all shadow-lg shadow-green-100">
            Learn More
          </button>
        </div>
      </div>

    </section>
  );
};

export default Connect;