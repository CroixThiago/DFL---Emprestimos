import { useState } from "react";
import { TESTIMONIALS } from "../data";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Grid Layout on Desktop / Carousel-style on Mobile & Tablet */}
      <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8 text-left">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="bg-brand-card border border-brand-border rounded-2xl p-6 lg:p-8 shadow-sm hover:border-brand-border-purple hover:bg-brand-card-hover transition-all duration-300 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#C9A14A] text-[#C9A14A]" />
                ))}
              </div>
              <p className="text-brand-gray text-[14px] lg:text-base italic leading-relaxed mb-6 font-medium">
                "{t.comment}"
              </p>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <img
                src={t.avatarUrl}
                alt={t.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-brand-border-purple/30 bg-brand-bg"
              />
              <div>
                <h4 className="font-serif text-[15px] font-bold text-brand-dark">
                  {t.name}
                </h4>
                <p className="text-xs text-brand-gray font-normal">
                  {t.role} • <span className="text-brand-purple font-bold">{t.location}</span>
                </p>
              </div>
            </div>

            <Quote className="absolute right-6 bottom-6 text-brand-purple/10 w-12 h-12 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Mobile/Tablet Slider */}
      <div className="block md:hidden pb-4 text-left">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-sm relative min-h-[250px] flex flex-col justify-between">
          <div>
            <div className="flex gap-1 mb-3">
              {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-[#C9A14A] text-[#C9A14A]" />
              ))}
            </div>
            <p className="text-brand-gray text-sm italic leading-relaxed mb-6 font-medium">
              "{TESTIMONIALS[activeIndex].comment}"
            </p>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={TESTIMONIALS[activeIndex].avatarUrl}
              alt={TESTIMONIALS[activeIndex].name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-brand-border-purple/30 bg-brand-bg"
            />
            <div>
              <h4 className="font-serif text-sm font-bold text-brand-dark">
                {TESTIMONIALS[activeIndex].name}
              </h4>
              <p className="text-xs text-brand-gray font-normal font-sans">
                {TESTIMONIALS[activeIndex].role} • <span className="text-brand-purple font-bold">{TESTIMONIALS[activeIndex].location}</span>
              </p>
            </div>
          </div>

          <Quote className="absolute right-5 bottom-5 text-brand-purple/10 w-10 h-10 pointer-events-none" />
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            onClick={prevTestimonial}
            className="p-2 border border-brand-border rounded-full bg-brand-card hover:bg-brand-bg text-brand-purple active:scale-90 transition-transform cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-brand-gray font-bold">
            {activeIndex + 1} de {TESTIMONIALS.length}
          </span>
          <button
            onClick={nextTestimonial}
            className="p-2 border border-brand-border rounded-full bg-brand-card hover:bg-brand-bg text-brand-purple active:scale-90 transition-transform cursor-pointer"
            aria-label="Próximo"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
