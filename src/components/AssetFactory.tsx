import React from "react";
import * as LucideIcons from "lucide-react";
import { ASSET_MANIFEST } from "../assets/manifest";

/**
 * Props para o componente de Icone Centralizado.
 */
interface AssetIconProps {
  /** Nome do ícone, que é mapeado para o repositório de ícones correspondente ou Lucide */
  name: string;
  /** Classes CSS customizadas do Tailwind como text-brand-purple ou transitórios de cor */
  className?: string;
  /** Tamanho do ícone em pixels (tanto largura quanto altura) */
  size?: number;
  /** Identificador único para fins de acessibilidade ou controle de DOM */
  id?: string;
  /** Texto descritivo para leitores de tela em caso de ícones com função de imagem ativa */
  alt?: string;
}

/**
 * Componente de Fábrica de Ícones de alta legibilidade (WCAG AAA & ENAC Compliant).
 * Prioriza o mapeamento direto de nós SVG inlined para permitir que a propriedade
 * 'currentColor' e classes como 'stroke-current' ou 'fill-current' funcionem perfeitamente
 * sob esquemas de Alto Contraste (High Contrast) e Modo Escuro (Dark Mode).
 * 
 * Se o mapeamento direto não encontrar um correspondente nativo, utiliza o fallback inline.
 * 
 * @param props {AssetIconProps} Propriedades do ícone
 */
export function AssetIcon({ name, className = "", size = 24, id, alt }: AssetIconProps) {
  // Ajusta o nome para garantir compatibilidade com caixa alta/baixa do Lucide
  const normalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const LucideIcon = (LucideIcons as any)[name] || (LucideIcons as any)[normalizedName];

  if (LucideIcon) {
    return (
      <span 
        className="inline-flex items-center justify-center text-current font-black shrink-0"
        role="img"
        aria-label={alt || `${name} icon`}
        title={alt || `${name} icon`}
      >
        <LucideIcon
          className={`stroke-current fill-none inline-block text-current ${className}`}
          size={size}
          id={id}
          aria-hidden="true"
        />
      </span>
    );
  }

  // Fallback caso seja um asset customizado carregado por URL de imagem
  const customIconUrl = (ASSET_MANIFEST.icons as any)[name];
  if (customIconUrl) {
    return (
      <span
        id={id}
        className={`inline-block select-none ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: "currentColor",
          maskImage: `url(${customIconUrl})`,
          WebkitMaskImage: `url(${customIconUrl})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
        role="img"
        aria-label={alt || `${name} Icon`}
      />
    );
  }

  // Final emergency placeholder para desenvolvedores juniors identificarem
  return (
    <span
      className={`inline-flex items-center justify-center bg-stone-800 text-stone-200 text-xs font-mono rounded ${className}`}
      style={{ width: size, height: size }}
      id={id}
    >
      ✏️
    </span>
  );
}

interface AssetPartnerProps {
  partnerId: string;
  className?: string;
  id?: string;
}

/**
 * AssetPartner resolves bank logos dynamically from our centralized manifest
 */
export function AssetPartner({ partnerId, className = "", id }: AssetPartnerProps) {
  const logoUrl = (ASSET_MANIFEST.partners as any)[partnerId];

  return (
    <img
      src={logoUrl || "/images/partners/caixa.svg"}
      alt={`Logo do ${partnerId}`}
      id={id}
      className={`object-contain transition-all duration-300 ${className}`}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
}

interface AssetTestimonialProps {
  testimonialId: string;
  className?: string;
  id?: string;
  name?: string;
}

/**
 * AssetTestimonial resolves user avatars dynamically from our centralized manifest
 */
export function AssetTestimonial({ testimonialId, className = "", id, name = "Cliente" }: AssetTestimonialProps) {
  const avatarUrl = (ASSET_MANIFEST.testimonials as any)[testimonialId];

  return (
    <img
      src={avatarUrl || `/images/testimonials/maria.svg`}
      alt={`Avatar de ${name}`}
      id={id}
      className={`object-cover rounded-full select-none ${className}`}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
}
