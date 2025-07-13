
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";

const listings = [
  {
    id: 1,
    title: "iPhone 14 Pro Max",
    price: "R15,999",
    location: "Polokwane Central",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
    timeAgo: "2 hours ago",
    verified: true,
    category: "Electronics"
  },
  {
    id: 2,
    title: "Cozy 2-Bedroom Apartment",
    price: "R8,500/month",
    location: "Bendor Park",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    timeAgo: "4 hours ago",
    verified: true,
    category: "Property"
  },
  {
    id: 3,
    title: "Honda Civic 2020",
    price: "R285,000",
    location: "Mankweng",
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1549399760-3d4e5c4aaed8?w=400&h=300&fit=crop",
    timeAgo: "6 hours ago",
    verified: false,
    category: "Vehicles"
  },
  {
    id: 4,
    title: "Professional Photography",
    price: "R1,200/session",
    location: "Polokwane CBD",
    rating: 5.0,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
    timeAgo: "1 day ago",
    verified: true,
    category: "Services"
  },
  {
    id: 5,
    title: "Gaming Setup - RTX 4080",
    price: "R45,999",
    location: "Polokwane Central",
    rating: 4.6,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    timeAgo: "1 day ago",
    verified: true,
    category: "Electronics"
  },
  {
    id: 6,
    title: "Fresh Organic Vegetables",
    price: "R25/kg",
    location: "Seshego",
    rating: 4.5,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    timeAgo: "2 days ago",
    verified: false,
    category: "Food"
  }
];

export const FeaturedListings = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="group relative bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border/50"
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-primary font-medium">
                {listing.category}
              </Badge>
            </div>
            {listing.verified && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-green-500 text-white font-medium">
                  Verified Local
                </Badge>
              </div>
            )}
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {listing.timeAgo}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                {listing.title}
              </h3>
            </div>
            
            <div className="flex items-center mb-3">
              <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full mr-3">
                <Star className="w-4 h-4 text-amber-500 fill-current mr-1" />
                <span className="text-sm font-medium text-amber-700">{listing.rating}</span>
                <span className="text-xs text-amber-600 ml-1">({listing.reviews})</span>
              </div>
            </div>

            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{listing.location}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">{listing.price}</span>
              <button className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all transform hover:scale-105">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
