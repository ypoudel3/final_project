import React from "react";
// 1. Import the image from your assets folder
 

const LandingPage = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        // 2. Use the imported variable name here
        backgroundImage: "url(${heroImg})", 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
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
    </section>
  );
};

export default LandingPage;