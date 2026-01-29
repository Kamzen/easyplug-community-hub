import { queryOptions } from "@tanstack/react-query";
import { authService } from "@/services/authService";

export const getUserInfoQuery = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: () => authService.getUserInfo(),
    staleTime: 5 * 60 * 1000
  });
