/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Play, Images, ZoomIn, Eye, Sparkles } from "lucide-react";

interface GalleryItem {
  id: string;
  category: "Puppies" | "Nursery" | "Families" | "BehindScenes";
  title: string;
  image: string;
  videoUrl?: string;
  desc: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "yorkie1",
    category: "Puppies",
    title: "The Royal Yorkie Portrait",
    image: "/images/yorkie1.jpg",
    desc: "Our premium Yorkshire Terrier puppy sitting gracefully on a warm beige silk blanket.",
  },
  {
    id: "g-1",
    category: "Puppies",
    title: "Double trouble in the garden",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800",
    desc: "Our Summer litter playing hide and seek in our pesticide-free orchid garden.",
  },
  {
    id: "g-2",
    category: "Nursery",
    title: "The Clean Haven Nursery",
    image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=800",
    desc: "A view of our private, sterile, climate-controlled nursery beds equipped with air sanitizers.",
  },
  {
    id: "g-3",
    category: "Families",
    title: "Mr. Winston Adopters",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800",
    desc: "Happy new pet owners embracing Winston at their private estate delivery greeting.",
  },
  {
    id: "g-4",
    category: "BehindScenes",
    title: "Daily Coat Brushing Routine",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800",
    desc: "Our veterinary technician applying detangling spray and daily pin brush strokes.",
  },
  {
    id: "g-5",
    category: "Puppies",
    title: "Sweet Bella Portrait Session",
    image: "/src/assets/images/yorkie_bella_puppy_1783627386703.jpg",
    desc: "Bella posing elegantly with her pink silk bow inside our estate studio.",
  },
  {
    id: "g-6",
    category: "Puppies",
    title: "Teddy's Morning Joy Run",
    image: "/src/assets/images/yorkie_teddy_puppy_1783627399897.jpg",
    desc: "Fluffy Teddy running on white-washed oak floor chasing a gold toy.",
  },
  {
    id: "g-7",
    category: "Families",
    title: "Lady Penelope's Spring Litter Owners",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=800",
    desc: "A warm hug from an adopting family who traveled from Chicago to greet their companion.",
  },
  {
    id: "g-8",
    category: "Nursery",
    title: "Sterile Bottle Feeding",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800",
    desc: "Supplemental feeding with organic, premium goat's milk to secure perfect newborn weights.",
  },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [lightboxImg, setLightboxImg] = useState<GalleryItem | null>(null);

  const categories = [
    { id: "All", label: "All Media" },
    { id: "Puppies", label: "Puppies Playing" },
    { id: "Nursery", label: "Our Estate Nursery" },
    { id: "Families", label: "Happy Families" },
    { id: "BehindScenes", label: "Behind-The-Scenes Care" },
  ];

  const filteredItems = GALLERY_DATA.filter((item) => {
    return activeTab === "All" || item.category === activeTab;
  });

  return (
    <div className="bg-[#FDFBF7] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C5A880]">Our Visual Legacy</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800">
            Royal Boutique <span className="text-[#C5A880]">Media Gallery</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Take a sensory stroll through our private Yorkie nursery, beautiful estate play grounds, behind-the-scenes veterinary checks, and the tearful first greetings of our happy owners.
          </p>
          <div className="w-16 h-1 bg-[#C5A880] mx-auto rounded-full"></div>
        </div>

        {/* Categories Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto border-b border-neutral-200/50 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                activeTab === cat.id
                  ? "bg-[#C5A880] text-white shadow-md shadow-[#C5A880]/15"
                  : "bg-white text-neutral-600 hover:text-[#C5A880] border border-neutral-200/80 hover:border-[#C5A880]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImg(item)}
              className="group bg-white border border-[#C5A880]/15 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual hover layer */}
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white text-neutral-800 shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5 text-[#C5A880]" />
                  </span>
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="text-[8px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-neutral-800 border border-white/40 shadow-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 space-y-1 border-t border-neutral-100">
                <h4 className="font-serif text-sm font-bold text-neutral-800 leading-tight truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-500 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal popup */}
        {lightboxImg && (
          <div
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 bg-neutral-950/95 z-50 flex flex-col justify-center items-center p-4 sm:p-6"
            id="gallery-lightbox"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Frame */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl space-y-4"
            >
              <div className="aspect-4/3 max-h-[70vh] bg-black">
                <img
                  src={lightboxImg.image}
                  alt={lightboxImg.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-neutral-900 text-left text-white border-t border-white/5">
                <span className="text-[9px] font-bold text-[#C5A880] uppercase tracking-widest">
                  Category: {lightboxImg.category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold mt-1 text-white">
                  {lightboxImg.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {lightboxImg.desc}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
