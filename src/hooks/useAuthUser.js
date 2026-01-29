import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserInfoQuery } from "@/services/authQueries";

export function useAuthUser() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data, isLoading, isFetching, refetch, error } = useQuery({
    ...getUserInfoQuery(),
    enabled: Boolean(token),
    retry: false
  });

  useEffect(() => {
    // If there is an error and a token exists, optionally handle unauthorized cleanup
    // Consumers can call onLogout to clear the token explicitly
  }, [error]);

  const user = data ?? null;
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
