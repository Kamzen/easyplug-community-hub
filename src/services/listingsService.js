import { api } from "@/lib/api";

// Keep only thin API wrappers that return server responses as-is
// Types removed for JS version

// Strip undefined/null so Axios only sends actual query params
const buildParams = (params) => {
  const out = {};
  if (!params) return out;
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    out[k] = v;
  }
  return out;
};

export const listingsService = {
  async getAll(params) {
    const { data } = await api.get("/listings", {
      params: buildParams(params)
    });
    return data;
  },

  async getAds(params) {
    const { data } = await api.get("/listings/ads", {
      params: buildParams(params)
    });
    return data;
  },

  async getStandard(params) {
    const { data } = await api.get("/listings/standard", {
      params: buildParams(params)
    });
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`/listings/${id}`);
    return data;
  }
};
