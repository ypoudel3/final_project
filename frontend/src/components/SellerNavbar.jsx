import React from "react";
import { Link, NavLink } from "react-router-dom";

const SellerNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 border-b border-gray-200 bg-white text-black z-50">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl text-[#588157]">DRAPEAI</Link>

      {/* Seller specific links */}
      <div className="flex gap-8 font-medium">
        <NavLink to="/hosting/today" className={({isActive}) => isActive ? "border-b-2 border-black" : ""}>Today</NavLink>
        <NavLink to="/hosting/listings" className={({isActive}) => isActive ? "border-b-2 border-black" : ""}>Listings</NavLink>
        <NavLink to="/hosting/messages" className={({isActive}) => isActive ? "border-b-2 border-black" : ""}>Messages</NavLink>
      </div>

      {/* Exit Link */}
      <div className="flex items-center gap-4">
  <Link to="/" className="...">Switch to buyer</Link>
  {/* The "Y" or user initial circle */}
  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
    Y
  </div>
</div>
    </nav>
  );
};

export default SellerNavbar;