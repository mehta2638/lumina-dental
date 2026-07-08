import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  priceFrom: number;
  image?: string;
  featured?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  service: string;
}

export interface Advantage {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface Case {
  id: string;
  title: string;
  before: string;
  after: string;
}
