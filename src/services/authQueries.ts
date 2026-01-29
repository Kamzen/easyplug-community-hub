import { queryOptions } from "@tanstack/react-query";
import { authService, type AuthUser } from "@/services/authService";

export const getUserInfoQuery = () =>
  queryOptions<AuthUser>({
    queryKey: ["me"],
    queryFn: () => authService.getUserInfo(),
    staleTime: 5 * 60 * 1000
  });
