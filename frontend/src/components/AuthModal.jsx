import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useContext(AuthContext);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [localScrolled, setLocalScrolled] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const API = "http://127.0.0.1:5000";

  // Scroll effect only for home page
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => setLocalScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        setShowSignUp(false);
        setIsAuthModalOpen(false);
      }
    } catch (err) {
      alert("Signup failed. Try again.");
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login successful");
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthModalOpen(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Login failed. Try again.");
      console.error(err);
    }
  };

  if (!isAuthModalOpen) return null;

  const baseClasses =
    "flex flex-col items-center w-full max-w-md p-6 rounded-2xl shadow-xl transition-all duration-300";

  const themeClasses = isHome && !localScrolled
    ? "bg-gray-300/20 backdrop-blur-md border border-white [&_input]:text-white [&_input]:border-white [&_input::placeholder]:text-white/60 [&_h1]:text-white [&_button:first-child]:text-white [&_.submit-btn]:bg-white [&_.submit-btn]:text-black [&_.footer-text]:text-gray-300 [&_.footer-link]:text-white"
    : "bg-gray-200 border border-gray-300 [&_input]:text-[#3B5249] [&_input]:border-[#3B5249] [&_input::placeholder]:text-[#3B5249] [&_h1]:text-[#3B5249] [&_button:first-child]:text-[#3B5249] [&_.submit-btn]:bg-[#3B5249] [&_.submit-btn]:text-white [&_.footer-text]:text-gray-500 [&_.footer-link]:text-[#3B5249]";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div className={`${baseClasses} ${themeClasses}`} onClick={(e) => e.stopPropagation()}>
        {showSignUp ? (
          <form className="flex flex-col items-center w-full">
            <button
              type="button"
              onClick={() => setShowSignUp(false)}
              className="self-start text-xl mb-4"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold mb-4">Sign up</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border-b-2 w-full h-12 mt-3 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b-2 w-full h-12 mt-3 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-b-2 w-full h-12 mt-3 outline-none"
            />
            <button
              onClick={handleSignup}
              className="submit-btn rounded-full w-28 h-10 mt-8 cursor-pointer"
            >
              Sign up
            </button>
          </form>
        ) : (
          <form className="flex flex-col items-center w-full">
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(false)}
              className="self-start text-xl mb-4"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold mb-4">Log in</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b-2 w-full h-12 mt-3 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-b-2 w-full h-12 mt-3 outline-none"
            />
            <button
              onClick={handleLogin}
              className="submit-btn rounded-full w-28 h-10 mt-6 cursor-pointer"
            >
              Log in
            </button>
            <div className="flex mt-4 text-sm">
              <span className="footer-text">Don't have an account?</span>
              <span
                className="footer-link ml-2 cursor-pointer font-bold"
                onClick={() => setShowSignUp(true)}
              >
                Sign up
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;