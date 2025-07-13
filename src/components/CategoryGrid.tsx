
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Utensils, 
  Shirt, 
  Home, 
  Baby, 
  Laptop, 
  Car, 
  Heart,
  Gift,
  Sparkles
} from "lucide-react";

const categories = [
  {
    name: "Services",
    icon: Wrench,
    color: "bg-blue-500",
    items: ["Plumbing", "Gardening", "Repairs", "Cleaning"],
    type: "used"
  },
  {
    name: "Food",
    icon: Utensils,
    color: "bg-green-500",
    items: ["Fresh Produce", "Baked Goods", "Catering"],
    type: "new"
  },
  {
    name: "Clothing",
    icon: Shirt,
    color: "bg-purple-500",
    items: ["Shoes", "Accessories", "Kids Clothes"],
    type: "used"
  },
  {
    name: "Home & Garden",
    icon: Home,
    color: "bg-orange-500",
    items: ["Furniture", "Kitchen", "Appliances"],
    type: "both"
  },
  {
    name: "Baby & Kids",
    icon: Baby,
    color: "bg-pink-500",
    items: ["Toys", "Clothes", "Equipment"],
    type: "used"
  },
  {
    name: "Electronics",
    icon: Laptop,
    color: "bg-indigo-500",
    items: ["Phones", "Computers", "TVs"],
    type: "both"
  },
  {
    name: "Transport",
    icon: Car,
    color: "bg-red-500",
    items: ["Cars", "Bikes", "Parts"],
    type: "used"
  },
  {
    name: "Free Items",
    icon: Gift,
    color: "bg-emerald-500",
    items: ["Donations", "Giveaways", "Community"],
    type: "free"
  }
];

export const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 text-center">
              <div className={`${category.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
              <div className="space-y-1">
                {category.items.slice(0, 2).map((item) => (
                  <div key={item} className="text-xs text-gray-600">{item}</div>
                ))}
                {category.items.length > 2 && (
                  <div className="text-xs text-gray-400">+{category.items.length - 2} more</div>
                )}
              </div>
              {category.type === "free" && (
                <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800 text-xs">
                  <Heart className="w-3 h-3 mr-1" />
                  FREE
                </Badge>
              )}
              {category.type === "new" && (
                <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  NEW
                </Badge>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
