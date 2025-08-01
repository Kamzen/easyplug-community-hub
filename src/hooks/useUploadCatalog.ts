import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";

export interface UploadCatalogPayload {
  storeId: string;
  file: File;
}

export interface UploadCatalogResponse {
  message: string;
}

export function useUploadCatalog() {
  return useMutation<UploadCatalogResponse, Error, UploadCatalogPayload>({
    mutationFn: async (payload) => {
      const formData = new FormData();
      formData.append("storeId", payload.storeId);
      formData.append("file", payload.file);
      const { data } = await api.post("/catalogs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return data;
    },
  });
}
