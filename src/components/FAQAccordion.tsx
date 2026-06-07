import { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-3.5 text-left">
      {FAQS.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={`border rounded-xl transition-all duration-300 ${
              isOpen
                ? "border-brand-purple bg-brand-card shadow-sm"
                : "border-brand-border bg-brand-card hover:bg-brand-card-hover"
            }`}
          >
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-extrabold text-brand-dark cursor-pointer select-none transition-colors duration-200"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <HelpCircle
                  size={18}
                  className={`shrink-0 ${isOpen ? "text-brand-purple" : "text-brand-gray"}`}
                />
                <span className="font-serif text-[15px] sm:text-base leading-tight md:leading-normal">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-brand-purple shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-72 border-t border-brand-border" : "max-h-0"
              }`}
            >
              <div className="px-5 py-4 text-brand-gray text-sm leading-relaxed sm:text-[15px] font-medium">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
