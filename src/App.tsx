import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Zap, 
  TrendingDown, 
  HeartHandshake, 
  FileCheck2, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Award,
  Clock,
  Star,
  X
} from "lucide-react";
import { CORE_BENEFITS, SERVICES, WORKFLOW_STEPS, PARTNERS } from "./data";
import Header from "./components/Header";
import HeroCanvas from "./components/HeroCanvas";
import SimulateForm from "./components/SimulateForm";
import FAQAccordion from "./components/FAQAccordion";
import TestimonialsSection from "./components/TestimonialsSection";
import IconResolver from "./components/IconResolver";
import InteractiveCalculator from "./components/InteractiveCalculator";
import ServicesCarousel from "./components/ServicesCarousel";
import EconomyCalculator from "./components/EconomyCalculator";
import AccessibilityToolbar from "./components/AccessibilityToolbar";
import { trackLeadSubmission } from "./utils/analytics";
import { AssetPartner } from "./components/AssetFactory";

export default function App() {
  const [selectedSimType, setSelectedSimType] = useState("inss");
  const [isMobile, setIsMobile] = useState(false);
  const [showFloatingToast, setShowFloatingToast] = useState(false);
  const [detectedCity, setDetectedCity] = useState("São Paulo e Região");

  // Hook de detecção inteligente de Cidade (IP-api com fallback de HTML5 Geo)
  useEffect(() => {
    const cachedCity = sessionStorage.getItem("dfl-detected-city");
    if (cachedCity) {
      setDetectedCity(cachedCity);
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((res) => {
        if (!res.ok) throw new Error("Erro api IP");
        return res.json();
      })
      .then((data) => {
        if (data && data.city) {
          const cityString = `${data.city} - ${data.region_code || "SP"}`;
          setDetectedCity(cityString);
          sessionStorage.setItem("dfl-detected-city", cityString);
        }
      })
      .catch(() => {
        // Fallback para Geolocation API caso o IP lookup esteja indisponível
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            () => {
              setDetectedCity("São Paulo e Região");
            },
            () => {
              setDetectedCity("São Paulo e Região");
            },
            { timeout: 3000 }
          );
        }
      });
  }, []);

  useEffect(() => {
    const checkDim = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkDim();
    window.addEventListener("resize", checkDim);
    return () => window.removeEventListener("resize", checkDim);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("dfl-toast-dismissed");
      if (!dismissed) {
        setShowFloatingToast(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const { scrollY } = useScroll();
  const yHeroContent = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 80]);
  const opacityHeroContent = useTransform(scrollY, [0, 450], [1, isMobile ? 1 : 0.45]);

  const scrollToSimulation = (benefitId: string) => {
    setSelectedSimType(benefitId);
    const element = document.getElementById("simulation-box");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleWhatsappDirect = () => {
    trackLeadSubmission(); // Log event click analytics
    const message = encodeURIComponent(
      "Olá, DFL Consignado! Gostaria de conversar com um especialista sobre as melhores propostas de crédito para mim."
    );
    window.open(`https://wa.me/5511934554478?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark overflow-x-hidden selection:bg-brand-gold/30 selection:text-brand-gold font-sans transition-colors duration-250">
      {/* Painel Flutuante de Acessibilidade Extrema (Alt+C para testar) */}
      <AccessibilityToolbar />

      {/* Dynamic Navigation Bar */}
      <Header />

      {/* Área Principal do Site - Semântica para leitores de tela e SEO */}
      <main id="main-content">
        {/* Descrição em áudio oculta para Usuários de Visão Zero (Zero Vision First) */}
        <div className="sr-only">
          <h1>DFL Consignado - Plataforma Acessível de Empréstimos</h1>
          <p>
            Você está navegando no site oficial da DFL Consignado. Este site foi totalmente otimizado para navegação sem barreiras, 
            sendo compatível com leitores de tela como NVDA e JAWS. 
            Você pode pressionar ALT + C a qualquer momento para ativar o alto contraste, ou ALT + + para aumentar o tamanho do texto.
            O cabeçalho inicial contém links rápidos para pular direto ao simulador de taxas.
          </p>
        </div>

        {/* Hero Section */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-34 pb-12 sm:pt-38 sm:pb-16 px-4 md:px-8 bg-gradient-to-br from-[#1C0B32] via-[#2D164B] to-[#120822] overflow-hidden border-b border-brand-border">
        {/* Animated geometric background particles filling the full parent container */}
        <HeroCanvas />

        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-purple-light/20 blur-[150px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Hero Left Content */}
          <motion.div
            style={{ y: yHeroContent, opacity: opacityHeroContent }}
            className="lg:col-span-7 flex flex-col items-start text-white text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mb-6"
            >
              <ShieldCheck className="text-brand-gold-accent" size={16} />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-100">
                Correspondente Autorizado Oficial • São Paulo e Região
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-white"
            >
              Empréstimo Consignado em <span className="text-brand-gold-accent underline decoration-brand-gold/50 decoration-2 underline-offset-4">{detectedCity}</span> seguro, rápido e transparente
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-stone-200 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-8 max-w-2xl"
            >
              Dinheiro seguro na sua conta com as menores taxas do mercado, atendimento com respeito e sem qualquer complicação. Atendemos aposentados e pensionistas do INSS, servidores públicos e liberação de saldo do FGTS.
            </motion.p>

            {/* Desktop CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6"
            >
              <a
                href="#simulation-box"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSimulation("inss");
                }}
                className="px-8 py-4.5 bg-[#E8C670] hover:bg-[#D4A13A] text-[#120822] font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl border border-yellow-200/25 shadow-[0_8px_24px_rgba(232,198,112,0.3)] hover:scale-102 active:scale-98 transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Simular Agora Grátis
              </a>

              <button
                onClick={handleWhatsappDirect}
                className="px-8 py-4.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl border border-emerald-500/25 shadow-[0_8px_24px_rgba(16,185,129,0.3)] hover:scale-102 active:scale-98 transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone size={18} className="text-white" />
                Fale pelo WhatsApp
              </button>
            </motion.div>

            {/* Sub-label trust indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-bold text-stone-300"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-brand-gold-accent" />
                <span>Simulação 100% gratuita</span>
              </div>
              <div className="hidden sm:block text-stone-500">•</div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-brand-gold-accent" />
                <span>Sem qualquer taxa antecipada</span>
              </div>
              <div className="hidden sm:block text-stone-500">•</div>
              <div className="flex items-center gap-1.5">
                <Phone size={15} className="text-brand-gold-accent" />
                <span>Contato: <strong className="text-white hover:underline">(11) 93455-4478</strong></span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right Calculator Mockup */}
          <div className="lg:col-span-5 w-full max-w-xl mx-auto lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full"
            >
              <SimulateForm initialBenefitId={selectedSimType} />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Security & Compliance Grayscale Trust Strip */}
      <section 
        className="bg-brand-card/90 dark:bg-[#1a0e30]/95 border-y border-brand-border/80 py-4 sm:py-5 px-4 md:px-8 shadow-xs relative z-10 transition-colors"
        aria-label="Informações de Segurança, Proteção de Dados e Conformidade Bancária"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="text-[9px] uppercase font-black tracking-widest text-[#4C2A7A] dark:text-brand-gold-accent select-none bg-brand-purple/5 dark:bg-white/5 px-3 py-1 rounded">
              Conformidade Bacen
            </span>
            <p className="text-[11px] sm:text-xs text-brand-gray dark:text-stone-300 font-bold leading-snug">
              Correspondente Certificado oficial atuando sob estritas regras da Resolução CMN nº 4.935.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {/* Banco Central logo seal proxy */}
            <div className="flex items-center gap-2.5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 select-none cursor-help" title="Empresa legalmente habilitada junto ao BC">
              <ShieldCheck className="text-brand-purple dark:text-[#E8C670]" size={19} />
              <div className="text-left font-serif">
                <span className="block text-[8px] uppercase tracking-widest text-stone-500 font-bold leading-none">Autorizado por</span>
                <span className="text-xs font-black text-stone-700 dark:text-stone-200">BANCO CENTRAL</span>
              </div>
            </div>

            {/* LGPD Compliant safety proxy */}
            <div className="flex items-center gap-2.5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 select-none cursor-help" title="Seus dados estão protegidos sob os termos da lei 13.709">
              <CheckCircle2 className="text-brand-purple dark:text-[#E8C670]" size={19} />
              <div className="text-left font-serif">
                <span className="block text-[8px] uppercase tracking-widest text-stone-500 font-bold leading-none">Dados Seguros</span>
                <span className="text-xs font-black text-stone-700 dark:text-stone-200">LGPD COMPLIANT</span>
              </div>
            </div>

            {/* SSL Encrypted military encryption proxy */}
            <div className="flex items-center gap-2.5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 select-none cursor-help" title="Conexão com chaves de criptografia SSL de 256 bits">
              <Lock className="text-brand-purple dark:text-[#E8C670]" size={17} />
              <div className="text-left font-serif">
                <span className="block text-[8px] uppercase tracking-widest text-stone-500 font-bold leading-none">Segurança SSL</span>
                <span className="text-xs font-black text-stone-700 dark:text-stone-200">SSL ENCRYPTED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits Section */}
      <section className="py-10 md:py-20 bg-brand-bg px-4 md:px-8 border-b border-brand-border" id="por-que-dfl">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-brand-purple dark:text-brand-gold-accent mb-3">
              Credibilidade & Transparência
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark animate-fade-in">
              Por que milhares de pessoas confiam na DFL
            </h3>
            <p className="text-brand-gray text-base sm:text-lg mt-4 leading-relaxed font-semibold">
              Focados em entregar excelência no consignado de forma rápida e segura, mantendo o respeito e a clareza em cada atendimento.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="core-benefits-grid">
            {CORE_BENEFITS.map((benefit, i) => (
              <motion.div
                key={i}
                id={`benefit-card-${i}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-brand-card border border-brand-border rounded-xl p-6 lg:p-8 shadow-sm hover:border-brand-border-purple hover:bg-brand-card-hover hover:shadow-md transition-all duration-300 flex flex-col items-start group ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-purple/5 dark:bg-brand-gold-accent/10 border border-brand-border-purple/40 dark:border-brand-gold-accent/30 flex items-center justify-center text-brand-purple dark:text-brand-gold-accent mb-6 group-hover:bg-brand-purple dark:group-hover:bg-brand-gold group-hover:text-white dark:group-hover:text-brand-dark transition-all duration-300">
                  <IconResolver name={benefit.iconName} size={24} />
                </div>
                <h4 className="font-serif text-lg font-bold text-brand-dark mb-3">
                  {benefit.title}
                </h4>
                <p className="text-brand-gray text-sm sm:text-[15px] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-10 md:py-20 bg-brand-bg px-4 md:px-8 border-b border-brand-border" id="servicos">
        <div className="max-w-7xl mx-auto">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-brand-purple dark:text-brand-gold-accent mb-3">
              Soluções Sob Medida
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark animate-fade-in">
              O que podemos fazer por você
            </h3>
            <p className="text-brand-gray text-base mt-3 font-semibold">
              Escolha a opção ideal para as suas necessidades de crédito e resolva a sua simulação em poucos cliques.
            </p>
          </motion.div>

          <ServicesCarousel onSelectService={scrollToSimulation} />

        </div>
      </section>

      {/* Economia de Juros Consignado Calculator Component */}
      <EconomyCalculator />

      {/* Interactive Loan Rate and CET Calculator */}
      <InteractiveCalculator />

      {/* Workflow Section (How It Works) */}
      <section className="py-10 md:py-20 bg-brand-bg px-4 md:px-8 border-b border-brand-border" id="como-funciona">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-brand-purple dark:text-brand-gold-accent mb-3">
              Sem Complicação
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
              Simples assim. Em 4 passos:
            </h3>
            <p className="text-brand-gray text-base mt-2.5 font-semibold">
              Desenvolvemos um fluxo transparente e intuitivo para que o seu crédito consignado aconteça sem dor de cabeça.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" id="workflow-steps-grid">
            {WORKFLOW_STEPS.map((step, idx) => (
              <motion.div 
                key={idx}
                id={`workflow-step-${idx}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative flex flex-col items-start bg-brand-card p-6 rounded-2xl border border-brand-border shadow-sm flex-1 group hover:border-brand-border-purple/50 transition-all duration-300"
              >
                
                {/* Luxurious step number display */}
                <div className="font-serif text-4xl lg:text-5xl font-black text-brand-purple/20 dark:text-brand-gold-accent/20 mb-4 leading-none">
                  {step.number}
                </div>

                <h4 className="font-serif text-base sm:text-lg font-bold text-brand-dark mb-2">
                  {step.title}
                </h4>
                <p className="text-brand-gray text-xs sm:text-sm leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Desktop indicator link bubbles */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-[43%] -right-6 text-brand-purple dark:text-brand-gold-accent z-10 animate-pulse">
                    <ArrowRight size={18} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Stats Proof Numbers */}
      <section className="py-16 bg-gradient-to-r from-[#201035] to-[#2D164B] text-white border-y border-brand-border my-10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-gold mb-2">
                +20 Mil
              </div>
              <p className="text-xs sm:text-sm text-stone-300">Clientes atendidos com satisfação</p>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-gold mb-2 flex items-center justify-center gap-1">
                5.0 <Star className="fill-brand-gold text-brand-gold inline" size={20} />
              </div>
              <p className="text-xs sm:text-sm text-stone-300">Avaliação do público no Google</p>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-gold mb-2">
                100%
              </div>
              <p className="text-xs sm:text-sm text-stone-300">Segurança sob regras do Banco Central</p>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-gold mb-2">
                Desde 2018
              </div>
              <p className="text-xs sm:text-sm text-stone-300">Atendimento humanizado e confiável</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 md:py-20 bg-brand-bg px-4 md:px-8 border-b border-brand-border" id="depoimentos">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-brand-purple dark:text-brand-gold-accent mb-3">
              Quem Concluiu Recomenda
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
              O que nossos clientes estão dizendo
            </h3>
            <p className="text-brand-gray text-base mt-3 font-semibold">
              Nossa melhor publicidade é o depoimento sincero de quem obteve as menores taxas reais com comodidade e agilidade.
            </p>
          </div>

          <TestimonialsSection />

        </div>
      </section>

      {/* Partner Banks Logos */}
      <section className="py-10 md:py-16 bg-brand-bg px-4 md:px-8 border-b border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase font-extrabold tracking-widest text-brand-purple dark:text-brand-gold-accent mb-2">
              Principais Parceiros
            </p>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
              Trabalhamos em parceria com os maiores bancos do Brasil
            </h4>
          </div>

          <div className="relative w-full overflow-hidden flex items-center select-none">
            {/* Elegant fade edges using overlay gradients */}
            <div className="absolute top-0 left-0 bottom-0 w-20 sm:w-28 bg-gradient-to-r from-brand-bg dark:from-brand-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-20 sm:w-28 bg-gradient-to-l from-brand-bg dark:from-brand-dark to-transparent z-10 pointer-events-none" />
            
            <motion.div
              className="flex shrink-0 gap-6 sm:gap-8 py-4 px-2"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
            >
              {/* Duplicate list multiple times for seamless high-performance ticker */}
              {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, idx) => (
                <div
                  key={`${p.name}-${idx}`}
                  className="px-6 py-4 bg-brand-card hover:bg-[#4C2A7A]/5 border border-brand-border rounded-xl text-center transition-all duration-300 w-44 h-20 flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-105 shadow-xs hover:border-brand-border-purple group cursor-pointer shrink-0"
                  title={p.name}
                >
                  <AssetPartner
                    partnerId={p.id}
                    className="max-h-10 max-w-full object-contain filter brightness-100 contrast-100 dark:brightness-110 duration-300"
                    id={`partner-logo-${p.id}-${idx}`}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-10 md:py-20 bg-brand-bg px-4 md:px-8" id="faq">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-brand-purple dark:text-brand-gold-accent mb-3">
              Suas Dúvidas Respondidas
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
              Perguntas Frequentes
            </h3>
            <p className="text-brand-gray text-base mt-3 font-semibold">
              Ainda tem dúvidas? Veja as respostas para as perguntas mais comuns de nossos clientes.
            </p>
          </div>

          <FAQAccordion />

        </div>
      </section>

      {/* Strong Final CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#4C2A7A] to-[#1C0B32] text-white overflow-hidden text-center px-4">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-gold/10 blur-[150px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
          <Award className="text-brand-gold mb-6 w-12 h-12" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Pronto para dar o próximo passo com segurança?
          </h2>
          <p className="text-stone-200 text-base sm:text-lg lg:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Não perca mais tempo pagando juros altos de cheque especial ou cartões comuns. Faça agora uma simulação gratuita e descubra quanto você pode economizar de verdade.
          </p>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a
              href="#simulation-box"
              onClick={(e) => {
                e.preventDefault();
                scrollToSimulation("inss");
              }}
              className="px-8 py-4 bg-[#c0993f] hover:bg-[#a68132] text-brand-dark font-extrabold text-sm tracking-widest uppercase rounded-xl border border-yellow-300/20 shadow-[0_4px_16px_rgba(201,161,74,0.3)] hover:scale-102 active:scale-98 transition-all duration-300 text-center cursor-pointer"
            >
              Simular Agora Grátis
            </a>

            <button
              onClick={handleWhatsappDirect}
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-[0_4px_16px_rgba(16,185,129,0.3)] border border-emerald-500/20 hover:scale-102 active:scale-98 transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone size={18} className="text-white" />
              Falar pelo WhatsApp
            </button>
          </div>

          <div className="flex items-center gap-2 mt-6 text-xs text-stone-300">
            <Lock size={12} className="text-brand-gold" />
            <span>Conexão segura SSL de ponta a ponta</span>
          </div>
        </div>
      </section>
    </main>

      {/* Footer */}
      <footer className="bg-[#080411] text-stone-400 py-16 px-4 md:px-8 border-t border-brand-border-purple">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          
          {/* Footer Logo & Brand info */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="flex items-center mb-4">
              <img 
                src="/images/logo.svg" 
                alt="DFL Consignado Logo" 
                referrerPolicy="no-referrer"
                loading="lazy"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-6">
              Empréstimo com segurança, rapidez e as melhores condições do mercado. Correspondente bancário certificado, atuando desde 2018 com foco no atendimento humano.
            </p>
            <div className="flex items-center gap-3 bg-stone-900 border border-stone-800 px-4 py-2.5 rounded-xl">
              <ShieldCheck className="text-brand-gold" size={16} />
              <span className="text-xs text-stone-300 font-semibold">Correspondente Autorizado</span>
            </div>
          </div>

          {/* Contact and address */}
          <div className="md:col-span-4 flex flex-col items-start text-left">
            <h5 className="font-serif text-white font-bold text-base mb-4 border-b border-stone-800 pb-2 w-full">
              Fale Conosco
            </h5>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="text-brand-gold shrink-0 mt-0.5" size={16} />
                <div className="flex flex-col">
                  <span className="text-stone-300 font-semibold">WhatsApp Oficial:</span>
                  <a href="tel:5511934554478" className="hover:text-white transition-colors">
                    (11) 93455-4478
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="text-brand-gold shrink-0 mt-0.5" size={16} />
                <div className="flex flex-col">
                  <span className="text-stone-300 font-semibold">Horários de Atendimento:</span>
                  <span>Segunda a Sexta: 08h às 18h</span>
                  <span>Sábados: 08h às 12h</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Location and credits */}
          <div className="md:col-span-4 flex flex-col items-start text-left">
            <h5 className="font-serif text-white font-bold text-base mb-4 border-b border-stone-800 pb-2 w-full">
              Endereço Físico
            </h5>
            <p className="text-sm text-stone-400 mb-4 leading-relaxed">
              Rua das Flores, 123 – Sala 45<br />
              Centro – São Paulo / SP<br />
              CEP: 01000-000
            </p>
            <div className="text-xs text-stone-500">
              *A DFL preza por total segurança. Não solicitamos nenhum tipo de pagamento antecipado ou taxas de avalista para aprovação ou liberação de seu crédito consignado.
            </div>
          </div>

        </div>

        {/* Legal boundaries */}
        <div className="border-t border-stone-800 pt-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <div>
            &copy; 2026 DFL Empréstimo Consignado. Todos os direitos reservados. CNPJ: 00.000.000/0001-00.
          </div>
          <div className="flex gap-4">
            <a href="#private-policy" className="hover:text-stone-400 transition-colors">Política de Privacidade</a>
            <span>|</span>
            <a href="#terms" className="hover:text-stone-400 transition-colors">Termos de Uso</a>
          </div>
        </div>
      </footer>

      {/* Floating pulsing WhatsApp button on bottom-right */}
      <a
        href="https://wa.me/5511934554478"
        onClick={handleWhatsappDirect}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-trigger"
        className="fixed bottom-6 right-6 z-40 bg-emerald-800 hover:bg-emerald-950 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.6)] border-2 border-white/95 ring-4 ring-emerald-500/35 hover:scale-110 active:scale-90 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Contatar pelo WhatsApp seguro DFL"
      >
        <span className="absolute inset-x-0 inset-y-0 rounded-full bg-emerald-600/30 animate-ping group-hover:animate-none" />
        <svg className="w-7 h-7 fill-white relative z-10" viewBox="0 0 24 24" id="floating-whatsapp-icon">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.411.001 12.022.001c3.203.001 6.216 1.247 8.484 3.515 2.269 2.268 3.515 5.28 3.515 8.483 0 6.62-5.351 11.968-11.962 11.968-2.001-.001-3.966-.5-5.748-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.752.002-2.607-1.01-5.059-2.85-6.899-1.84-1.841-4.29-2.853-6.899-2.854-5.438 0-9.861 4.37-9.865 9.753-.001 1.705.474 3.37 1.376 4.818l-.936 3.422 3.485-.911zM17.82 14.67c-.29-.145-1.72-.85-1.985-.948-.266-.097-.46-.145-.655.146-.194.29-.753.948-.92 1.14-.169.195-.337.218-.627.073-.29-.145-1.228-.452-2.34-1.444-.864-.772-1.448-1.724-1.618-2.015-.17-.29-.018-.448.128-.592.13-.13.29-.34.436-.51.145-.17.193-.29.29-.485.097-.195.048-.364-.025-.51-.072-.145-.655-1.578-.897-2.16-.236-.57-.497-.49-.655-.498-.154-.008-.33-.008-.507-.008-.177 0-.467.065-.71.33-.243.266-.928.907-.928 2.213s.95 2.565 1.08 2.74c.13.178 1.87 2.855 4.53 4.004.632.273 1.127.437 1.512.559.636.2 1.215.172 1.672.103.51-.077 1.58-.646 1.8-.1.22-.544.22-.1.146-.242s-.145-.266-.436-.412z"/>
        </svg>
      </a>

      {/* Floating WhatsApp Toast Notification */}
      <AnimatePresence>
        {showFloatingToast && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            id="floating-whatsapp-toast"
            className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm bg-[#120822] border-2 border-brand-purple/50 rounded-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.65)] z-50 flex flex-col gap-3"
          >
            {/* Close button */}
            <button
              onClick={() => {
                setShowFloatingToast(false);
                sessionStorage.setItem("dfl-toast-dismissed", "true");
              }}
              id="close-toast-btn"
              className="absolute top-3 right-3 text-stone-400 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Fechar notificação"
            >
              <X size={16} />
            </button>

            {/* Header info / Avatar */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                   src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                   alt="Mariana - Atendimento DFL"
                   loading="lazy"
                   id="toast-agent-avatar"
                   className="w-11 h-11 rounded-full object-cover border-2 border-brand-purple"
                   referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#120822] rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#E8C670] font-extrabold uppercase tracking-widest">
                  Atendimento Online
                </span>
                <span className="text-white font-serif font-black text-sm">
                  Mariana - Consultora DFL
                </span>
              </div>
            </div>

            {/* Message */}
            <p className="text-stone-300 text-xs sm:text-sm font-medium leading-relaxed text-left">
              Olá! Vi que você está interessado pelo crédito consignado. Gostaria de receber uma{" "}
              <strong className="text-[#E8C670]">análise de simulação personalizada</strong> sem compromisso pelo WhatsApp?
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-col gap-2 mt-1">
              <a
                href="https://wa.me/5511934554478?text=Olá Mariana, gostaria de fazer uma análise de simulação personalizada para o meu benefício."
                target="_blank"
                rel="noopener noreferrer"
                id="toast-whatsapp-link-btn"
                onClick={() => {
                  trackLeadSubmission();
                  sessionStorage.setItem("dfl-toast-dismissed", "true");
                  setShowFloatingToast(false);
                }}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs tracking-widest uppercase rounded-lg border border-emerald-950/20 shadow-[0_4px_16px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 transition-all duration-300 text-center cursor-pointer hover:scale-101 active:scale-99 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <Phone size={14} className="text-white animate-bounce" />
                Simular no WhatsApp grátis
              </a>
              <button
                id="toast-dismiss-nav-btn"
                onClick={() => {
                  setShowFloatingToast(false);
                  sessionStorage.setItem("dfl-toast-dismissed", "true");
                }}
                className="text-stone-400 hover:text-white text-xs font-bold uppercase tracking-wider text-center py-1 cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-brand-purple rounded"
              >
                Não, prefiro continuar navegando
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
