import React, { useState, useEffect } from 'react';
//1.listingpage

export const ListingsPage = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [name, setName] = useState("");        
  const [price, setPrice] = useState("");      
  const [image, setImage] = useState(null); // 👈 NEW: State to hold the photo file
  const [items, setItems] = useState([]);   // 👈 NEW: State to show the list

  // NEW: Fetch existing items when page loads
  const fetchInventory = async () => {
    const response = await fetch("http://127.0.0.1:5000/seller/listings");
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSave = async () => {
    // UPDATED VALIDATION: Check for image too
    if(!name || !price || !image) return alert("Please fill all fields and select an image");

    // 👈 NEW: Use FormData instead of JSON (Crucial for files!)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image); // The actual file
    formData.append("category", "Clothing");

    const response = await fetch("http://127.0.0.1:5000/seller/listings", {
      method: "POST",
      // IMPORTANT: Remove headers: { "Content-Type": "application/json" }
      // Browser will set the correct boundary for FormData automatically
      body: formData 
    });

    if (response.ok) {
      alert("Saved to Database!");
      setIsOpen(false); 
      setName("");      
      setPrice("");
      setImage(null);   // Reset image
      fetchInventory(); // Refresh the list
    } else {
      alert("Failed to save.");
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-serif font-bold text-[#3B5249] mb-8">Your Store</h1>

      {/* GRID FOR DISPLAYING ITEMS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          onClick={() => setIsOpen(true)}
          className="h-80 border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-all"
        >
          <span className="text-4xl text-gray-400">+</span>
          <p className="text-gray-500 font-medium">Add Product</p>
        </div>

        {/* 👈 NEW: Map through items to show cards */}
        {items.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <div className="h-48 bg-gray-100 rounded-2xl mb-3 overflow-hidden">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-gray-800">{item.name}</h3>
            <p className="text-[#3B5249]">${item.price}</p>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">New Listing</h2>
            
            <input 
              className="w-full border p-3 rounded-xl mb-3 outline-none focus:border-black text-black"
              placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)}
            />
            
            <input 
              className="w-full border p-3 rounded-xl mb-4 outline-none focus:border-black text-black"
              placeholder="Price ($)" type="number" value={price} onChange={(e) => setPrice(e.target.value)}
            />

            {/* 👈 NEW: FILE INPUT */}
            <div className="mb-6">
              <label className="text-xs font-bold text-gray-400 block mb-2 uppercase">Product Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])} // Store the file
                className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={() => setIsOpen(false)} className="flex-1 py-3 text-gray-500">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-3 bg-black text-white rounded-xl font-bold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 2. TODAY PAGE (Required by App.jsx) ---
export const TodayPage = () => {
  // 1. Create a state to hold the dashboard data
  const [stats, setStats] = useState({ action_required: "Loading...", listing_count: 0 });

  // 2. Fetch the data from Flask when the page opens
  useEffect(() => {
    fetch("http://127.0.0.1:5000/seller/today")
      .then((res) => res.json())
      .then((data) => {
        setStats(data); // Put the Flask response into our 'stats' variable
      })
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-serif font-bold text-[#3B5249]">Today's Overview</h1>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: The Dynamic Action Message */}
        <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-2">Status</h3>
          <p className="text-xl font-medium text-gray-800">{stats.action_required}</p>
        </div>

        {/* Card 2: The Inventory Count */}
        <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-2">Total Listings</h3>
          <p className="text-4xl font-serif font-bold text-[#3B5249]">{stats.listing_count}</p>
          <p className="text-sm text-gray-400 mt-1">Items in your DrapeAI collection</p>
        </div>
      </div>
    </div>
  );
};

// --- 3. MESSAGES PAGE (Required by App.jsx) ---
export const MessagesPage = () => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-serif font-bold text-[#3B5249]">Messages</h1>
      <p className="text-gray-400 mt-4">No new messages yet.</p>
    </div>
  );
};