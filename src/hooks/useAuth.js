import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

const saveAuth = (user, token) => {
  if (token) localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/login", payload);
      return data.data;
    },
    onSuccess: ({ user, token }) => {
      saveAuth(user, token);
    }
  });

export const useRegister = () =>
  useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/register", payload);
      return data.data;
    },
    onSuccess: ({ user }) => {
      saveAuth(user);
    }
  });
