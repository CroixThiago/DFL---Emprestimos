import React, { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, Eye, Moon, Sun, TableProperties } from "lucide-react";

/**
 * ============================================================================
 * BARRA DE ACESSIBILIDADE SLIM WCAG AAA
 * ============================================================================
 * Posicionada no topo absoluto (top-0) de forma compacta e discreta,
 * reduzindo o ruído visual e expondo apenas os controles WCAG essenciais:
 * - Alto Contraste (High Contrast)
 * - Modo Escuro (Dark Mode)
 * - Ajuste do tamanho da fonte (Increase/Decrease Text)
 * ============================================================================
 */
export default function AccessibilityToolbar() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dfl-dark-mode");
      if (stored !== null) return stored === "true";
      // Fallback para verificar se o html já possui a classe classList na montagem
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dfl-high-contrast");
      if (stored !== null) return stored === "true";
      return document.documentElement.classList.contains("high-contrast-mode");
    }
    return false;
  });

  const [fontSizeScale, setFontSizeScale] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dfl-font-scale");
      return stored ? parseFloat(stored) : 1.0;
    }
    return 1.0;
  });

  // Atalhos de teclado (Alt + Letra)
  useEffect(() => {
    const handleShortcuts = (e: KeyboardEvent) => {
      if (e.altKey) {
        const key = e.key.toLowerCase();
        if (key === "c") {
          e.preventDefault();
          toggleHighContrast();
        } else if (key === "e") {
          e.preventDefault();
          toggleDarkMode();
        } else if (e.key === "+" || e.key === "=") {
          e.preventDefault();
          increaseFont();
        } else if (e.key === "-" || e.key === "_") {
          e.preventDefault();
          decreaseFont();
        }
      }
    };
    window.addEventListener("keydown", handleShortcuts);
    return () => window.removeEventListener("keydown", handleShortcuts);
  }, [isDarkMode, isHighContrast, fontSizeScale]);

  // Sincroniza classes visuais e fontes com o DOM raiz
  useEffect(() => {
    const root = document.documentElement;

    // Dark Mode
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // High Contrast
    if (isHighContrast) {
      root.classList.add("high-contrast-mode");
    } else {
      root.classList.remove("high-contrast-mode");
    }

    // Escalonamento proporcional de fonte
    root.style.fontSize = `${fontSizeScale * 100}%`;

    // Persiste preferências no localStorage
    localStorage.setItem("dfl-dark-mode", String(isDarkMode));
    localStorage.setItem("dfl-high-contrast", String(isHighContrast));
    localStorage.setItem("dfl-font-scale", String(fontSizeScale));
  }, [isDarkMode, isHighContrast, fontSizeScale]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleHighContrast = () => {
    setIsHighContrast((prev) => !prev);
  };

  const increaseFont = () => {
    setFontSizeScale((prev) => Math.min(prev + 0.10, 1.40));
  };

  const decreaseFont = () => {
    setFontSizeScale((prev) => Math.max(prev - 0.10, 0.90));
  };

  return (
    <div
      id="top-accessibility-bar"
      className="fixed top-0 left-0 right-0 h-8 bg-[#0a0514] border-b border-white/10 text-stone-200 z-[999] flex items-center justify-between px-3 sm:px-6 shadow-xs font-sans select-none text-[11px] sm:text-xs"
      role="complementary"
      aria-label="Barra de utilitários de acessibilidade"
    >
      {/* Lado Esquerdo - Info Acessível rápida */}
      <div className="flex items-center gap-1.5 font-bold tracking-wider text-stone-300">
        <span 
          className="inline-flex items-center text-[#E8C670]" 
          role="img" 
          aria-label="Ícone de acessibilidade"
        >
          <TableProperties size={13} className="stroke-current fill-none animate-pulse" aria-hidden="true" />
        </span>
        <span className="hidden sm:inline">Acessibilidade WCAG AAA:</span>
      </div>

      {/* Lado Direito - Controles Compactos, Diretos e Limpos */}
      <div className="flex items-center gap-2 sm:gap-4.5">
        
        {/* Controle: Modo Escuro */}
        <button
          onClick={toggleDarkMode}
          className={`flex items-center gap-1.5 h-6 px-2.5 rounded hover:bg-white/10 text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-accent transition-all duration-150 cursor-pointer ${
            isDarkMode ? "bg-white/10 text-white font-extrabold border border-white/20" : ""
          }`}
          aria-label={`Alternar Modo Escuro. Atalho Alt+E. Atualmente: ${isDarkMode ? "Ativado" : "Desativado"}`}
          aria-pressed={isDarkMode}
        >
          <span className="inline-flex items-center text-current" role="img" aria-label="Modo Escuro">
            {isDarkMode ? (
              <Sun size={12} className="stroke-current fill-none" aria-hidden="true" />
            ) : (
              <Moon size={12} className="stroke-current fill-none" aria-hidden="true" />
            )}
          </span>
          <span className="hidden md:inline">{isDarkMode ? "Modo Claro" : "Modo Escuro"}</span>
          <span className="md:hidden">{isDarkMode ? "Claro" : "Escuro"}</span>
        </button>

        {/* Controle: Alto Contraste */}
        <button
          onClick={toggleHighContrast}
          className={`flex items-center gap-1.5 h-6 px-2.5 rounded hover:bg-white/10 text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-accent transition-all duration-150 cursor-pointer ${
            isHighContrast ? "bg-yellow-400 text-black font-extrabold hover:bg-yellow-300 border border-yellow-500" : ""
          }`}
          aria-label={`Alternar Alto Contraste. Atalho Alt+C. Atualmente: ${isHighContrast ? "Ativado" : "Desativado"}`}
          aria-pressed={isHighContrast}
        >
          <span className="inline-flex items-center text-current" role="img" aria-label="Alto Contraste">
            <Eye size={12} className="stroke-current fill-none" aria-hidden="true" />
          </span>
          <span className="hidden md:inline">Alto Contraste</span>
          <span className="md:hidden">Contraste</span>
        </button>

        {/* Grupo de Controle: Tamanho da Fonte */}
        <div className="flex items-center gap-1 border-l border-white/15 pl-2 sm:pl-4">
          <span className="hidden xl:inline text-stone-400 font-bold mr-1.5">
            Letra: {Math.round(fontSizeScale * 100)}%
          </span>
          
          {/* Zoom In */}
          <button
            onClick={increaseFont}
            disabled={fontSizeScale >= 1.40}
            className="flex items-center justify-center w-6 h-6 rounded bg-white/5 hover:bg-white/15 text-white disabled:opacity-40 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold-accent"
            aria-label="Aumentar tamanho do texto de todo o site. Atalho Alt++"
          >
            <span className="inline-flex items-center text-current" role="img" aria-label="Aumentar tamanho da fonte">
              <ZoomIn size={12} className="stroke-current fill-none" aria-hidden="true" />
            </span>
          </button>

          {/* Zoom Out */}
          <button
            onClick={decreaseFont}
            disabled={fontSizeScale <= 0.90}
            className="flex items-center justify-center w-6 h-6 rounded bg-white/5 hover:bg-white/15 text-white disabled:opacity-40 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold-accent"
            aria-label="Diminuir tamanho do texto de todo o site. Atalho Alt+-"
          >
            <span className="inline-flex items-center text-current" role="img" aria-label="Diminuir tamanho da fonte">
              <ZoomOut size={12} className="stroke-current fill-none" aria-hidden="true" />
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
