
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
    gradient: "from-blue-500 to-blue-600",
    items: ["Plumbing", "Gardening", "Repairs"],
    count: "120+ listings",
    type: "service"
  },
  {
    name: "Food & Fresh",
    icon: Utensils,
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-600",
    items: ["Fresh Produce", "Baked Goods", "Catering"],
    count: "85+ listings",
    type: "new"
  },
  {
    name: "Fashion",
    icon: Shirt,
    color: "bg-purple-500",
    gradient: "from-purple-500 to-pink-600",
    items: ["Clothing", "Shoes", "Accessories"],
    count: "200+ listings",
    type: "used"
  },
  {
    name: "Home & Garden",
    icon: Home,
    color: "bg-orange-500",
    gradient: "from-orange-500 to-red-500",
    items: ["Furniture", "Kitchen", "Appliances"],
    count: "150+ listings",
    type: "both"
  },
  {
    name: "Baby & Kids",
    icon: Baby,
    color: "bg-pink-500",
    gradient: "from-pink-500 to-rose-600",
    items: ["Toys", "Clothes", "Equipment"],
    count: "90+ listings",
    type: "used"
  },
  {
    name: "Electronics",
    icon: Laptop,
    color: "bg-indigo-500",
    gradient: "from-indigo-500 to-purple-600",
    items: ["Phones", "Computers", "TVs"],
    count: "110+ listings",
    type: "both"
  },
  {
    name: "Transport",
    icon: Car,
    color: "bg-red-500",
    gradient: "from-red-500 to-orange-600",
    items: ["Cars", "Bikes", "Parts"],
    count: "45+ listings",
    type: "used"
  },
  {
    name: "Free Items",
    icon: Gift,
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-green-600",
    items: ["Donations", "Giveaways", "Community"],
    count: "30+ listings",
    type: "free"
  }
];

export const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <Card key={category.name} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
              <div className={`bg-gradient-to-br ${category.gradient} rounded-2xl w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <div className="space-y-1">
                  {category.items.slice(0, 2).map((item) => (
                    <div key={item} className="text-xs sm:text-sm text-muted-foreground">{item}</div>
                  ))}
                  <div className="text-xs text-primary font-medium">{category.count}</div>
                </div>

                <div className="flex justify-center">
                  {category.type === "free" && (
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-1">
                      <Heart className="w-3 h-3 mr-1 fill-current" />
                      FREE
                    </Badge>
                  )}
                  {category.type === "new" && (
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-2 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      NEW
                    </Badge>
                  )}
                  {category.type === "service" && (
                    <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 text-xs px-2 py-1">
                      <Wrench className="w-3 h-3 mr-1" />
                      SERVICE
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
