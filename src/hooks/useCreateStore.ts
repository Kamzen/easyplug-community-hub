import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";

export interface CreateStorePayload {
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  image?: File | null;
}

export interface StoreResponse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  image?: string;
}

export function useCreateStore() {
  return useMutation<StoreResponse, Error, CreateStorePayload>({
    mutationFn: async (payload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("latitude", String(payload.latitude));
      formData.append("longitude", String(payload.longitude));
      if (payload.description) formData.append("description", payload.description);
      if (payload.image) formData.append("image", payload.image);
      const { data } = await api.post("/stores", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return data;
    },
  });
}
