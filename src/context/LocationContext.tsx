import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

type PermissionStatus =
  | "unknown"
  | "granted"
  | "denied"
  | "prompt"
  | "unsupported";

export type Coordinates = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

type AddressInfo = {
  streetNumber?: string;
  streetName?: string;
  suburb?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
};

export type LocationState = {
  status: PermissionStatus;
  coords?: Coordinates;
  address?: AddressInfo;
  loading: boolean;
  error?: string;
  // Explicitly trigger the browser prompt (or retry)
  requestPermission: () => Promise<void>;
};

const LocationContext = createContext<LocationState | undefined>(undefined);

async function reverseGeocode(
  lat: number,
  lon: number
): Promise<AddressInfo | undefined> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&addressdetails=1`;
    const resp = await fetch(url, {
      headers: {
        // Polite header for public Nominatim usage
        Accept: "application/json"
      }
    });
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
    // Fail silently; we still have coords
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
    } catch {
      /* do nothing */
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
          // best-effort reverse geocode
          const a = await reverseGeocode(latitude, longitude);
          setAddress(a);
          persistLocation(c, a);
          setLoading(false);
          resolve();
        },
        (err) => {
          // Permission denied or other error
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

  // On mount, detect current permission and prompt once if needed
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
        // Use Permissions API if available to decide whether to auto-prompt
        const navWithPermissions = navigator as Navigator & {
          permissions?: {
            query(options: {
              name: PermissionName;
            }): Promise<
              PermissionStatus & { state: string; onchange?: () => void }
            >;
          };
        };
        if (
          navWithPermissions.permissions &&
          navWithPermissions.permissions.query
        ) {
          const perm = await navWithPermissions.permissions.query({
            name: "geolocation" as PermissionName
          });
          if (cancelled) return;
          if (perm.state === "granted") {
            setStatus("granted");
            // Fetch coords quietly (no prompt since already granted)
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
          // Optionally listen for changes
          try {
            perm.onchange = () => {
              const newState = perm.state as PermissionStatus;
              if (newState === "granted") {
                requestPermission();
              } else if (newState === "denied") {
                setStatus("denied");
              } else {
                setStatus("prompt");
              }
            };
          } catch {
            // intentionally left blank
          }
        } else {
          // Fallback: just attempt to prompt once
          setStatus("prompt");
          if (!promptedRef.current) {
            promptedRef.current = true;
            requestPermission();
          }
        }
      } catch {
        // As a fallback, attempt to prompt once
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

// Moved useLocationContext to a separate file for Fast Refresh compatibility
