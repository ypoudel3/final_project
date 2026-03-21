import React from 'react';

// --- Single Gallery Item ---
const GalleryItem = ({ src, alt, tag }) => (
  <div className="group relative mb-6 break-inside-avoid overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
    {/* Image */}
    <img 
      src={src} 
      alt={alt} 
      className="w-full grayscale-[20%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
    />

    {/* Overlay on Hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-end p-6">
      <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
        <span className="px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-[10px] font-bold uppercase tracking-widest">
          {tag}
        </span>
      </div>
    </div>
  </div>
);

// --- Main Gallery ---
export default function Mygallery() {
  const images = [
    { src: "/img1.jpg", alt: "Cyberpunk Streetwear", tag: "Casual" },
    { src: "/img2.jpg", alt: "Luxury Evening Gown", tag: "Formal" },
    { src: "/img3.jpg", alt: "Minimalist Summer Set", tag: "Trend" },
    // Add more...
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0b2a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Gallery Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-2">The Showcase</h2>
            <p className="text-gray-500">Explore AI-generated fits created by our community.</p>
          </div>
          <button className="hidden md:block px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all">
            View All
          </button>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {images.map((img, i) => (
            <GalleryItem key={i} {...img} />
          ))}
        </div>

      </div>
    </section>
  );
}