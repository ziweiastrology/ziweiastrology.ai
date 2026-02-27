"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-celestial-900 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gold-500 text-celestial-900 hover:bg-gold-400 shadow-lg shadow-gold-500/20":
              variant === "primary",
            "bg-celestial-700 text-parchment-100 hover:bg-celestial-600 border border-gold-700/30":
              variant === "secondary",
            "text-parchment-300 hover:text-gold-400 hover:bg-celestial-800/50":
              variant === "ghost",
            "border border-gold-700/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500":
              variant === "outline",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
