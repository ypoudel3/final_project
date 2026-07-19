import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const GalleryItem = ({ src, tag }) => (
  <div className="group relative mb-6 break-inside-avoid overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_10px_30px_rgba(168,85,247,0.08)]">
    <img
      src={src}
      alt=""
      className="w-full grayscale-0 transition-all duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-end p-6">
      <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
        <span className="px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-widest">
          {tag}
        </span>
      </div>
    </div>
  </div>
);

export default function Mygallery() {
  const { user } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:5000/tryon/gallery/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const fetched = (data.results || []).map((r) => ({
          src: r.image,
          tag: r.tag || "My Try-On",
        }));
        setImages(fetched);
      })
      .catch((err) => console.error("Failed to load gallery:", err))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="p-4 bg-white min-h-screen">
      <section className="bg-[#f8f7f4] border border-gray-200 rounded-3xl py-20 px-6 min-h-[calc(100vh-2rem)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">The Showcase</h2>
              <p className="text-gray-600">Explore AI-generated fits created by our community.</p>
            </div>
            <button className="hidden md:block px-6 py-2 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-xs">
              View All
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading your gallery...</p>
          ) : images.length === 0 ? (
            <p className="text-gray-500">No try-ons yet — generate one to see it here!</p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {images.map((img, i) => (
                <GalleryItem key={i} {...img} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}