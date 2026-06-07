import { useState, useEffect, useRef } from "react";
import { SERVICES } from "../data";
import IconResolver from "./IconResolver";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServicesCarouselProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServicesCarousel({ onSelectService }: ServicesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenType, setScreenType] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const carouselRef = useRef<HTMLDivElement>(null);

  // Check screen size to determine layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenType("desktop");
      } else if (width >= 640) {
        setScreenType("tablet");
      } else {
        setScreenType("mobile");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Limit indices depending on the screen layout representation:
  // On Desktop: we show 3 items, so max starting index is length - 3 (idx 0, 1, 2)
  // On Tablet: we show 2 items, so max starting index is length - 2 (idx 0, 1, 2, 3)
  // On Mobile: we show 1 item, so max starting index is length - 1 (idx 0, 1, 2, 3, 4)
  const maxIndex = screenType === "desktop" 
    ? SERVICES.length - 3 
    : screenType === "tablet" 
      ? SERVICES.length - 2 
      : SERVICES.length - 1;

  // Keep currentIndex bounded if layout changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [screenType, maxIndex, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Drag offsets to support touch gestures
  const handleDragEnd = (_e: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  // Mathematically perfect slide translation accounting for gaps (gap-6 = 24px)
  // Displacement per step: Card Width + Gap
  // - Desktop: Card is Calc(33.333% - 16px). Displacement = 33.333% + 8px
  // - Tablet: Card is Calc(50% - 12px). Displacement = 50% + 12px
  // - Mobile: Card is 100%. Displacement = 100% + 24px
  const getTranslateValue = () => {
    if (currentIndex === 0) return "0px";
    if (screenType === "desktop") {
      return `calc(-${currentIndex * 33.333}% - ${currentIndex * 8}px)`;
    }
    if (screenType === "tablet") {
      return `calc(-${currentIndex * 50}% - ${currentIndex * 12}px)`;
    }
    return `calc(-${currentIndex * 100}% - ${currentIndex * 24}px)`;
  };

  return (
    <div className="w-full relative px-2 sm:px-6 lg:px-8 select-none py-4">
      {/* Outer viewport clip container */}
      <div className="overflow-visible" ref={carouselRef}>
        <motion.div
          className="flex gap-6 lg:gap-8 cursor-grab active:cursor-grabbing py-4"
          drag="x"
          dragConstraints={carouselRef}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          style={{ x: 0 }} // Managed via transform translation for maximum performance
          animate={{ x: getTranslateValue() }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              className={`relative overflow-hidden bg-brand-card hover:bg-brand-card-hover border border-brand-border rounded-2xl p-6 lg:p-8 flex flex-col justify-between items-start shrink-0 group transition-all duration-300 hover:border-brand-border-purple hover:shadow-lg ${
                screenType === "mobile" 
                  ? "w-full" 
                  : screenType === "tablet" 
                    ? "w-[calc(50%-0.75rem)]" 
                    : "w-[calc(33.333%-1rem)]"
              }`}
              style={{ contentVisibility: "auto" }}
            >
              {/* Premium instant-shimmer sweep highlight */}
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl z-0" aria-hidden="true">
                <div className="absolute top-0 -inset-y-0 -left-[100%] w-[60%] bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-20 transition-all duration-1000 ease-out group-hover:left-[180%]" />
              </div>

              <div className="w-full relative z-10">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/5 border border-brand-border-purple/30 flex items-center justify-center text-brand-purple mb-6 shadow-xs group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                  <IconResolver name={service.iconName} size={24} />
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-dark mb-3">
                  {service.title}
                </h4>
                <p className="text-brand-gray text-sm leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              <button
                id={`service-card-btn-${service.id}`}
                onClick={() => onSelectService(service.id)}
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-purple hover:text-brand-purple-light uppercase tracking-wider transition-colors cursor-pointer group-hover:translate-x-1 duration-200 relative z-10"
              >
                <span>Quero simular agora</span>
                <ArrowRight size={14} className="text-brand-purple" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Indicators & Controllers */}
      <div className="mt-8 flex items-center justify-between max-w-sm mx-auto sm:max-w-none px-2">
        {/* Carousel indicators dots */}
        <div className="flex gap-2" id="carousel-dots-container">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              id={`carousel-indicator-dot-${idx}`}
              onClick={() => setCurrentIndex(idx)}
              className="py-1 focus:outline-none cursor-pointer"
              aria-label={`Ir para o slide ${idx + 1}`}
            >
              <div
                className={`h-2 text-center rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-6 bg-brand-purple" : "w-2 bg-brand-border hover:bg-brand-purple/40"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Carousel direction triggers */}
        <div className="flex gap-2.5">
          <button
            onClick={prevSlide}
            type="button"
            id="carousel-btn-prev"
            className="w-10 h-10 border border-brand-border rounded-full bg-brand-card hover:bg-brand-purple/5 hover:border-brand-purple text-brand-purple flex items-center justify-center active:scale-95 transition-all duration-200 cursor-pointer shadow-xs"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            type="button"
            id="carousel-btn-next"
            className="w-10 h-10 border border-brand-border rounded-full bg-brand-card hover:bg-brand-purple/5 hover:border-brand-purple text-brand-purple flex items-center justify-center active:scale-95 transition-all duration-200 cursor-pointer shadow-xs"
            aria-label="Próximo slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
