import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  User,
  Sparkles,
  Zap,
  ShoppingCart
} from "lucide-react";
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
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  isLoggedIn: boolean;
  user: Record<string, unknown>;
  onProfileAction: (action: string) => void;
  onLogout: () => void;
}

export const NavBar = ({
  selectedLocation,
  onLocationChange,
  searchQuery,
  onSearchChange,
  isLoggedIn,
  user,
  onProfileAction,
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
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-ping"></div>
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
                    bgcolor: "background.paper"
                  }}
                >
                  <span className="hidden sm:inline">{String(user.name)}</span>
                </MuiButton>
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
                  <MenuItem onClick={() => onProfileAction("personal-details")}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Personal Details" />
                  </MenuItem>
                  <MenuItem onClick={() => onProfileAction("cart")}>
                    <ListItemText primary="Cart" />
                  </MenuItem>
                  <MenuItem onClick={() => onProfileAction("wishlist")}>
                    <ListItemText primary="Wishlist" />
                  </MenuItem>
                  <MenuItem onClick={() => onProfileAction("orders")}>
                    <ListItemText primary="Orders" />
                  </MenuItem>
                  <MenuItem onClick={() => onProfileAction("invoices")}>
                    <ListItemText primary="Invoices" />
                  </MenuItem>
                  <MenuItem onClick={() => onProfileAction("returns")}>
                    <ListItemText primary="Returns" />
                  </MenuItem>
                  <MenuItem onClick={() => onProfileAction("reviews")}>
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
