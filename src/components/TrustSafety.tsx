/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ShieldCheck, Heart, Star, CheckCircle, ChevronDown, ChevronUp, Stethoscope, FileText, BadgeHelp } from "lucide-react";
import { FAQS, INITIAL_TESTIMONIALS } from "../data";

export default function TrustSafety() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setActiveFaq((prev) => (prev === faqId ? null : faqId));
  };

  return (
    <div className="bg-[#FDFBF7] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C5A880]">Absolute Security</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800">
            Trust, Safety & <span className="text-[#C5A880]">Health Assurances</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Adopting a teacup or toy Yorkie is a 15-year emotional commitment. We build absolute consumer confidence through legal guarantees, veterinary oversight, and total transparency.
          </p>
          <div className="w-16 h-1 bg-[#C5A880] mx-auto rounded-full"></div>
        </div>

        {/* 10-Year Genetic Health Contract Showcase */}
        <div className="bg-white rounded-3xl border-2 border-[#C5A880] p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center lg:text-left space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mx-auto lg:mx-0 shadow-sm">
              <ShieldCheck className="w-9 h-9 fill-current" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-neutral-800">
              Industry-Leading <span className="text-[#C5A880]">10-Year Guarantee</span>
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We stand behind the health and genetic integrity of our breeding pairs. We offer a binding contract that protects your family against hereditary issues.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
              <h4 className="font-serif text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#C5A880]" />
                <span>10-Year Genetic Security</span>
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Covers any diagnosed life-threatening congenital or hereditary defects, including heart defects, liver shunts, or genetic blindness. Fully documented with breeder compensation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
              <h4 className="font-serif text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-[#C5A880]" />
                <span>72-Hour Viral Protection</span>
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Guarantees your puppy arrives free of Parvovirus, Distemper, or Coronavirus. We mandate a comprehensive veterinary checkup within 3 days of adoption to validate this warranty.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
              <h4 className="font-serif text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" />
                <span>DNA Parents Profiling</span>
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Every breeding sire and dam is DNA-cleared prior to pairing. We test for standard Yorkshire Terrier markers, ensuring absolute pedigree transparency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
              <h4 className="font-serif text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#C5A880]" />
                <span>Concierge Vet Consults</span>
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our partnering vets provide lifetime consultation pathways for your puppy. Enjoy direct lines of text communication to solve care questions seamlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Testimonials with Real Puppy Mentions */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl font-bold text-neutral-800">Delighted Royal Yorkie Families</h3>
            <p className="text-xs text-neutral-500">Verified owners sharing their authentic, luxury experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Stars indicator */}
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                {/* Purchaser Profile */}
                <div className="flex items-center gap-4 border-t border-neutral-100 pt-5 mt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C5A880]/30">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-neutral-800">{t.name}</h4>
                    <p className="text-[10px] text-neutral-400 font-medium">{t.location}</p>
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[#C5A880] mt-1">
                      Adopted {t.puppyName}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-[#C5A880] mx-auto">
              <BadgeHelp className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-neutral-800">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-500">Find immediate answers to questions on health, delivery, and reservations.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-neutral-200/80 rounded-2xl overflow-hidden transition-all duration-300 bg-[#FDFBF7]/40 hover:bg-[#FDFBF7]/80"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-neutral-800 hover:text-[#C5A880] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
