import React, { useState, useEffect } from "react";
import { Menu, X, Phone, ArrowUpRight, ShieldCheck } from "lucide-react";
import { ASSET_MANIFEST } from "../assets/manifest";
import { trackLeadSubmission } from "../utils/analytics";

/**
 * ============================================================================
 * GUIA DE MANUTENÇÃO DO HEADER (Dedicado a Estagiários e Junior Devs)
 * ============================================================================
 * Olá, DEV! Se você precisa ajustar o cabeçalho, aqui estão as regras de ouro:
 * 
 * 1. COMO ADICIONAR OU REMOVER LINKS NO MENU?
 *    Basta alterar a lista `menuItems` logo abaixo. Adicione um objeto com { label: "Nome", href: "#id-da-secao" }.
 *    O site rolará automaticamente e suavemente até o elemento com esse ID correspondente no HTML.
 * 
 * 2. COMO REFAZER O LINK DO WHATSAPP OU O NÚMERO DE TELEFONE?
 *    O telefone fixado está na tag <span d="phone-number"> e no link de âncora wa.me. Acesse e atualize.
 * 
 * 3. ACESSIBILIDADE DE TOQUE (Dificuldades Motoras):
 *    Todos os elementos interativos possuem pelo menos 44px de altura/largura, seguindo
 *    diretrizes WCAG, facilitando o clique ou toque em tablets e smartphones.
 * ============================================================================
 */

/**
 * Componente do Cabeçalho principal da aplicação (DFL Consignado).
 * Oferece navegação responsiva, atalhos acessíveis e controle de ações imediatas.
 * 
 * @component
 */
export default function Header() {
  /**
   * Estado scrolled (booleano):
   * Controla se o usuário rolou a página além de 10px.
   * Quando verdadeiro, aplica um fundo escuro opaco e sombra ao header (efeito compressão).
   */
  const [scrolled, setScrolled] = useState(false);
  
  /**
   * Estado mobileMenuOpen (booleano):
   * Controla se o menu hambúrguer móvel/tablet está aberto ou fechado.
   * Abre uma tela inteira (drawer) de navegação intuitiva de toque fácil.
   */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [navPaddingClass, setNavPaddingClass] = useState("xl:px-3.5 px-2 py-3.5 text-xs xl:text-[13px]");
  const [navGapClass, setNavGapClass] = useState("gap-1.5 xl:gap-3");

  // Dynamic Header Sizing to avoid visual wrap/break
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const bMax = containerRef.current;
      
      if (window.innerWidth >= 1280) { // On desktop screens
        // Logo, navigation container, actions
        const logo = bMax.querySelector("a[aria-label*='de volta para o topo']");
        const nav = bMax.querySelector("nav");
        const actions = bMax.querySelector(".hidden.xl\\:flex.shrink-0");
        
        if (logo && nav && actions) {
          const logoW = (logo as HTMLElement).offsetWidth;
          const navItems = Array.from(nav.querySelectorAll("a")) as HTMLAnchorElement[];
          const navW = navItems.reduce((acc: number, el: HTMLAnchorElement) => acc + el.offsetWidth, 0) + (12 * (navItems.length - 1));
          const actionsW = (actions as HTMLElement).offsetWidth;
          const combinedW = logoW + navW + actionsW + 64; // safe padding offset boundary
          
          if (combinedW > bMax.clientWidth) {
            // Content would break or wrap! Decrease padding, word font-size and gaps dynamically
            setNavPaddingClass("xl:px-1.5 px-1 py-2 text-[10px] xl:text-[11px]");
            setNavGapClass("gap-0.5 xl:gap-1");
          } else {
            // Restore beautiful luxurious defaults
            setNavPaddingClass("xl:px-3.5 px-2 py-3.5 text-xs xl:text-[13px]");
            setNavGapClass("gap-1.5 xl:gap-3");
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    const timeoutId = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Monitora o scroll do navegador para deixar o Header semi-transparente ou opaco
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

  // Lista dinâmica de links de navegação rápida (Facilidade de alteração de links)
  const menuItems = [
    { label: "Por que DFL", href: "#por-que-dfl" },
    { label: "Serviços", href: "#servicos" },
    { label: "Calculadora", href: "#calculadora" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Dúvidas", href: "#faq" }
  ];

  // Função utilitária para rolar até a calculadora / simulador de crédito sem bagunçar a viewport
  const handleScrollToSimulate = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById("simulation-box");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleWhatsappLog = () => {
    trackLeadSubmission();
  };

  return (
    <>
      {/* Botão invisível (Acessibilidade por Teclado - Skip Link) */}
      {/* Pessoas cegas que usam "TAB" podem pular o cabeçalho e ir direto ao que interessa: o simulador */}
      <a 
        href="#simulation-box"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-[999] bg-brand-gold text-brand-dark px-5 py-3 font-black uppercase rounded shadow-lg border-2 border-brand-dark outline-none transition-all"
      >
        Pular para o Simulador de Crédito
      </a>

      <header
        role="banner"
        className={`fixed top-8 left-0 w-full z-50 transform-gpu translate-z-0 will-change-[padding] transition-[padding] duration-200 ${
          scrolled
            ? "bg-[#120822] shadow-lg py-3 border-b border-white/10"
            : "bg-[#120822]/45 backdrop-blur-md py-4.5 border-b border-transparent"
        }`}
      >
        <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo da Marca DFL */}
          <a href="#" className="flex items-center group shrink-0 min-h-[48px] min-w-[120px]" aria-label="DFL Consignado - Ir de volta para o topo">
            <img 
              src={ASSET_MANIFEST.logo} 
              alt="DFL Consignado Logo"
              referrerPolicy="no-referrer"
              className="h-8 sm:h-9.5 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </a>

          {/* Menu de Navegação - Layout flexível de alta resistência a quebras de linha em resoluções intermediárias */}
          <nav className={`hidden xl:flex items-center flex-nowrap ${navGapClass}`} aria-label="Menu de Navegação Principal">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-black uppercase tracking-wider text-stone-200 hover:text-brand-gold-accent hover:underline decoration-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold-accent rounded-sm whitespace-nowrap transition-colors duration-150 min-h-[48px] flex items-center justify-center ${navPaddingClass}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Botões de Ação Direta no Header (Desktop-only) */}
          <div className="hidden xl:flex items-center gap-4 xl:gap-5 shrink-0">
            <a
              href="https://wa.me/5511934554478"
              onClick={handleWhatsappLog}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs xl:text-sm font-black transition-colors duration-150 text-stone-200 hover:text-brand-gold-accent focus:outline-none focus:ring-2 focus:ring-brand-gold-accent rounded px-3 py-3.5 whitespace-nowrap min-h-[48px] min-w-[48px]"
              aria-label="Contatar DFL Consignado via WhatsApp seguro ou telefonar para 11 93455-4478"
            >
              <span className="inline-flex text-[#E8C670] stroke-current" role="img" aria-label="Telefone WhatsApp">
                <Phone size={14} className="stroke-current fill-none" aria-hidden="true" />
              </span>
              <span>(11) 93455-4478</span>
            </a>

            <a
              href="#simulation-box"
              onClick={handleScrollToSimulate}
              className="px-5 py-3.5 font-black text-xs xl:text-sm uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center gap-1 shadow-sm hover:shadow-md cursor-pointer bg-brand-gold text-brand-dark hover:bg-brand-gold-accent focus:outline-none focus:ring-2 focus:ring-brand-gold-accent whitespace-nowrap min-h-[48px] min-w-[48px]"
              aria-label="Simular crédito consignado gratuitamente"
            >
              <span>Simular Agora</span>
              <span className="inline-flex text-current stroke-current" role="img" aria-label="Seta para cima e direita">
                <ArrowUpRight size={13} className="stroke-current fill-none" aria-hidden="true" />
              </span>
            </a>
          </div>

          {/* Botões para Mobile / Tablet */}
          <div className="flex xl:hidden items-center gap-2">
            {!mobileMenuOpen && (
              <a
                href="#simulation-box"
                onClick={handleScrollToSimulate}
                className="px-4.5 py-3.5 font-black text-xs uppercase tracking-wider rounded-xl transition-transform active:scale-95 text-center flex items-center gap-1.5 cursor-pointer bg-brand-gold text-brand-dark select-none min-h-[48px] min-w-[48px]"
                aria-label="Simule já seu empréstimo consignado"
              >
                <span>Simular</span>
              </a>
            )}
            
            {/* Botão de Menu Hambúrguer com tamanho ideal para clique de dedos trêmulos ou idosos (touch target de 48px+) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 focus:outline-none focus:ring-2 focus:ring-brand-gold-accent rounded-lg cursor-pointer text-white min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors"
              aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <span className="inline-flex text-[#E8C670] stroke-current" role="img" aria-label="Fechar menu">
                  <X size={24} className="stroke-current fill-none" aria-hidden="true" />
                </span>
              ) : (
                <span className="inline-flex text-current stroke-current" role="img" aria-label="Abrir menu">
                  <Menu size={24} className="stroke-current fill-none" aria-hidden="true" />
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Tela de Menu móvel (Drawer) - Otimizado para navegação tátil suave de 4x ou mais */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[#120822] flex flex-col justify-between p-6 xl:hidden pt-24 animate-fade-in transition-all duration-300" 
          role="dialog" 
          aria-modal="true" 
          aria-label="Menu Móvel de Navegação"
        >
          <div className="flex flex-col gap-5 text-left">
            <div className="text-[10px] uppercase tracking-widest text-[#E8C670] font-black border-b border-white/10 pb-2 select-none">
              Navegação DFL Consignado
            </div>
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl font-black text-white hover:text-brand-gold-accent focus:outline-none focus:ring-2 focus:ring-brand-gold-accent px-1.5 py-3 flex items-center min-h-[48px]"
                aria-label={`Ir para a seção ${item.label}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 justify-center select-none">
              <ShieldCheck className="text-brand-gold-accent" size={18} aria-hidden="true" />
              <span className="text-[11px] text-stone-200 font-bold font-sans uppercase tracking-wider">Correspondente Oficial Legitimado</span>
            </div>
            
            {/* Link de Toque Grande do WhatsApp móvel */}
            <a
              href="https://wa.me/5511934554478"
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsappLog();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4.5 bg-emerald-800 hover:bg-emerald-950 text-white font-black text-center rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors border border-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm min-h-[48px]"
              aria-label="Falar conosco via canal seguro do WhatsApp"
            >
              <Phone size={17} aria-hidden="true" />
              WhatsApp Oficial
            </a>
            
            {/* Link de Simular Seguro móvel */}
            <a
              href="#simulation-box"
              onClick={handleScrollToSimulate}
              className="w-full py-4.5 bg-brand-gold text-brand-dark font-black text-center rounded-xl flex items-center justify-center gap-2 shadow-md hover:bg-brand-gold-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold-accent text-sm min-h-[48px]"
              aria-label="Ir para ferramenta de simulação rápida"
            >
              Simular Agora Grátis
            </a>
          </div>
        </div>
      )}
    </>
  );
}
