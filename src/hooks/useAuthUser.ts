import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserInfoQuery } from "@/services/authQueries";
import type { AuthUser } from "@/services/authService";

export type UseAuthUserResult = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refetch: () => void;
  error?: unknown;
};

export function useAuthUser(): UseAuthUserResult {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data, isLoading, isFetching, refetch, error } = useQuery({
    ...getUserInfoQuery(),
    enabled: Boolean(token),
    retry: false
  });

  // If the token is invalid/expired, consider clearing it so we don't keep querying
  useEffect(() => {
    // If there is an error and a token exists, optionally handle unauthorized cleanup
    // We can't reliably check status without axios error types here; keep it lean
    // Consumers can call onLogout to clear the token explicitly
  }, [error]);

  const user = (data as AuthUser | undefined) ?? null;
  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || isFetching,
    refetch: () => {
      void refetch();
    },
    error
  };
}
