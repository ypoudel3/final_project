// src/pages/SellerPages.jsx
import React from 'react';

export const TodayPage = () => (
  <div className="p-10 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-serif font-bold text-[#3B5249]">Welcome back!</h1>
    <p className="text-gray-500 mt-2">Here’s what’s happening with your store today.</p>
    <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <p className="text-sm uppercase tracking-widest text-gray-400">Activity</p>
      <div className="mt-4 text-gray-300 italic underline">No new orders yet...</div>
    </div>
  </div>
);

export const ListingsPage = () => (
  <div className="p-10 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-serif font-bold text-[#3B5249]">Your Listings</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {/* This is where you will eventually map through your Flask API data */}
      <div className="border-2 border-dashed border-gray-200 rounded-2xl h-64 flex items-center justify-center text-gray-400">
        + Add New Product
      </div>
    </div>
  </div>
);

export const MessagesPage = () => (
  <div className="p-10 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-serif font-bold text-[#3B5249]">Messages</h1>
    <div className="mt-8 bg-white rounded-xl h-96 flex items-center justify-center border border-gray-100">
      <p className="text-gray-400 font-light">Select a conversation to start chatting.</p>
    </div>
  </div>
);