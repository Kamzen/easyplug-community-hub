import { api } from "@/lib/api";

// Keep only thin API wrappers that return server responses as-is
export type ListingsCounts = { adsTotal?: number; standardTotal?: number };
export type ListingsListResponse = {
  success?: boolean;
  listings?: unknown[];
  page?: number;
  counts?: ListingsCounts;
} & Record<string, unknown>;

export type ListingDetailResponse = {
  success?: boolean;
  listing?: unknown;
  data?: unknown;
} & Record<string, unknown>;

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

// Strip undefined/null so Axios only sends actual query params
const buildParams = (params?: QueryParams) => {
  const out: Record<string, string | number | boolean> = {};
  if (!params) return out;
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    out[k] = v as string | number | boolean;
  }
  return out;
};

export const listingsService = {
  async getAll(params?: QueryParams): Promise<ListingsListResponse> {
    const { data } = await api.get("/listings", {
      params: buildParams(params)
    });
    return data as ListingsListResponse;
  },

  async getAds(params?: QueryParams): Promise<ListingsListResponse> {
    const { data } = await api.get("/listings/ads", {
      params: buildParams(params)
    });
    return data as ListingsListResponse;
  },

  async getStandard(params?: QueryParams): Promise<ListingsListResponse> {
    const { data } = await api.get("/listings/standard", {
      params: buildParams(params)
    });
    return data as ListingsListResponse;
  },

  async getById(id: string | number): Promise<ListingDetailResponse> {
    const { data } = await api.get(`/listings/${id}`);
    return data as ListingDetailResponse;
  }
};
