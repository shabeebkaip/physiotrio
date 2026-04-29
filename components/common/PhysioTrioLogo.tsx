import Image from "next/image";

interface LogoProps {
  variant?: "color" | "white";
  className?: string;
  height?: number;
}

export function PhysioTrioLogo({ variant = "color", className = "", height = 48 }: LogoProps) {
  // aspect ratio: 1051 × 970 ≈ 1.083 : 1
  const width = Math.round(height * (1051 / 970));

  return (
    <Image
      src="/physioTRIO logo free background.png"
      alt="PhysioTrio"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
