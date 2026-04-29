"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Location = "all" | "riyadh" | "makkah";

const STORAGE_KEY = "physiotrio_location";

interface LocationContextValue {
  location: Location;
  setLocation: (l: Location) => void;
}

const LocationContext = createContext<LocationContextValue>({
  location: "all",
  setLocation: () => {},
});

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<Location>("all");

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Location | null;
    if (saved === "riyadh" || saved === "makkah" || saved === "all") {
      setLocationState(saved);
    }
  }, []);

  const setLocation = (l: Location) => {
    setLocationState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
