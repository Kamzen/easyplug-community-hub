import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, User, Zap, ShoppingCart } from "lucide-react";
import logo from "@/images/Sample Logo 1 (4).png";
import {
  Button as MuiButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { LocationSelector } from "./LocationSelector";
import { AuthModal } from "./AuthModal";

interface NavBarProps {
  selectedLocation?: string;
  onLocationChange?: (loc: string) => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  isLoggedIn: boolean;
  user?: Record<string, unknown>;
  onAuthClick: () => void;
  onLogout: () => void;
}

export const NavBar = ({
  selectedLocation = "Polokwane",
  onLocationChange = () => {},
  searchQuery = "",
  onSearchChange = () => {},
  isLoggedIn,
  user = {},
  onAuthClick,
  onLogout
}: NavBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <header className="fixed top-4 left-4 right-4 z-50 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg">
      <div className="px-4 py-3">
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white">
                <img
                  src={logo}
                  alt="EasyPlug Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">EasyPlug</h1>
              <p className="text-xs text-muted-foreground">Connect Locally</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <LocationSelector
              selectedLocation={selectedLocation}
              onLocationChange={onLocationChange}
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
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 px-2"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="hidden md:inline">
                    {(user as any)?.name || "User"}
                  </span>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: { width: 220, borderRadius: 3, boxShadow: 6, p: 1 }
                  }}
                >
                  <MenuItem onClick={onAuthClick}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Personal Details" />
                  </MenuItem>
                  <MenuItem onClick={onAuthClick}>
                    <ListItemText primary="Wishlist" />
                  </MenuItem>
                  <MenuItem onClick={onAuthClick}>
                    <ListItemText primary="Orders" />
                  </MenuItem>
                  <MenuItem onClick={onAuthClick}>
                    <ListItemText primary="Invoices" />
                  </MenuItem>
                  <MenuItem onClick={onAuthClick}>
                    <ListItemText primary="Returns" />
                  </MenuItem>
                  <MenuItem onClick={onAuthClick}>
                    <ListItemText primary="Product Reviews" />
                  </MenuItem>
                  <MenuItem onClick={onLogout}>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-full shadow-md"
                >
                  <User className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Join</span>
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
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <Input
            placeholder="Discover amazing local finds..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
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
  );
};
