import React from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const listings = [
  {
    id: 1,
    title: "iPhone 14 Pro Max",
    price: "R15,999",
    location: "Polokwane Central",
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
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
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    timeAgo: "4 hours ago",
    verified: true,
    category: "Property"
  },
  {
    id: 3,
    title: "Honda Civic 2020",
    price: "R285,000",
    location: "Mankweng",
    rating: 4.7,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop",
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
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
    timeAgo: "1 day ago",
    verified: true,
    category: "Services"
  },
  {
    id: 5,
    title: "Gaming Setup - RTX 4080",
    price: "R45,999",
    location: "Polokwane Central",
    rating: 4.6,
    reviews: 43,
    image:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
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
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    timeAgo: "2 days ago",
    verified: false,
    category: "Food"
  },
  // More dummy data for each category
  {
    id: 7,
    title: "Samsung Galaxy S22 Ultra",
    price: "R19,999",
    location: "Seshego",
    rating: 4.9,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
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
    title: "Toyota Hilux 2021",
    price: "R350,000",
    location: "Tzaneen",
    rating: 4.9,
    reviews: 32,
    image:
      "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?w=400&h=300&fit=crop",
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

export const FeaturedListings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile ? (
        <Box sx={{ width: "100vw", mx: -2 }}>
          {listings.map((listing) => (
            <Paper
              key={listing.id}
              elevation={2}
              sx={{
                mb: 0,
                borderRadius: 0,
                overflow: "hidden",
                boxShadow: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                "&:active": { boxShadow: 4 },
                width: "100%",
                mx: 0,
                px: 0
              }}
            >
              <Box sx={{ position: "relative", width: "100%", height: 240 }}>
                <img
                  src={listing.image}
                  alt={listing.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                  <Chip
                    icon={
                      <CheckCircleIcon sx={{ color: "white", fontSize: 14 }} />
                    }
                    label="Verified Local"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "success.main",
                      color: "white",
                      fontWeight: 500,
                      fontSize: 11,
                      zIndex: 2
                    }}
                  />
                )}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    bgcolor: "rgba(0,0,0,0.7)",
                    color: "white",
                    px: 1.2,
                    py: 0.3,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    fontSize: 11,
                    zIndex: 2
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 13, mr: 0.5 }} />
                  {listing.timeAgo}
                </Box>
              </Box>
              <Box sx={{ px: 2, pt: 1.5, pb: 0 }}>
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight={700}
                  sx={{ fontSize: 18 }}
                >
                  {listing.price}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{
                    mb: 0.5,
                    lineHeight: 1.2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: 15,
                    minHeight: 24
                  }}
                >
                  {listing.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <StarIcon sx={{ color: "#F59E42", fontSize: 14, mr: 0.5 }} />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ fontSize: 12 }}
                  >
                    {listing.rating}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ ml: 0.5, color: "#B45309", fontSize: 10 }}
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
                  <LocationOnIcon sx={{ fontSize: 13, mr: 0.5 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 12,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 120
                    }}
                  >
                    {listing.location}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid size={{ xs: 6, md: 4 }} key={listing.id}>
              <Paper
                elevation={4}
                sx={{
                  borderRadius: 1,
                  overflow: "hidden",
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.3s, transform 0.3s",
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-8px)"
                  },
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper"
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 192,
                    overflow: "hidden"
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
                    <Chip
                      icon={
                        <CheckCircleIcon
                          sx={{ color: "white", fontSize: 18 }}
                        />
                      }
                      label="Verified Local"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "success.main",
                        color: "white",
                        fontWeight: 500,
                        fontSize: 13
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
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
                    <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    {listing.timeAgo}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    px: 2,
                    pt: 1.5,
                    pb: 0,
                    gap: 1
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary"
                    fontWeight={700}
                    sx={{ fontSize: 24 }}
                  >
                    {listing.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    pt: 2,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        mb: 0.5,
                        lineHeight: 1.2,
                        minHeight: 48,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: 20
                      }}
                    >
                      {listing.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#FEF3C7",
                        px: 1,
                        py: 0.3,
                        borderRadius: 2,
                        mr: 1
                      }}
                    >
                      <StarIcon
                        sx={{
                          color: "#F59E42",
                          fontSize: 18,
                          mr: 0.5
                        }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{ fontSize: 14 }}
                      >
                        {listing.rating}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          ml: 0.5,
                          color: "#B45309",
                          fontSize: 12
                        }}
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
                      <LocationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: 14,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 180
                        }}
                      >
                        {listing.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default FeaturedListings;
