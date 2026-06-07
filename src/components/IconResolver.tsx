import React from "react";
import { AssetIcon } from "./AssetFactory";

interface IconResolverProps {
  name: string;
  className?: string;
  size?: number;
  id?: string;
  alt?: string;
}

/**
 * Backwards compatible IconResolver that delegates directly to the AssetIcon factory
 */
export default function IconResolver({ name, className = "", size = 24, id, alt }: IconResolverProps) {
  return <AssetIcon name={name} className={className} size={size} id={id} alt={alt} />;
}

