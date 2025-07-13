
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, User, Plus } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedListings } from "@/components/FeaturedListings";
import { LocationSelector } from "@/components/LocationSelector";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("Polokwane");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-First Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          {/* Top Header Row */}
          <div className="flex items-center justify-between py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold text-sm sm:text-base">EP</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">EasyPlug</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Local Community Hub</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <LocationSelector 
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
              />
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <User className="w-4 h-4 mr-1" />
                Login
              </Button>
              <Button variant="ghost" size="sm" className="sm:hidden">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="pb-3 sm:pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search items, services, or businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 sm:h-11 w-full bg-muted/30 border-muted-foreground/20 focus:bg-background"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
        {/* Quick Actions */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground h-12 sm:h-14 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Sell Something
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/20 text-primary hover:bg-primary/5 h-12 sm:h-14 text-base font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Items
            </Button>
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="text-center sm:text-left mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Discover local products and services
            </p>
          </div>
          <CategoryGrid />
        </section>

        {/* Featured Listings */}
        <section>
          <div className="text-center sm:text-left mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Recommended in {selectedLocation}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground flex items-center justify-center sm:justify-start">
              <MapPin className="w-4 h-4 mr-1" />
              Within 10km of your location
            </p>
          </div>
          <FeaturedListings />
        </section>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
