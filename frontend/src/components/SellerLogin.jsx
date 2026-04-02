import { useState } from "react";

export default function SellerAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    password: "",
    shopType: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Login" : "Signup", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">
            {isLogin ? "Seller Login" : "Create Seller Account"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isLogin
              ? "Access your dashboard and manage products"
              : "Join and start showcasing your products"}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 rounded-md text-sm font-medium transition ${
              isLogin
                ? "bg-white shadow text-black"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 rounded-md text-sm font-medium transition ${
              !isLogin
                ? "bg-white shadow text-black"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Signup Fields */}
          {!isLogin && (
            <>
              {[
                { label: "Business Name", name: "businessName" },
                { label: "Owner Name", name: "ownerName" },
                { label: "Shop Type", name: "shopType" },
                { label: "Address", name: "address" },
                { label: "Phone Number", name: "phone" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                  />
                </div>
              ))}
            </>
          )}

          {/* Common Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          {isLogin ? "New here?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-black font-medium cursor-pointer hover:underline"
          >
            {isLogin ? "Create account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}