import React, { useState, useEffect } from "react";
import { Menu, X, Phone, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Por que DFL", href: "#por-que-dfl" },
    { label: "Serviços", href: "#servicos" },
    { label: "Calculadora", href: "#calculadora" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Dúvidas", href: "#faq" }
  ];

  const handleScrollToSimulate = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById("simulation-box");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transform-gpu translate-z-0 will-change-[padding] transition-[padding] duration-200 ${
          scrolled
            ? "bg-[#120822] shadow-lg py-3.5 border-b border-white/10"
            : "bg-[#120822]/35 backdrop-blur-sm py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#" className="flex items-center group" aria-label="DFL Consignado - Ir para o topo">
            <img 
              src="/images/logo.svg" 
              alt="DFL Consignado Logo"
              referrerPolicy="no-referrer"
              className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Menu Principal">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-extrabold transition-colors duration-200 uppercase tracking-wider text-stone-200 hover:text-brand-gold-accent focus:outline-none focus:ring-2 focus:ring-brand-gold-accent rounded-sm px-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://wa.me/5511934554478"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-extrabold transition-colors duration-200 text-stone-200 hover:text-brand-gold-accent focus:outline-none focus:ring-2 focus:ring-brand-gold-accent rounded px-1"
              aria-label="Ligar para (11) 93455-4478 ou abrir conversa no WhatsApp"
            >
              <Phone size={15} className="text-brand-gold-accent" />
              <span>(11) 93455-4478</span>
            </a>

            <a
              href="#simulation-box"
              onClick={handleScrollToSimulate}
              className="px-5 py-2.5 font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer bg-brand-gold text-brand-dark hover:bg-brand-gold-accent focus:outline-none focus:ring-2 focus:ring-brand-gold-accent"
              aria-label="Simular empréstimo consignado grátis"
            >
              <span>Simular Agora</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-3">
            {!mobileMenuOpen && (
              <a
                href="#simulation-box"
                onClick={handleScrollToSimulate}
                className="px-3.5 py-2 font-black text-xs uppercase tracking-wider rounded-lg transition-transform active:scale-95 text-center flex items-center gap-1 cursor-pointer bg-brand-gold text-brand-dark"
                aria-label="Simular crédito"
              >
                <span>Simular</span>
              </a>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-brand-gold-accent rounded cursor-pointer text-white"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} className="text-brand-gold-accent" /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#120822] flex flex-col justify-between p-6 lg:hidden pt-24 animate-fade-in transition-all duration-300" role="dialog" aria-modal="true" aria-label="Menu de Navegação Móvel">
          <div className="flex flex-col gap-6 text-left">
            <div className="text-xs uppercase tracking-widest text-[#E8C670] font-extrabold border-b border-white/10 pb-2">
              Navegação DFL
            </div>
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl font-black text-white hover:text-brand-gold-accent focus:outline-none focus:ring-2 focus:ring-brand-gold-accent px-1"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 justify-center">
              <ShieldCheck className="text-brand-gold-accent" size={20} />
              <span className="text-xs text-stone-200 font-extrabold font-sans">Empresa 100% segura e regulada</span>
            </div>
            <a
              href="https://wa.me/5511934554478"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-black text-center rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors border border-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Entrar em contato pelo WhatsApp seguro"
            >
              <Phone size={18} />
              Atendimento WhatsApp
            </a>
            <a
              href="#simulation-box"
              onClick={handleScrollToSimulate}
              className="w-full py-4 bg-brand-gold text-brand-dark font-black text-center rounded-xl flex items-center justify-center gap-2 shadow-md hover:bg-brand-gold-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold-accent"
              aria-label="Iniciar simulação gratuita de crédito"
            >
              Simular Agora Grátis
            </a>
          </div>
        </div>
      )}
    </>
  );
}
