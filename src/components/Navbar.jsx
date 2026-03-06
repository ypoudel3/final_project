import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-transparent">
      {/* Center Menu */}
      <ul className="hidden md:flex gap-10 text-white">
        <li className="hover:text-black cursor-pointer">Virtual Try-On Studio</li>
        <li className="hover:text-black cursor-pointer">Pricing</li>
        <li className="hover:text-black cursor-pointer">Tutorials</li>
        <li className="hover:text-black cursor-pointer">My Gallery</li>
      </ul>

      {/* Login Button */}
      <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition">
        Log in
      </button>

    </nav>
  );
};

export default Navbar;