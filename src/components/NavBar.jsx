import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VisibilityIcon from "@mui/icons-material/Visibility";
import logo from "@/images/Sample Logo 1 (4).png";
import { AuthModal } from "./AuthModal";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { Avatar } from "@mui/material";

export const NavBar = ({
  selectedLocation = "Polokwane",
  searchQuery = "",
  onSearchChange = () => {},
  onAuthClick,
  onLogout
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: async () => ({ user: await authService.getUserInfo() }),
    enabled: Boolean(token),
    retry: false
  });

  // Compute initials for Avatar (supports both name and first/last name shapes)
  const userForInitials = data?.user || undefined;
  const initials = (() => {
    if (!userForInitials) return "U";
    const first =
      userForInitials.firstName || userForInitials.name?.split(" ")[0] || "";
    const last =
      userForInitials.lastName || userForInitials.name?.split(" ")[1] || "";
    const letters = (first?.[0] || "") + (last?.[0] || "");
    const fallback = userForInitials.email?.[0] || "U";
    return (letters || fallback).toUpperCase();
  })();

  // Get user location from localStorage
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      try {
        const locationData = JSON.parse(storedLocation);
        setUserLocation({
          suburb: locationData.suburb || "",
          city: locationData.city || ""
        });
      } catch (error) {
        console.error("Error parsing stored location:", error);
      }
    }
  }, []);

  // Unified dropdown toggle
  const handleDropdownToggle = (key) => {
    if (!data?.user) {
      setShowAuthModal(true);
      return;
    }
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  // Determine what location to display
  const getDisplayLocation = () => {
    if (userLocation?.suburb) {
      return userLocation.suburb;
    } else if (userLocation?.city) {
      return userLocation.city;
    }
    return selectedLocation;
  };

  return (
    <header className="fixed top-4 left-4 right-4 z-50 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg">
      <div className="px-4 py-3">
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="relative">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white">
                <img
                  src={logo}
                  alt="EasyPlug Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold gradient-text">
                EasyPlug
              </h1>
              <p className="text-xs text-muted-foreground">Connect Locally</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 md:space-x-2">
            <div className="hidden sm:flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-lg">
              <LocationOnIcon
                sx={{
                  width: 16,
                  height: 16,
                  color: "primary.main",
                  "@media (min-width: 768px)": { width: 20, height: 20 }
                }}
              />
              <span className="text-xs md:text-sm font-medium text-primary max-w-24 md:max-w-32 truncate">
                {getDisplayLocation()}
              </span>
            </div>

            {/* Action Icons - Only show when logged in and not on mobile */}
            {data?.user && (
              <div className="hidden sm:flex items-center space-x-1">
                {/* Messages Icon */}
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`relative rounded-full h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-primary/10 ${
                      openDropdown === "messages" ? "bg-primary/10" : ""
                    }`}
                    onClick={() => handleDropdownToggle("messages")}
                    aria-pressed={openDropdown === "messages"}
                  >
                    <ChatBubbleIcon
                      sx={{
                        width: 20,
                        height: 20,
                        "@media (min-width: 768px)": { width: 24, height: 24 }
                      }}
                    />
                    {data?.user && (
                      <span className="absolute -top-0 -right-0 md:-top-0.5 md:-right-0.5 bg-red-500 text-white text-xs rounded-full w-3 h-3 md:w-4 md:h-4 flex items-center justify-center text-[8px] md:text-[10px]">
                        2
                      </span>
                    )}
                  </Button>

                  {/* Messages Dropdown */}
                  {openDropdown === "messages" && data?.user && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                      <div className="p-4">
                        <h3 className="font-semibold mb-3">Messages</h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">JD</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">John Doe</p>
                              <p className="text-xs text-gray-500">
                                Interested in your laptop listing
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">SM</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                Sarah Miller
                              </p>
                              <p className="text-xs text-gray-500">
                                Is this still available?
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full mt-3 text-sm"
                          onClick={() => navigate("/messages")}
                        >
                          View All Messages
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications Icon */}
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`relative rounded-full h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-primary/10 ${
                      openDropdown === "notifications" ? "bg-primary/10" : ""
                    }`}
                    onClick={() => handleDropdownToggle("notifications")}
                    aria-pressed={openDropdown === "notifications"}
                  >
                    <NotificationsIcon
                      sx={{
                        width: 20,
                        height: 20,
                        "@media (min-width: 768px)": { width: 24, height: 24 }
                      }}
                    />
                    {data?.user && (
                      <span className="absolute -top-0 -right-0 md:-top-0.5 md:-right-0.5 bg-red-500 text-white text-xs rounded-full w-3 h-3 md:w-4 md:h-4 flex items-center justify-center text-[8px] md:text-[10px]">
                        5
                      </span>
                    )}
                  </Button>

                  {/* Notifications Dropdown */}
                  {openDropdown === "notifications" && data?.user && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                      <div className="p-4">
                        <h3 className="font-semibold mb-3">Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <VisibilityIcon
                                sx={{ width: 16, height: 16, color: "white" }}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">
                                Your listing got 5 new views
                              </p>
                              <p className="text-xs text-gray-500">
                                2 hours ago
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <FavoriteIcon
                                sx={{ width: 16, height: 16, color: "white" }}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">Someone liked your item</p>
                              <p className="text-xs text-gray-500">1 day ago</p>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-3 text-sm">
                          View All Notifications
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Wishlist Icon */}
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`relative rounded-full h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-primary/10 ${
                      openDropdown === "wishlist" ? "bg-primary/10" : ""
                    }`}
                    onClick={() => handleDropdownToggle("wishlist")}
                    aria-pressed={openDropdown === "wishlist"}
                  >
                    <FavoriteIcon
                      sx={{
                        width: 20,
                        height: 20,
                        "@media (min-width: 768px)": { width: 24, height: 24 }
                      }}
                    />
                    {data?.user && (
                      <span className="absolute -top-0 -right-0 md:-top-0.5 md:-right-0.5 bg-red-500 text-white text-xs rounded-full w-3 h-3 md:w-4 md:h-4 flex items-center justify-center text-[8px] md:text-[10px]">
                        3
                      </span>
                    )}
                  </Button>

                  {/* Wishlist Dropdown */}
                  {openDropdown === "wishlist" && data?.user && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                      <div className="p-4">
                        <h3 className="font-semibold mb-3">Wishlist</h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                            <img
                              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=50&h=50&fit=crop"
                              alt="Laptop"
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                MacBook Pro 16"
                              </p>
                              <p className="text-xs text-gray-500">R25,000</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                            <img
                              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=50&h=50&fit=crop"
                              alt="Sofa"
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                Grey Sectional Sofa
                              </p>
                              <p className="text-xs text-gray-500">R8,500</p>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-3 text-sm">
                          View All Wishlist Items
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {data?.user ? (
              <div className="hidden sm:flex">
                <Button
                  variant="ghost"
                  className="relative rounded-full h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-primary/10"
                  onClick={() => navigate("/profile")}
                  aria-label="Open profile"
                >
                  <Avatar
                    sx={{
                      width: { xs: 22, md: 30 },
                      height: { xs: 22, md: 30 },
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      fontWeight: 700,
                      fontSize: { xs: 12, md: 13 }
                    }}
                    alt={
                      userForInitials?.firstName ||
                      userForInitials?.name ||
                      "User"
                    }
                  >
                    {/* {initials} */}
                  </Avatar>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-full shadow-md px-2 md:px-4 hidden sm:flex"
                >
                  <PersonIcon
                    sx={{
                      width: 16,
                      height: 16,
                      "@media (min-width: 768px)": { width: 20, height: 20 },
                      marginRight: { md: 1 }
                    }}
                  />
                  <span className="hidden md:inline ml-1">Join</span>
                </Button>
                <AuthModal
                  open={showAuthModal}
                  onOpenChange={setShowAuthModal}
                />
              </>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <SearchIcon className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 md:pl-12 pr-12 md:pr-16 h-10 md:h-12 bg-gradient-to-r from-background to-muted/50 border-2 border-primary/20 rounded-xl focus:border-primary/50 transition-all text-sm md:text-base"
          />
          {/* <Button
            size="sm"
            className="absolute right-1 top-1 md:right-2 md:top-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-lg p-1.5 md:p-2"
          >
            <FlashOnIcon className="w-3 h-3 md:w-4 md:h-4" />
          </Button> */}
        </div>

        {/* Mobile Location Display */}
        <div className="sm:hidden mt-2 flex items-center justify-center">
          <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-lg">
            <LocationOnIcon
              sx={{ width: 20, height: 20, color: "primary.main" }}
            />
            <span className="text-sm font-medium text-primary">
              {getDisplayLocation()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
