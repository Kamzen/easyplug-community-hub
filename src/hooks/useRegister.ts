import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  message: string;
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/register", {
        email: payload.email,
        password: payload.password,
        username: payload.name,
      });
      return data;
    },
  });
}
