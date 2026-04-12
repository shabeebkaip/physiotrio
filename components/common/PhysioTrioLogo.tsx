"use client";

interface LogoProps {
  variant?: "color" | "white";
  className?: string;
  height?: number;
}

export function PhysioTrioLogo({ variant = "color", className = "", height = 48 }: LogoProps) {
  const purpleColor = variant === "white" ? "#ffffff" : "#077688";
  const greenColor = variant === "white" ? "#ffffff" : "#4caf50";

  return (
    <svg
      viewBox="0 0 220 80"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      className={className}
      aria-label="PhysioTrio"
    >
      {/* Outer body arc - green */}
      <path
        d="M52,18 C34,20 20,34 20,52 C20,66 30,76 44,76 C50,76 56,74 60,70"
        fill="none"
        stroke={greenColor}
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Inner leaf/wing shape - green */}
      <path
        d="M60,70 C67,60 70,46 63,36 C58,28 49,25 45,30 C41,35 44,46 52,51 C57,54 62,55 60,70 Z"
        fill={greenColor}
        opacity="0.9"
      />
      {/* Arm arc - green */}
      <path
        d="M44,30 C50,22 62,18 70,24"
        fill="none"
        stroke={greenColor}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Head circle - purple */}
      <circle cx="74" cy="14" r="8" fill={purpleColor} />
      {/* Wordmark */}
      <text
        x="92"
        y="38"
        fontFamily="Nunito, serif"
        fontWeight="800"
        fontSize="20"
        fill={purpleColor}
        letterSpacing="-0.3"
      >
        PhysioTrio
      </text>
      {/* Tagline */}
      <text
        x="93"
        y="56"
        fontFamily="Nunito, sans-serif"
        fontWeight="400"
        fontSize="9"
        fill={variant === "white" ? "rgba(255,255,255,0.7)" : "rgba(7,118,136,0.6)"}
        letterSpacing="1.5"
      >
        PHYSIOTHERAPY CENTER
      </text>
    </svg>
  );
}
