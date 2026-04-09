import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
const AuthModal = () => { const { isAuthModalOpen, setIsAuthModalOpen, user, setUser } = useContext(AuthContext);
const [showPassword, setShowPassword] = useState(false);
const [rememberMe, setRememberMe] = useState(false);
const location = useLocation();
const isHome = location.pathname === "/";
const [localScrolled, setLocalScrolled] = useState(false);
const [showSignUp, setShowSignUp] = useState(false);
const [showLogin, setShowLogin] = useState(true); 
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

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  // ✅ Signup
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
        setShowLogin(true);
      }
    } catch (err) {
      alert("Signup failed. Try again.");
      console.error(err);
    }
  };

  // ✅ Login
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
        setUser(data.user);

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
      className="fixed inset-0 flex items-center justify-center z-50 mt-18"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        className={`${baseClasses} ${themeClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔹 HEADER */}
        <div className="relative flex items-center w-full mb-4">
          <button
            type="button"
            onClick={() => {
              if (showSignUp) {
                setShowSignUp(false);
                setShowLogin(true);
              } else if (showLogin) {
                setIsAuthModalOpen(false);
              }
            }}
            className="z-10 px-2"
          >
            ←
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
            {showSignUp ? "Sign up" : "Log in"}
          </h1>
        </div>

        {/* 🔹 SIGN UP */}
        {showSignUp && (
          <form
  onSubmit={handleSignup}
  className="flex flex-col items-center w-full min-h-80 justify-between"
>
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

            <button className={`
              mt-6 px-6 py-2 rounded-full font-semibold
              ${
                isHome
              ? localScrolled
                 ?"bg-[#3B5249] text-white"
                 :"bg-gray-200 text-[#3B5249]"
              :"bg-black"
              }`}>
              Sign up
            </button>

            <div className="mt-4 text-sm">
              <span>Already have an account?</span>
              <span
                className="ml-2 font-bold cursor-pointer"
                onClick={() => {
                  setShowSignUp(false);
                  setShowLogin(true);
                }}
              >
                Log in
              </span>
            </div>
          </form>
        )}

        {/* 🔹 LOGIN */}
        {showLogin && (
         <form
  onSubmit={handleLogin}
  className="flex flex-col items-center w-full min-h-80 justify-between"
>
  {/* Email */}
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="border-b-2 w-full h-12 mt-3 bg-transparent outline-none"
  />

  {/* Password with eye icon */}
  <div className="relative w-full mt-3">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border-b-2 w-full h-12 bg-transparent pr-10 outline-none"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-2 top-1/2 -translate-y-1/2"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>

  {/* Remember me + Forgot password */}
  <div className="flex items-center justify-between w-full mt-5 text-sm">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        className="w-4 h-4"
      />
      Remember me
    </label>

    <span className="cursor-pointer hover:underline">
      Forgot password?
    </span>
  </div>

  {/* Button */}
 <button className={`
              mt-6 px-6 py-2 rounded-full font-semibold
              ${
                isHome
              ? localScrolled
                 ?"bg-[#3B5249] text-white"
                 :"bg-gray-200 text-[#3B5249]"
              :"bg-black"
              }`}>
              Log in
            </button>

  {/* Switch */}
  <div className=" text-sm">
    <span>Don't have an account?</span>
    <span
      className="ml-2 font-bold cursor-pointer"
      onClick={() => {
        setShowLogin(false);
        setShowSignUp(true);
      }}
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