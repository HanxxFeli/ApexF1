/**
 * Card Component
 * 
 * Purpose:
 * - Provides a reusable container for content
 * 
 * Props:
 * - children: content rendered inside the card
 * - className: optional Tailwind classes for layout override
 */
export default function Card({
  children,
  className = "",
} : {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        rounded-2xl 
        bg-[#1D1D27]/80 
        border border-white/5 
        shadow-[0_12px_30px_rgba(0,0,0,0.35)] 
        ${className}
      `}
    >
      { children }
    </div>
  );
}