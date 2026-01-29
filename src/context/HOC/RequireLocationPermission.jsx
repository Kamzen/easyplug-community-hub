import React, { useContext } from "react";
import { LocationContext } from "../LocationContext";

/**
 * Wrapper component to require location permission for children.
 * Shows a prompt UI if location is denied/prompt/unsupported, else renders children.
 */
export const RequireLocationPermission = ({ children }) => {
  const location = useContext(LocationContext);

  if (!location) return null;

  if (
    location.status === "denied" ||
    location.status === "prompt" ||
    location.status === "unsupported"
  ) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 200,
          padding: 24,
          background: "#f8fafc",
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
        }}
      >
        <h2 style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>
          Allow Location Access
        </h2>
        <p style={{ color: "#64748b", marginBottom: 16, textAlign: "center" }}>
          This feature requires your location. Please allow location access in
          your browser settings.
        </p>
        <button
          onClick={location.requestPermission}
          disabled={location.loading}
          style={{
            background: "linear-gradient(90deg,#6366f1,#818cf8)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontWeight: 500,
            fontSize: 16,
            cursor: location.loading ? "not-allowed" : "pointer",
            opacity: location.loading ? 0.7 : 1
          }}
        >
          {location.loading ? "Requesting..." : "Allow Location"}
        </button>
        {location.error && (
          <div style={{ color: "#ef4444", marginTop: 12 }}>
            {location.error}
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
};
