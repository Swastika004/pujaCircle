import React from "react";
import { cn } from "@/lib/utils";

export interface PujaCircleLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  withBackground?: boolean;
}

/**
 * PujaCircleLogo
 * Sacred Vedic emblem in solid Crimson Sindoor & Haldi Gold featuring the revered Om (ॐ).
 * Strict zero-gradient: pure solid color blocking.
 */
export const PujaCircleLogo: React.FC<PujaCircleLogoProps> = ({
  className,
  size = 32,
  withBackground = true,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "shrink-0 select-none group/logo cursor-pointer overflow-visible transition-transform duration-300",
        className
      )}
      {...props}
    >
      <defs>
        <filter id="haloGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="0.8" floodColor="#121214" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Solid Crimson Sindoor background container */}
      {withBackground && (
        <rect
          width="32"
          height="32"
          rx="5"
          fill="#B91C1C"
          className="transition-all duration-300 ease-out origin-center group-hover:scale-95 shadow-sm"
        />
      )}

      {/* Main Center Group */}
      <g className="transition-transform duration-300 ease-out origin-center group-hover:scale-105 group-hover/logo:scale-105">
        {/* Inner Dark Sacred Disc */}
        <circle
          cx="16"
          cy="16"
          r="11.5"
          fill="#450A0A"
          className="stroke-[#EAB308] stroke-[0.75px]"
        />

        {/* Outer Rotating Haldi Gold Ring on Hover */}
        <g
          className="origin-center group-hover:animate-spin group-hover/logo:animate-spin"
          style={{ transformOrigin: "16px 16px", animationDuration: "3.2s" }}
        >
          <circle
            cx="16"
            cy="16"
            r="11.5"
            strokeWidth="1.4"
            className="stroke-amber-400/40 group-hover:stroke-amber-300 transition-colors duration-300"
          />

          {/* Active Auspicious Haldi Gold Arc */}
          <circle
            cx="16"
            cy="16"
            r="11.5"
            stroke="#EAB308"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="48 24"
            strokeDashoffset="10"
            className="group-hover:stroke-[#FBBF24] transition-colors duration-300"
          />
        </g>

        {/* Sacred Om (ॐ) Core Emblem */}
        <text
          x="16"
          y="21.5"
          textAnchor="middle"
          fill="#FBBF24"
          fontSize="15"
          fontWeight="bold"
          fontFamily="'Noto Sans Devanagari', 'Nirmala UI', 'Segoe UI Historic', 'Mangal', sans-serif"
          className="select-none pointer-events-none"
          style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.5))" }}
        >
          ॐ
        </text>
      </g>
    </svg>
  );
};

export default PujaCircleLogo;
