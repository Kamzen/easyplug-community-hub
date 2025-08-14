import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  Chip,
  Avatar,
  Paper,
  Divider,
  Tabs,
  Tab,
  Rating,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Stack
} from "@mui/material";
import {
  ArrowLeft,
  Star,
  Share,
  CheckCircle,
  Favorite,
  FavoriteBorder,
  Verified,
  Message
} from "@mui/icons-material";
import { MapPin, Clock, MessageCircle } from "lucide-react";
import { NavBar } from "../components/NavBar";
import { listings } from "../components/FeaturedListings";

// Type definitions
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
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
  memberSince: string;
  responseTime: string;
  verified: boolean;
}

interface ItemData {
  id: number;
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
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;

  const handleProfileAction = (action: string) => {
    navigate(`/profile?tab=${action}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Find the listing from FeaturedListings
  const listing = listings.find((item) => item.id === Number(id));

  // Generate dynamic data based on category
  const generateItemData = (listing: (typeof listings)[0]): ItemData => {
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
        name:
          listing.category === "Services"
            ? "Professional Service Provider"
            : listing.category === "Property"
            ? "Property Agent"
            : listing.category === "Vehicles"
            ? "Vehicle Dealer"
            : listing.category === "Food"
            ? "Local Farmer"
            : "TechHub Store",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        totalSales: Math.floor(Math.random() * 200) + 50,
        memberSince: "2022",
        responseTime: "Usually responds within 2 hours",
        verified: listing.verified
      }
    };

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
          images: [
            listing.image,
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=400&fit=crop"
          ],
          colors: ["Black", "White", "Blue", "Red"],
          description:
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
          originalPrice: undefined,
          discount: undefined,
          images: [
            listing.image,
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&h=400&fit=crop"
          ],
          colors: undefined,
          description:
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
          images: [
            listing.image,
            "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop"
          ],
          colors: ["White", "Black", "Silver", "Blue"],
          description:
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
          originalPrice: undefined,
          discount: undefined,
          images: [
            listing.image,
            "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
          ],
          colors: undefined,
          description:
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
          originalPrice: undefined,
          discount: undefined,
          images: [
            listing.image,
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop"
          ],
          colors: undefined,
          description:
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
          originalPrice: undefined,
          discount: undefined,
          images: [listing.image],
          colors: undefined,
          description: "Quality item available for purchase.",
          features: ["Quality Guaranteed", "Good Condition"],
          condition: "Good",
          reviewList: []
        };
    }
  };

  const item = listing ? generateItemData(listing) : null;

  // Similar items data based on category
  const getSimilarItems = (category: string) => {
    const categoryItems = listings.filter(
      (item) => item.category === category && item.id !== Number(id)
    );
    return categoryItems.slice(0, 4).map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      rating: item.rating,
      reviews: item.reviews
    }));
  };

  const similarItems = item ? getSimilarItems(item.category) : [];

  const [selectedImage, setSelectedImage] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState(
    item?.colors?.[0] || "Black"
  );
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

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
        onLocationChange={setSelectedLocation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoggedIn={isLoggedIn}
        user={user}
        onProfileAction={handleProfileAction}
        onLogout={handleLogout}
      />

      <Container maxWidth="lg" sx={{ py: 4, pt: 16 }}>
        <Button
          startIcon={<ArrowLeft />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
            color: "#666",
            textTransform: "none",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#f0f0f0"
            }
          }}
        >
          Back to Browse
        </Button>

        <Grid container spacing={4}>
          {/* Image Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2
              }}
            >
              {/* Thumbnails - left on desktop, below on mobile */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  gap: 1,
                  width: { xs: "100%", md: "80px" },
                  order: { xs: 2, md: 1 }
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
                      "&:hover": {
                        transform: "scale(1.02)"
                      }
                    }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <CardMedia
                      component="img"
                      height={{ xs: "80px", md: "80px" }}
                      image={image}
                      alt={`${item.title} ${index + 1}`}
                      sx={{ objectFit: "cover" }}
                    />
                  </Card>
                ))}
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
                <CardMedia
                  component="img"
                  height={{ xs: "300px", md: "500px" }}
                  image={item.images[selectedImage]}
                  alt={item.title}
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            </Box>
          </Grid>

          {/* Item Details */}
          <Grid size={{ xs: 12, md: 6 }}>
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
                  sx={{
                    bgcolor: "#e3f2fd",
                    color: "#1976d2"
                  }}
                />
                {item.verified && (
                  <Chip
                    label="Verified"
                    size="small"
                    icon={<Verified />}
                    sx={{
                      bgcolor: "#4caf50",
                      color: "white"
                    }}
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
                    "&:hover": {
                      bgcolor: "#1565c0"
                    }
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
          </Grid>
        </Grid>

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
              <Grid container spacing={3}>
                {similarItems.map((similarItem) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={similarItem.id}>
                    <Paper
                      sx={{
                        borderRadius: 0,
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "none",
                        border: "none",
                        bgcolor: "background.paper",
                        "&:hover": {
                          transform: "translateY(-2px)"
                        }
                      }}
                      onClick={() => navigate(`/item/${similarItem.id}`)}
                    >
                      <Box sx={{ position: "relative", width: "100%" }}>
                        <img
                          src={similarItem.image}
                          alt={similarItem.title}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain"
                          }}
                        />
                        <Chip
                          label={item.category}
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
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                          }}
                        >
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
                            2h ago
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
                          {similarItem.price}
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
                          {similarItem.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            mb: 0.5,
                            color: "text.secondary",
                            fontSize: 12
                          }}
                        >
                          {similarItem.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 0.5
                          }}
                        >
                          <Star
                            style={{
                              color: "#F59E42",
                              fontSize: 12,
                              marginRight: 4
                            }}
                          />
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            sx={{ fontSize: 11 }}
                          >
                            {similarItem.rating}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ ml: 0.5, color: "#B45309", fontSize: 9 }}
                          >
                            ({similarItem.reviews})
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
                          <MapPin style={{ fontSize: 11, marginRight: 4 }} />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: 10
                            }}
                          >
                            Polokwane Central
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
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
              <Grid container spacing={2}>
                {item.features.map((feature, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <CheckCircle
                        sx={{ color: "#4caf50", mr: 1, fontSize: 20 }}
                      />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

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
