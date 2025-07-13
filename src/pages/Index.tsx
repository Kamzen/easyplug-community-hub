
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Heart, Plus, User, Home, Menu, MessageCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedListings } from "@/components/FeaturedListings";
import { LocationSelector } from "@/components/LocationSelector";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("Polokwane");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">EasyPlug</h1>
            </div>
            <div className="flex items-center space-x-2">
              <LocationSelector 
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
              />
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-1" />
                Login
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for items, services, or businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-14"
          >
            <Plus className="w-5 h-5 mr-2" />
            Sell Something
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-orange-500 text-orange-600 hover:bg-orange-50 h-14"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse Items
          </Button>
        </div>

        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <CategoryGrid />
        </section>

        {/* Featured Listings */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recommended in {selectedLocation}
            <span className="text-sm font-normal text-gray-600 ml-2">(within 10km)</span>
          </h2>
          <FeaturedListings />
        </section>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
