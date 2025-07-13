
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, MessageCircle, Video, Clock, Zap } from "lucide-react";

const listings = [
  {
    id: 1,
    title: "Samsung Galaxy S21 - Like New",
    price: "R3,500",
    negotiable: true,
    location: "Polokwane Central",
    distance: "2.3km",
    image: "/api/placeholder/400/300",
    seller: "Thabo M.",
    rating: 4.8,
    reviews: 24,
    category: "Electronics",
    condition: "used",
    postedTime: "2 hours ago",
    featured: true
  },
  {
    id: 2,
    title: "Fresh Vegetables & Herbs",
    price: "R50-R200",
    negotiable: false,
    location: "Moletjie",
    distance: "5.1km",
    image: "/api/placeholder/400/300",
    seller: "Mama's Garden",
    rating: 5.0,
    reviews: 18,
    category: "Food",
    condition: "new",
    postedTime: "1 day ago",
    featured: false
  },
  {
    id: 3,
    title: "Professional Plumbing Services",
    price: "R200/hour",
    negotiable: true,
    location: "Ga-Rampuru",
    distance: "8.7km",
    image: "/api/placeholder/400/300",
    seller: "Pro Fix Solutions",
    rating: 4.9,
    reviews: 42,
    category: "Services",
    condition: "service",
    postedTime: "30 minutes ago",
    featured: true
  },
  {
    id: 4,
    title: "Kids Clothing Bundle (Size 4-6)",
    price: "FREE",
    negotiable: false,
    location: "Polokwane",
    distance: "3.2km",
    image: "/api/placeholder/400/300",
    seller: "Sarah K.",
    rating: 4.7,
    reviews: 12,
    category: "Baby & Kids",
    condition: "free",
    postedTime: "4 hours ago",
    featured: false
  }
];

export const FeaturedListings = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing, index) => (
        <Card 
          key={listing.id} 
          className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-border/30 hover:border-primary/30 bg-background/80 backdrop-blur-sm transform hover:scale-105"
          style={{animationDelay: `${index * 100}ms`}}
        >
          <div className="relative overflow-hidden">
            <img 
              src={listing.image} 
              alt={listing.title}
              className="w-full h-48 lg:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Gradient overlay with enhanced styling */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                <Button size="sm" className="flex-1 bg-white/90 hover:bg-white text-black text-sm font-medium rounded-xl shadow-lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Now
                </Button>
                <Button size="sm" className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-xl shadow-lg">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Enhanced top badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <div className="flex flex-col space-y-2">
                {listing.condition === "free" && (
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 text-xs font-bold rounded-full shadow-lg">
                    <Heart className="w-3 h-3 mr-1 fill-current" />
                    FREE
                  </Badge>
                )}
                {listing.condition === "new" && (
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 text-xs font-bold rounded-full shadow-lg">
                    <Zap className="w-3 h-3 mr-1" />
                    NEW
                  </Badge>
                )}
                {listing.featured && (
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 text-xs font-bold rounded-full shadow-lg animate-pulse-glow">
                    ⭐ FEATURED
                  </Badge>
                )}
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                className="bg-white/80 hover:bg-white/90 p-2 h-9 w-9 rounded-full shadow-lg backdrop-blur-sm"
              >
                <Heart className="w-4 h-4 text-red-500 hover:fill-current transition-all" />
              </Button>
            </div>
          </div>
          
          <CardContent className="p-4 space-y-4">
            {/* Title and Price with enhanced styling */}
            <div>
              <h3 className="font-bold text-base text-foreground group-hover:gradient-text transition-all line-clamp-2 mb-3">
                {listing.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {listing.price}
                </span>
                {listing.negotiable && (
                  <Badge variant="outline" className="text-xs border-primary/40 text-primary bg-primary/5 rounded-full">
                    Negotiable
                  </Badge>
                )}
              </div>
            </div>

            {/* Location with enhanced design */}
            <div className="flex items-center text-sm text-muted-foreground bg-muted/30 rounded-full px-3 py-1">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span>{listing.location}</span>
              <span className="mx-2">•</span>
              <span className="font-medium">{listing.distance}</span>
            </div>

            {/* Seller Info with enhanced styling */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-primary-foreground">
                    {listing.seller.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">{listing.seller}</span>
              </div>
              
              <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-yellow-700">
                  {listing.rating}
                </span>
              </div>
            </div>

            {/* Time and Category with enhanced design */}
            <div className="flex items-center justify-between text-xs pt-3 border-t border-border/50">
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {listing.postedTime}
              </div>
              <Badge variant="secondary" className="text-xs bg-gradient-to-r from-muted to-muted/80 rounded-full">
                {listing.category}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
