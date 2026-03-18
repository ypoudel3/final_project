import React from 'react';

const Testimonial = () => {
  return (
    <section className="bg-white py-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
      
      {/* Left Column: Artistic/Glamorous Image */}
      <div className="flex-1 w-full">
        <div className="relative rounded-[3rem] overflow-hidden aspect-square shadow-2xl shadow-gray-200">
          <img 
            src="/img3.jpg"
            alt="Customer Testimonial" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
          />
        </div>
      </div>

      {/* Right Column: The Quote */}
      <div className="flex-1 space-y-8">
        <div className="space-y-6">
          
          {/* Large Quote Mark */}
          <span className="text-8xl font-serif text-[#E3F2C1] leading-none select-none">“</span>
          
          <p className="text-4xl md:text-5xl font-serif text-slate-900 leading-[1.2] mt-[-2rem]">
            I was skeptical, but the virtual try-on has completely transformed how I shop. The visualization is so clear and effortless.
          </p>
          
          <div className="pt-6 border-t border-gray-100">
            <h4 className="text-xl font-bold text-slate-900">Kusuma  Bhandari</h4>
            <p className="text-[#A3B18A] font-mono text-sm uppercase tracking-widest mt-1">
              Head of Style
            </p>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Testimonial;