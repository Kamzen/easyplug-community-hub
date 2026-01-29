import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useLocationContext } from "@/context/LocationContext";
import { MapPin, ShieldAlert } from "lucide-react";

export const LocationAlertBanner = () => {
  const { status, loading, requestPermission } = useLocationContext();

  if (status === "granted") return null;

  // Show when blocked/denied/unsupported; also show while prompting to encourage acceptance
  const shouldShow = status === "denied" || status === "unsupported";
  if (!shouldShow) return null;

  const title =
    status === "unsupported"
      ? "Location not available"
      : "We need your location";
  const description =
    status === "unsupported"
      ? "Your browser or connection doesn't support location access. For the best EasyPlug experience, please use HTTPS or a supported browser."
      : "To keep your marketplace local and safe, EasyPlug needs your location. Without it, browsing and posting are disabled. You can enable it now.";

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] px-4 pt-2">
      <Alert className="border-amber-300 bg-amber-50/90 backdrop-blur supports-[backdrop-filter]:bg-amber-50/70">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-amber-600">
            {status === "unsupported" ? (
              <ShieldAlert className="w-5 h-5" />
            ) : (
              <MapPin className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1">
            <AlertTitle className="text-amber-900">{title}</AlertTitle>
            <AlertDescription className="text-amber-800 text-sm">
              {description}
            </AlertDescription>
          </div>
          {status !== "unsupported" && (
            <Button
              size="sm"
              onClick={() => requestPermission()}
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {loading ? "Requesting…" : "Enable location"}
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
};
