import React from "react";
import * as LucideIcons from "lucide-react";
import { ASSET_MANIFEST } from "../assets/manifest";

interface AssetIconProps {
  name: string;
  className?: string; // Optional custom styling classes
  size?: number;      // Icon size (used as height and width)
  id?: string;
  alt?: string;
}

/**
 * AssetIcon is a factory component that resolves and renders icons.
 * It prioritizes our customized high-contrast SVG assets from `/src/assets/images/icons/`
 * and falls back elegantly to standard Lucide icons if not mapped.
 */
export function AssetIcon({ name, className = "", size = 24, id, alt }: AssetIconProps) {
  // Check in the custom SVG icons first
  const customIconUrl = (ASSET_MANIFEST.icons as any)[name];

  if (customIconUrl) {
    return (
      <img
        src={customIconUrl}
        alt={alt || `${name} Icon`}
        id={id}
        width={size}
        height={size}
        className={`inline-block select-none ${className}`}
        style={{ width: size, height: size }}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Fallback dynamically to Lucide icons
  const LucideIcon = (LucideIcons as any)[name];
  if (LucideIcon) {
    return (
      <LucideIcon
        className={className}
        size={size}
        id={id}
        aria-hidden={!alt}
        aria-label={alt}
      />
    );
  }

  // Final emergency placeholder
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
