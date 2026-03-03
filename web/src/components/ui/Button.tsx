"use client";

import { clsx } from "clsx";
import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  children,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
    secondary:
      "bg-transparent border border-red-500/60 hover:border-red-400 text-red-100 hover:text-white",
    ghost: "bg-white/0 hover:bg-white/5 text-white/90",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-12 px-7 text-base",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Loading
        </span>
      ) : (
        children
      )}
    </button>
  );
}