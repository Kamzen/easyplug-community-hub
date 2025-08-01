import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/login", payload);
      return data;
    },
  });
}
