import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SellerAuth from "./SellerLogin";
const SellerNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-10 py-4 border-b border-gray-200 bg-white text-black z-50">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl text-[#588157]"><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 420"
            className= "w-16 h-12 sm:w-20 sm:h-18 md:w-22 md:h-16"
            
          >
            <ellipse cx="200" cy="210" rx="158" ry="190" fill="none" stroke="currentColor" strokeWidth="5" />
            <ellipse cx="200" cy="210" rx="148" ry="180" fill="none" stroke="currentColor" strokeWidth="5" />
            <ellipse cx="200" cy="205" rx="90" ry="108" fill="none" stroke="currentColor" strokeWidth="5" />
            <ellipse cx="200" cy="205" rx="80" ry="98" fill="none" stroke="currentColor" strokeWidth="5" />

            <path id="topArc" d="M 68 155 A 145 175 0 0 1 332 155" fill="none" />
            <path id="bottomArc" d="M 75 285 A 140 168 0 0 0 325 285" fill="none" />

            <text fontFamily="Didot, Playfair Display, Times New Roman, serif" fontWeight="600" letterSpacing="4" fill="currentColor" fontSize="26" dx="10" dy="5">
              <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                DRAPEAI
              </textPath>
            </text>

            <text fontFamily="Didot, Playfair Display, Times New Roman, serif" fontWeight="600" letterSpacing="3" fill="currentColor" fontSize="20" dy="-5">
              <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
                PERFECT FIT EVERY TIME
              </textPath>
            </text>

            <g transform="translate(200 210)" fill="none" stroke="currentColor" strokeWidth="5">
              <path d="M -28 -52 C -28 -52 -36 -44 -44 -40 L -62 -32 L -54 -10 L -36 -18 L -36 52 L 36 52 L 36 -18 L 54 -10 L 62 -32 L 44 -40 C 36 -44 28 -52 28 -52 C 20 -46 10 -42 0 -42 C -10 -42 -20 -46 -28 -52 Z" />
              <path d="M -10 -42 L 0 -30 L 10 -42" strokeWidth="2.5" />
              <line x1="-54" y1="-10" x2="-36" y2="-18" strokeWidth="2.5" />
              <line x1="55" y1="-13" x2="36" y2="-21" strokeWidth="2.5" />
              <rect x="-28" y="-28" width="14" height="14" rx="1" strokeWidth="2.5" />
              <line x1="0" y1="-30" x2="0" y2="52" strokeWidth="2" />
              <circle cx="0" cy="-14" r="2" fill="currentColor" />
              <circle cx="0" cy="0" r="2" fill="currentColor" />
              <circle cx="0" cy="14" r="2" fill="currentColor" />
              <circle cx="0" cy="28" r="2" fill="currentColor" />
              <circle cx="0" cy="42" r="2" fill="currentColor" />
            </g>
          </svg></Link>

      {/* Seller specific links */}
      <div className="flex gap-8 font-medium">
        <NavLink to="/hosting/today" className={({isActive}) => isActive ? "border-b-2 border-black" : ""}>Today</NavLink>
        <NavLink to="/hosting/listings" className={({isActive}) => isActive ? "border-b-2 border-black" : ""}>Listings</NavLink>
        <NavLink to="/hosting/messages" className={({isActive}) => isActive ? "border-b-2 border-black" : ""}>Messages</NavLink>
      </div>

      {/* Exit Link */}
      <div className="flex items-center gap-4">
  <Link to="/" className="...">Switch to buyer</Link>
  <button className="text-sm text-gray-500 hover:text-black">
  <Link to="/SellerLogin" className="...">Log out</Link>
  </button>
  {/* The "Y" or user initial circle */}

</div>
    </nav>
  );
};

export default SellerNavbar;