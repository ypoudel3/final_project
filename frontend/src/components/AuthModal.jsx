import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, setUser } = useContext(AuthContext);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const [localScrolled, setLocalScrolled] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const API = "http://127.0.0.1:5000";

  // ✅ Scroll effect
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => setLocalScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // ✅ Load user from localStorage (FIXED)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

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

      if (res.ok && data.user) {
        alert("Login successful");

        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user); // ✅ important

        setIsAuthModalOpen(false);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Login failed. Try again.");
      console.error(err);
    }
  }; 

  if (!isAuthModalOpen) return null;

  const baseClasses =
    "flex flex-col items-center w-full max-w-md p-6 rounded-2xl shadow-xl transition-all duration-300";

  const themeClasses =
    isHome && !localScrolled
      ? "bg-gray-300/20 backdrop-blur-md border border-white text-white"
      : "bg-gray-200 border border-gray-300 text-[#3B5249]";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        className={`${baseClasses} ${themeClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showSignUp ? (
          <form className="flex flex-col items-center w-full">
            <button type="button" onClick={() => setShowSignUp(false)}>
              ←
            </button>

            <h1 className="text-2xl font-bold mb-4">Sign up</h1>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-b-2 w-full h-12 mt-3 bg-transparent"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 w-full h-12 mt-3 bg-transparent"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 w-full h-12 mt-3 bg-transparent"
            />

            <button
              onClick={handleSignup}
              className="mt-6 bg-black text-white px-6 py-2 rounded-full"
            >
              Sign up
            </button>
          </form>
        ) : (
          <form className="flex flex-col items-center w-full">
            <button type="button" onClick={() => setIsAuthModalOpen(false)}>
              ←
            </button>

            <h1 className="text-2xl font-bold mb-4">Log in</h1>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 w-full h-12 mt-3 bg-transparent"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 w-full h-12 mt-3 bg-transparent"
            />

            <button
              onClick={handleLogin}
              className="mt-6 bg-black text-white px-6 py-2 rounded-full"
            >
              Log in
            </button>

            <div className="mt-4 text-sm">
              <span>Don't have an account?</span>
              <span
                className="ml-2 font-bold cursor-pointer"
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