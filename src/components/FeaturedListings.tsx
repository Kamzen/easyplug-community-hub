import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Chip,
  Button as MUIButton,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShareIcon from "@mui/icons-material/Share";
import Masonry from "@mui/lab/Masonry";
import { MessageCircle, Clock } from "lucide-react";
import SponsoredListingCard from "@/components/SponsoredListingCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export const listings = [
  {
    id: 1,
    title:
      "iPhone 14 Pro Max - Latest Model with Advanced Camera System and Extended Battery Life",
    price: "R15,999",
    location: "Polokwane Central",
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=500&fit=crop",
    timeAgo: "2 hours ago",
    verified: true,
    category: "Electronics"
  },
  {
    id: 2,
    title: "Cozy 2-Bedroom Apartment",
    price: "R8,500/month",
    location: "Bendor Park",
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop",
    timeAgo: "4 hours ago",
    verified: true,
    category: "Property"
  },
  {
    id: 3,
    title:
      "Honda Civic 2020 - Excellent Condition with Low Mileage and Full Service History",
    price: "R285,000",
    location: "Mankweng",
    rating: 4.7,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=600&fit=crop",
    timeAgo: "6 hours ago",
    verified: false,
    category: "Vehicles"
  },
  {
    id: 4,
    title: "Professional Photography",
    price: "R1,200/session",
    location: "Polokwane CBD",
    rating: 5.0,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=200&fit=crop",
    timeAgo: "1 day ago",
    verified: true,
    category: "Services"
  },
  {
    id: 5,
    title:
      "Gaming Setup - RTX 4080 - High Performance Gaming PC with Latest Graphics Card and RGB Lighting",
    price: "R45,999",
    location: "Polokwane Central",
    rating: 4.6,
    reviews: 43,
    image:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=450&fit=crop",
    timeAgo: "1 day ago",
    verified: true,
    category: "Electronics"
  },
  {
    id: 6,
    title: "Fresh Organic Vegetables",
    price: "R25/kg",
    location: "Seshego",
    rating: 4.5,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=350&fit=crop",
    timeAgo: "2 days ago",
    verified: false,
    category: "Food"
  },
  // More dummy data for each category
  {
    id: 7,
    title:
      "Samsung Galaxy S22 Ultra - Premium Smartphone with S Pen and Advanced Camera Features",
    price: "R19,999",
    location: "Seshego",
    rating: 4.9,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    timeAgo: "3 hours ago",
    verified: true,
    category: "Electronics"
  },
  {
    id: 8,
    title: "Luxury 3-Bedroom House",
    price: "R2,500,000",
    location: "Flora Park",
    rating: 4.8,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=300&fit=crop",
    timeAgo: "5 hours ago",
    verified: true,
    category: "Property"
  },
  {
    id: 9,
    title:
      "Toyota Hilux 2021 - Reliable Pickup Truck with Excellent Off-Road Capabilities",
    price: "R350,000",
    location: "Tzaneen",
    rating: 4.9,
    reviews: 32,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop",
    timeAgo: "7 hours ago",
    verified: true,
    category: "Vehicles"
  },
  {
    id: 10,
    title: "Event Catering Service",
    price: "R2,000/event",
    location: "Lebowakgomo",
    rating: 4.7,
    reviews: 60,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    timeAgo: "2 days ago",
    verified: true,
    category: "Services"
  },
  {
    id: 11,
    title: "Dell XPS 13 Laptop",
    price: "R18,000",
    location: "Polokwane Central",
    rating: 4.8,
    reviews: 80,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    timeAgo: "1 day ago",
    verified: true,
    category: "Electronics"
  },
  {
    id: 12,
    title: "Organic Free-Range Eggs",
    price: "R40/dozen",
    location: "Moletjie",
    rating: 4.6,
    reviews: 34,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=300&fit=crop",
    timeAgo: "3 days ago",
    verified: false,
    category: "Food"
  },
  {
    id: 13,
    title: "Bachelor Apartment Downtown",
    price: "R4,500/month",
    location: "Polokwane CBD",
    rating: 4.5,
    reviews: 22,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
    timeAgo: "8 hours ago",
    verified: false,
    category: "Property"
  },
  {
    id: 14,
    title: "VW Polo Vivo 2019",
    price: "R180,000",
    location: "Seshego",
    rating: 4.7,
    reviews: 54,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop",
    timeAgo: "10 hours ago",
    verified: true,
    category: "Vehicles"
  },
  {
    id: 15,
    title: "Home Cleaning Service",
    price: "R350/visit",
    location: "Groblersdal",
    rating: 4.9,
    reviews: 110,
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop",
    timeAgo: "1 day ago",
    verified: true,
    category: "Services"
  },
  {
    id: 16,
    title: "Fresh Strawberries (1kg)",
    price: "R60/kg",
    location: "Tzaneen",
    rating: 4.8,
    reviews: 29,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop",
    timeAgo: "2 days ago",
    verified: false,
    category: "Food"
  }
];

export type ListingItem = (typeof listings)[number];

type AdItem = {
  id: string;
  title: string;
  description?: string;
  image: string;
};

export const ListingTile: React.FC<{
  listing: ListingItem;
  onClick?: () => void;
}> = ({ listing, onClick }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        overflow: "hidden",
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        cursor: "pointer",
        bgcolor: "background.paper",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: 250
        }}
      >
        <img
          src={listing.image}
          alt={listing.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s"
          }}
        />
        <Chip
          label={listing.category}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            bgcolor: "background.paper",
            color: "primary.main",
            fontWeight: 500,
            opacity: 0.95,
            fontSize: 13
          }}
        />
        {listing.verified && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "success.main",
              borderRadius: "50%",
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2
            }}
          >
            <VerifiedIcon sx={{ color: "white", fontSize: 18 }} />
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            right: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Box
            sx={{
              bgcolor: "rgba(0,0,0,0.7)",
              color: "white",
              px: 1.2,
              py: 0.3,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              fontSize: 12
            }}
          >
            <Clock style={{ fontSize: 16, marginRight: 4 }} />
            {listing.timeAgo}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          pt: 1,
          pb: 0
        }}
      >
        <Typography
          variant="h6"
          color="error"
          fontWeight={700}
          sx={{ fontSize: 18 }}
        >
          {listing.price}
        </Typography>
        <Chip
          label={listing.category}
          size="small"
          sx={{
            bgcolor: "#f5f5f5",
            color: "text.secondary",
            fontWeight: 500,
            fontSize: 11,
            height: 20
          }}
        />
      </Box>
      <Box
        sx={{
          px: 2,
          pb: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <Box>
          <Typography
            variant="body1"
            fontWeight={500}
            sx={{
              mb: 1,
              lineHeight: 1.3,
              fontSize: 14,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              color: "text.primary"
            }}
          >
            {listing.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <StarIcon sx={{ color: "#F59E42", fontSize: 14, mr: 0.5 }} />
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ fontSize: 12, color: "#F59E42" }}
            >
              {listing.rating}
            </Typography>
            <Typography
              variant="caption"
              sx={{ ml: 0.5, color: "text.secondary", fontSize: 11 }}
            >
              ({listing.reviews})
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary"
            }}
          >
            <LocationOnIcon sx={{ fontSize: 14, mr: 0.5 }} />
            <Typography
              variant="body2"
              sx={{ fontSize: 12, color: "text.secondary" }}
            >
              {listing.location}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const AdTile: React.FC<{ ad: AdItem }> = ({ ad }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        overflow: "hidden",
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper"
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden", height: 250 }}>
        <img
          src={ad.image}
          alt={ad.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Chip
          label="Sponsored"
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            bgcolor: "background.paper"
          }}
        />
      </Box>
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={700} noWrap>
          {ad.title}
        </Typography>
        {ad.description && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {ad.description}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export const FeaturedListings = ({
  items,
  ads,
  adEvery = 0,
  sponsoredRow
}: {
  items: ListingItem[];
  ads?: AdItem[];
  adEvery?: number;
  sponsoredRow?: { after: number; items: AdItem[] };
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);
  const data: ListingItem[] = items;

  return (
    <>
      {isMobile ? (
        <Box sx={{ width: "100%", px: 0 }}>
          <Masonry columns={2} spacing={0.5}>
            {data.map((listing) => (
              <Paper
                key={listing.id}
                elevation={0}
                sx={{
                  mb: 0,
                  borderRadius: 0,
                  overflow: "hidden",
                  boxShadow: "none",
                  border: "1px solid #e0e0e0",
                  bgcolor: "background.paper",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  width: "100%"
                }}
                onMouseEnter={() => setHoveredId(listing.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => navigate(`/item/${listing.id}`)}
              >
                <Box sx={{ position: "relative", width: "100%" }}>
                  <img
                    src={listing.image}
                    alt={listing.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain"
                    }}
                  />
                  <Chip
                    label={listing.category}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      bgcolor: "background.paper",
                      color: "primary.main",
                      fontWeight: 500,
                      opacity: 0.95,
                      fontSize: 11,
                      zIndex: 2
                    }}
                  />
                  {listing.verified && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        bgcolor: "success.main",
                        borderRadius: "50%",
                        width: 22,
                        height: 22,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2
                      }}
                    >
                      <VerifiedIcon sx={{ color: "white", fontSize: 16 }} />
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      right: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      zIndex: 2
                    }}
                  >
                    {/* Chat icon - always visible on mobile */}
                    <Box
                      sx={{
                        bgcolor: "rgba(0,0,0,0.8)",
                        color: "white",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.9)",
                          transform: "scale(1.1)"
                        }
                      }}
                    >
                      <MessageCircle style={{ fontSize: 14 }} />
                    </Box>

                    {/* Time posted */}
                    <Box
                      sx={{
                        bgcolor: "rgba(0,0,0,0.7)",
                        color: "white",
                        px: 1.2,
                        py: 0.3,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        fontSize: 11
                      }}
                    >
                      <Clock style={{ fontSize: 13, marginRight: 4 }} />
                      {listing.timeAgo}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    px: 1,
                    pt: 1,
                    pb: 0,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight={700}
                    sx={{ fontSize: 16 }}
                  >
                    {listing.price}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{
                      mb: 0.5,
                      lineHeight: 1.2,
                      fontSize: 13,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    {listing.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      color: "text.secondary",
                      fontSize: 12
                    }}
                  >
                    {listing.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <StarIcon
                      sx={{ color: "#F59E42", fontSize: 12, mr: 0.5 }}
                    />
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ fontSize: 11 }}
                    >
                      {listing.rating}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ ml: 0.5, color: "#B45309", fontSize: 9 }}
                    >
                      ({listing.reviews})
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                      mb: 1
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: 11, mr: 0.5 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: 10
                      }}
                    >
                      {listing.location}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Masonry>
        </Box>
      ) : (
        <Grid container spacing={1} sx={{ mx: -2, p: 2 }}>
          {data.map((listing, idx) => {
            const shouldShowAd =
              !!ads &&
              adEvery > 0 &&
              (idx + 1) % adEvery === 0 &&
              ads[Math.floor((idx + 1) / adEvery) - 1];
            return (
              <React.Fragment key={`frag-${listing.id}`}>
                <Grid size={3} key={listing.id}>
                  <ListingTile
                    listing={listing}
                    onClick={() => navigate(`/item/${listing.id}`)}
                  />
                </Grid>
                {shouldShowAd && (
                  <Grid size={3} key={`ad-${idx}`}>
                    <SponsoredListingCard
                      item={{
                        id: (ads as AdItem[])[
                          Math.floor((idx + 1) / adEvery) - 1
                        ].id,
                        title: (ads as AdItem[])[
                          Math.floor((idx + 1) / adEvery) - 1
                        ].title,
                        image: (ads as AdItem[])[
                          Math.floor((idx + 1) / adEvery) - 1
                        ].image
                      }}
                    />
                  </Grid>
                )}
              </React.Fragment>
            );
          })}
          {sponsoredRow && sponsoredRow.items?.length > 0 && (
            <Grid size={12} key={`sponsored-row-tail`}>
              <Box sx={{ mt: 1, position: "relative", px: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Sponsored suggestions
                </Typography>
                <Carousel
                  className="w-full"
                  opts={{ align: "start", loop: false }}
                >
                  <CarouselContent>
                    {sponsoredRow.items.map((ad, adIdx) => (
                      <CarouselItem
                        key={`sponsored-tail-${ad.id}-${adIdx}`}
                        className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
                        <SponsoredListingCard
                          item={{ id: ad.id, title: ad.title, image: ad.image }}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default FeaturedListings;
