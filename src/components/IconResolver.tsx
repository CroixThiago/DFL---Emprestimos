import React from "react";
import * as Icons from "lucide-react";

interface IconResolverProps {
  name: string;
  className?: string;
  size?: number;
}

export default function IconResolver({ name, className = "", size = 24 }: IconResolverProps) {
  // Safe resolver fallback
  const SelectedIcon = (Icons as any)[name];

  if (!SelectedIcon) {
    // Elegant fallback icon
    return <Icons.HelpCircle className={className} size={size} />;
  }

  return <SelectedIcon className={className} size={size} />;
}
