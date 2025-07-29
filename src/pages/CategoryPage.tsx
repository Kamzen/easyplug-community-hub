import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  useMediaQuery,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Menu,
  MenuList,
  Divider
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Input } from "@/components/ui/input";
import { Search, Zap } from "lucide-react";
// Import the listings array from FeaturedListings
import { listings as allListings } from "../components/FeaturedListings";
import { Button as MuiButton } from "@mui/material";
import { Button } from "@/components/ui/button";
import { NavBar } from "../components/NavBar";

const categories = [
  {
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Gaming", "Audio"]
  },
  {
    name: "Vehicles",
    subcategories: ["Cars", "Motorcycles", "Trucks", "Parts", "Accessories"]
  },
  {
    name: "Property",
    subcategories: ["Houses", "Apartments", "Land", "Commercial", "Rentals"]
  },
  {
    name: "Services",
    subcategories: [
      "Cleaning",
      "Tutoring",
      "Photography",
      "Repair",
      "Consulting"
    ]
  },
  {
    name: "Food",
    subcategories: ["Fresh Produce", "Bakery", "Beverages", "Snacks", "Organic"]
  }
];

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for NavBar
  const [selectedLocation, setSelectedLocation] = useState("Polokwane");
  const [searchValue, setSearchValue] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;

  // Filter listings by category param (case-insensitive)
  const filteredListings = allListings.filter(
    (item) =>
      item.category.toLowerCase() === (category || "").toLowerCase() &&
      item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

  const handleProfileAction = (action: string) => {
    navigate(`/profile?tab=${action}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
      <NavBar
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        searchQuery={searchValue}
        onSearchChange={setSearchValue}
        isLoggedIn={isLoggedIn}
        user={user}
        showAuthModal={showAuthModal}
        onShowAuthModal={setShowAuthModal}
        onProfileAction={handleProfileAction}
        onLogout={handleLogout}
      />
      <Container maxWidth="lg" sx={{ py: 4, pt: 16 }}>
        <Box sx={{ mb: 4, mt: 8 }}>
          <MuiButton
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ color: "#ff6b35" }}
          >
            Back to Home
          </MuiButton>
        </Box>
        <Typography variant="h3" fontWeight="bold" color="#ff6b35" gutterBottom>
          {categoryName}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          {filteredListings.length} items available in this category
        </Typography>
        <Grid container spacing={3}>
          {filteredListings.map((listing) => (
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
                {/* Image */}
                <Box
                  sx={{
                    position: "relative",
                    height: isMobile ? 140 : 192,
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
                      fontSize: isMobile ? 10 : 13
                    }}
                  />
                  {listing.verified && (
                    <Chip
                      icon={
                        <CheckCircleIcon
                          sx={{ color: "white", fontSize: isMobile ? 14 : 18 }}
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
                        fontSize: isMobile ? 10 : 13
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
                      fontSize: isMobile ? 10 : 12
                    }}
                  >
                    <AccessTimeIcon
                      sx={{ fontSize: isMobile ? 13 : 16, mr: 0.5 }}
                    />
                    {listing.timeAgo}
                  </Box>
                </Box>
                {/* Price */}
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
                    variant={isMobile ? "h6" : "h5"}
                    color="primary"
                    fontWeight={700}
                    sx={{ fontSize: isMobile ? 16 : 24 }}
                  >
                    {listing.price}
                  </Typography>
                </Box>
                {/* Content */}
                <Box
                  sx={{
                    p: isMobile ? 1 : 2,
                    pt: isMobile ? 0.5 : 2,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <Box>
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      fontWeight={700}
                      sx={{
                        mb: 0.5,
                        lineHeight: 1.2,
                        minHeight: isMobile ? 28 : 48,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: isMobile ? 14 : 20
                      }}
                    >
                      {listing.title}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                    >
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
                            fontSize: isMobile ? 13 : 18,
                            mr: 0.5
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{ fontSize: isMobile ? 11 : 14 }}
                        >
                          {listing.rating}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            ml: 0.5,
                            color: "#B45309",
                            fontSize: isMobile ? 9 : 12
                          }}
                        >
                          ({listing.reviews})
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                        mb: 1
                      }}
                    >
                      <LocationOnIcon
                        sx={{ fontSize: isMobile ? 13 : 18, mr: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: isMobile ? 11 : 14,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: isMobile ? 100 : 180
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
      </Container>
    </Box>
  );
};

export default CategoryPage;
