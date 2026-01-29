import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import BottomNavigation from "./Navigation/BottomNavigation";

export function MobileBottomNavWrapper({ children }) {
  const isMobile = useMediaQuery("(max-width: 640px)"); // Tailwind 'sm' breakpoint
  return (
    <>
      {children}
      {isMobile && <BottomNavigation />}
    </>
  );
}
