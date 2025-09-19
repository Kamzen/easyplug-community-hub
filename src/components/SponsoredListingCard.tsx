import React from "react";
import { ListingTile, type ListingItem } from "@/components/FeaturedListings";

export type SponsoredItem = {
  id: string;
  title: string;
  image: string;
  location?: string;
  priceLabel?: string;
};

type Props = {
  item: SponsoredItem;
  onClick?: () => void;
};

export const SponsoredListingCard: React.FC<Props> = ({ item, onClick }) => {
  const mapped: ListingItem = {
    id: Number.isFinite(Number(item.id)) ? Number(item.id) : Date.now(),
    title: item.title,
    price: item.priceLabel || "Sponsored",
    location: item.location || "Featured",
    rating: 5,
    reviews: 0,
    image: item.image,
    timeAgo: "Just now",
    verified: false,
    category: "Sponsored"
  } as ListingItem;

  return <ListingTile listing={mapped} onClick={onClick} />;
};

export default SponsoredListingCard;
