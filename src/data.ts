import BENEFIT_TYPES_JSON from "./content/benefitTypes.json";
import CORE_BENEFITS_JSON from "./content/coreBenefits.json";
import SERVICES_JSON from "./content/services.json";
import WORKFLOW_STEPS_JSON from "./content/workflow.json";
import TESTIMONIALS_JSON from "./content/testimonials.json";
import PARTNERS_JSON from "./content/partners.json";
import FAQS_JSON from "./content/faqs.json";
import GENERAL_JSON from "./content/general.json";

import { BenefitType, ServiceItem, TestimonialItem, FAQItem, PartnerBank } from "./types";

export const BENEFIT_TYPES = BENEFIT_TYPES_JSON as BenefitType[];
export const CORE_BENEFITS = CORE_BENEFITS_JSON as any[];
export const SERVICES = SERVICES_JSON as ServiceItem[];
export const WORKFLOW_STEPS = WORKFLOW_STEPS_JSON as any[];
export const TESTIMONIALS = TESTIMONIALS_JSON as TestimonialItem[];
export const PARTNERS = PARTNERS_JSON as PartnerBank[];
export const FAQS = FAQS_JSON as FAQItem[];
export const GENERAL = GENERAL_JSON;

