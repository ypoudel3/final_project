import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [showSignUp, setShowSignUp] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav
        className={`z-50 rounded-2xl transition-colors duration-300 mx-7 
          ${isHome 
            ? " absolute top-0 left-0 right-0 text-white" 
            : "text-[#3B5249]"}
        `}
      >
         <div className="flex justify-between items-center">

        {/* Logo */}
        <Link to="/">
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 420"
              className="w-30 h-24"
            >
              {/* Outer oval */}
              <ellipse
                cx="200"
                cy="210"
                rx="158"
                ry="190"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
              {/* Inner oval */}
              <ellipse
                cx="200"
                cy="210"
                rx="148"
                ry="180"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
              {/* Inner shirt oval */}
              <ellipse
                cx="200"
                cy="205"
                rx="90"
                ry="108"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
              <ellipse
                cx="200"
                cy="205"
                rx="80"
                ry="98"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
              {/* Top arc */}
              <path id="topArc" d="M 68 155 A 145 175 0 0 1 332 155" fill="none" />
              {/* Bottom arc */}
              <path id="bottomArc" d="M 75 285 A 140 168 0 0 0 325 285" fill="none" />
              {/* Brand text */}
              <text
                fontFamily="Didot, Playfair Display, Times New Roman, serif"
                fontWeight="600"
                letterSpacing="4"
                fill="currentColor"
                fontSize="26"
                dx="10"
                dy="5"
              >
                <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                  DRAPEAI
                </textPath>
              </text>
              {/* Tagline */}
              <text
                fontFamily="Didot, Playfair Display, Times New Roman, serif"
                fontWeight="600"
                letterSpacing="3"
                fill="currentColor"
                fontSize="20"
                dy="-5"
              >
                <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
                  PERFECT FIT EVERY TIME
                </textPath>
              </text>
              {/* Shirt */}
              <g
                transform="translate(200 210)"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M -28 -52 C -28 -52 -36 -44 -44 -40 L -62 -32 L -54 -10 L -36 -18 L -36 52 L 36 52 L 36 -18 L 54 -10 L 62 -32 L 44 -40 C 36 -44 28 -52 28 -52 C 20 -46 10 -42 0 -42 C -10 -42 -20 -46 -28 -52 Z" />
                {/* Collar */}
                <path d="M -10 -42 L 0 -30 L 10 -42" strokeWidth="2.5" />
                {/* Sleeve lines */}
                <line x1="-54" y1="-10" x2="-36" y2="-18" strokeWidth="2.5" />
                <line x1="-55" y1="-13" x2="-36" y2="-21" strokeWidth="2.5" />
                <line x1="55" y1="-13" x2="36" y2="-21" strokeWidth="2.5" />
                {/* Pocket */}
                <rect x="-28" y="-28" width="14" height="14" rx="1" strokeWidth="2.5" />
                <line x1="-28" y1="-22" x2="-14" y2="-22" strokeWidth="2.5" />
                {/* Placket */}
                <line x1="0" y1="-30" x2="0" y2="52" strokeWidth="2" />
                {/* Buttons */}
                <circle cx="0" cy="-14" r="2" fill="currentColor" />
                <circle cx="0" cy="0" r="2" fill="currentColor" />
                <circle cx="0" cy="14" r="2" fill="currentColor" />
                <circle cx="0" cy="28" r="2" fill="currentColor" />
                <circle cx="0" cy="42" r="2" fill="currentColor" />
              </g>
            </svg>
          </div>
        </Link>

        {/* Menu */}
        <div className="flex flex-1 justify-center">
          <ul className="flex gap-10 items-center font-semibold">
            <Link to="/UI" className="cursor-pointer">
              Virtual Try-On Studio
            </Link>
            <Link to="/Pricing" className="cursor-pointer">
              Pricing
            </Link>
            <Link to="/Tutorials" className="cursor-pointer">
              Tutorials
            </Link>
            <Link to="/Mygallery" className="cursor-pointer">
              My Gallery
            </Link>
          </ul>
        </div>

        {/* Login button */}
        <div className="pr-12">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-[#588157] px-6 py-2 rounded-full hover:bg-green-800 text-white transition"
          >
            Log in
          </button>
        </div>
      </div>
      </nav>

      {/* Login / Signup Modal */}
      {isAuthModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setIsAuthModalOpen(false)}
        >
          <div
            className="bg-gray-300/20 backdrop-blur-md border border-white p-6 rounded-xl shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {showSignUp ? (
              <form className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setShowSignUp(false)}
                  className="self-start text-white text-xl mb-4"
                >
                  ←
                </button>
                <h1 className="text-2xl mb-4 text-white font-bold">Sign up</h1>
                <input
                  type="text"
                  placeholder="Username"
                  className="bg-transparent border-b-2 text-white w-full h-12 mt-3 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent border-b-2 text-white w-full h-12 mt-3 outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent border-b-2 text-white w-full h-12 mt-3 outline-none"
                />
                <button className="rounded-full w-28 h-10 mt-8 bg-white text-black">
                  Sign up
                </button>
              </form>
            ) : (
              <form className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="self-start text-white text-xl mb-4"
                >
                  ←
                </button>
                <h1 className="text-2xl mb-4 font-bold text-white">Log in</h1>
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent border-b-2 text-white w-full h-12 mt-3 outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent border-b-2 text-white w-full h-12 mt-3 outline-none"
                />
                <button className="rounded-full w-28 h-10 mt-6 bg-white text-black">
                  Log in
                </button>
                <div className="flex mt-4 text-sm">
                  <span className="text-gray-300">Don't have an account?</span>
                  <span
                    className="text-white ml-2 cursor-pointer font-bold"
                    onClick={() => setShowSignUp(true)}
                  >
                    Sign up
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;