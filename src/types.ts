/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum AvailabilityStatus {
  Available = "Available",
  Reserved = "Reserved",
  Sold = "Sold",
}

export enum SizeCategory {
  Teacup = "Teacup (3-4 lbs adult)",
  Toy = "Toy (5-7 lbs adult)",
}

export interface ParentInfo {
  name: string;
  role: "Sire (Father)" | "Dam (Mother)";
  weight: string;
  color: string;
  registration: string;
  image: string;
  description: string;
}

export interface VaccinationRecord {
  vaccine: string;
  date: string;
  status: "Completed" | "Scheduled";
}

export interface Puppy {
  id: string;
  name: string;
  gender: Gender;
  dob: string;
  ageWeeks: number;
  expectedAdultWeight: string;
  currentWeight: string;
  color: string;
  price: number;
  depositAmount: number;
  status: AvailabilityStatus;
  sizeCategory: SizeCategory;
  personality: string;
  microchipNumber: string;
  registrationDetails: string;
  healthGuaranteeIncluded: boolean;
  photos: string[];
  videoUrl?: string;
  vaccinations: VaccinationRecord[];
  sire: ParentInfo;
  dam: ParentInfo;
  isFeatured?: boolean;
}

export interface Inquiry {
  id: string;
  puppyId?: string;
  puppyName?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  message: string;
  type: "Inquiry" | "Reservation";
  status: "Pending" | "Approved" | "Contacted" | "Completed";
  date: string;
  deliveryOption?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: "Care" | "Feeding" | "Grooming" | "Training" | "Health";
  summary: string;
  content: string;
  readTime: string;
  image: string;
  author: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  puppyName: string;
  image: string;
  date: string;
}
