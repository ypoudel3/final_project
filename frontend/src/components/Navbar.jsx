import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
const { user, setIsAuthModalOpen, setUser } = useContext(AuthContext);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
     <nav
            className={`z-50 transition-colors duration-300 px-7 fixed
              ${
                isHome
              ? scrolled
                 ? "bg-gray-100 shadow-md text-[#3B5249] absolute top-0 left-0 right-0"
                 :" absolute top-0 left-0 right-0 text-white"
              : "text-[#3B5249] absolute top-0 left-0 right-0 bg-gray-100"
              }
            
            `}
          >
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link to="/">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 400 420"
                    className={`
                      ${
                        isHome
                        ? scrolled
                        ?"w-22 h-20"
                        :"w-34 h-28"
                      :"w-22 h-20"
    
                      }`}
    
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
                  </svg>
                </div>
              </Link>
    
              {/* Menu */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <ul className="flex gap-10 items-center font-semibold">
                  <Link to="/UI">Virtual Try-On Studio</Link>
                  <Link to="/Pricing">Pricing</Link>
                  <Link to="/Tutorials">Tutorials</Link>
                  <Link to="/Mygallery">My Gallery</Link>
    
      </ul>
    </div>
    <div className="flex justify-between">
     <Link 
          to="/login" 
          className=" hover:bg-[#588157] hover:text-white transition-all font-semibold p-2 rounded-xl"
        >
          Switch to Seller
        </Link>
      
    
              {/* Login Button */}
              <div className="pr-4 flex items-center pl-7">
                {user ? (
  <div
    onClick={() => {
      localStorage.removeItem("user");
      setUser(null);
    }}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-bold cursor-pointer"
  >
    {user.username?.charAt(0).toUpperCase()}
  </div>
) : (
                <i onClick={() => setIsAuthModalOpen(true)} className=" fa-regular fa-user cursor-pointer"></i>)}
              </div>
           </div>
            </div>
          </nav>
  );
};

export default Navbar;