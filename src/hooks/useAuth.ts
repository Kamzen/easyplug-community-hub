import { useMutation } from "@tanstack/react-query";
import { api, ApiResponse } from "@/lib/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  userType?: string;
};

export type AuthUser = {
  id: string | number;
  name: string;
  email: string;
  role?: string;
  token?: string;
};

const saveAuth = (user: AuthUser, token?: string) => {
  if (token) localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: LoginPayload) => {
      // Adjust endpoint to your API
      const { data } = await api.post<
        ApiResponse<{ user: AuthUser; token: string }>
      >("/auth/login", payload);
      return data.data;
    },
    onSuccess: ({ user, token }) => {
      saveAuth(user, token);
    }
  });

export const useRegister = () =>
  useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post<ApiResponse<{ user: AuthUser }>>(
        "/auth/register",
        payload
      );
      return data.data;
    },
    onSuccess: ({ user }) => {
      // Some APIs also return token; adapt if needed
      saveAuth(user);
    }
  });
