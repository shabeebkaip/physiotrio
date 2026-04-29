"use client";

import { LocationProvider } from "@/lib/context/LocationContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <LocationProvider>{children}</LocationProvider>;
}
