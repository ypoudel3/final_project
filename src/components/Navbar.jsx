import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-12 bg-transparent text-white">
      <div className="flex justify-center items-center">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 400 420"
  className="w-48 h-32 text-white"
>
  {/* Outer oval */}
  <ellipse cx="200" cy="210" rx="158" ry="190" fill="none" stroke="currentColor" strokeWidth="4"/>

  {/* Inner oval */}
  <ellipse cx="200" cy="210" rx="148" ry="180" fill="none" stroke="currentColor" strokeWidth="4"/>

  {/* Inner shirt oval */}
  <ellipse cx="200" cy="205" rx="90" ry="108" fill="none" stroke="currentColor" strokeWidth="2.5"/>
  
  <ellipse cx="200" cy="205" rx="80" ry="98" fill="none" stroke="currentColor" strokeWidth="2.5"/>

  {/* Top arc */}
  <path id="topArc" d="M 68 155 A 145 175 0 0 1 332 155" fill="none"/>

  {/* Bottom arc */}
  <path id="bottomArc" d="M 75 285 A 140 168 0 0 0 325 285" fill="none"/>

  {/* Brand text */}
  <text
    fontFamily="Didot, Playfair Display, Times New Roman, serif"
    fontWeight="400"
    letterSpacing="4"
    fill="currentColor"
    fontSize="26"
    dx="10" dy="5"
  >
    <textPath href="#topArc" startOffset="50%" textAnchor="middle">
      DRAPEAI
    </textPath>
  </text>

  {/* Tagline */}
  <text
    fontFamily="Didot, Playfair Display, Times New Roman, serif"
    fontWeight="30"
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
    <path d="
      M -28 -52
      C -28 -52 -36 -44 -44 -40
      L -62 -32
      L -54 -10
      L -36 -18
      L -36 52
      L 36 52
      L 36 -18
      L 54 -10
      L 62 -32
      L 44 -40
      C 36 -44 28 -52 28 -52
      C 20 -46 10 -42 0 -42
      C -10 -42 -20 -46 -28 -52
      Z
    "/>

    {/* Collar */}
    <path d="M -10 -42 L 0 -30 L 10 -42" strokeWidth="2.5"/>

    {/* Sleeve lines */}
    <line x1="-54" y1="-10" x2="-36" y2="-18" strokeWidth="2.5"/>
    <line x1="-55" y1="-13" x2="-36" y2="-21" strokeWidth="2.5"/>
    <line x1="55" y1="-13" x2="36" y2="-21" strokeWidth="2.5"/>

    {/* Pocket */}
    <rect x="-28" y="-28" width="14" height="14" rx="1" strokeWidth="2.5"/>
    <line x1="-28" y1="-22" x2="-14" y2="-22" strokeWidth="2.5"/>

    {/* Placket */}
    <line x1="0" y1="-30" x2="0" y2="52" strokeWidth="2"/>

    {/* Buttons */}
    <circle cx="0" cy="-14" r="2" fill="currentColor"/>
    <circle cx="0" cy="0" r="2" fill="currentColor"/>
    <circle cx="0" cy="14" r="2" fill="currentColor"/>
    <circle cx="0" cy="28" r="2" fill="currentColor"/>
    <circle cx="0" cy="42" r="2" fill="currentColor"/>
  </g>
</svg>
      </div>

<div c>
   <ul className="flex gap-10 items-center">
        <li className="hover:text-black cursor-pointer">Virtual Try-On Studio</li>
        <li className="hover:text-black cursor-pointer">Pricing</li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-10">
        <ul className="flex gap-10">
          <li className="hover:text-black cursor-pointer">Tutorials</li>
          <li className="hover:text-black cursor-pointer">My Gallery</li>
        </ul>

        <button className="bg-green-700 px-6 py-2 rounded-full hover:bg-green-800 transition">
          Log in
        </button>
      </div>
  </div>     

    </nav>
  );
};

export default Navbar;