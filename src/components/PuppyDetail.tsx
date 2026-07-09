/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck, Heart, Calendar, Truck, UserCheck, DollarSign, Send, Play, Pause } from "lucide-react";
import { Puppy, Gender, AvailabilityStatus, Inquiry } from "../types";

interface PuppyDetailProps {
  puppy: Puppy;
  onBack: () => void;
  onSubmitInquiry: (inquiry: Omit<Inquiry, "id" | "date" | "status">) => void;
}

export default function PuppyDetail({ puppy, onBack, onSubmitInquiry }: PuppyDetailProps) {
  const [selectedPhoto, setSelectedPhoto] = useState(puppy.photos[0]);
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  // State for reservation / inquiry form
  const [formType, setFormType] = useState<"Inquiry" | "Reservation">("Reservation");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("VIP Flight Nanny ($450)");
  const [clientMessage, setClientMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Delivery estimation calculations
  const deliveryOptionsList = [
    { name: "VIP Flight Nanny (Hand-delivered in-cabin)", cost: 450, time: "1-2 days from release" },
    { name: "Private Climate-Controlled Ground Courier", cost: 300, time: "2-4 days from release" },
    { name: "In-Person Estate Pickup (Yorkshire Private Estate)", cost: 0, time: "Scheduled at your convenience" },
  ];

  const currentDeliveryCost = deliveryOptionsList.find(o => o.name.startsWith(deliveryOption.split(" (")[0]))?.cost || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;

    onSubmitInquiry({
      puppyId: puppy.id,
      puppyName: puppy.name,
      clientName,
      clientEmail,
      clientPhone,
      message: clientMessage || `I am highly interested in adopting ${puppy.name}!`,
      type: formType,
      deliveryOption: formType === "Reservation" ? deliveryOption : undefined,
    });

    setIsSubmitted(true);
    // Reset fields
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setClientMessage("");
  };

  return (
    <div className="bg-[#FDFBF7] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors cursor-pointer mb-8"
          id="back-to-marketplace-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Photos, Videos & Pedigree */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Image Gallery Showcase */}
            <div className="space-y-4">
              <div className="relative aspect-4/3 bg-neutral-100 rounded-3xl overflow-hidden border border-[#C5A880]/10 shadow-sm">
                <img
                  src={selectedPhoto}
                  alt={`${puppy.name} showcase`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Available Badge overlay */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm ${
                    puppy.status === AvailabilityStatus.Available
                      ? "bg-emerald-500"
                      : puppy.status === AvailabilityStatus.Reserved
                      ? "bg-amber-500"
                      : "bg-neutral-500"
                  }`}>
                    {puppy.status}
                  </span>
                </div>
              </div>

              {/* Thumbnails list */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {puppy.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhoto(photo)}
                    className={`relative w-20 sm:w-24 aspect-4/3 rounded-xl overflow-hidden border-2 transition cursor-pointer flex-shrink-0 ${
                      selectedPhoto === photo ? "border-[#C5A880]" : "border-transparent"
                    }`}
                  >
                    <img
                      src={photo}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Video Player Section */}
            {puppy.videoUrl && (
              <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-[#C5A880] fill-current" />
                  <span>See {puppy.name} in Action</span>
                </h3>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-200">
                  <video
                    id={`puppy-video-${puppy.id}`}
                    src={puppy.videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  ></video>
                </div>
              </div>
            )}

            {/* Breeder standards and socialization */}
            <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-neutral-800 border-b border-neutral-100 pb-3">
                Breeder Socialization & Daily Routine
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Before arriving to your home, <strong>{puppy.name}</strong> undergoes our comprehensive pre-socialization curriculum. This includes familiarity training with standard household sounds (vacuum cleaners, baby voices, TVs), basic pad-training steps, and extensive sensory conditioning using soft textured toys.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-2 text-xs text-neutral-600">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Raised 24/7 inside clean climate nursery</span>
                </div>
                <div className="flex gap-2 text-xs text-neutral-600">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Handled daily by children & professional trainers</span>
                </div>
                <div className="flex gap-2 text-xs text-neutral-600">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Crate and pad training initiated</span>
                </div>
                <div className="flex gap-2 text-xs text-neutral-600">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Prone-to-grooming touch conditioning</span>
                </div>
              </div>
            </div>

            {/* Sire & Dam Pedigree Section */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-neutral-800">
                Pristine AKC Parental Lineage (Pedigree)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sire Card */}
                <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100">
                      <img
                        src={puppy.sire.image}
                        alt="Sire"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-[#C5A880] text-white text-[9px] font-extrabold px-2 py-1 rounded uppercase tracking-wider">
                        Father (Sire)
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-md font-bold text-neutral-800">{puppy.sire.name}</h4>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-500 mt-2 font-medium">
                        <div>Weight: {puppy.sire.weight}</div>
                        <div>Color: {puppy.sire.color}</div>
                        <div className="col-span-2">Reg: {puppy.sire.registration}</div>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed italic border-t border-neutral-100 pt-3">
                      "{puppy.sire.description}"
                    </p>
                  </div>
                </div>

                {/* Dam Card */}
                <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100">
                      <img
                        src={puppy.dam.image}
                        alt="Dam"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-[#C5A880] text-white text-[9px] font-extrabold px-2 py-1 rounded uppercase tracking-wider">
                        Mother (Dam)
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-md font-bold text-neutral-800">{puppy.dam.name}</h4>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-500 mt-2 font-medium">
                        <div>Weight: {puppy.dam.weight}</div>
                        <div>Color: {puppy.dam.color}</div>
                        <div className="col-span-2">Reg: {puppy.dam.registration}</div>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed italic border-t border-neutral-100 pt-3">
                      "{puppy.dam.description}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Technical Details & Inquiry Form */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Pricing Card */}
            <div className="bg-white rounded-3xl border-2 border-[#C5A880] p-6 sm:p-8 shadow-md space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880]">Adoption Investment</span>
                <div className="flex justify-between items-baseline">
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-neutral-800">
                    ${puppy.price.toLocaleString()} <span className="text-xs font-sans text-neutral-400">USD</span>
                  </h2>
                  <span className="text-xs text-neutral-500 font-semibold bg-amber-50 text-[#C5A880] px-2.5 py-1 rounded-full">
                    Deposit: ${puppy.depositAmount}
                  </span>
                </div>
              </div>

              {/* Specs Table */}
              <div className="space-y-3.5 border-t border-neutral-100 pt-4">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Breed Type</span>
                  <span className="text-neutral-700 font-bold">Yorkshire Terrier (Purebred)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Expected Size</span>
                  <span className="text-[#C5A880] font-bold">{puppy.sizeCategory}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Current Weight</span>
                  <span className="text-neutral-700 font-semibold">{puppy.currentWeight}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Exact DOB</span>
                  <span className="text-neutral-700 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    {puppy.dob} ({puppy.ageWeeks} weeks old)
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Microchip Number</span>
                  <span className="font-mono text-neutral-700 bg-neutral-100 px-1.5 py-0.5 rounded text-[11px] font-bold">
                    {puppy.microchipNumber}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Registration</span>
                  <span className="text-neutral-700 font-semibold">{puppy.registrationDetails}</span>
                </div>
              </div>

              {/* Personality Paragraph */}
              <div className="border-t border-neutral-100 pt-4 space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">Personality Portfolio</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {puppy.personality}
                </p>
              </div>
            </div>

            {/* Vaccination History Timeline */}
            <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-lg font-bold text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
                <span>Vaccination & Health History</span>
              </h3>
              
              <div className="relative border-l border-[#C5A880]/30 ml-2.5 space-y-5 py-2 pl-6">
                {puppy.vaccinations.map((vac, idx) => (
                  <div key={idx} className="relative text-xs">
                    {/* Circle bullet */}
                    <span className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
                      vac.status === "Completed"
                        ? "bg-emerald-500 border-emerald-500"
                        : "bg-white border-[#C5A880]"
                    }`} />
                    <div className="flex justify-between items-start">
                      <span className={`font-bold ${vac.status === "Completed" ? "text-neutral-800" : "text-neutral-500"}`}>
                        {vac.vaccine}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold ${
                        vac.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                      }`}>
                        {vac.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-0.5">Date: {vac.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel & Delivery Calculator */}
            <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-lg font-bold text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#C5A880]" />
                <span>Adoption Delivery Logistics</span>
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Choose a luxury delivery package that fits your schedule. Our nannies hand-carry puppies exclusively inside airplane cabins.
              </p>

              <div className="space-y-3">
                {deliveryOptionsList.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                      deliveryOption.startsWith(opt.name.split(" (")[0])
                        ? "border-[#C5A880] bg-[#FDFBF7]"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery-option"
                      checked={deliveryOption.startsWith(opt.name.split(" (")[0])}
                      onChange={() => setDeliveryOption(`${opt.name} ($${opt.cost})`)}
                      className="accent-[#C5A880] mt-1"
                    />
                    <div>
                      <div className="flex justify-between text-xs font-bold text-neutral-800">
                        <span>{opt.name.split(" (")[0]}</span>
                        <span className="text-[#C5A880]">${opt.cost}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-1">Delivery timeframe: {opt.time}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Secure Reservation & Inquiry Panel */}
            <div className="bg-white rounded-3xl border border-[#C5A880]/15 p-6 sm:p-8 shadow-sm">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5" id="puppy-detail-form">
                  <div className="text-center space-y-1 mb-2">
                    <h3 className="font-serif text-lg font-bold text-neutral-800">Interested in {puppy.name}?</h3>
                    <p className="text-xs text-neutral-500">Submit an inquiry or holding deposit reservation below.</p>
                  </div>

                  {/* Toggle Mode */}
                  <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-full">
                    <button
                      type="button"
                      onClick={() => setFormType("Reservation")}
                      className={`py-2 text-xs font-bold rounded-full transition cursor-pointer ${
                        formType === "Reservation" ? "bg-[#C5A880] text-white shadow-xs" : "text-neutral-500 hover:text-neutral-700"
                      }`}
                    >
                      Reserve {puppy.name}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormType("Inquiry")}
                      className={`py-2 text-xs font-bold rounded-full transition cursor-pointer ${
                        formType === "Inquiry" ? "bg-[#C5A880] text-white shadow-xs" : "text-neutral-500 hover:text-neutral-700"
                      }`}
                    >
                      Ask a Question
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Johnathan Sterling"
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="(555) 019-2834"
                          className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] outline-none"
                        />
                      </div>
                    </div>

                    {formType === "Reservation" && (
                      <div className="p-3 bg-[#FDFBF7] border border-[#C5A880]/20 rounded-xl space-y-2">
                        <div className="flex justify-between text-xs font-bold text-neutral-800">
                          <span>Holding Deposit:</span>
                          <span className="text-[#C5A880]">${puppy.depositAmount}</span>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-500">
                          <span>Delivery (Estimated):</span>
                          <span>+${currentDeliveryCost}</span>
                        </div>
                        <div className="border-t border-neutral-100 pt-1.5 flex justify-between text-xs font-bold text-neutral-800">
                          <span>Total Holding Sum:</span>
                          <span className="text-emerald-600">${(puppy.depositAmount + currentDeliveryCost).toLocaleString()}</span>
                        </div>
                        <p className="text-[9px] text-neutral-400 leading-normal">
                          *The holding deposit securely guarantees this puppy is taken offline for you. Refunded fully if your veterinary review is not approved.
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                        {formType === "Reservation" ? "Additional Notes or Preferences" : "Your Message / Question"}
                      </label>
                      <textarea
                        rows={3}
                        value={clientMessage}
                        onChange={(e) => setClientMessage(e.target.value)}
                        placeholder={formType === "Reservation" ? "Tell us briefly about your home environment, other pets..." : "Enter your specific health or heritage questions here..."}
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-neutral-800 text-white rounded-full text-xs font-extrabold tracking-wide hover:bg-neutral-900 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-neutral-950/10"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                    <span>{formType === "Reservation" ? "Submit Reservation Request" : "Send Inquiry Message"}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Secure adoption processor. Zero spam guarantee.</span>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6 animate-fade-in" id="reservation-success">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10 stroke-2" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-neutral-800">Request Received</h3>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                      Thank you! Your adoption portfolio application has been securely transmitted. A Royal Yorkie Elite consultant will contact you via phone or email within 1-2 hours.
                    </p>
                  </div>

                  {/* Next Steps box */}
                  <div className="bg-emerald-50/50 border border-emerald-500/10 rounded-2xl p-4 text-left space-y-3">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Next Adoption Steps:</h4>
                    <ol className="text-[11px] text-neutral-600 list-decimal pl-4 space-y-1.5 leading-relaxed">
                      <li><strong>Availability Check:</strong> We will review your application to verify kennel safety.</li>
                      <li><strong>Identity Check:</strong> A brief 5-minute telephone consultation will occur.</li>
                      <li><strong>Secure Invoice:</strong> An official AKC agreement and payment link will be sent.</li>
                      <li><strong>Travel Logistics:</strong> Pickup coordinates or flight nanny schedules are finalized.</li>
                    </ol>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 border border-neutral-200 text-neutral-600 hover:text-neutral-800 bg-white rounded-full text-xs font-bold transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
