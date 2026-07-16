import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const navLinks = [
  { to: "/UI", label: "Virtual Try-On Studio" },
  { to: "/Pricing", label: "Pricing" },
  { to: "/Tutorials", label: "Tutorials" },
  { to: "/Mygallery", label: "My Gallery" },
];

const Navbar = () => {
  const { user, setIsAuthModalOpen, setUser } = useContext(AuthContext);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // On the home page the bar starts transparent over the hero, so once
  // it's transparent or the mobile menu is open we need a light theme
  // to keep the logo/links legible against a dark hero image.
  const isLight = !isHome || scrolled;
  const textColor = isLight ? "text-[#3B5249]" : "text-white";
  const barBg = isLight ? "bg-gray-100 shadow-md" : "bg-transparent";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${barBg} ${textColor}`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-7 py-2 md:py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 420"
            className={`transition-all duration-300 ${
              isHome && !scrolled ? "w-20 h-16 sm:w-28 sm:h-24 md:w-34 md:h-28" : "w-16 h-12 sm:w-20 sm:h-18 md:w-22 md:h-16"
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
        </Link>

        {/* Desktop menu links, centered */}
        <ul className="hidden md:flex flex-1 justify-center gap-6 lg:gap-10 items-center font-semibold text-sm lg:text-base px-4">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="hover:opacity-70 transition-opacity whitespace-nowrap">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: seller link + account + mobile toggle */}
        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          <Link
            to="/login"
            className="hidden md:inline-block hover:bg-[#588157] hover:text-white transition-all font-semibold text-sm lg:text-base p-2 rounded-xl whitespace-nowrap"
          >
            Switch to Seller
          </Link>

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black text-white font-bold cursor-pointer shrink-0"
            >
              {user.username?.charAt(0).toUpperCase()}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              aria-label="Log in"
              className="cursor-pointer"
            >
              <User size={20} />
            </button>
          )}

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 text-[#3B5249] shadow-md">
          <ul className="flex flex-col font-semibold">
            {navLinks.map((link) => (
              <li key={link.to} className="border-t border-gray-200">
                <Link to={link.to} className="block px-6 py-3 hover:bg-gray-200">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-200">
              <Link to="/login" className="block px-6 py-3 hover:bg-gray-200">
                Switch to Seller
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;