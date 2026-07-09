/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Puppy, BlogPost, Inquiry, Gender, AvailabilityStatus, SizeCategory 
} from "../types";
import { 
  Plus, Edit2, Trash2, CheckCircle, Clock, AlertCircle, Sparkles, BookOpen, 
  MessageSquare, Heart, ShieldCheck, Mail, Phone, DollarSign, ListOrdered, Calendar, UserPlus 
} from "lucide-react";

interface AdminPanelProps {
  puppies: Puppy[];
  onUpdatePuppies: (puppies: Puppy[]) => void;
  blogs: BlogPost[];
  onUpdateBlogs: (blogs: BlogPost[]) => void;
  inquiries: Inquiry[];
  onUpdateInquiries: (inquiries: Inquiry[]) => void;
}

export default function AdminPanel({
  puppies,
  onUpdatePuppies,
  blogs,
  onUpdateBlogs,
  inquiries,
  onUpdateInquiries,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"puppies" | "inquiries" | "blogs">("puppies");
  
  // Modals / forms state
  const [showPuppyModal, setShowPuppyModal] = useState(false);
  const [editingPuppy, setEditingPuppy] = useState<Puppy | null>(null);

  // Form State for Puppy
  const [pName, setPName] = useState("");
  const [pGender, setPGender] = useState<Gender>(Gender.Male);
  const [pDob, setPDob] = useState("2026-05-15");
  const [pAge, setPAge] = useState(8);
  const [pAdultWeight, setPAdultWeight] = useState("4.5 lbs");
  const [pCurrentWeight, setPCurrentWeight] = useState("1.5 lbs");
  const [pColor, setPColor] = useState("Traditional Blue & Gold");
  const [pPrice, setPPrice] = useState(4000);
  const [pDeposit, setPDeposit] = useState(500);
  const [pStatus, setPStatus] = useState<AvailabilityStatus>(AvailabilityStatus.Available);
  const [pSize, setPSize] = useState<SizeCategory>(SizeCategory.Teacup);
  const [pPersonality, setPPersonality] = useState("");
  const [pMicrochip, setPMicrochip] = useState("");
  const [pRegistration, setPRegistration] = useState("AKC Limited Registration");
  const [pPhotoUrl, setPPhotoUrl] = useState("");

  // Form state for Blog
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [bTitle, setBTitle] = useState("");
  const [bCategory, setBCategory] = useState<"Care" | "Feeding" | "Grooming" | "Training" | "Health">("Care");
  const [bSummary, setBSummary] = useState("");
  const [bContent, setBContent] = useState("");
  const [bImage, setBImage] = useState("");

  // Statistics
  const stats = React.useMemo(() => {
    const totalActive = puppies.filter(p => p.status === AvailabilityStatus.Available).length;
    const totalReserved = puppies.filter(p => p.status === AvailabilityStatus.Reserved).length;
    const totalSold = puppies.filter(p => p.status === AvailabilityStatus.Sold).length;
    
    // Sum estimated gross revenue from sold/reserved puppies
    const estimatedGross = puppies
      .filter(p => p.status === AvailabilityStatus.Reserved || p.status === AvailabilityStatus.Sold)
      .reduce((sum, curr) => sum + curr.price, 0);

    const pendingInquiries = inquiries.filter(i => i.status === "Pending").length;

    return { totalActive, totalReserved, totalSold, estimatedGross, pendingInquiries };
  }, [puppies, inquiries]);

  // Handle puppy save (Create / Update)
  const handleSavePuppy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pPersonality) return;

    const finalPhoto = pPhotoUrl || "/src/assets/images/yorkie_winston_puppy_1783627374631.jpg";

    if (editingPuppy) {
      // Update
      const updated = puppies.map((p) => {
        if (p.id === editingPuppy.id) {
          return {
            ...p,
            name: pName,
            gender: pGender,
            dob: pDob,
            ageWeeks: Number(pAge),
            expectedAdultWeight: pAdultWeight,
            currentWeight: pCurrentWeight,
            color: pColor,
            price: Number(pPrice),
            depositAmount: Number(pDeposit),
            status: pStatus,
            sizeCategory: pSize,
            personality: pPersonality,
            microchipNumber: pMicrochip || p.microchipNumber,
            registrationDetails: pRegistration,
            photos: [finalPhoto, ...p.photos.slice(1)],
          };
        }
        return p;
      });
      onUpdatePuppies(updated);
    } else {
      // Create
      const newPuppy: Puppy = {
        id: `yorkie-${Date.now()}`,
        name: pName,
        gender: pGender,
        dob: pDob,
        ageWeeks: Number(pAge),
        expectedAdultWeight: pAdultWeight,
        currentWeight: pCurrentWeight,
        color: pColor,
        price: Number(pPrice),
        depositAmount: Number(pDeposit),
        status: pStatus,
        sizeCategory: pSize,
        personality: pPersonality,
        microchipNumber: pMicrochip || `981022003847${Math.floor(100 + Math.random() * 900)}`,
        registrationDetails: pRegistration,
        healthGuaranteeIncluded: true,
        photos: [finalPhoto],
        vaccinations: [
          { vaccine: "DHPP First Dose & Deworming", date: "2026-06-25", status: "Completed" },
          { vaccine: "DHPP Second Booster Dose", date: "2026-07-20", status: "Scheduled" }
        ],
        sire: {
          name: "Grand Champion Oliver IV",
          role: "Sire (Father)",
          weight: "3.2 lbs",
          color: "Blue & Tan Silky",
          registration: "AKC Champion Lineage",
          image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500",
          description: "Oliver is our championship line father, passing on robust genetics."
        },
        dam: {
          name: "Lady Penelope of Royal York",
          role: "Dam (Mother)",
          weight: "4.5 lbs",
          color: "Black & Gold",
          registration: "AKC Registered High Pedigree",
          image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=500",
          description: "Lady Penelope has a remarkably sweet demeanor and doll face."
        }
      };
      onUpdatePuppies([newPuppy, ...puppies]);
    }

    // Reset fields
    setPName("");
    setPPersonality("");
    setPPhotoUrl("");
    setEditingPuppy(null);
    setShowPuppyModal(false);
  };

  // Populate puppy edit fields
  const handleStartEditPuppy = (p: Puppy) => {
    setEditingPuppy(p);
    setPName(p.name);
    setPGender(p.gender);
    setPDob(p.dob);
    setPAge(p.ageWeeks);
    setPAdultWeight(p.expectedAdultWeight);
    setPCurrentWeight(p.currentWeight);
    setPColor(p.color);
    setPPrice(p.price);
    setPDeposit(p.depositAmount);
    setPStatus(p.status);
    setPSize(p.sizeCategory);
    setPPersonality(p.personality);
    setPMicrochip(p.microchipNumber);
    setPRegistration(p.registrationDetails);
    setPPhotoUrl(p.photos[0] || "");
    setShowPuppyModal(true);
  };

  // Delete puppy listing
  const handleDeletePuppy = (puppyId: string) => {
    if (confirm("Are you absolutely sure you want to delete this puppy listing from the boutique?")) {
      onUpdatePuppies(puppies.filter(p => p.id !== puppyId));
    }
  };

  // Change Inquiry Status
  const handleUpdateInquiryStatus = (inquiryId: string, status: Inquiry["status"]) => {
    onUpdateInquiries(
      inquiries.map((inq) => {
        if (inq.id === inquiryId) {
          return { ...inq, status };
        }
        return inq;
      })
    );
  };

  // Delete Inquiry
  const handleDeleteInquiry = (inquiryId: string) => {
    if (confirm("Delete this inquiry log?")) {
      onUpdateInquiries(inquiries.filter(i => i.id !== inquiryId));
    }
  };

  // Create Blog Article
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bTitle || !bContent || !bSummary) return;

    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title: bTitle,
      category: bCategory,
      summary: bSummary,
      content: bContent,
      readTime: "5 min read",
      image: bImage || "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=600",
      author: "Elite Estate Breeder",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };

    onUpdateBlogs([newBlog, ...blogs]);

    // Reset
    setBTitle("");
    setBSummary("");
    setBContent("");
    setBImage("");
    setShowBlogModal(false);
  };

  // Delete Blog
  const handleDeleteBlog = (blogId: string) => {
    if (confirm("Delete this blog article?")) {
      onUpdateBlogs(blogs.filter(b => b.id !== blogId));
    }
  };

  return (
    <div className="bg-[#FDFBF7] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-200/50 pb-6">
          <div>
            <h2 className="font-serif text-3xl font-bold text-neutral-800 flex items-center gap-2">
              <Plus className="w-8 h-8 text-[#C5A880] rotate-45" />
              <span>Breeder Administrator Dashboard</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-1">Manage luxury Yorkie listings, coordinate inquiries, and publish nutritional articles.</p>
          </div>

          {/* Quick Add trigger */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingPuppy(null);
                setShowPuppyModal(true);
              }}
              className="px-5 py-2.5 bg-[#C5A880] text-white rounded-full text-xs font-bold hover:bg-[#b0936b] transition shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Add New Puppy</span>
            </button>
            <button
              onClick={() => setShowBlogModal(true)}
              className="px-5 py-2.5 border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880]/5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Write Article</span>
            </button>
          </div>
        </div>

        {/* Dashboard statistics panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-2xl border border-[#C5A880]/15 p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Active Listings</p>
              <h3 className="text-3xl font-black text-neutral-800 font-mono">{stats.totalActive} / {puppies.length}</h3>
              <p className="text-[9px] text-neutral-500">{stats.totalReserved} Reserved • {stats.totalSold} Sold</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
              <Heart className="w-6 h-6 fill-current" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#C5A880]/15 p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Pending Inquiries</p>
              <h3 className="text-3xl font-black text-amber-600 font-mono">{stats.pendingInquiries}</h3>
              <p className="text-[9px] text-neutral-500">Unanswered buyer messages</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-500/20 flex items-center justify-center text-amber-600">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#C5A880]/15 p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Approved Placements</p>
              <h3 className="text-3xl font-black text-emerald-600 font-mono">{stats.totalReserved + stats.totalSold}</h3>
              <p className="text-[9px] text-neutral-500">Adopter reservations finalized</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#C5A880]/15 p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Gross Adoption Funds</p>
              <h3 className="text-3xl font-black text-neutral-800 font-mono">${stats.estimatedGross.toLocaleString()}</h3>
              <p className="text-[9px] text-neutral-500">From placements & deposits</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Dashboard Tab Bar */}
        <div className="flex border-b border-neutral-200">
          <button
            onClick={() => setActiveTab("puppies")}
            className={`py-3 px-6 font-bold text-xs tracking-wide border-b-2 transition cursor-pointer ${
              activeTab === "puppies" ? "border-[#C5A880] text-neutral-800" : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            Manage Puppies ({puppies.length})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`py-3 px-6 font-bold text-xs tracking-wide border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "inquiries" ? "border-[#C5A880] text-neutral-800" : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            <span>Buyer Inquiries ({inquiries.length})</span>
            {stats.pendingInquiries > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`py-3 px-6 font-bold text-xs tracking-wide border-b-2 transition cursor-pointer ${
              activeTab === "blogs" ? "border-[#C5A880] text-neutral-800" : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            Manage Care Blog ({blogs.length})
          </button>
        </div>

        {/* TAB 1: PUPPIES LISTING CONTROLLER */}
        {activeTab === "puppies" && (
          <div className="bg-white border border-[#C5A880]/15 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-neutral-800">Puppy Portfolio Registry</h3>
              <p className="text-xs text-neutral-400">Add, edit, or remove Yorkie puppy profiles showing up on the public catalog.</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FDFBF7] text-neutral-400 font-bold uppercase tracking-wider text-[9px] border-b border-neutral-100">
                    <th className="p-4 pl-6">Puppy</th>
                    <th className="p-4">Gender</th>
                    <th className="p-4">DOB / Age</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium">
                  {puppies.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-50/50">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.photos[0]}
                            alt={p.name}
                            className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-neutral-800 block text-sm">{p.name}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">ID: {p.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.gender === Gender.Male ? "bg-sky-50 text-sky-700" : "bg-rose-50 text-rose-700"
                        }`}>{p.gender}</span>
                      </td>
                      <td className="p-4 text-neutral-600">
                        <span>{p.dob}</span>
                        <span className="block text-[10px] text-neutral-400">{p.ageWeeks} weeks old</span>
                      </td>
                      <td className="p-4 text-neutral-600">{p.sizeCategory.split(" ")[0]}</td>
                      <td className="p-4 font-bold text-neutral-800">${p.price.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === AvailabilityStatus.Available 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                            : p.status === AvailabilityStatus.Reserved
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-neutral-100 text-neutral-600"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleStartEditPuppy(p)}
                            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:text-[#C5A880] hover:border-[#C5A880] transition bg-white cursor-pointer"
                            title="Edit details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePuppy(p.id)}
                            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:text-red-600 hover:border-red-200 transition bg-white cursor-pointer"
                            title="Remove listing"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES & PLACEMENTS TABLE */}
        {activeTab === "inquiries" && (
          <div className="bg-white border border-[#C5A880]/15 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-neutral-800">Customer Inquiries & Deposits Log</h3>
              <p className="text-xs text-neutral-400">Track client interest logs, deposit requests, and update contact status.</p>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-12 p-6">
                <MessageSquare className="w-10 h-10 text-neutral-200 mx-auto mb-3" />
                <h4 className="font-serif text-base font-bold text-neutral-800">No Inquiries Found</h4>
                <p className="text-xs text-neutral-400 mt-1">When customers send reservation messages, they show up here instantly.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FDFBF7] text-neutral-400 font-bold uppercase tracking-wider text-[9px] border-b border-neutral-100">
                      <th className="p-4 pl-6">Client Info</th>
                      <th className="p-4">Adoption Subject</th>
                      <th className="p-4">Message / Request Details</th>
                      <th className="p-4">Delivery Package</th>
                      <th className="p-4">Sum</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 pr-6 text-right">Action Handler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-medium">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-neutral-50/50">
                        <td className="p-4 pl-6 space-y-1">
                          <div className="font-bold text-neutral-800 text-sm">{inq.clientName}</div>
                          <div className="text-[10px] text-neutral-400 flex flex-col gap-0.5">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {inq.clientEmail}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {inq.clientPhone}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-neutral-800 font-bold">{inq.puppyName || "General Breeder Query"}</span>
                          <span className="block text-[10px] text-neutral-400 font-mono">Subject ID: {inq.puppyId || "N/A"}</span>
                        </td>
                        <td className="p-4 text-neutral-600 max-w-xs">
                          <div className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wide flex items-center gap-1 mb-1">
                            {inq.type === "Reservation" ? (
                              <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[9px]">Holding Deposit</span>
                            ) : (
                              <span className="bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded text-[9px]">Care Inquiry</span>
                            )}
                            <span className="text-neutral-400 font-normal">{inq.date}</span>
                          </div>
                          <p className="line-clamp-3 italic text-neutral-500">"{inq.message}"</p>
                        </td>
                        <td className="p-4 text-neutral-600">{inq.deliveryOption || "N/A"}</td>
                        <td className="p-4 font-bold text-neutral-800">
                          {inq.type === "Reservation" ? "$500" : "$0"}
                        </td>
                        <td className="p-4">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as Inquiry["status"])}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-neutral-200 outline-none bg-white text-neutral-800"
                          >
                            <option value="Pending">🔴 Pending</option>
                            <option value="Contacted">🟡 Contacted</option>
                            <option value="Approved">🟢 Approved</option>
                            <option value="Completed">⚫ Completed</option>
                          </select>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <div className="flex justify-end gap-1.5">
                            <a
                              href={`https://wa.me/${inq.clientPhone}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition text-[10px] font-bold cursor-pointer"
                            >
                              WhatsApp
                            </a>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1.5 rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 transition bg-white cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CARE BLOG EDITOR */}
        {activeTab === "blogs" && (
          <div className="bg-white border border-[#C5A880]/15 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-800">Breeder Care Blog Editor</h3>
                <p className="text-xs text-neutral-400">Add, edit, or delete instructional articles showing on the public blog page.</p>
              </div>
              <button
                onClick={() => setShowBlogModal(true)}
                className="px-4 py-2 bg-[#C5A880] text-white rounded-xl text-xs font-bold hover:bg-[#b0936b] transition cursor-pointer"
              >
                Publish New Article
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FDFBF7] text-neutral-400 font-bold uppercase tracking-wider text-[9px] border-b border-neutral-100">
                    <th className="p-4 pl-6">Article Banner & Title</th>
                    <th className="p-4">Topic Category</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Date Published</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium">
                  {blogs.map((b) => (
                    <tr key={b.id} className="hover:bg-neutral-50/50">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.image}
                            alt={b.title}
                            className="w-14 h-10 rounded-lg object-cover border border-neutral-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="max-w-md">
                            <span className="font-bold text-neutral-800 block text-xs truncate">{b.title}</span>
                            <span className="text-[10px] text-neutral-400 line-clamp-1 italic">"{b.summary}"</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded text-[10px] font-bold uppercase tracking-wider">{b.category}</span>
                      </td>
                      <td className="p-4 text-neutral-600">{b.author}</td>
                      <td className="p-4 text-neutral-500">{b.date}</td>
                      <td className="p-4 pr-6 text-right">
                        <button
                          onClick={() => handleDeleteBlog(b.id)}
                          className="p-1.5 rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 transition bg-white cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL 1: ADD / EDIT PUPPY */}
        {showPuppyModal && (
          <div className="fixed inset-0 bg-neutral-900/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-[#C5A880]/20">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                <h3 className="font-serif text-xl font-bold text-neutral-800">
                  {editingPuppy ? `Modify ${editingPuppy.name}'s Profile` : "Register New Yorkie Puppy"}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowPuppyModal(false)}
                  className="text-neutral-400 hover:text-neutral-600 font-extrabold text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSavePuppy} className="space-y-4 text-xs text-left" id="admin-puppy-form">
                
                {/* 1. Name & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Puppy Name *</label>
                    <input
                      type="text"
                      required
                      value={pName}
                      onChange={(e) => setPName(e.target.value)}
                      placeholder="e.g. Charlie"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Availability Status</label>
                    <select
                      value={pStatus}
                      onChange={(e) => setPStatus(e.target.value as AvailabilityStatus)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none bg-white font-semibold text-neutral-700"
                    >
                      <option value={AvailabilityStatus.Available}>Available Only</option>
                      <option value={AvailabilityStatus.Reserved}>Reserved</option>
                      <option value={AvailabilityStatus.Sold}>Sold</option>
                    </select>
                  </div>
                </div>

                {/* 2. Gender & Size */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Gender *</label>
                    <select
                      value={pGender}
                      onChange={(e) => setPGender(e.target.value as Gender)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none bg-white font-semibold text-neutral-700"
                    >
                      <option value={Gender.Male}>Male</option>
                      <option value={Gender.Female}>Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Size Category</label>
                    <select
                      value={pSize}
                      onChange={(e) => setPSize(e.target.value as SizeCategory)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none bg-white font-semibold text-neutral-700"
                    >
                      <option value={SizeCategory.Teacup}>Teacup (3-4 lbs adult)</option>
                      <option value={SizeCategory.Toy}>Toy (5-7 lbs adult)</option>
                    </select>
                  </div>
                </div>

                {/* 3. Pricing & Deposit */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Price Investment ($USD) *</label>
                    <input
                      type="number"
                      required
                      value={pPrice}
                      onChange={(e) => setPPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Holding Deposit Amount</label>
                    <input
                      type="number"
                      value={pDeposit}
                      onChange={(e) => setPDeposit(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* 4. Age, DOB, and Weights */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">DOB *</label>
                    <input
                      type="date"
                      required
                      value={pDob}
                      onChange={(e) => setPDob(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Age in Weeks *</label>
                    <input
                      type="number"
                      required
                      value={pAge}
                      onChange={(e) => setPAge(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Est. Adult Wt</label>
                    <input
                      type="text"
                      value={pAdultWeight}
                      onChange={(e) => setPAdultWeight(e.target.value)}
                      placeholder="e.g. 3.5 lbs"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* 5. Color, Registration, Microchip */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Silky Color Coat *</label>
                    <input
                      type="text"
                      required
                      value={pColor}
                      onChange={(e) => setPColor(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Registration</label>
                    <input
                      type="text"
                      value={pRegistration}
                      onChange={(e) => setPRegistration(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Microchip Number</label>
                    <input
                      type="text"
                      value={pMicrochip}
                      onChange={(e) => setPMicrochip(e.target.value)}
                      placeholder="e.g. 98100..."
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* 6. Photo URL */}
                <div>
                  <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Profile Photo URL</label>
                  <input
                    type="url"
                    value={pPhotoUrl}
                    onChange={(e) => setPPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or leave blank for a cute default"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                  />
                </div>

                {/* 7. Personality */}
                <div>
                  <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Personality Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={pPersonality}
                    onChange={(e) => setPPersonality(e.target.value)}
                    placeholder="Describe their puppy face, playtime habits, cuddliness..."
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C5A880] text-white font-bold rounded-lg hover:bg-[#b0936b] transition cursor-pointer"
                >
                  {editingPuppy ? "Save Changes" : "Publish Puppy Profile"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: WRITE BLOG ARTICLE */}
        {showBlogModal && (
          <div className="fixed inset-0 bg-neutral-900/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-[#C5A880]/20">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                <h3 className="font-serif text-xl font-bold text-neutral-800">Publish Breeding & Care Article</h3>
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="text-neutral-400 hover:text-neutral-600 font-extrabold text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="space-y-4 text-xs text-left" id="admin-blog-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Article Title *</label>
                    <input
                      type="text"
                      required
                      value={bTitle}
                      onChange={(e) => setBTitle(e.target.value)}
                      placeholder="e.g. Training Your Yorkie Potty Pads"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Article Category</label>
                    <select
                      value={bCategory}
                      onChange={(e) => setBCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none bg-white font-semibold text-neutral-700"
                    >
                      <option value="Care">Care Guides</option>
                      <option value="Feeding">Nutrition & Feeding</option>
                      <option value="Grooming">Coat Grooming</option>
                      <option value="Training">Behavior & Training</option>
                      <option value="Health">Veterinary Health</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Banner Image URL</label>
                  <input
                    type="url"
                    value={bImage}
                    onChange={(e) => setBImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Short Summary (1-2 sentences) *</label>
                  <input
                    type="text"
                    required
                    value={bSummary}
                    onChange={(e) => setBSummary(e.target.value)}
                    placeholder="Summarize key takeaways..."
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">Full Article Content (Markdown paragraphs) *</label>
                  <textarea
                    required
                    rows={8}
                    value={bContent}
                    onChange={(e) => setBContent(e.target.value)}
                    placeholder="### 1. Choose a Command... Use '###' for Sub-headings and lists for bullets."
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg outline-none resize-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C5A880] text-white font-bold rounded-lg hover:bg-[#b0936b] transition cursor-pointer"
                >
                  Publish Article to Care Center
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
