export interface ServiceItem {
  id: string;
  letter: 'A' | 'B' | 'C' | 'D';
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  whatsappMessage: string;
}

export interface ProjectSolution {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  challengeSolved: string;
  tools: string[];
  features: string[];
  metrics: { label: string; value: string }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  reason: string;
  message: string;
  acceptPrivacyPolicy: boolean;
  acceptCommercialCommunications: boolean;
}

export interface FormErrors {
  name?: string;
  email?: string;
  reason?: string;
  message?: string;
  acceptPrivacyPolicy?: string;
}
