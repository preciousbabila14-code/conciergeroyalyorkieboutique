/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, Eye, ShieldCheck, HelpCircle, Heart, CheckCircle2 } from "lucide-react";
import { Puppy, Gender, AvailabilityStatus, SizeCategory } from "../types";

interface MarketplaceProps {
  puppies: Puppy[];
  onSelectPuppy: (puppy: Puppy) => void;
  onQuickInquiry: (puppy: Puppy, type: "Inquiry" | "Reservation") => void;
}

export default function Marketplace({ puppies, onSelectPuppy, onQuickInquiry }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  
  // Track slideshow photo index for each puppy card individually
  const [photoIndexes, setPhotoIndexes] = useState<Record<string, number>>({});

  const handleNextPhoto = (puppyId: string, photosLength: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndexes((prev) => {
      const current = prev[puppyId] || 0;
      return { ...prev, [puppyId]: (current + 1) % photosLength };
    });
  };

  const handlePrevPhoto = (puppyId: string, photosLength: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndexes((prev) => {
      const current = prev[puppyId] || 0;
      return { ...prev, [puppyId]: (current - 1 + photosLength) % photosLength };
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedGender("All");
    setSelectedSize("All");
    setSelectedStatus("All");
    setMaxPrice(6000);
  };

  // Memoized filtered puppies
  const filteredPuppies = useMemo(() => {
    return puppies.filter((puppy) => {
      const matchesSearch = puppy.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            puppy.personality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            puppy.color.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGender = selectedGender === "All" || puppy.gender === selectedGender;
      const matchesSize = selectedSize === "All" || puppy.sizeCategory.startsWith(selectedSize);
      const matchesStatus = selectedStatus === "All" || puppy.status === selectedStatus;
      const matchesPrice = puppy.price <= maxPrice;

      return matchesSearch && matchesGender && matchesSize && matchesStatus && matchesPrice;
    });
  }, [puppies, searchQuery, selectedGender, selectedSize, selectedStatus, maxPrice]);

  return (
    <div className="bg-[#FDFBF7] py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800">
            Discover Our <span className="text-[#C5A880]">Available Puppies</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Browse our nursery of healthy, AKC registered, elite-pedigree Yorkshire Terriers. Find your ideal teacup or toy companion, fully backstopped by our signature health guarantee.
          </p>
          <div className="w-16 h-1 bg-[#C5A880] mx-auto rounded-full"></div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-3xl border border-[#C5A880]/15 shadow-sm p-6 sm:p-8 mb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search input */}
            <div className="lg:col-span-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Winston, Bella, teacup..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-full text-xs focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] outline-none"
                id="search-input"
              />
            </div>

            {/* Gender Select */}
            <div className="lg:col-span-2">
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-full text-xs focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] outline-none bg-white text-neutral-700 font-medium"
                id="gender-select"
              >
                <option value="All">All Genders</option>
                <option value={Gender.Male}>Males</option>
                <option value={Gender.Female}>Females</option>
              </select>
            </div>

            {/* Size Select */}
            <div className="lg:col-span-2">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-full text-xs focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] outline-none bg-white text-neutral-700 font-medium"
                id="size-select"
              >
                <option value="All">All Size Categories</option>
                <option value="Teacup">Teacup Sizes</option>
                <option value="Toy">Toy Sizes</option>
              </select>
            </div>

            {/* Status Select */}
            <div className="lg:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-full text-xs focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] outline-none bg-white text-neutral-700 font-medium"
                id="status-select"
              >
                <option value="All">All Availability</option>
                <option value={AvailabilityStatus.Available}>Available Only</option>
                <option value={AvailabilityStatus.Reserved}>Reserved</option>
                <option value={AvailabilityStatus.Sold}>Sold / Happy Homes</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="lg:col-span-2">
              <button
                onClick={resetFilters}
                className="w-full py-3 bg-neutral-100 text-neutral-700 rounded-full text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                id="reset-filters-btn"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Pricing slider and inline badge count */}
          <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs text-neutral-600 font-medium mb-2">
                <span>Maximum Price Budget</span>
                <span className="text-[#C5A880] font-bold">${maxPrice.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="3000"
                max="6000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
                id="price-range"
              />
            </div>

            <div className="text-xs font-semibold text-neutral-500">
              Showing <span className="text-[#C5A880]">{filteredPuppies.length}</span> luxury Yorkies
            </div>
          </div>
        </div>

        {/* Empty state */}
        {filteredPuppies.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#C5A880]/10 rounded-3xl p-8 max-w-lg mx-auto">
            <Filter className="w-12 h-12 text-[#C5A880]/50 mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-lg font-bold text-neutral-800">No Puppies Found Matching Filters</h3>
            <p className="text-xs text-neutral-500 mt-2">
              Try adjusting your price range, choosing another size category, or searching for other keywords.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 bg-[#C5A880] text-white rounded-full text-xs font-bold hover:bg-[#b0936b] transition-all cursor-pointer"
            >
              Clear Search & Filters
            </button>
          </div>
        )}

        {/* Puppy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPuppies.map((puppy) => {
            const currentPhotoIdx = photoIndexes[puppy.id] || 0;
            const photosCount = puppy.photos.length;

            return (
              <div
                key={puppy.id}
                id={`puppy-card-${puppy.id}`}
                onClick={() => onSelectPuppy(puppy)}
                className="group bg-white rounded-3xl overflow-hidden border border-[#C5A880]/15 hover:border-[#C5A880]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                
                {/* Photo Slideshow Frame */}
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                  <img
                    src={puppy.photos[currentPhotoIdx]}
                    alt={`${puppy.name} puppy photo`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent"></div>

                  {/* Slideshow Arrows */}
                  {photosCount > 1 && (
                    <>
                      <button
                        onClick={(e) => handlePrevPhoto(puppy.id, photosCount, e)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-700 flex items-center justify-center transition shadow-xs hover:scale-105"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleNextPhoto(puppy.id, photosCount, e)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-700 flex items-center justify-center transition shadow-xs hover:scale-105"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Top-right Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase shadow-sm ${
                      puppy.status === AvailabilityStatus.Available
                        ? "bg-emerald-500 text-white"
                        : puppy.status === AvailabilityStatus.Reserved
                        ? "bg-amber-500 text-white"
                        : "bg-neutral-500 text-white"
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      {puppy.status}
                    </span>
                  </div>

                  {/* Top-left Size Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-neutral-800 shadow-xs border border-white/40">
                      {puppy.sizeCategory.split(" ")[0]} Size
                    </span>
                  </div>

                  {/* Photo Indicators */}
                  {photosCount > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                      {puppy.photos.map((_, idx) => (
                        <span
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition ${
                            idx === currentPhotoIdx ? "bg-white scale-125" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Info block */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <h3 className="font-serif text-xl font-bold text-neutral-800 flex items-center gap-1.5">
                        {puppy.name}
                        {puppy.gender === Gender.Male ? (
                          <span className="text-xs text-sky-500 bg-sky-50 px-1.5 py-0.5 rounded-sm">♂ Boy</span>
                        ) : (
                          <span className="text-xs text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-sm">♀ Girl</span>
                        )}
                      </h3>
                      <span className="font-serif text-lg font-black text-[#C5A880]">
                        ${puppy.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Specifications table */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 py-2 text-[11px] text-neutral-500 border-y border-neutral-100">
                      <div>
                        <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[9px]">Age:</span> {puppy.ageWeeks} weeks
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[9px]">Est Adult Wt:</span> {puppy.expectedAdultWeight}
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[9px]">Color:</span> {puppy.color.split(" ")[0]}
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[9px]">Genetics:</span> 100% Champion Line
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                      {puppy.personality}
                    </p>
                  </div>

                  {/* Verification Banner */}
                  <div className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-[#C5A880]/5 border border-[#C5A880]/10 text-[10px] text-[#C5A880] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                    <span>Veterinary Health Certificate & 10-Yr Guarantee Included</span>
                  </div>

                  {/* Interactive Button CTA Footer */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {puppy.status === AvailabilityStatus.Available ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickInquiry(puppy, "Reservation");
                          }}
                          className="w-full py-2.5 bg-[#C5A880] text-white rounded-full text-xs font-bold hover:bg-[#b0936b] transition-all cursor-pointer text-center shadow-xs"
                        >
                          Reserve Now
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickInquiry(puppy, "Inquiry");
                          }}
                          className="w-full py-2.5 border border-neutral-200 hover:border-[#C5A880] text-neutral-700 hover:text-[#C5A880] bg-white rounded-full text-xs font-bold transition-all cursor-pointer text-center"
                        >
                          Ask Question
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPuppy(puppy);
                        }}
                        className="col-span-2 w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Portfolio Page</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
