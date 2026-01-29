export const getApiBase = () =>
  (typeof import.meta !== "undefined" &&
    (import.meta.env?.VITE_API_BASE_URL)) ||
  "http://localhost:8000/api/v1";

export const getUploadsBase = (apiBase = getApiBase()) => {
  try {
    const url = new URL(apiBase);
    url.pathname = url.pathname.replace(/\/?api(\/v\d+)?\/?$/, "");
    return `${url.origin}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return apiBase.replace(/\/?api(\/v\d+)?\/?$/, "");
  }
};

const UPLOADS_BASE = getUploadsBase();

export function buildListingImageUrl(listing, filename) {
  const seller = listing.seller || undefined;
  const email = (seller?.email) || undefined;
  const subs = (listing.sellerSubscriptions || []) || [];
  const subName = (subs[0]?.subscription)?.name || undefined;
  if (email && subName) {
    return `${UPLOADS_BASE}/uploads/listings/${encodeURIComponent(
      email
    )}/${encodeURIComponent(String(subName))}/${encodeURIComponent(filename)}`;
  }
  return `${UPLOADS_BASE}/uploads/listings/${encodeURIComponent(filename)}`;
}

export function toListingItem(raw) {
  const id =
    raw.listingId ||
    raw.id ||
    Math.random().toString();
  const title = raw.title || raw.name || "Untitled";
  const priceRaw = raw.price || 0;
  const price = formatZAR(priceRaw);
  const image = pickFirstImage(raw);
  const category = normalizeCategory(
    raw.category ||
      (raw.category?.name) ||
      "General"
  );
  const location =
    raw.location ||
    raw.city ||
    raw.area ||
    "";
  const rating =
    Number(raw.averageRating ?? raw.rating ?? 0) || 0;
  const reviews =
    Number(raw.totalReviews ?? raw.reviewsCount ?? 0) ||
    0;
  const timeAgo = timeAgoFrom(raw.createdAt);
  const verified = Boolean(
    raw.verified ?? raw.isVerified ?? false
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

export function toListingImages(raw) {
  const imagesField = raw.images || undefined;
  if (!imagesField || imagesField.length === 0) {
    return [pickFirstImage(raw)];
  }
  const urls = imagesField
    .map((img) => {
      if (typeof img === "string") return buildListingImageUrl(raw, img);
      const obj = img;
      return obj.url || obj.src || null;
    })
    .filter((u) => Boolean(u));
  return urls.length ? urls : [pickFirstImage(raw)];
}

function pickFirstImage(raw) {
  const image = raw.image || undefined;
  const thumbnailUrl = raw.thumbnailUrl || undefined;
  const photoUrl = raw.photoUrl || undefined;
  if (image) return image;
  if (thumbnailUrl) return thumbnailUrl;
  if (photoUrl) return photoUrl;
  const imgs = raw.images || undefined;
  if (imgs && imgs.length > 0) {
    const first = imgs[0];
    if (typeof first === "string") return buildListingImageUrl(raw, first);
    const obj = first;
    return obj.url || obj.src || fallbackImg();
  }
  return fallbackImg();
}

function fallbackImg() {
  return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800";
}

function formatZAR(price) {
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

function normalizeCategory(s) {
  return s
    .toLowerCase()
    .replace(/(^|\s|_|-)([a-z])/g, (_, p1, p2) => `${p1}${p2.toUpperCase()}`)
    .replace(/[_-]/g, " ");
}

function timeAgoFrom(dateStr) {
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
