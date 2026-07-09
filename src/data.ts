/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gender, AvailabilityStatus, SizeCategory, Puppy, BlogPost, Testimonial } from "./types";

export const INITIAL_PUPPIES: Puppy[] = [
  {
    id: "yorkie-001",
    name: "Winston",
    gender: Gender.Male,
    dob: "2026-05-15",
    ageWeeks: 8,
    expectedAdultWeight: "3.5 lbs",
    currentWeight: "1.2 lbs",
    color: "Traditional Blue & Gold",
    price: 4500,
    depositAmount: 500,
    status: AvailabilityStatus.Available,
    sizeCategory: SizeCategory.Teacup,
    personality: "Winston is a delightful, tiny gentleman. He loves to be cradled in your arms, has an incredibly sweet and mellow temperament, and is already showing excellent potty-training instincts. He is extremely gentle and gets along wonderfully with people and other small pets.",
    microchipNumber: "981022003847112",
    registrationDetails: "AKC Limited Registration (Full Show available upon request)",
    healthGuaranteeIncluded: true,
    photos: [
      "/src/assets/images/yorkie_winston_puppy_1783627374631.jpg",
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=800",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Mock video file that works
    vaccinations: [
      { vaccine: "DHPP First Dose (Distemper, Hepatitis, Parvovirus, Parainfluenza)", date: "2026-06-26", status: "Completed" },
      { vaccine: "Deworming Cycle 1 & 2", date: "2026-06-12", status: "Completed" },
      { vaccine: "DHPP Second Booster & Bordetella", date: "2026-07-15", status: "Scheduled" },
      { vaccine: "Rabies Vaccination", date: "2026-08-15", status: "Scheduled" }
    ],
    sire: {
      name: "Grand Champion Oliver IV",
      role: "Sire (Father)",
      weight: "3.2 lbs",
      color: "Blue & Tan Silky",
      registration: "AKC Champion Lineage (Show Champion)",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500",
      description: "Oliver is a multi-champion AKC title holder with a pristine triple-generation lineage. He is renowned for his luxurious silky blue-and-gold coat, compact short back, and proud stance."
    },
    dam: {
      name: "Lady Penelope of Royal York",
      role: "Dam (Mother)",
      weight: "4.5 lbs",
      color: "Black & Gold",
      registration: "AKC Registered High Pedigree",
      image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=500",
      description: "Penelope is our cherished family matriarch. She possesses a very calm, sweet, and nurturing demeanor, passing her incredible sweet face and sparkling dark eyes down to her offspring."
    },
    isFeatured: true
  },
  {
    id: "yorkie-002",
    name: "Bella",
    gender: Gender.Female,
    dob: "2026-05-18",
    ageWeeks: 8,
    expectedAdultWeight: "3.2 lbs",
    currentWeight: "1.0 lbs",
    color: "Gold & Dark Steel",
    price: 4800,
    depositAmount: 500,
    status: AvailabilityStatus.Available,
    sizeCategory: SizeCategory.Teacup,
    personality: "Bella is a stunning little princess who wears her beauty with charm. She is tiny but brave, has an inquisitive nature, and loves to explore her surroundings. She enjoys high-end plush squeaky toys and loves to curl up right under your chin for afternoon naps.",
    microchipNumber: "981022003847225",
    registrationDetails: "AKC Limited Registration Included",
    healthGuaranteeIncluded: true,
    photos: [
      "/src/assets/images/yorkie_bella_puppy_1783627386703.jpg",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800",
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=800"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    vaccinations: [
      { vaccine: "DHPP First Dose (Distemper, Hepatitis, Parvovirus, Parainfluenza)", date: "2026-06-29", status: "Completed" },
      { vaccine: "Deworming Cycle 1 & 2", date: "2026-06-15", status: "Completed" },
      { vaccine: "DHPP Second Booster & Bordetella", date: "2026-07-20", status: "Scheduled" }
    ],
    sire: {
      name: "Grand Champion Oliver IV",
      role: "Sire (Father)",
      weight: "3.2 lbs",
      color: "Blue & Tan Silky",
      registration: "AKC Champion Lineage",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500",
      description: "Oliver is a multi-champion AKC title holder with a pristine triple-generation lineage. He is renowned for his luxurious silky blue-and-gold coat, compact short back, and proud stance."
    },
    dam: {
      name: "Duchess Genevieve",
      role: "Dam (Mother)",
      weight: "4.8 lbs",
      color: "Dark Steel & Tan",
      registration: "AKC High Pedigree Registered",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=500",
      description: "Genevieve is an exceptionally graceful mother with an elegant movement. She has a loving soul, perfect posture, and deep black almond eyes."
    },
    isFeatured: true
  },
  {
    id: "yorkie-003",
    name: "Teddy",
    gender: Gender.Male,
    dob: "2026-05-20",
    ageWeeks: 7,
    expectedAdultWeight: "5.5 lbs",
    currentWeight: "1.5 lbs",
    color: "Gold & Blue-Steel",
    price: 3800,
    depositAmount: 400,
    status: AvailabilityStatus.Available,
    sizeCategory: SizeCategory.Toy,
    personality: "Teddy represents the classic 'teddy-bear' Yorkie face with his short snout, round doll eyes, and fluffy coat. He is remarkably playful and high-spirited! He'll bounce with joy when you enter the room, loves playing with balls, and is highly intelligent and quick to learn commands.",
    microchipNumber: "981022003847339",
    registrationDetails: "AKC Limited Registration Included",
    healthGuaranteeIncluded: true,
    photos: [
      "/src/assets/images/yorkie_teddy_puppy_1783627399897.jpg",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    vaccinations: [
      { vaccine: "DHPP First Dose (Distemper, Hepatitis, Parvovirus, Parainfluenza)", date: "2026-07-02", status: "Completed" },
      { vaccine: "Deworming Cycle 1", date: "2026-06-18", status: "Completed" },
      { vaccine: "DHPP Second Booster & Bordetella", date: "2026-07-23", status: "Scheduled" }
    ],
    sire: {
      name: "Grand Champion Oliver IV",
      role: "Sire (Father)",
      weight: "3.2 lbs",
      color: "Blue & Tan Silky",
      registration: "AKC Champion Lineage",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500",
      description: "Oliver is a multi-champion AKC title holder with a pristine triple-generation lineage. He is renowned for his luxurious silky blue-and-gold coat, compact short back, and proud stance."
    },
    dam: {
      name: "Lady Penelope of Royal York",
      role: "Dam (Mother)",
      weight: "4.5 lbs",
      color: "Black & Gold",
      registration: "AKC Registered High Pedigree",
      image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=500",
      description: "Penelope is our cherished family matriarch. She possesses a very calm, sweet, and nurturing demeanor, passing her incredible sweet face and sparkling dark eyes down to her offspring."
    },
    isFeatured: true
  },
  {
    id: "yorkie-004",
    name: "Chloe",
    gender: Gender.Female,
    dob: "2026-04-10",
    ageWeeks: 12,
    expectedAdultWeight: "4.8 lbs",
    currentWeight: "2.8 lbs",
    color: "Rich Tan & Blue-Steel",
    price: 4200,
    depositAmount: 500,
    status: AvailabilityStatus.Reserved,
    sizeCategory: SizeCategory.Toy,
    personality: "Chloe is a very intelligent, loving girl who is already crate-trained. She has a gorgeous silky coat and a brilliant square body shape. She is reserved for an wonderful family in Beverly Hills and will be travelling via our flight nanny service next week.",
    microchipNumber: "981022003847451",
    registrationDetails: "AKC Limited Registration",
    healthGuaranteeIncluded: true,
    photos: [
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=800",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    vaccinations: [
      { vaccine: "DHPP Dose 1 & 2 Completed", date: "2026-05-24", status: "Completed" },
      { vaccine: "Bordetella & Deworming Completed", date: "2026-06-07", status: "Completed" },
      { vaccine: "DHPP Third Final Booster Completed", date: "2026-06-28", status: "Completed" }
    ],
    sire: {
      name: "Grand Champion Oliver IV",
      role: "Sire (Father)",
      weight: "3.2 lbs",
      color: "Blue & Tan Silky",
      registration: "AKC Champion Lineage",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500",
      description: "Oliver is a multi-champion AKC title holder with a pristine triple-generation lineage. He is renowned for his luxurious silky blue-and-gold coat, compact short back, and proud stance."
    },
    dam: {
      name: "Duchess Genevieve",
      role: "Dam (Mother)",
      weight: "4.8 lbs",
      color: "Dark Steel & Tan",
      registration: "AKC High Pedigree Registered",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=500",
      description: "Genevieve is an exceptionally graceful mother with an elegant movement. She has a loving soul, perfect posture, and deep black almond eyes."
    }
  },
  {
    id: "yorkie-005",
    name: "Duchess",
    gender: Gender.Female,
    dob: "2026-03-01",
    ageWeeks: 18,
    expectedAdultWeight: "3.4 lbs",
    currentWeight: "3.0 lbs",
    color: "Gold & Silver-Blue",
    price: 5200,
    depositAmount: 500,
    status: AvailabilityStatus.Sold,
    sizeCategory: SizeCategory.Teacup,
    personality: "Duchess has found her forever castle! She was our smallest darling from the Spring litter, boasting a magnificent bright silver and deep gold coat. She is now happily spoiled and living her best life in Manhattan, New York.",
    microchipNumber: "981022003847550",
    registrationDetails: "AKC Limited Registration",
    healthGuaranteeIncluded: true,
    photos: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    vaccinations: [
      { vaccine: "All Puppy Series DHPP & Rabies Complete", date: "2026-06-15", status: "Completed" }
    ],
    sire: {
      name: "Grand Champion Oliver IV",
      role: "Sire (Father)",
      weight: "3.2 lbs",
      color: "Blue & Tan Silky",
      registration: "AKC Champion Lineage",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500",
      description: "Oliver is a multi-champion AKC title holder with a pristine triple-generation lineage. He is renowned for his luxurious silky blue-and-gold coat, compact short back, and proud stance."
    },
    dam: {
      name: "Duchess Genevieve",
      role: "Dam (Mother)",
      weight: "4.8 lbs",
      color: "Dark Steel & Tan",
      registration: "AKC High Pedigree Registered",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=500",
      description: "Genevieve is an exceptionally graceful mother with an elegant movement. She has a loving soul, perfect posture, and deep black almond eyes."
    }
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Bringing Your Yorkie Puppy Home: The Ultimate 48-Hour Guide",
    category: "Care",
    summary: "The first 48 hours in a new home are critical for a tiny Yorkshire Terrier. Learn how to create a secure environment, maintain their delicate blood sugar levels, and establish a loving sleep routine.",
    content: `Welcoming a new Yorkshire Terrier puppy into your home is an incredibly exciting milestone, but it is also a time of major transition for a dog that may weigh less than two pounds. In this guide, we lay out the precise steps to ensure your Yorkie's first two days are calm, safe, and positive.

### 1. Guarding Against Hypoglycemia (Crucial!)
Because of their tiny size, teacup and toy Yorkie puppies have very small glycogen reserves in their livers. Stress, missing a meal, or excessive play can trigger a dangerous drop in blood sugar (hypoglycemia). 
- **Action Step:** Keep a tube of Nutri-Cal or pure organic maple syrup on hand. Give a small, pea-sized bead on their tongue immediately upon arrival and every 6 hours during the first day.
- **Feeding schedule:** Ensure they have access to dry food 24/7 or feed them highly digestible wet food every 3 to 4 hours.

### 2. Setting Up Their 'Puppy Palace'
Do not give your tiny Yorkie free run of the house immediately. It is overwhelming and dangerous.
- **Set up a designated playpen** (such as a metal exercise pen) in a warm, draft-free room.
- Place a plush, high-walled bed, their food and water bowls, and a few washable puppy pads inside.
- This creates a secure "den" where they can feel safe and rest without risk of falling off furniture or swallowing small items.

### 3. Establishing a Sound Sleeping Routine
Your puppy will likely cry the first night as they miss their littermates.
- Place their crate or playpen near your bed so they can hear your breathing and be comforted by your proximity.
- Wrap a warm water bottle or a mechanical ticking-heart beat toy in a soft towel and place it in their bed to simulate their siblings' warmth.
- Maintain a strict lights-out schedule, letting them out only for a quiet, boring potty break if they whine late at night.`,
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=600",
    author: "Elena Richardson (Senior Vet Technician)",
    date: "July 2, 2026"
  },
  {
    id: "blog-2",
    title: "The Golden Rules of Yorkshire Terrier Nutrition & Feeding",
    category: "Feeding",
    summary: "What should your premium Yorkie puppy eat? Discover the ideal protein-to-fat ratios, feeding schedules for teacup sizes, and dangerous human foods to keep far away from their bowls.",
    content: `Yorkshire Terriers are energetic, high-metabolism dogs wrapped in a tiny package. Feed them premium fuel to maintain their gorgeous, silky coats and sustain their active minds.

### What Makes a Premium Yorkie Kibble?
Look for a high-quality dry kibble specifically formulated for toy or extra-small breed puppies.
- **First Ingredient:** Must be a high-quality real animal protein (such as deboned chicken, turkey, or wild-caught salmon). Avoid generic meat by-products or heavy fillers like corn and wheat, which can upset their sensitive digestion.
- **Fat content:** Healthy fats like Omega-3 and Omega-6 fatty acids (found in salmon oil and flaxseed) are absolute necessities to nourish their trademark silky hair from the inside out.
- **Kibble Size:** The kibble must be micro-sized so their tiny jaws can easily crush it and prevent choking hazards.

### Feeding Schedule By Age
- **Under 4 months:** Free-choice feeding is highly recommended. Keep a fresh bowl of dry food accessible at all times to prevent hypoglycemia.
- **4 to 8 months:** Transition to three measured meals per day (Morning, Mid-day, and Evening).
- **Over 8 months:** Two balanced meals per day are perfect for an adult Yorkie.

### Harmful Foods to Avoid
Never, under any circumstances, feed your Yorkie:
1. Grapes or Raisins (can trigger sudden acute kidney failure)
2. Onions and Garlic (destroys red blood cells leading to anemia)
3. Chocolate, Caffeine, or Xylitol sweetener (highly toxic)`,
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600",
    author: "Dr. Marcus Vance (DVM, Veterinary Partner)",
    date: "June 25, 2026"
  },
  {
    id: "blog-3",
    title: "Mastering the Show-Coat: Grooming Secrets from the Pros",
    category: "Grooming",
    summary: "Yorkshire Terriers have hair, not fur! Explore the daily brushing protocols, bath-time routines, and top-knot styling techniques to keep your pup's coat flowing and tangle-free.",
    content: `Unlike most dogs who have double fur coats, the Yorkshire Terrier boasts a single, fine layer of hair that grows continuously, much like human hair. This means they are hypoallergenic and do not shed, but it also requires a dedicated grooming routine.

### Daily Brushing Protocol
To prevent matting and tangles, spend 5 minutes every day brushing your Yorkie.
- **Never brush a dry coat!** Spritz the hair lightly with a professional detangling or conditioning spray first. Brushing dry hair causes breakage and static.
- Use a high-quality **pin brush** (without balls on the pins, which tear the hair) to gently comb through from the ends up to the roots.
- Follow up with a fine-toothed metal greyhound comb to find and gently slide out any small micro-knots behind the ears and in the armpits.

### Bath Time Success
A clean Yorkie is a happy, beautiful Yorkie! Bathing should occur every 2 to 3 weeks.
1. **The Prep:** Always brush out the hair *completely* before getting it wet. Water will lock existing tangles into tight, felted mats.
2. **The Wash:** Use a premium, moisturizing dog shampoo diluted in warm water. Massage gently in a downward direction—never scrub in circles, which creates tangles.
3. **The Condition:** Apply a rich silk-protein conditioner, let it sit for 3 minutes, then rinse thoroughly.
4. **The Blow-Dry:** Squeeze water out with a microfiber towel (no rubbing!). Blow-dry on warm/low while brushing in a downward motion to achieve that flat, glass-like silky shine.`,
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600",
    author: "Elena Richardson (Senior Vet Technician)",
    date: "May 18, 2026"
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "The Sterling Family",
    location: "Beverly Hills, CA",
    text: "Working with Royal Yorkies Boutique was an absolute dream. From our first call, we felt so secure. Winston (formerly Archie) arrived via flight nanny in perfect health, so sweet and pre-socialized. He is the light of our household and our vet was thoroughly impressed with his pristine health records!",
    rating: 5,
    puppyName: "Winston",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=300",
    date: "June 20, 2026"
  },
  {
    id: "t-2",
    name: "Victoria & David M.",
    location: "Manhattan, NY",
    text: "We are obsessed with our teacup girl, Duchess. She is truly a masterpiece—perfect posture, incredibly silky hair, and so smart. The transition process was luxury concierge level. They walked us through feeding schedules, grooming, and checked in multiple times. If you want a healthy, premium Yorkie, this is the only breeder to trust.",
    rating: 5,
    puppyName: "Duchess",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=300",
    date: "May 12, 2026"
  },
  {
    id: "t-3",
    name: "Alistair & Clara P.",
    location: "Dallas, TX",
    text: "Our boy Teddy has brought so much joy! He is robust, hilarious, and gorgeous. The ethical standards here are remarkable—we saw photos of the nursery and the parent pedigree charts. Our puppy was already used to household noises and grooming before he came to us. 10/10 service!",
    rating: 5,
    puppyName: "Teddy",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=300",
    date: "July 1, 2026"
  }
];

export const FAQS = [
  {
    id: "faq-1",
    question: "Are your puppies fully vaccinated and microchipped?",
    answer: "Yes, absolutely. All our puppies receive an extensive veterinary examination before leaving. They are microchipped with a lifetime-activated ISO chip and are up-to-date on their age-appropriate vaccinations (DHPP) and deworming. You will receive an official health booklet signed by our partnering veterinarian clinic upon adoption."
  },
  {
    id: "faq-2",
    question: "Do you offer delivery options, and how does it work?",
    answer: "We offer secure, hand-to-hand delivery options across the country. You can choose: 1) VIP Flight Nanny Service, where a professional nanny keeps your puppy in-cabin and delivers them directly to you at your local airport's baggage claim. 2) Private Climate-Controlled Ground Transport, or 3) In-person pickup at our private estate nursery. All travel is fully insured and meticulously planned for puppy comfort."
  },
  {
    id: "faq-3",
    question: "How do I reserve a Yorkie puppy?",
    answer: "To reserve a puppy, browse our available listings and click 'Reserve Now' or fill out our reservation form. This registers your application. Once we review and confirm compatibility (usually within a few hours), we will contact you to collect a secure holding deposit (typically $400-$500). Once the deposit is received, the puppy's status is officially updated to 'Reserved' for you!"
  },
  {
    id: "faq-4",
    question: "What health guarantee is included with the adoption?",
    answer: "We stand firmly behind the health of our puppies. Every puppy is backed by a binding 10-Year Genetic Health Guarantee. This covers any severe life-threatening congenital or hereditary defects. Additionally, we provide a 72-hour viral guarantee, allowing you to have the puppy evaluated by your personal veterinarian after arrival."
  },
  {
    id: "faq-5",
    question: "What food does the puppy currently eat?",
    answer: "Our puppies are raised on a premium, ultra-nutrition grain-free puppy kibble specifically designed for extra-small breeds, enriched with fresh organic goat's milk and Omega oils. When you adopt, we send a generous 'Welcome Kit' containing a 5-lb bag of their current food, detailed portion guides, a feeding schedule sheet, and a bottle of immune-boosting veterinary supplements."
  },
  {
    id: "faq-6",
    question: "What payment methods do you accept for secure reservation?",
    answer: "For your safety and ours, we accept major credit cards (Visa, Mastercard, American Express), bank wire transfers, Apple Pay, and secure online merchant payments. We do not accept high-risk anonymous methods. All financial transactions are fully documented with an official sales invoice and adoption contract."
  }
];
