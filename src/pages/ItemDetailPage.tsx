import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Avatar,
  Paper,
  Divider,
  Tabs,
  Tab,
  Rating,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Stack,
  Card
} from "@mui/material";
// Using Box for layout instead of MUI Grid to avoid version/type mismatches
import {
  ArrowLeft,
  Share,
  CheckCircle,
  Favorite,
  FavoriteBorder,
  Verified,
  Message,
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@mui/icons-material";
import { MessageCircle } from "lucide-react";
import { NavBar } from "../components/NavBar";
import FeaturedListings, {
  type ListingItem
} from "../components/FeaturedListings";
import { useQuery } from "@tanstack/react-query";
import {
  listingsService,
  type ListingDetailResponse
} from "@/services/listingsService";
import { toListingItem, toListingImages } from "@/lib/listingMapper";
import type { SponsoredItem } from "@/components/SponsoredListingCard";

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
  memberSince: string;
  responseTime: string;
  verified: boolean;
}

interface ItemData {
  id: string | number;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  location: string;
  rating: number;
  reviews: number;
  timeAgo: string;
  verified: boolean;
  category: string;
  images: string[];
  colors?: string[];
  description: string;
  features: string[];
  condition: string;
  reviewList: Review[];
  seller: Seller;
}

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for NavBar
  const [selectedLocation, setSelectedLocation] = React.useState("Polokwane");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Fetch listing by id (raw) and map locally
  const { data: detail } = useQuery<ListingDetailResponse>({
    queryKey: ["listings", id],
    queryFn: () => listingsService.getById(String(id)),
    enabled: Boolean(id)
  });
  const rawListing =
    (detail?.listing as unknown) ?? (detail?.data as unknown) ?? null;
  const mappedListing: ListingItem | null = rawListing
    ? toListingItem(rawListing as Record<string, unknown>)
    : null;
  const galleryImages: string[] = rawListing
    ? toListingImages(rawListing as Record<string, unknown>)
    : [];

  // Prefer description from the API response when it exists
  const extractApiDescription = (obj: unknown): string | undefined => {
    if (!obj || typeof obj !== "object") return undefined;
    const rec = obj as Record<string, unknown>;
    const keys = ["description", "details", "content", "body", "summary"];
    for (const k of keys) {
      const v = rec[k];
      if (typeof v === "string" && v.trim().length > 0) return v.trim();
    }
    return undefined;
  };
  const apiDescription = extractApiDescription(rawListing);

  // Generate dynamic data based on category
  const generateItemData = (
    listing: ListingItem,
    imagesParam?: string[],
    sellerRawParam?: Record<string, unknown>,
    descriptionOverride?: string
  ): ItemData => {
    const images =
      imagesParam && imagesParam.length > 0 ? imagesParam : [listing.image];
    const sellerRaw = (sellerRawParam ?? {}) as Record<string, unknown>;
    const sellerName =
      (sellerRaw.name as string) ||
      [sellerRaw.firstName as string, sellerRaw.lastName as string]
        .filter(Boolean)
        .join(" ") ||
      (listing.category === "Services"
        ? "Professional Service Provider"
        : listing.category === "Property"
        ? "Property Agent"
        : listing.category === "Vehicles"
        ? "Vehicle Dealer"
        : listing.category === "Food"
        ? "Local Farmer"
        : "Seller");
    const sellerAvatar =
      (sellerRaw.profilePicture as string) ||
      (sellerRaw.avatarUrl as string) ||
      (sellerRaw.photoUrl as string) ||
      (sellerRaw.avatar as string) ||
      (sellerRaw.profileImageUrl as string) ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
    const sellerRating =
      Number(
        (sellerRaw.rating as number) ||
          (sellerRaw.averageRating as number) ||
          listing.rating
      ) || listing.rating;
    const sellerTotalSales =
      Number(
        (sellerRaw.totalSales as number) ||
          (sellerRaw.salesCount as number) ||
          0
      ) || 0;
    const sellerMemberSince = (() => {
      const created = sellerRaw.createdAt as string | undefined;
      const d = created ? new Date(created) : undefined;
      return d && !isNaN(d.getTime()) ? String(d.getFullYear()) : "";
    })();
    const sellerResponseTime =
      (sellerRaw.responseTime as string) || "Usually responds within 2 hours";
    const sellerVerified = Boolean(
      (sellerRaw.verified as boolean) ||
        (sellerRaw.isVerified as boolean) ||
        listing.verified
    );

    const baseData = {
      id: listing.id,
      title: listing.title,
      price: listing.price,
      location: listing.location,
      rating: listing.rating,
      reviews: listing.reviews,
      timeAgo: listing.timeAgo,
      verified: listing.verified,
      category: listing.category,
      seller: {
        id: `seller_${listing.id}`,
        name: sellerName,
        avatar: sellerAvatar,
        rating: sellerRating,
        totalSales: sellerTotalSales,
        memberSince: sellerMemberSince,
        responseTime: sellerResponseTime,
        verified: sellerVerified
      }
    } as const;

    switch (listing.category) {
      case "Electronics":
        return {
          ...baseData,
          originalPrice: listing.price.includes("R")
            ? `R${Math.floor(
                parseInt(listing.price.replace(/[^0-9]/g, "")) * 1.3
              )}`
            : listing.price,
          discount: "31% OFF",
          images,
          colors: ["Black", "White", "Blue", "Red"],
          description:
            descriptionOverride ??
            "Experience premium quality with our latest electronics. Featuring cutting-edge technology, superior performance, and sleek design. Perfect for both personal and professional use.",
          features: [
            "Latest Technology",
            "Premium Build Quality",
            "Extended Warranty",
            "Fast Performance",
            "User-Friendly Interface",
            "Energy Efficient"
          ],
          condition: "Brand New",
          reviewList: [
            {
              id: 1,
              user: "Sarah M.",
              avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
              rating: 5,
              date: "2 days ago",
              comment:
                "Amazing product! The quality is exceptional and it works perfectly.",
              verified: true
            },
            {
              id: 2,
              user: "John D.",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
              rating: 4,
              date: "1 week ago",
              comment: "Great product, very satisfied with the purchase.",
              verified: true
            }
          ]
        };
      case "Property":
        return {
          ...baseData,
          images,
          description:
            descriptionOverride ??
            "Beautiful property in a prime location. This well-maintained space offers modern amenities, convenient access to local facilities, and a comfortable living environment.",
          features: [
            "Prime Location",
            "Modern Amenities",
            "Secure Environment",
            "Parking Available",
            "24/7 Security",
            "Maintenance Included"
          ],
          condition: "Excellent",
          reviewList: [
            {
              id: 1,
              user: "Lisa K.",
              avatar:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
              rating: 5,
              date: "3 days ago",
              comment:
                "Perfect location and the property is exactly as described!",
              verified: true
            }
          ]
        };
      case "Vehicles":
        return {
          ...baseData,
          originalPrice: listing.price.includes("R")
            ? `R${Math.floor(
                parseInt(listing.price.replace(/[^0-9]/g, "")) * 1.2
              )}`
            : listing.price,
          discount: "20% OFF",
          images,
          colors: ["White", "Black", "Silver", "Blue"],
          description:
            descriptionOverride ??
            "Well-maintained vehicle with excellent performance and reliability. This vehicle comes with full service history and is ready for immediate use.",
          features: [
            "Full Service History",
            "Excellent Condition",
            "Low Mileage",
            "Fuel Efficient",
            "Safety Features",
            "Warranty Available"
          ],
          condition: "Used - Excellent",
          reviewList: [
            {
              id: 1,
              user: "Mike R.",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
              rating: 5,
              date: "1 week ago",
              comment:
                "Great vehicle, runs perfectly and very well maintained.",
              verified: true
            }
          ]
        };
      case "Services":
        return {
          ...baseData,
          images,
          description:
            descriptionOverride ??
            "Professional service delivered with expertise and attention to detail. Our experienced team ensures high-quality results and customer satisfaction.",
          features: [
            "Professional Service",
            "Experienced Team",
            "Quality Guaranteed",
            "Flexible Scheduling",
            "Competitive Pricing",
            "Customer Satisfaction"
          ],
          condition: "Professional",
          reviewList: [
            {
              id: 1,
              user: "Emma W.",
              avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
              rating: 5,
              date: "2 days ago",
              comment:
                "Excellent service! Very professional and exceeded expectations.",
              verified: true
            }
          ]
        };
      case "Food":
        return {
          ...baseData,
          images,
          description:
            descriptionOverride ??
            "Fresh, organic produce grown locally with care. Our products are harvested at peak freshness to ensure the best taste and nutritional value.",
          features: [
            "Fresh & Organic",
            "Locally Grown",
            "No Pesticides",
            "Peak Freshness",
            "Nutritional Value",
            "Sustainable Farming"
          ],
          condition: "Fresh",
          reviewList: [
            {
              id: 1,
              user: "David L.",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
              rating: 5,
              date: "1 day ago",
              comment: "Fresh and delicious! Will definitely order again.",
              verified: true
            }
          ]
        };
      default:
        return {
          ...baseData,
          images,
          description:
            descriptionOverride ?? "Quality item available for purchase.",
          features: ["Quality Guaranteed", "Good Condition"],
          condition: "Good",
          reviewList: []
        };
    }
  };

  const item = mappedListing
    ? generateItemData(
        mappedListing,
        galleryImages,
        (rawListing as Record<string, unknown> | null | undefined)?.seller as
          | Record<string, unknown>
          | undefined,
        apiDescription
      )
    : null;

  // Similar items data (reuse normal listing UI)
  const similarListingItems: ListingItem[] = [];
  const similarInlineAds: SponsoredItem[] = [
    {
      id: "sim-inline-1",
      title: "Trusted Local Pro",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&auto=format&fit=crop"
    },
    {
      id: "sim-inline-2",
      title: "Top-rated Service",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop"
    }
  ];
  const similarSponsoredItems: SponsoredItem[] = [
    {
      id: "sim-spons-1",
      title: "Weekend Special",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop"
    },
    {
      id: "sim-spons-2",
      title: "Limited Offer",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop"
    },
    {
      id: "sim-spons-3",
      title: "Save Big Today",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop"
    },
    {
      id: "sim-spons-4",
      title: "Editor’s Choice",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop"
    }
  ];

  const [selectedImage, setSelectedImage] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState(
    item?.colors?.[0] || "Black"
  );
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const thumbsRef = React.useRef<HTMLDivElement | null>(null);
  const THUMB_STEP = 88; // px per item (thumb + gap)
  const scrollThumbsVertical = (delta: number) => {
    const el = thumbsRef.current;
    if (!el) return;
    el.scrollBy({ top: delta, behavior: "smooth" });
  };
  const scrollThumbsHorizontal = (delta: number) => {
    const el = thumbsRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!item) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography variant="h5">Item not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
      <NavBar
        selectedLocation={selectedLocation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={handleLogout}
      />

      <Container maxWidth="lg" sx={{ py: 4, pt: 16, mt: 4 }}>
        <Button
          startIcon={<ArrowLeft />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
            color: "#666",
            textTransform: "none",
            fontSize: "16px",
            "&:hover": { backgroundColor: "#f0f0f0" }
          }}
        >
          Back to Browse
        </Button>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4
          }}
        >
          {/* Image Gallery */}
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2
              }}
            >
              {/* Thumbnails with arrow scroller */}
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "100%", md: "80px" },
                  order: { xs: 2, md: 1 }
                }}
              >
                <Box
                  ref={thumbsRef}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    gap: 1,
                    width: "100%",
                    maxHeight: { xs: "auto", md: 500 },
                    overflowY: { xs: "hidden", md: "auto" },
                    overflowX: { xs: "auto", md: "hidden" },
                    // hide scrollbars cross-browser, keep scroll functional
                    msOverflowStyle: "none", // IE/Edge
                    scrollbarWidth: "none", // Firefox
                    "&::-webkit-scrollbar": { display: "none" } // WebKit
                  }}
                >
                  {item.images.map((image, index) => (
                    <Card
                      key={index}
                      sx={{
                        cursor: "pointer",
                        border:
                          selectedImage === index
                            ? "2px solid #1976d2"
                            : "2px solid transparent",
                        borderRadius: 0,
                        overflow: "hidden",
                        transition: "all 0.2s ease",
                        boxShadow: "none",
                        width: { xs: "80px", md: "100%" },
                        flexShrink: 0,
                        "&:hover": { transform: "scale(1.02)" }
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Box
                        component="img"
                        src={image}
                        alt={`${item.title} ${index + 1}`}
                        sx={{
                          objectFit: "cover",
                          height: { xs: "80px", md: "80px" },
                          width: "100%"
                        }}
                      />
                    </Card>
                  ))}
                </Box>
                {/* Desktop up/down arrows */}
                <IconButton
                  size="small"
                  onClick={() => scrollThumbsVertical(-THUMB_STEP)}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    position: "absolute",
                    top: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: 1,
                    zIndex: 3
                  }}
                >
                  <KeyboardArrowUp />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => scrollThumbsVertical(THUMB_STEP)}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    position: "absolute",
                    bottom: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: 1,
                    zIndex: 3
                  }}
                >
                  <KeyboardArrowDown />
                </IconButton>
                {/* Mobile left/right arrows */}
                <IconButton
                  size="small"
                  onClick={() => scrollThumbsHorizontal(-THUMB_STEP)}
                  sx={{
                    display: { xs: "flex", md: "none" },
                    position: "absolute",
                    left: 4,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: 1,
                    zIndex: 3
                  }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => scrollThumbsHorizontal(THUMB_STEP)}
                  sx={{
                    display: { xs: "flex", md: "none" },
                    position: "absolute",
                    right: 4,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: 1,
                    zIndex: 3
                  }}
                >
                  <KeyboardArrowRight />
                </IconButton>
              </Box>

              {/* Main image */}
              <Card
                sx={{
                  flex: 1,
                  borderRadius: 0,
                  overflow: "hidden",
                  boxShadow: "none",
                  border: "none",
                  order: { xs: 1, md: 2 }
                }}
              >
                <Box
                  component="img"
                  src={item.images[selectedImage]}
                  alt={item.title}
                  sx={{
                    objectFit: "cover",
                    height: { xs: "300px", md: "500px" },
                    width: "100%"
                  }}
                />
              </Card>
            </Box>
          </Box>

          {/* Item Details */}
          <Box>
            <Paper
              sx={{ p: 4, borderRadius: 0, boxShadow: "none", border: "none" }}
            >
              {/* Badges */}
              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                {item.discount && (
                  <Chip
                    label={item.discount}
                    size="small"
                    sx={{
                      bgcolor: "#ff4444",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  />
                )}
                <Chip
                  label={item.category}
                  size="small"
                  sx={{ bgcolor: "#e3f2fd", color: "#1976d2" }}
                />
                {item.verified && (
                  <Chip
                    label="Verified"
                    size="small"
                    icon={<Verified />}
                    sx={{ bgcolor: "#4caf50", color: "white" }}
                  />
                )}
              </Stack>

              {/* Title */}
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 3, lineHeight: 1.3 }}
              >
                {item.title}
              </Typography>

              {/* Rating and Sold Count */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Rating
                  value={item.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
                  {item.rating} ({item.reviews} reviews)
                </Typography>
              </Box>

              {/* Price Section */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
                  <Typography variant="h3" fontWeight="bold" color="#1976d2">
                    {item.price}
                  </Typography>
                  {item.originalPrice && (
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                        ml: 2
                      }}
                    >
                      {item.originalPrice}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.location} • {item.timeAgo}
                </Typography>
              </Box>

              {/* Color Selection - Only for Electronics and Vehicles */}
              {item.colors && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Color
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {item.colors.map((color) => (
                      <Button
                        key={color}
                        variant={
                          selectedColor === color ? "contained" : "outlined"
                        }
                        size="small"
                        onClick={() => setSelectedColor(color)}
                        sx={{
                          borderRadius: 0,
                          textTransform: "none",
                          minWidth: "80px",
                          ...(selectedColor === color && {
                            bgcolor: "#1976d2",
                            "&:hover": { bgcolor: "#1565c0" }
                          })
                        }}
                      >
                        {color}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Action Buttons */}
              <Stack spacing={2} sx={{ mb: 4 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<MessageCircle />}
                  sx={{
                    bgcolor: "#1976d2",
                    borderRadius: 0,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                    "&:hover": { bgcolor: "#1565c0" }
                  }}
                >
                  Contact Seller
                </Button>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={isWishlisted ? <Favorite /> : <FavoriteBorder />}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    sx={{
                      borderColor: isWishlisted ? "#1976d2" : "#ddd",
                      color: isWishlisted ? "#1976d2" : "#666",
                      borderRadius: 0,
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "#1976d2",
                        backgroundColor: "#f5f5f5"
                      }
                    }}
                  >
                    {isWishlisted ? "Wishlisted" : "Wishlist"}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Share />}
                    sx={{
                      borderColor: "#ddd",
                      color: "#666",
                      borderRadius: 0,
                      textTransform: "none",
                      minWidth: "120px"
                    }}
                  >
                    Share
                  </Button>
                </Box>
              </Stack>
            </Paper>

            {/* Seller Info */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 0,
                mt: 3,
                boxShadow: "none",
                border: "none"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  src={item.seller.avatar}
                  sx={{ width: 50, height: 50, mr: 2 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.seller.name}
                    </Typography>
                    {item.seller.verified && (
                      <Verified
                        sx={{ color: "#4caf50", ml: 1, fontSize: 20 }}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Rating
                      value={item.seller.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {item.seller.rating} • {item.seller.totalSales} sales
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.seller.responseTime}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                startIcon={<Message />}
                fullWidth
                onClick={() =>
                  navigate("/messages", {
                    state: { sellerId: item.seller.id, itemId: item.id }
                  })
                }
                sx={{
                  borderColor: "#1976d2",
                  color: "#1976d2",
                  borderRadius: 0,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#1565c0",
                    backgroundColor: "#f5f5f5"
                  }
                }}
              >
                Message Seller
              </Button>
            </Paper>
          </Box>
        </Box>

        {/* Tabs Section */}
        <Paper
          sx={{ mt: 4, borderRadius: 0, boxShadow: "none", border: "none" }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Similar Items" />
            <Tab label="Description" />
            <Tab label={`Reviews (${item.reviews})`} />
          </Tabs>

          {/* Similar Items Tab */}
          {activeTab === 0 && (
            <Box sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Similar {item.category} You Might Like
              </Typography>
              <FeaturedListings
                items={similarListingItems}
                ads={similarInlineAds}
                adEvery={4}
                sponsoredRow={{ after: 8, items: similarSponsoredItems }}
              />
            </Box>
          )}

          {/* Description Tab */}
          {activeTab === 1 && (
            <Box sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {item.category === "Services"
                  ? "Service Description"
                  : "Product Description"}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ lineHeight: 1.6, mb: 3 }}
              >
                {item.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Key Features
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }
                }}
              >
                {item.features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <CheckCircle
                      sx={{ color: "#4caf50", mr: 1, fontSize: 20 }}
                    />
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 3, p: 3, bgcolor: "#f8f9fa", borderRadius: 0 }}>
                <Typography variant="body2" fontWeight="bold">
                  Condition: {item.condition}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Reviews Tab */}
          {activeTab === 2 && (
            <Box sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Rating
                  value={item.rating}
                  precision={0.1}
                  readOnly
                  size="large"
                />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h5" fontWeight="bold">
                    {item.rating} out of 5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Based on {item.reviews} reviews
                  </Typography>
                </Box>
              </Box>

              <List>
                {item.reviewList.map((review) => (
                  <ListItem key={review.id} sx={{ px: 0, py: 2 }}>
                    <ListItemAvatar>
                      <Avatar src={review.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {review.user}
                          </Typography>
                          {review.verified && (
                            <Verified
                              sx={{ color: "#4caf50", ml: 1, fontSize: 16 }}
                            />
                          )}
                          <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                            sx={{ ml: 2 }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ ml: 2 }}
                          >
                            {review.date}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {review.comment}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ItemDetailPage;
