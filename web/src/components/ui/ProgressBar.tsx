type ProgressBarProps = {
  value: number; // 0–100
};

/**
 * ProgressBar Component
 * 
 * Purpose:
 * - Visually represents a percentage value
 * 
 * Features:
 * - Smooth animated width transition
 * - Gradient color styling 
 * - Glow effect
 * 
 * Props:
 * - value: Percentage to fill the bar (0-100)
 */
export default function ProgressBar({ value }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
      
      {/* Filled progress indicator */}
      <div
        className="
          h-full 
          rounded-full 
          bg-linear-to-r 
          from-orange-500 via-red-500 to-red-600 
          transition-all duration-500 
          shadow-[0_0_8px_rgba(239,68,68,0.5)]
        "
        style={{ width: `${safeValue}%`}}
      />
    </div>
  );
}