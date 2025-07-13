
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, MessageCircle, Video, Clock } from "lucide-react";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {listings.map((listing) => (
        <Card key={listing.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20 bg-background/80 backdrop-blur-sm overflow-hidden">
          <div className="relative">
            <img 
              src={listing.image} 
              alt={listing.title}
              className="w-full h-40 sm:h-48 lg:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-3 left-3 right-3 flex space-x-2">
                <Button size="sm" className="flex-1 bg-white/90 text-black hover:bg-white text-xs">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Chat
                </Button>
                <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-xs">
                  <Video className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Top badges */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
              <div className="flex flex-col space-y-1">
                {listing.condition === "free" && (
                  <Badge className="bg-green-600/90 text-white border-0 text-xs">
                    FREE
                  </Badge>
                )}
                {listing.condition === "new" && (
                  <Badge className="bg-blue-600/90 text-white border-0 text-xs">
                    NEW
                  </Badge>
                )}
                {listing.featured && (
                  <Badge className="bg-primary/90 text-primary-foreground border-0 text-xs">
                    FEATURED
                  </Badge>
                )}
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                className="bg-white/80 hover:bg-white/90 p-2 h-8 w-8"
              >
                <Heart className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
          
          <CardContent className="p-3 sm:p-4 space-y-3">
            {/* Title and Price */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {listing.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl font-bold text-primary">
                  {listing.price}
                </span>
                {listing.negotiable && (
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    Negotiable
                  </Badge>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{listing.location}</span>
              <span className="mx-2">•</span>
              <span>{listing.distance}</span>
            </div>

            {/* Seller Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary-foreground">
                    {listing.seller.charAt(0)}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-foreground font-medium">{listing.seller}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {listing.rating} ({listing.reviews})
                </span>
              </div>
            </div>

            {/* Time and Category */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {listing.postedTime}
              </div>
              <Badge variant="secondary" className="text-xs">
                {listing.category}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
