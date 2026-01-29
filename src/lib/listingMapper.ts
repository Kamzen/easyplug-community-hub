import type { ListingItem } from "@/components/FeaturedListings";

type AnyRecord = Record<string, unknown>;

export const getApiBase = (): string =>
  (typeof import.meta !== "undefined" &&
    ((import.meta as unknown as { env?: AnyRecord })?.env
      ?.VITE_API_BASE_URL as string)) ||
  "http://localhost:8000/api/v1";

export const getUploadsBase = (apiBase = getApiBase()): string => {
  try {
    const url = new URL(apiBase);
    url.pathname = url.pathname.replace(/\/?api(\/v\d+)?\/?$/, "");
    return `${url.origin}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return apiBase.replace(/\/?api(\/v\d+)?\/?$/, "");
  }
};

const UPLOADS_BASE = getUploadsBase();

export function buildListingImageUrl(
  listing: AnyRecord,
  filename: string
): string {
  const seller = listing.seller as AnyRecord | undefined;
  const email = (seller?.email as string) || undefined;
  const subs = (listing.sellerSubscriptions as AnyRecord[] | undefined) || [];
  const subName = (subs[0]?.subscription as AnyRecord | undefined)?.name as
    | string
    | undefined;
  if (email && subName) {
    return `${UPLOADS_BASE}/uploads/listings/${encodeURIComponent(
      email
    )}/${encodeURIComponent(String(subName))}/${encodeURIComponent(filename)}`;
  }
  return `${UPLOADS_BASE}/uploads/listings/${encodeURIComponent(filename)}`;
}

export function toListingItem(raw: AnyRecord): ListingItem {
  const id =
    (raw.listingId as string) ??
    (raw.id as string | number) ??
    Math.random().toString();
  const title = (raw.title as string) ?? (raw.name as string) ?? "Untitled";
  const priceRaw = (raw.price as string | number | undefined) ?? 0;
  const price = formatZAR(priceRaw);
  const image = pickFirstImage(raw);
  const category = normalizeCategory(
    (raw.category as string) ??
      ((raw.category as AnyRecord)?.name as string) ??
      "General"
  );
  const location =
    (raw.location as string) ??
    (raw.city as string) ??
    (raw.area as string) ??
    "";
  const rating =
    Number((raw.averageRating as number) ?? (raw.rating as number) ?? 0) || 0;
  const reviews =
    Number((raw.totalReviews as number) ?? (raw.reviewsCount as number) ?? 0) ||
    0;
  const timeAgo = timeAgoFrom(raw.createdAt as string | undefined);
  const verified = Boolean(
    (raw.verified as boolean) ?? (raw.isVerified as boolean) ?? false
  );
  return {
    id,
    title,
    price,
    image,
    category,
    location,
    rating,
    reviews,
    timeAgo,
    verified
  };
}

export function toListingImages(raw: AnyRecord): string[] {
  const imagesField = raw.images as Array<string | AnyRecord> | undefined;
  if (!imagesField || imagesField.length === 0) {
    return [pickFirstImage(raw)];
  }
  const urls = imagesField
    .map((img) => {
      if (typeof img === "string") return buildListingImageUrl(raw, img);
      const obj = img as AnyRecord;
      return (obj.url as string) || (obj.src as string) || null;
    })
    .filter((u): u is string => Boolean(u));
  return urls.length ? urls : [pickFirstImage(raw)];
}

function pickFirstImage(raw: AnyRecord): string {
  const image = raw.image as string | undefined;
  const thumbnailUrl = raw.thumbnailUrl as string | undefined;
  const photoUrl = raw.photoUrl as string | undefined;
  if (image) return image;
  if (thumbnailUrl) return thumbnailUrl;
  if (photoUrl) return photoUrl;
  const imgs = raw.images as Array<string | AnyRecord> | undefined;
  if (imgs && imgs.length > 0) {
    const first = imgs[0];
    if (typeof first === "string") return buildListingImageUrl(raw, first);
    const obj = first as AnyRecord;
    return (obj.url as string) || (obj.src as string) || fallbackImg();
  }
  return fallbackImg();
}

function fallbackImg(): string {
  return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800";
}

function formatZAR(price: number | string | undefined): string {
  if (price == null || price === "") return "R0";
  const num =
    typeof price === "string"
      ? Number(String(price).replace(/[^0-9.]/g, ""))
      : price;
  if (!isFinite(num)) return String(price);
  try {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 0
    }).format(num);
  } catch {
    return `R${Math.round(num).toLocaleString("en-ZA")}`;
  }
}

function normalizeCategory(s: string): string {
  return s
    .toLowerCase()
    .replace(/(^|\s|_|-)([a-z])/g, (_, p1, p2) => `${p1}${p2.toUpperCase()}`)
    .replace(/[_-]/g, " ");
}

function timeAgoFrom(dateStr?: string): string {
  if (!dateStr) return "recently";
  const then = new Date(dateStr).getTime();
  if (isNaN(then)) return "recently";
  const diff = Date.now() - then;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}
