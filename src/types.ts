export interface BenefitType {
  id: string;
  name: string;
  minRate: number;
  maxMonths: number;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PartnerBank {
  id: string;
  name: string;
  logo: string;
}

export interface SimulationResult {
  installments: number;
  installmentValue: number;
  totalInterest: number;
  totalCost: number;
  monthlyRate: number;
}
