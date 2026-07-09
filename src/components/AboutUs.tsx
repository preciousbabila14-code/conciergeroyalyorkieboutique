/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, ShieldCheck, Heart, UserCheck, Star, Sparkles, Building, Sparkle } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-[#FDFBF7] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C5A880]">Our Noble Calling</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800">
            About <span className="text-[#C5A880]">Royal Yorkies Boutique</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Founded on the values of absolute integrity, genetic purity, and unconditional love, we breed the world's most exquisite, healthy Yorkshire Terrier companions.
          </p>
          <div className="w-16 h-1 bg-[#C5A880] mx-auto rounded-full"></div>
        </div>

        {/* Visual Showcase - Split Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800"
                alt="Breeding puppies playing in estate garden"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decal badge */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-[#C5A880]/20 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-500 fill-current" />
              <div>
                <p className="text-sm font-black text-neutral-800">15+ Years</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Of Breeding Excellence</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-800">
              Where True Craftsmanship Meets Lifelong Companionship
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
              Our journey with Yorkshire Terriers began over fifteen years ago inside our private family estate. Frustrated by the lack of transparency and high-stress environments in commercial breeding, we set out to create a luxurious, boutique sanctuary where parents and puppies could flourish.
            </p>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
              We do not operate a commercial kennel. Our adult dogs are cherished family members who sleep on plush orthopedic beds, run freely in our pesticide-free botanical gardens, and enjoy premium nutrition. We select breedings with extreme care, analyzing multi-generational genetic logs to avoid hereditary issues, ensuring each offspring exhibits the signature silky "glass-shine" coat and tiny baby-doll faces.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3">
                <div className="p-2.5 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/20 h-fit">
                  <Award className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-neutral-800">AKC Merit Breeder</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Strict compliance with AKC standards.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/20 h-fit">
                  <UserCheck className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-neutral-800">DNA Health Cleared</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Tested for PRA-PRCD, Hypoglycemia risk, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Bento-Style Trust & Safeguards section */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-neutral-800">Our Pillars of Professional Trust</h3>
            <p className="text-xs text-neutral-500">We hold ourselves to a level of standard that guarantees peace of mind for our buyers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shadow-xs">
                <Building className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-neutral-800">Prismatic Nursery Environment</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our puppies are raised inside a private, purpose-built estate wing. It is equipped with dual HEPA surgical air filtration filters, custom temperature controls, automatic soothing background sounds, and UV-sterilization procedures. We protect our litters from external pathogens so they develop strong, unchallenged immune systems.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-500/20 text-amber-600 flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-neutral-800">Veterinary Partnership Alliance</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We work in direct tandem with Dr. Marcus Vance of the Elite Companion Animal Clinic. Dr. Vance or his licensed veterinary techs visit our estate twice a week to inspect neonatal weight logs, administer pediatric vaccines, and run genetic blood counts. Every adopted puppy leaves with a signed, legal veterinary certificate.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shadow-xs">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h4 className="font-serif text-lg font-bold text-neutral-800">Concierge Care Guarantee</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Adopting from Royal Yorkies is not a transaction; it is an entry into our heritage family. We supply comprehensive digital nutritional schedules, lifetime text advice lines, and back every puppy with a binding 10-Year Genetic Health Contract. If you ever have a care emergency, our veterinary partners are a text away.
              </p>
            </div>

          </div>
        </div>

        {/* Nursery Daily Care Routine Timeline */}
        <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-8 sm:p-10 shadow-sm space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <span className="text-[9px] uppercase tracking-[0.15em] font-extrabold text-[#C5A880]">The Daily Standard</span>
            <h3 className="font-serif text-2xl font-bold text-neutral-800">Nursery Daily Care Schedule</h3>
            <p className="text-xs text-neutral-500 max-w-xl">
              An inside look at the highly regulated, loving daily schedule that shapes our Yorkie puppies' development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            <div className="space-y-2 text-left relative">
              <div className="text-sm font-bold text-[#C5A880] font-serif">06:00 AM — Rise & Nourish</div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Nursery lights fade in gently. Puppies are checked, weighed, and receive warm goat's milk or starter porridge.
              </p>
            </div>

            <div className="space-y-2 text-left border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-6">
              <div className="text-sm font-bold text-[#C5A880] font-serif">10:00 AM — Socialization Play</div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Puppies play on textured mats. Introduced to household sounds (TV, vacuum waves) and handled with soft brush strokes.
              </p>
            </div>

            <div className="space-y-2 text-left border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-6">
              <div className="text-sm font-bold text-[#C5A880] font-serif">02:00 PM — Vet Inspection</div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Pediatric weighing checks, grooming eyes, trimming nails, and routine booster vaccine cycles.
              </p>
            </div>

            <div className="space-y-2 text-left border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-6">
              <div className="text-sm font-bold text-[#C5A880] font-serif">08:00 PM — Bedtime Comfort</div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Final feeding, warm-pack replacements, relaxing classical piano waves, and secure night surveillance activation.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
