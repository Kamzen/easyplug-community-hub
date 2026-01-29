import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { LocationContext } from "./LocationContext";
import type {
  AddressInfo,
  Coordinates,
  LocationState,
  PermissionStatus
} from "./location-types";

async function reverseGeocode(
  lat: number,
  lon: number
): Promise<AddressInfo | undefined> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&addressdetails=1`;
    const resp = await fetch(url, { headers: { Accept: "application/json" } });
    const data = (await resp.json()) as { address?: Record<string, string> };
    const a = data.address || {};
    return {
      streetNumber: a.house_number || "",
      streetName: a.road || a.street || "",
      suburb: a.suburb || a.neighbourhood || a.quarter || "",
      city: a.city || a.town || a.village || "",
      province: a.state || a.province || "",
      country: a.country || "",
      postalCode: a.postcode || ""
    };
  } catch (e) {
    return undefined;
  }
}

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [status, setStatus] = useState<PermissionStatus>("unknown");
  const [coords, setCoords] = useState<Coordinates | undefined>(undefined);
  const [address, setAddress] = useState<AddressInfo | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const promptedRef = useRef(false);

  const persistLocation = useCallback((c: Coordinates, a?: AddressInfo) => {
    const payload = {
      latitude: Number(c.latitude.toFixed(6)),
      longitude: Number(c.longitude.toFixed(6)),
      accuracy:
        typeof c.accuracy === "number"
          ? Number(c.accuracy.toFixed(2))
          : undefined,
      streetNumber: a?.streetNumber || "",
      streetName: a?.streetName || "",
      suburb: a?.suburb || "",
      city: a?.city || "",
      province: a?.province || "",
      country: a?.country || "",
      postalCode: a?.postalCode || "",
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem("userLocation", JSON.stringify(payload));
    } catch (err) {
      // ignore storage errors
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!window.isSecureContext) {
      setStatus("unsupported");
      setError("Geolocation requires HTTPS or localhost.");
      return;
    }
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    setError(undefined);
    await new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          const c = { latitude, longitude, accuracy };
          setCoords(c);
          setStatus("granted");
          const a = await reverseGeocode(latitude, longitude);
          setAddress(a);
          persistLocation(c, a);
          setLoading(false);
          resolve();
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setStatus("denied");
          } else {
            setStatus("denied");
            setError(err.message);
          }
          setLoading(false);
          resolve();
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    });
  }, [persistLocation]);

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      if (!window.isSecureContext) {
        if (!cancelled) setStatus("unsupported");
        return;
      }
      if (!("geolocation" in navigator)) {
        if (!cancelled) setStatus("unsupported");
        return;
      }

      try {
        // Use Permissions API if available
        const navPerms = (
          navigator as unknown as {
            permissions?: {
              query: (p: {
                name: PermissionName;
              }) => Promise<globalThis.PermissionStatus>;
            };
          }
        ).permissions;
        if (navPerms?.query) {
          const perm = await navPerms.query({ name: "geolocation" });
          if (cancelled) return;
          if (perm.state === "granted") {
            setStatus("granted");
            requestPermission();
          } else if (perm.state === "prompt") {
            setStatus("prompt");
            if (!promptedRef.current) {
              promptedRef.current = true;
              requestPermission();
            }
          } else {
            setStatus("denied");
          }
          try {
            const anyPerm = perm as globalThis.PermissionStatus & {
              onchange?: () => void;
            };
            if (typeof anyPerm.onchange !== "undefined") {
              anyPerm.onchange = () => {
                const newState = perm.state as PermissionState;
                if (newState === "granted") {
                  requestPermission();
                } else if (newState === "denied") {
                  setStatus("denied");
                } else {
                  setStatus("prompt");
                }
              };
            }
          } catch (err) {
            // ignore
          }
        } else {
          setStatus("prompt");
          if (!promptedRef.current) {
            promptedRef.current = true;
            requestPermission();
          }
        }
      } catch (err) {
        setStatus("prompt");
        if (!promptedRef.current) {
          promptedRef.current = true;
          requestPermission();
        }
      }
    };
    init();
    return () => {
      cancelled = true;
    };
  }, [requestPermission]);

  const value = useMemo<LocationState>(
    () => ({ status, coords, address, loading, error, requestPermission }),
    [status, coords, address, loading, error, requestPermission]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
