import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";

export interface ConfirmEmailResponse {
  message: string;
}

export function useConfirmEmail() {
  return useMutation<ConfirmEmailResponse, Error, string>({
    mutationFn: async (token) => {
      const { data } = await api.get(`/auth/confirm-email?token=${token}`);
      return data;
    },
  });
}
