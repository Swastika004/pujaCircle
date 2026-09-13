import React from "react";
import { cn } from "@/lib/utils";

export interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  /** Optional container to wrap inner content */
  container?: boolean;
  /** Optional decorative sacred hairline accents */
  ambientGlow?: boolean;
}

/**
 * GridBackground
 * Redesigned with solid decorative framing and hairline borders.
 * Strict zero-gradient and zero-grid architecture.
 */
export const GridBackground: React.FC<GridBackgroundProps> = ({
  children,
  className,
  container = false,
  ambientGlow = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative min-h-[calc(100vh-4rem)] w-full bg-background overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* 1. Auspicious Top Hairline Framing Strip */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-1 bg-amber-500/30"
      />
      
      {ambientGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border-x border-amber-500/10 max-w-7xl mx-auto"
        />
      )}

      {/* 2. Foreground Content */}
      <div className="relative z-10">
        {container ? (
          <div className="container py-8 sm:py-12 md:py-16 px-4">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default GridBackground;
