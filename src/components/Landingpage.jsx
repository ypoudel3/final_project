import React from "react";

const Hero = () => {
  return (
    <div className="relative">
      <div className="w-full h-dvh overflow-hidden">
        <img src="/img1.jpg" className="w-full h-full object-cover object-top" />
      </div>
      {/* Hero content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pt-32">
        <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight text-white max-w-4xl">
          Virtual Try On — Upload Your Photo and Try Clothes
        </h1>
        <p className="mt-6 text-lg text-white max-w-2xl">
          Try on different clothing styles in one click without a physical fitting room.
        </p>
        <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Lets Explore →
        </button>
      </div>
    </div>
  );
};


const Features = () => {
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
      <div className="max-w-6xl px-12 mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-8 text-center">
          Trusted by:
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
            alt="Nike"
            className="h-6 w-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg"
            alt="Zara"
            className="h-6 w-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
            alt="H&M"
            className="h-6 w-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
            alt="Adidas"
            className="h-6 w-auto"
          />
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
            src="hero.jpg"
            alt="Virtual Try On Interface" 
            className="w-full h-150 object-cover"
          />
        </div>
      </section>
    </div>
  );
};

const Process = () => {
  const steps = [
    {
      id: "01",
      title: "Upload Your Photo",
      desc: "Simply upload your full-body photo to get started with the virtual mirror."
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
        <div className="relative rounded-[3rem] overflow-hidden bg-[#D9CDB7] aspect-4/5">
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
          
          <p className="text-4xl md:text-5xl font-serif text-slate-900 leading-[1.2] mt-8">
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
            <span className="text-6xl font-serif text-gray-500 block">{item.num}</span>
            <p className="text-gray-600 text-sm leading-relaxed max-w-50">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Main Visual Centerpiece */}
      <div className="max-w-7xl mx-auto mb-16 px-4">
        <div className="rounded-[3rem] overflow-hidden aspect-21/9 shadow-sm">
          <img
            src="/img2.jpg"
            alt="Nature Aerial Perspective"
            className="w-full h-full object-cover transition-transform duration-2000ms hover:scale-110"
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

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F3] text-slate-800 py-12">
      
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">

        {/* Logo / Brand */}
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-serif font-bold">Virtual Try-On</h2>
          <p className="text-gray-500 text-sm mt-2">
            Experience fashion virtually
          </p>
        </div>

        
        {/* Contact Info */}
        <div className="flex-1 space-y-3 text-sm">
          <h3 className="font-semibold text-slate-900">Contact</h3>
          <ul className="text-gray-600 space-y-1">
            <li>Email: <a href="mailto:info@virtualtryon.com" className="hover:text-black transition">info@virtualtryon.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-black transition">+1 234 567 890</a></li>
            <li>Address: <a href=" Kathmandu, Nepal" className="hover:text-black transition">Kathmandu,Nepal</a></li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex-1 space-y-4 text-sm">
          <h3 className="font-semibold text-slate-900">Stay Connected</h3>
          <div className="flex gap-4 text-gray-600">
            <a href="#" className="hover:text-black transition">Instagram</a>
            <a href="#" className="hover:text-black transition">Facebook</a>
            <a href="#" className="hover:text-black transition">LinkedIn</a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-200 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Virtual Try-On. All rights reserved.
      </div>

    </footer>
  );
};



const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Process />
      <Choose />
      <Testimonial />
      <Connect />
      <Footer />
    </>
  );
};



export default LandingPage;