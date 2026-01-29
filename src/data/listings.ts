// Extracted shared demo listings data to avoid Fast Refresh warnings when used next to components.
import type { ListingItem } from "@/components/FeaturedListings";

export const listings: ListingItem[] = [
  {
    id: 1,
    title:
      "iPhone 14 Pro Max - Latest Model with Advanced Camera System and Extended Battery Life",
    price: "R15,999",
    location: "Polokwane Central",
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=500&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop",
    timeAgo: "4 hours ago",
    verified: true,
    category: "Property"
  },
  {
    id: 3,
    title:
      "Honda Civic 2020 - Excellent Condition with Low Mileage and Full Service History",
    price: "R285,000",
    location: "Mankweng",
    rating: 4.7,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=600&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=200&fit=crop",
    timeAgo: "1 day ago",
    verified: true,
    category: "Services"
  },
  {
    id: 5,
    title:
      "Gaming Setup - RTX 4080 - High Performance Gaming PC with Latest Graphics Card and RGB Lighting",
    price: "R45,999",
    location: "Polokwane Central",
    rating: 4.6,
    reviews: 43,
    image:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=450&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=350&fit=crop",
    timeAgo: "2 days ago",
    verified: false,
    category: "Food"
  },
  // More dummy data for each category
  {
    id: 7,
    title:
      "Samsung Galaxy S22 Ultra - Premium Smartphone with S Pen and Advanced Camera Features",
    price: "R19,999",
    location: "Seshego",
    rating: 4.9,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    timeAgo: "3 hours ago",
    verified: true,
    category: "Electronics"
  },
  {
    id: 8,
    title: "Luxury 3-Bedroom House",
    price: "R2,500,000",
    location: "Flora Park",
    rating: 4.8,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=300&fit=crop",
    timeAgo: "5 hours ago",
    verified: true,
    category: "Property"
  },
  {
    id: 9,
    title:
      "Toyota Hilux 2021 - Reliable Pickup Truck with Excellent Off-Road Capabilities",
    price: "R350,000",
    location: "Tzaneen",
    rating: 4.9,
    reviews: 32,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop",
    timeAgo: "7 hours ago",
    verified: true,
    category: "Vehicles"
  },
  {
    id: 10,
    title: "Event Catering Service",
    price: "R2,000/event",
    location: "Lebowakgomo",
    rating: 4.7,
    reviews: 60,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    timeAgo: "2 days ago",
    verified: true,
    category: "Services"
  },
  {
    id: 11,
    title: "Dell XPS 13 Laptop",
    price: "R18,000",
    location: "Polokwane Central",
    rating: 4.8,
    reviews: 80,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    timeAgo: "1 day ago",
    verified: true,
    category: "Electronics"
  },
  {
    id: 12,
    title: "Organic Free-Range Eggs",
    price: "R40/dozen",
    location: "Moletjie",
    rating: 4.6,
    reviews: 34,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=300&fit=crop",
    timeAgo: "3 days ago",
    verified: false,
    category: "Food"
  },
  {
    id: 13,
    title: "Bachelor Apartment Downtown",
    price: "R4,500/month",
    location: "Polokwane CBD",
    rating: 4.5,
    reviews: 22,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
    timeAgo: "8 hours ago",
    verified: false,
    category: "Property"
  },
  {
    id: 14,
    title: "VW Polo Vivo 2019",
    price: "R180,000",
    location: "Seshego",
    rating: 4.7,
    reviews: 54,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop",
    timeAgo: "10 hours ago",
    verified: true,
    category: "Vehicles"
  },
  {
    id: 15,
    title: "Home Cleaning Service",
    price: "R350/visit",
    location: "Groblersdal",
    rating: 4.9,
    reviews: 110,
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop",
    timeAgo: "1 day ago",
    verified: true,
    category: "Services"
  },
  {
    id: 16,
    title: "Fresh Strawberries (1kg)",
    price: "R60/kg",
    location: "Tzaneen",
    rating: 4.8,
    reviews: 29,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop",
    timeAgo: "2 days ago",
    verified: false,
    category: "Food"
  }
];
