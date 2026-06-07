import { useState, useEffect, useRef } from "react";
import { TESTIMONIALS } from "../data";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Autoplay rotation
  useEffect(() => {
    if (!isHovered) {
      autoplayTimer.current = setInterval(() => {
        nextTestimonial();
      }, 7000);
    }
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [isHovered, activeIndex]);

  // Framer Motion variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 }
      }
    })
  };

  const current = TESTIMONIALS[activeIndex];

  // Drag handlers
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (_e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      nextTestimonial();
    } else if (swipe > swipeConfidenceThreshold) {
      prevTestimonial();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-1 sm:px-4" id="testimonials-main-wrapper">
      {/* Testimonials Carousel Main Card Container */}
      <div 
        id="testimonials-card-viewport"
        className="relative overflow-visible md:min-h-[290px] min-h-[360px] xs:min-h-[300px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            id={`testimonial-active-bubble-${current.id}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            className="w-full bg-brand-card border-2 border-brand-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:border-brand-border-purple/50 transition-colors duration-300 relative flex flex-col justify-between cursor-grab active:cursor-grabbing select-none"
          >
            {/* Top row with stars and elegant quote sign */}
            <div className="flex justify-between items-start mb-4.5 sm:mb-6">
              <div className="flex gap-1" id={`testimonial-${current.id}-stars`}>
                {[...Array(current.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    <Star size={16} className="fill-[#C9A14A] text-[#C9A14A]" />
                  </motion.div>
                ))}
              </div>
              <Quote className="text-brand-purple/15 w-10 h-10 sm:w-12 sm:h-12 pointer-events-none" />
            </div>

            {/* Main Quote text body */}
            <p className="text-brand-dark text-sm sm:text-base md:text-lg italic leading-relaxed mb-6 sm:mb-8 font-medium">
              "{current.comment}"
            </p>

            {/* Author layout block */}
            <div className="flex items-center gap-4 border-t border-brand-border pt-4 sm:pt-6">
              <img
                src={current.avatarUrl}
                alt={current.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                id={`testimonial-avatar-${current.id}`}
                className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-brand-purple/20 bg-brand-bg shrink-0 shadow-sm"
              />
              <div className="text-left">
                <h4 className="font-serif text-[15px] sm:text-base font-extrabold text-brand-dark">
                  {current.name}
                </h4>
                <p className="text-xs text-brand-gray font-semibold font-sans mt-0.5">
                  {current.role} • <span className="text-brand-purple font-black">{current.location}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control row with dots tracker and physical action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8 max-w-lg mx-auto sm:max-w-none px-2" id="testimonial-controls-bar">
        {/* Pagination indicators (interactive bullets) */}
        <div className="flex items-center gap-2.5" id="testimonials-dots-container">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              id={`testimonial-indicator-dot-${idx}`}
              onClick={() => handleDotClick(idx)}
              className="py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-purple rounded"
              aria-label={`Ir para depoimento ${idx + 1}`}
            >
              <div 
                className={`h-2 text-center rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? "w-8 bg-brand-purple" 
                    : "w-2.5 bg-brand-border hover:bg-brand-gray/50"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Action arrow navigation selectors */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevTestimonial}
            id="testimonial-btn-prev"
            className="w-10 h-10 border border-brand-border rounded-full bg-brand-card hover:bg-brand-purple/5 hover:border-brand-purple text-brand-purple flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-purple"
            aria-label="Depoimento Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          
          <button
            onClick={nextTestimonial}
            id="testimonial-btn-next"
            className="w-10 h-10 border border-brand-border rounded-full bg-brand-card hover:bg-brand-purple/5 hover:border-brand-purple text-brand-purple flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-purple"
            aria-label="Próximo Depoimento"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
