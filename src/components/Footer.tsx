/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Instagram, Facebook, Youtube, Phone, Mail, MapPin, Send, CheckCircle2, 
  ShieldCheck, ArrowUp, Sparkles, MessageCircle 
} from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onContactFormSubmit: (e: React.FormEvent, email: string, message: string) => void;
}

export default function Footer({ setCurrentTab, onContactFormSubmit }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Quick contact form states (footer simplified)
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMsg) return;
    onContactFormSubmit(e, contactEmail, contactMsg);
    setContactSuccess(true);
    setContactEmail("");
    setContactMsg("");
    setTimeout(() => setContactSuccess(false), 6000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 relative border-t border-[#C5A880]/20 font-sans overflow-hidden">
      
      {/* Elegance border */}
      <div className="h-1.5 bg-gradient-to-r from-amber-600 via-[#C5A880] to-amber-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative z-10">
        
        {/* TOP SECTION: Branding, Newsletter & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-neutral-800">
          
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 border border-[#C5A880] flex items-center justify-center">
                  <span className="font-serif text-[#C5A880] font-bold text-md">R</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white tracking-wide">Royal Yorkies</h3>
                  <p className="text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold">Pristine Heritage Breeders</p>
                </div>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                We raise multi-generational, purebred Yorkshire Terrier puppies with premium health profiles, loving attention, and genetic integrity on our private, botanical nursery estate.
              </p>
            </div>

            {/* Social Icons */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-[#C5A880]">Join Our Social Circle</h4>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#C5A880] hover:text-white flex items-center justify-center text-neutral-400 transition" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#C5A880] hover:text-white flex items-center justify-center text-neutral-400 transition" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#C5A880] hover:text-white flex items-center justify-center text-neutral-400 transition" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#C5A880] hover:text-white flex items-center justify-center text-neutral-400 transition" aria-label="TikTok">
                  <span className="text-[10px] font-bold">🎵</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Newsletter Sub (The "Royal Circle") */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <h3 className="font-serif text-md font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span>Join the Royal Circle</span>
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                Subscribe to receive private notification of our upcoming seasonal litters, nursery breakthroughs, and veterinary care secrets before public release.
              </p>
            </div>

            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="relative max-w-sm" id="newsletter-form">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-[#C5A880] hover:bg-[#b0936b] rounded-lg transition cursor-pointer text-white"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-4 bg-neutral-800 border border-emerald-500/10 rounded-xl flex items-center gap-3 max-w-sm animate-fade-in" id="newsletter-success">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-xs text-neutral-300">Welcome to the Royal Circle! You are registered.</span>
              </div>
            )}
          </div>

          {/* Column 3: Contact & Sales System form */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h3 className="font-serif text-md font-bold text-white">Direct Breeder Inquiry</h3>
              <p className="text-[10px] text-neutral-400 mt-1">Have general questions? Send us an instant message.</p>
            </div>

            {!contactSuccess ? (
              <form onSubmit={handleContactSubmit} className="space-y-2 max-w-sm" id="footer-contact-form">
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880]"
                />
                <textarea
                  required
                  rows={2}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#C5A880] hover:bg-[#b0936b] text-white rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="p-4 bg-neutral-800 border border-emerald-500/10 rounded-xl text-center space-y-2 max-w-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                <p className="text-xs text-neutral-300">Message Sent! We will email you shortly.</p>
              </div>
            )}
          </div>

        </div>

        {/* MIDDLE SECTION: Navigation & Contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Quick Directory</h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              <li>
                <button onClick={() => setCurrentTab("home")} className="hover:text-[#C5A880] transition cursor-pointer">
                  Boutique Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab("marketplace")} className="hover:text-[#C5A880] transition cursor-pointer">
                  Available Puppies
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab("about")} className="hover:text-[#C5A880] transition cursor-pointer">
                  Our Breeding Story
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab("trust")} className="hover:text-[#C5A880] transition cursor-pointer">
                  Trust, Health & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab("blog")} className="hover:text-[#C5A880] transition cursor-pointer">
                  Puppy Care Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Physical Address Coordinates */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Breeding Estate Location</h4>
            <div className="space-y-3 text-xs text-neutral-400 leading-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>
                  Royal Yorkies Boutique Private Estate,<br />
                  Harrogate, Yorkshire,<br />
                  United Kingdom
                </span>
              </div>
              <p className="text-[10px] text-neutral-500">
                *Adoption pickups are scheduled strictly via private appointment to maintain nursery quarantine.
              </p>
            </div>
          </div>

          {/* Support Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Estate Office Hours</h4>
            <div className="space-y-3.5 text-xs text-neutral-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>+1 (555) 891-2384</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>concierge@royalyorkieboutique.com</span>
              </div>
              <p className="text-[10px] text-neutral-500 leading-normal">
                Monday — Sunday: 08:00 AM — 08:00 PM BST<br />
                Emergency Vet Line: 24/7 Registered Adopters Only
              </p>
            </div>
          </div>

          {/* Up to top shortcut */}
          <div className="lg:col-span-2 flex items-end justify-start lg:justify-end">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-neutral-800 border border-neutral-700 hover:border-[#C5A880] text-xs text-neutral-400 hover:text-[#C5A880] transition cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* BOTTOM SECTION: Secure Badges & Copyright */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-emerald-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Secure Adoption Contracts</span>
            </div>
            <span>•</span>
            <span className="text-[10px] font-semibold">100% AKC Pedigree Verified</span>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p>© 2026 Royal Yorkies Boutique. All rights reserved.</p>
            <p className="text-[10px] text-neutral-600">
              Pristine Yorkshire Terrier Breeder harping health, safety, and genetic perfection.
            </p>
          </div>
        </div>

      </div>

      {/* FLOATING WHATSAPP CHAT BUTTON */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-600 transition duration-300 hover:scale-105 flex items-center justify-center group"
        aria-label="Contact us on WhatsApp"
        id="floating-whatsapp"
      >
        <MessageCircle className="w-6 h-6 text-white fill-current animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-[11px] font-bold text-white whitespace-nowrap pl-0 group-hover:pl-2">
          Chat With Breeder
        </span>
      </a>

    </footer>
  );
}
