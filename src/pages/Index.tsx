
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, User, Plus, Sparkles, Zap, ChevronDown, ShoppingCart, Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedListings } from "@/components/FeaturedListings";
import { LocationSelector } from "@/components/LocationSelector";
import { AuthModal } from "@/components/AuthModal";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("Polokwane");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  // Mock user state - replace with actual auth
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isLoggedIn = !!user;

  const handleProfileAction = (action: string) => {
    navigate(`/profile?tab=${action}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Header */}
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
                onLocationChange={setSelectedLocation}
              />
              
              {isLoggedIn ? (
                <>
                  <Button size="sm" className="relative mr-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-full shadow-md">
                        <User className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">{user.name}</span>
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleProfileAction('personal-details')}>
                        Personal Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleProfileAction('cart')}>
                        Cart
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleProfileAction('wishlist')}>
                        Wishlist
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleProfileAction('orders')}>
                        Orders
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleProfileAction('invoices')}>
                        Invoices
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleProfileAction('returns')}>
                        Returns
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleProfileAction('reviews')}>
                        Product Reviews
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                onClick={() => navigate('/start-selling')}
                className="w-full h-14 bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all animate-float"
              >
                <Plus className="w-6 h-6 mr-3" />
                Start Selling Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full h-14 border-2 border-primary/30 text-primary hover:bg-primary/10 font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
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
                <span className="gradient-text">Trending in {selectedLocation}</span>
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
