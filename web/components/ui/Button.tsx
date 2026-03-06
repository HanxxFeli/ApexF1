import Link from "next/link";

/**
 * Reusable Button Component
 * 
 * Features:
 * - Supports two visual variants: Primary and Secondary
 * - Can render as either: Next.js link or standard HTML button
 * 
 * Props:
 * - children: button label or content
 * - href: optional route for navigation buttons
 * - variant: styling option (default: primary)
 */
interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}

export default function Button({ children, href, variant = "primary" }: ButtonProps) {

  // shared base styling applied to all buttons
  const base =
    "px-5 py-2 rounded-md text-sm font-medium transition-all duration-300";

  // variant-specific styles
  const styles =
    variant === "primary"
      ? "bg-red-500 hover:bg-red-600 text-white"
      : "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white";

  // if href is provided, render as a nav link
  if (href) {
    return (
      <Link href={href} className={`${base} ${styles}`}>
        {children}
      </Link>
    );
  }

  // otherwise render as normal button
  return (
    <button className={`${base} ${styles}`}>
      {children}
    </button>
  );
}