import React from "react";
import Navbar from "./Navbar.jsx";

const LandingPage = () => {
  return (
   <>
   <div className="relative">
   <div class="w-full h-screen overflow-hidden">
  <img src="/img1.jpg" class="w-full h-full object-cover object-top" />
</div>
  <div className="absolute inset-0">
   <Navbar />

  </div>

   <div className="absolute inset-0 flex justify-center items-center">
    <div className="flex-col ">
      {/* Hero content */}
      <div className=" z-10 flex flex-col items-center text-center pt-9 ">
        <h1 className="text-5xl md:text-6xl font-serif font-medium leading-tight text-white max-w-4xl">
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
   
     
</div>
</div>
    
   
</> 
    
  );
};

export default LandingPage;