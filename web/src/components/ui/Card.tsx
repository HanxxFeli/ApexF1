import { clsx } from "clsx";
import * as React from "react";

export default function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-surface border border-surface backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.15)]",
        className
      )}
      {...props}
    />
  );
}