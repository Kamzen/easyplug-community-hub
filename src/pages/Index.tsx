import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  User,
  Plus,
  Zap,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import {
  Button as MuiButton,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { LocationSelector } from "@/components/LocationSelector";
import { AuthModal } from "@/components/AuthModal";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedListings } from "@/components/FeaturedListings";

// Import your logo image
import simpleLogo from "@/images/Sample Logo 1 (3).png";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("Polokwane");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Mock user state - replace with actual auth
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;

  const handleProfileAction = (action: string) => {
    navigate(`/profile?tab=${action}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm">
        <div className="px-4 py-2">
          {/* Top Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 py-1">
              <div className="relative">
                {/* Logo image */}
                <img
                  src={simpleLogo}
                  alt="EasyPlug Logo"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">EasyPlug</h1>
                <p className="text-xs text-muted-foreground">Connect Locally</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <LocationSelector
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
              />

              {isLoggedIn ? (
                <>
                  <Button size="sm" className="relative mr-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </Button>

                  {/* MUI User Dropdown */}
                  <MuiButton
                    variant="outlined"
                    size="small"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    startIcon={<AccountCircleIcon />}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                      textTransform: "none",
                      borderRadius: "999px",
                      fontWeight: 500,
                      boxShadow: 1,
                      height: 32,
                      ml: 1,
                      bgcolor: "background.paper",
                    }}
                  >
                    <span className="hidden sm:inline">{user.name}</span>
                  </MuiButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      sx: { width: 220, borderRadius: 3, boxShadow: 6, p: 1 },
                    }}
                  >
                    <MenuItem
                      onClick={() => handleProfileAction("personal-details")}
                    >
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Personal Details" />
                    </MenuItem>
                    <MenuItem onClick={() => handleProfileAction("cart")}>
                      <ListItemText primary="Cart" />
                    </MenuItem>
                    <MenuItem onClick={() => handleProfileAction("wishlist")}>
                      <ListItemText primary="Wishlist" />
                    </MenuItem>
                    <MenuItem onClick={() => handleProfileAction("orders")}>
                      <ListItemText primary="Orders" />
                    </MenuItem>
                    <MenuItem onClick={() => handleProfileAction("invoices")}>
                      <ListItemText primary="Invoices" />
                    </MenuItem>
                    <MenuItem onClick={() => handleProfileAction("returns")}>
                      <ListItemText primary="Returns" />
                    </MenuItem>
                    <MenuItem onClick={() => handleProfileAction("reviews")}>
                      <ListItemText primary="Product Reviews" />
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemText primary="Logout" />
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-full shadow-md"
                >
                  <User className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Join</span>
                </Button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search className="w-5 h-5" />
            </div>
            <Input
              placeholder="Discover amazing local finds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 bg-gradient-to-r from-background to-muted/50 border-2 border-primary/20 rounded-xl focus:border-primary/50 transition-all"
            />
            <Button
              size="sm"
              className="absolute right-2 top-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-lg"
            >
              <Zap className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />

      {/* Main Content with top padding for fixed header */}
      <div className="pt-32 pb-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 space-y-12">
          {/* Quick Actions */}
          <section className="text-center">
            <div className="max-w-md mx-auto space-y-4">
              <Button
                size="lg"
                onClick={() => navigate("/start-selling")}
                className="w-full h-14 bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all animate-float"
              >
                <Plus className="w-6 h-6 mr-3" />
                Start Selling Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 border-2 border-primary/40 text-primary hover:bg-primary hover:text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <Search className="w-6 h-6 mr-3" />
                Explore Marketplace
              </Button>
            </div>
          </section>

          {/* Categories */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">
                <span className="gradient-text">Shop by Category</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Find exactly what you're looking for
              </p>
            </div>
            <CategoryGrid />
          </section>

          {/* Featured Listings */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">
                <span className="gradient-text">
                  Trending in {selectedLocation}
                </span>
              </h2>
              <p className="text-muted-foreground text-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2" />
                Popular picks near you
              </p>
            </div>
            <FeaturedListings />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
