import React from "react";
import { ListingTile } from "@/components/FeaturedListings";

export const SponsoredListingCard = ({ item, onClick }) => {
  const mapped = {
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
  };

  return <ListingTile listing={mapped} onClick={onClick} />;
};

export default SponsoredListingCard;
