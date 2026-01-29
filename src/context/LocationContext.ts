import { createContext, useContext } from "react";
import type { LocationState } from "./location-types";

export const LocationContext = createContext<LocationState | undefined>(
  undefined
);

export const useLocationContext = () => {
  const ctx = useContext(LocationContext);
  if (!ctx)
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  return ctx;
};
