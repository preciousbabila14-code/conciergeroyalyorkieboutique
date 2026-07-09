/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, ShieldCheck, Award, CheckCircle2, Sparkles, Calendar, ChevronRight, MessageSquare 
} from "lucide-react";

import { 
  Puppy, BlogPost, Inquiry, Gender, AvailabilityStatus, SizeCategory 
} from "./types";
import { 
  INITIAL_PUPPIES, INITIAL_BLOGS, INITIAL_TESTIMONIALS 
} from "./data";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Marketplace from "./components/Marketplace";
import PuppyDetail from "./components/PuppyDetail";
import AboutUs from "./components/AboutUs";
import TrustSafety from "./components/TrustSafety";
import Gallery from "./components/Gallery";
import Blog from "./components/Blog";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";

export default function App() {
  // --- Persistent States ---
  const [puppies, setPuppies] = useState<Puppy[]>(() => {
    const saved = localStorage.getItem("royal_yorkie_puppies");
    return saved ? JSON.parse(saved) : INITIAL_PUPPIES;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem("royal_yorkie_blogs");
    return saved ? JSON.parse(saved) : INITIAL_BLOGS;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem("royal_yorkie_inquiries");
    return saved ? JSON.parse(saved) : [];
  });

  // --- Router Tab States ---
  // Tabs: "home", "marketplace", "about", "trust", "gallery", "blog", "admin", "detail"
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [selectedPuppy, setSelectedPuppy] = useState<Puppy | null>(null);

  // Synchronize storage
  useEffect(() => {
    localStorage.setItem("royal_yorkie_puppies", JSON.stringify(puppies));
  }, [puppies]);

  useEffect(() => {
    localStorage.setItem("royal_yorkie_blogs", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem("royal_yorkie_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // Handle single puppy selection
  const handleSelectPuppy = (puppy: Puppy) => {
    setSelectedPuppy(puppy);
    setCurrentTab("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add custom inquiry from detail form
  const handleAddInquiry = (inqData: Omit<Inquiry, "id" | "date" | "status">) => {
    const newInq: Inquiry = {
      ...inqData,
      id: `inq-${Date.now()}`,
      status: "Pending",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };
    
    setInquiries([newInq, ...inquiries]);

    // If it's a reservation, update the puppy status to reserved!
    if (inqData.type === "Reservation" && inqData.puppyId) {
      setPuppies((prevPuppies) => 
        prevPuppies.map((p) => {
          if (p.id === inqData.puppyId) {
            return { ...p, status: AvailabilityStatus.Reserved };
          }
          return p;
        })
      );
    }
  };

  // Quick Action form footer contact submit handler
  const handleFooterContactForm = (e: React.FormEvent, email: string, message: string) => {
    const newInq: Inquiry = {
      id: `inq-${Date.now()}`,
      clientName: "General Web Visitor",
      clientEmail: email,
      clientPhone: "N/A",
      message: message,
      type: "Inquiry",
      status: "Pending",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };
    setInquiries([newInq, ...inquiries]);
  };

  // Count available puppies dynamically
  const availablePuppiesCount = puppies.filter(p => p.status === AvailabilityStatus.Available).length;

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-neutral-800 flex flex-col justify-between selection:bg-[#C5A880]/30 selection:text-neutral-900">
      
      {/* Navigation Header */}
      <Navigation 
        currentTab={currentTab} 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSelectedPuppy(null);
        }} 
        availablePuppiesCount={availablePuppiesCount}
      />

      {/* Main Routed Content body */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* TAB: HOME */}
          {currentTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Hero */}
              <Hero 
                onViewPuppies={() => setCurrentTab("marketplace")}
                onReservePuppy={() => setCurrentTab("marketplace")}
                onContactUs={() => {
                  setCurrentTab("trust");
                  // Scroll to FAQ
                  setTimeout(() => {
                    document.getElementById("gallery-lightbox")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              />

              {/* Featured Puppies Grid */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C5A880]">The Royal Selection</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-800">Featured Puppies</h2>
                  <p className="text-neutral-500 text-xs sm:text-sm">These precious, high-end Yorkshire Terriers are currently looking for loving premium homes.</p>
                  <div className="w-12 h-0.5 bg-[#C5A880] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {puppies.slice(0, 3).map((puppy) => (
                    <div
                      key={puppy.id}
                      onClick={() => handleSelectPuppy(puppy)}
                      className="group bg-white rounded-3xl overflow-hidden border border-[#C5A880]/15 hover:border-[#C5A880]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div className="relative aspect-4/3 bg-neutral-100 overflow-hidden">
                        <img
                          src={puppy.photos[0]}
                          alt={puppy.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide text-white shadow-sm ${
                            puppy.status === AvailabilityStatus.Available ? "bg-emerald-500" : "bg-amber-500"
                          }`}>
                            {puppy.status}
                          </span>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/95 text-neutral-800 border border-white/40 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider">
                            {puppy.sizeCategory.split(" ")[0]}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-serif text-xl font-bold text-neutral-800 flex items-center gap-1.5">
                              {puppy.name}
                              <span className="text-[10px] font-sans font-bold text-[#C5A880] bg-[#C5A880]/10 px-2 py-0.5 rounded-full">
                                {puppy.gender}
                              </span>
                            </h3>
                            <span className="font-serif text-lg font-black text-[#C5A880]">${puppy.price.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                            {puppy.personality}
                          </p>
                        </div>

                        <div className="border-t border-neutral-100 pt-4 flex justify-between items-center text-xs text-[#C5A880] font-bold">
                          <span>Explore Genetic Pedigree</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-10">
                  <button
                    onClick={() => setCurrentTab("marketplace")}
                    className="px-8 py-3.5 border border-[#C5A880] text-[#C5A880] rounded-full text-xs font-extrabold tracking-wide hover:bg-[#C5A880]/5 transition-all cursor-pointer shadow-sm"
                  >
                    View All Available Puppies ({availablePuppiesCount})
                  </button>
                </div>
              </section>

              {/* Why Choose Us Block - Bento Grid */}
              <section className="bg-white border-y border-neutral-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C5A880]">Why Adopt From Us</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-800">Our Pillars of Excellence</h2>
                    <p className="text-neutral-500 text-xs sm:text-sm">We maintain elite breeding guidelines that protect puppies and buyers alike.</p>
                    <div className="w-12 h-0.5 bg-[#C5A880] mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="p-8 rounded-3xl border border-[#C5A880]/10 bg-[#FDFBF7]/40 space-y-4 hover:border-[#C5A880]/30 transition">
                      <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] flex items-center justify-center">
                        <Award className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-neutral-800">AKC Merit Pedigree</h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        All our breeding sires and dams are AKC registered show championship title winners, ensuring genetic purity, excellent dental occlusion, and pristine silky flowing coats.
                      </p>
                    </div>

                    <div className="p-8 rounded-3xl border border-[#C5A880]/10 bg-[#FDFBF7]/40 space-y-4 hover:border-[#C5A880]/30 transition">
                      <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-neutral-800">10-Year Genetic Security</h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Each companion is backstopped by a legal 10-Year Genetic Health Contract. If severe congenital diseases are diagnosed, breeder compensations are fully guaranteed in writing.
                      </p>
                    </div>

                    <div className="p-8 rounded-3xl border border-[#C5A880]/10 bg-[#FDFBF7]/40 space-y-4 hover:border-[#C5A880]/30 transition">
                      <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-neutral-800">Veterinary Alliance</h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Our private estate works alongside licensed partner veterinarians. Puppies undergo weekly neonatal inspections, receive ISO microchips, and leave with authorized health certificates.
                      </p>
                    </div>

                  </div>
                </div>
              </section>

              {/* Health Guarantee Banner Callout */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative bg-neutral-900 border border-[#C5A880]/30 rounded-3xl overflow-hidden py-10 px-6 sm:px-12 text-center lg:text-left shadow-2xl">
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A880]/5 rounded-full blur-2xl"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                    <div className="lg:col-span-8 space-y-3">
                      <span className="text-[9px] uppercase tracking-[0.15em] text-[#C5A880] font-extrabold flex items-center justify-center lg:justify-start gap-1">
                        <Sparkles className="w-3.5 h-3.5 fill-current text-[#C5A880]" />
                        <span>The Ultimate Guarantee</span>
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                        Every Companion Protected For Ten Full Years
                      </h3>
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                        Our genetic standards are so high we cover life-threatening hereditary ailments. Rest easy knowing your purebred Yorkie puppy has been bred to the highest criteria.
                      </p>
                    </div>

                    <div className="lg:col-span-4 flex justify-center lg:justify-end">
                      <button
                        onClick={() => setCurrentTab("trust")}
                        className="px-6 py-3 bg-[#C5A880] text-white hover:bg-[#b0936b] rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer"
                      >
                        Read Security Guarantee
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Gallery Preview & Newsletter */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Gallery Card */}
                <div className="bg-white border border-[#C5A880]/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-neutral-800">Estate nursery peek</h3>
                    <p className="text-xs text-neutral-500">A photographic registry of our pristine grounds, neonatal nurseries, and playing Yorkie pups.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=300" alt="Yorkie garden" className="rounded-xl object-cover aspect-square" referrerPolicy="no-referrer" />
                    <img src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=300" alt="Yorkie nursery" className="rounded-xl object-cover aspect-square" referrerPolicy="no-referrer" />
                    <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=300" alt="Yorkie groom" className="rounded-xl object-cover aspect-square" referrerPolicy="no-referrer" />
                  </div>
                  <button onClick={() => setCurrentTab("gallery")} className="text-xs font-bold text-[#C5A880] hover:text-[#b0936b] flex items-center gap-1 cursor-pointer">
                    <span>See All Media Galleries</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Newsletter Box */}
                <div className="bg-white border border-[#C5A880]/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-neutral-800">Adopter Priority Waitlist</h3>
                    <p className="text-xs text-neutral-500">Sign up to receive immediate private notifications on upcoming litters and priority reserves.</p>
                  </div>
                  <div className="p-5 bg-[#FDFBF7] border border-[#C5A880]/15 rounded-2xl flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-[#C5A880] flex-shrink-0" />
                    <div>
                      <h4 className="font-serif text-xs font-bold text-neutral-800">Autumn Litters Opening Soon</h4>
                      <p className="text-[10px] text-neutral-400 font-medium">Subscribers receive 48-hour advanced selection rights.</p>
                    </div>
                  </div>
                  <button onClick={() => setCurrentTab("trust")} className="w-full py-3.5 bg-neutral-800 text-white hover:bg-neutral-900 text-xs font-bold rounded-xl transition cursor-pointer">
                    Join Waitlist & Check FAQs
                  </button>
                </div>
              </section>

              {/* Customer Testimonials Carousel */}
              <section className="bg-white border-t border-neutral-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C5A880]">Our Family Stories</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-800">Adopted Family Reviews</h2>
                    <p className="text-neutral-500 text-xs sm:text-sm">Read the heartfelt stories of families who brought our puppies into their castles.</p>
                    <div className="w-12 h-0.5 bg-[#C5A880] mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {INITIAL_TESTIMONIALS.map((test) => (
                      <div key={test.id} className="bg-[#FDFBF7]/40 border border-[#C5A880]/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex gap-1">
                            {[...Array(test.rating)].map((_, i) => (
                              <Heart key={i} className="w-3.5 h-3.5 text-amber-500 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs text-neutral-600 leading-relaxed italic">
                            "{test.text}"
                          </p>
                        </div>
                        <div className="flex items-center gap-3 border-t border-neutral-100 pt-4 mt-6">
                          <div className="w-9 h-9 rounded-full overflow-hidden border border-neutral-200">
                            <img src={test.image} alt={test.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="font-serif text-xs font-bold text-neutral-800">{test.name}</h4>
                            <p className="text-[9px] text-[#C5A880] font-semibold">Adopted {test.puppyName}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* TAB: MARKETPLACE */}
          {currentTab === "marketplace" && (
            <motion.div
              key="marketplace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Marketplace 
                puppies={puppies} 
                onSelectPuppy={handleSelectPuppy}
                onQuickInquiry={(puppy, type) => {
                  setSelectedPuppy(puppy);
                  setCurrentTab("detail");
                  // Scroll directly to the form
                  setTimeout(() => {
                    document.getElementById("puppy-detail-form")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              />
            </motion.div>
          )}

          {/* TAB: PUPPY DETAIL PAGE */}
          {currentTab === "detail" && selectedPuppy && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PuppyDetail 
                puppy={selectedPuppy} 
                onBack={() => setCurrentTab("marketplace")} 
                onSubmitInquiry={handleAddInquiry}
              />
            </motion.div>
          )}

          {/* TAB: ABOUT STORY */}
          {currentTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AboutUs />
            </motion.div>
          )}

          {/* TAB: TRUST, SECURITY & FAQ */}
          {currentTab === "trust" && (
            <motion.div
              key="trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TrustSafety />
            </motion.div>
          )}

          {/* TAB: GALLERY */}
          {currentTab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Gallery />
            </motion.div>
          )}

          {/* TAB: CARE BLOG */}
          {currentTab === "blog" && (
            <motion.div
              key="blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Blog blogs={blogs} />
            </motion.div>
          )}

          {/* TAB: ADMIN DASHBOARD */}
          {currentTab === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminPanel 
                puppies={puppies} 
                onUpdatePuppies={setPuppies}
                blogs={blogs}
                onUpdateBlogs={setBlogs}
                inquiries={inquiries}
                onUpdateInquiries={setInquiries}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer System */}
      <Footer 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSelectedPuppy(null);
        }} 
        onContactFormSubmit={handleFooterContactForm}
      />

    </div>
  );
}
