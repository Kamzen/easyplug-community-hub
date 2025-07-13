
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, MessageCircle, Video } from "lucide-react";

const listings = [
  {
    id: 1,
    title: "Samsung Galaxy S21 - Like New",
    price: "R3,500",
    negotiable: true,
    location: "Polokwane Central",
    distance: "2.3km",
    image: "/api/placeholder/300/200",
    seller: "Thabo M.",
    rating: 4.8,
    category: "Electronics",
    condition: "used",
    postedTime: "2 hours ago"
  },
  {
    id: 2,
    title: "Fresh Vegetables & Herbs",
    price: "R50-R200",
    negotiable: false,
    location: "Moletjie",
    distance: "5.1km",
    image: "/api/placeholder/300/200",
    seller: "Mama's Garden",
    rating: 5.0,
    category: "Food",
    condition: "new",
    postedTime: "1 day ago"
  },
  {
    id: 3,
    title: "Plumbing Services - Available Now",
    price: "R200/hour",
    negotiable: true,
    location: "Ga-Rampuru",
    distance: "8.7km",
    image: "/api/placeholder/300/200",
    seller: "Pro Fix Solutions",
    rating: 4.9,
    category: "Services",
    condition: "service",
    postedTime: "30 minutes ago"
  },
  {
    id: 4,
    title: "Kids Clothing Bundle (Size 4-6)",
    price: "FREE",
    negotiable: false,
    location: "Polokwane",
    distance: "3.2km",
    image: "/api/placeholder/300/200",
    seller: "Sarah K.",
    rating: 4.7,
    category: "Baby & Kids",
    condition: "free",
    postedTime: "4 hours ago"
  }
];

export const FeaturedListings = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {listings.map((listing) => (
        <Card key={listing.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="relative">
            <img 
              src={listing.image} 
              alt={listing.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 p-2"
            >
              <Heart className="w-4 h-4" />
            </Button>
            {listing.condition === "free" && (
              <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                FREE
              </Badge>
            )}
            {listing.condition === "new" && (
              <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                NEW
              </Badge>
            )}
          </div>
          
          <CardContent className="p-4">
            <div className="mb-2">
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                {listing.title}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xl font-bold text-green-600">
                  {listing.price}
                </span>
                {listing.negotiable && (
                  <Badge variant="outline" className="text-xs">
                    Negotiable
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{listing.location}</span>
              <span className="mx-1">•</span>
              <span>{listing.distance}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">{listing.seller}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm text-gray-600">{listing.rating}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Video className="w-4 h-4 mr-1" />
                Video
              </Button>
            </div>

            <div className="text-xs text-gray-500 mt-2">
              Posted {listing.postedTime}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
