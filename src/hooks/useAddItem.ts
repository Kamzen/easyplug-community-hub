import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";

export interface AddItemPayload {
  name: string;
  description: string;
  price: number;
  catalogId: string;
  images?: File[];
}

export interface ItemResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  catalogId: string;
  images?: string[];
}

export function useAddItem() {
  return useMutation<ItemResponse, Error, AddItemPayload>({
    mutationFn: async (payload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("price", String(payload.price));
      formData.append("catalogId", payload.catalogId);
      if (payload.images) {
        payload.images.forEach((img) => formData.append("images", img));
      }
      const { data } = await api.post("/items", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return data;
    },
  });
}
