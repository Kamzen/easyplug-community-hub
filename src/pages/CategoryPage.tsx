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
import FeaturedListings from "../components/FeaturedListings";
import { useQuery } from "@tanstack/react-query";
import {
  listingsService,
  type ListingsListResponse
} from "@/services/listingsService";
import { toListingItem } from "@/lib/listingMapper";
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

  // Fetch and filter listings by category param (case-insensitive)
  const { data, isLoading, isError } = useQuery<ListingsListResponse>({
    queryKey: ["listings", "category", category],
    queryFn: () => listingsService.getAll({ category }),
    enabled: Boolean(category)
  });
  const raw =
    (data?.listings as unknown) ??
    (data as unknown as { data?: unknown })?.data ??
    [];
  const arr = Array.isArray(raw) ? (raw as unknown[]) : [];
  const items = arr.map((r) => toListingItem(r as Record<string, unknown>));
  const filteredListings = items.filter(
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
        searchQuery={searchValue}
        onSearchChange={setSearchValue}
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
          {isLoading
            ? "Loading..."
            : `${filteredListings.length} items available in this category`}
        </Typography>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 animate-pulse rounded" />
            ))}
          </div>
        ) : isError || filteredListings.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No listings found.
          </div>
        ) : (
          <FeaturedListings items={filteredListings as never[]} />
        )}
      </Container>
    </Box>
  );
};

export default CategoryPage;
