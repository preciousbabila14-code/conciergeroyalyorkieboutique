/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Heart, Sparkles, MessageSquare } from "lucide-react";

interface HeroProps {
  onViewPuppies: () => void;
  onReservePuppy: () => void;
  onContactUs: () => void;
}

export default function Hero({ onViewPuppies, onReservePuppy, onContactUs }: HeroProps) {
  return (
    <section className="relative bg-[#FDFBF7] py-16 lg:py-24 overflow-hidden border-b border-[#C5A880]/10">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C5A880]/3 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content Block */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 text-xs text-[#C5A880] font-semibold tracking-wide uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current animate-spin-slow" />
              <span>Exquisite Purebred Heritage</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight tracking-tight"
            >
              Exquisite <span className="text-[#C5A880]">Yorkshire Terrier</span> Puppies of Royal Descent
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-600 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              We provide healthy, well-socialized Yorkshire Terrier puppies raised with love, care, and professional attention. Raised in our clean, private estate nursery with round-the-clock veterinary oversight.
            </motion.p>

            {/* Micro Trust Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 border-y border-neutral-200/60 py-4 max-w-lg mx-auto lg:mx-0 text-left"
            >
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#C5A880]">10-Year</p>
                <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">Health Guarantee</p>
              </div>
              <div className="border-l border-neutral-200/80 pl-4">
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#C5A880]">100%</p>
                <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">Vet Inspected</p>
              </div>
              <div className="border-l border-neutral-200/80 pl-4">
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#C5A880]">AKC</p>
                <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">Champion Bloodline</p>
              </div>
            </motion.div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onViewPuppies}
                id="hero-view-puppies-btn"
                className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-white rounded-full text-sm font-bold tracking-wide hover:bg-[#b0936b] transition-all duration-300 shadow-lg shadow-[#C5A880]/30 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current text-white animate-pulse" />
                <span>View Available Puppies</span>
              </button>

              <button
                onClick={onReservePuppy}
                id="hero-reserve-btn"
                className="w-full sm:w-auto px-7 py-4 border border-[#C5A880] text-neutral-800 rounded-full text-sm font-bold tracking-wide hover:bg-[#C5A880]/5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Reserve a Puppy</span>
              </button>

              <button
                onClick={onContactUs}
                id="hero-contact-btn"
                className="w-full sm:w-auto px-5 py-4 text-neutral-600 rounded-full text-sm font-semibold hover:text-[#C5A880] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Us</span>
              </button>
            </motion.div>
          </div>

          {/* Interactive Hero Image Frame */}
          <div className="lg:col-span-6 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-[#C5A880]/15"
            >
              {/* Main Image generated earlier */}
              <img
                src="/images/hero.jpg"
                alt="Exquisite Yorkie Puppies in luxury basket"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Elegant floating caption */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/40 flex items-center justify-between shadow-md">
                <div>
                  <h3 className="font-serif text-sm font-bold text-neutral-800">Summer Litter 2026 Now Open</h3>
                  <p className="text-[10px] text-neutral-500 font-sans mt-0.5">Teacup & Toy sizes available for selection</p>
                </div>
                <button
                  onClick={onViewPuppies}
                  className="bg-[#C5A880] text-white p-2.5 rounded-full hover:bg-[#b0936b] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Small decorative sub-image/badge */}
            <div className="absolute -bottom-6 -right-6 bg-white border border-[#C5A880]/20 p-4 rounded-2xl hidden sm:flex items-center gap-3 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-neutral-800">Veterinary Partnered</p>
                <p className="text-[10px] text-neutral-500">Weekly health checkups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
