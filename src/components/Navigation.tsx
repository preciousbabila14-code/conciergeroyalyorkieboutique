/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Heart, Menu, X, ShieldCheck, Phone, BookOpen, Images, Award, LayoutDashboard } from "lucide-react";

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  availablePuppiesCount: number;
}

export default function Navigation({
  currentTab,
  setCurrentTab,
  availablePuppiesCount,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Heart },
    { id: "marketplace", label: `Available Puppies (${availablePuppiesCount})`, icon: Heart },
    { id: "about", label: "Our Story", icon: Award },
    { id: "trust", label: "Trust & Health", icon: ShieldCheck },
    { id: "gallery", label: "Gallery", icon: Images },
    { id: "blog", label: "Care Blog", icon: BookOpen },
    { id: "admin", label: "Breeder Dashboard", icon: LayoutDashboard },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#C5A880]/15 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand Section */}
          <div 
            onClick={() => handleNavClick("home")} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="nav-logo"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-[#C5A880] bg-white group-hover:bg-[#FDFBF7] transition-all duration-300 shadow-sm">
              <span className="font-serif text-[#C5A880] font-bold text-lg tracking-wider">R</span>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5 text-white shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-800 transition-colors group-hover:text-[#C5A880]">
                Royal Yorkies <span className="text-[#C5A880]">Boutique</span>
              </h1>
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-sans font-medium">
                Pristine Heritage Breeders
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-white bg-[#C5A880] shadow-md shadow-[#C5A880]/20"
                      : "text-neutral-600 hover:text-[#C5A880] hover:bg-neutral-50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "animate-pulse" : ""}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Contact Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              id="nav-whatsapp-btn"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/20 bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100/80 transition-all duration-300 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 transition-colors cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-[#C5A880]/15 bg-[#FDFBF7] shadow-inner transition-all duration-300">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? "text-white bg-[#C5A880] shadow-sm"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-[#C5A880]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 border-t border-neutral-200/60 flex flex-col gap-2.5">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>WhatsApp Consultant</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
