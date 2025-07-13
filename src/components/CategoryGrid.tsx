
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
  Sparkles,
  Zap
} from "lucide-react";

const categories = [
  {
    name: "Services",
    icon: Wrench,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-500/10 to-blue-600/10",
    items: ["Plumbing", "Gardening", "Repairs"],
    count: "120+ listings",
    type: "service"
  },
  {
    name: "Food & Fresh",
    icon: Utensils,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/10 to-emerald-600/10",
    items: ["Fresh Produce", "Baked Goods", "Catering"],
    count: "85+ listings",
    type: "new"
  },
  {
    name: "Fashion",
    icon: Shirt,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-500/10 to-pink-600/10",
    items: ["Clothing", "Shoes", "Accessories"],
    count: "200+ listings",
    type: "used"
  },
  {
    name: "Home & Garden",
    icon: Home,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    items: ["Furniture", "Kitchen", "Appliances"],
    count: "150+ listings",
    type: "both"
  },
  {
    name: "Baby & Kids",
    icon: Baby,
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-500/10 to-rose-600/10",
    items: ["Toys", "Clothes", "Equipment"],
    count: "90+ listings",
    type: "used"
  },
  {
    name: "Electronics",
    icon: Laptop,
    gradient: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-500/10 to-purple-600/10",
    items: ["Phones", "Computers", "TVs"],
    count: "110+ listings",
    type: "both"
  },
  {
    name: "Transport",
    icon: Car,
    gradient: "from-red-500 to-orange-600",
    bgGradient: "from-red-500/10 to-orange-600/10",
    items: ["Cars", "Bikes", "Parts"],
    count: "45+ listings",
    type: "used"
  },
  {
    name: "Free Items",
    icon: Gift,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-500/10 to-green-600/10",
    items: ["Donations", "Giveaways", "Community"],
    count: "30+ listings",
    type: "free"
  }
];

export const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {categories.map((category, index) => {
        const IconComponent = category.icon;
        return (
          <Card 
            key={category.name} 
            className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-border/30 hover:border-primary/30 bg-background/60 backdrop-blur-sm transform hover:scale-105"
            style={{animationDelay: `${index * 100}ms`}}
          >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <CardContent className="relative p-4 lg:p-6 text-center">
              <div className="relative mb-4">
                <div className={`bg-gradient-to-br ${category.gradient} rounded-2xl w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  <IconComponent className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity"></div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-bold text-base lg:text-lg text-foreground group-hover:gradient-text transition-all">
                  {category.name}
                </h3>
                
                <div className="space-y-2">
                  {category.items.slice(0, 2).map((item) => (
                    <div key={item} className="text-xs sm:text-sm text-muted-foreground">{item}</div>
                  ))}
                  <div className="text-xs font-semibold text-primary">{category.count}</div>
                </div>

                <div className="flex justify-center">
                  {category.type === "free" && (
                    <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-700 border-green-200 text-xs px-3 py-1 rounded-full">
                      <Heart className="w-3 h-3 mr-1 fill-current" />
                      FREE
                    </Badge>
                  )}
                  {category.type === "new" && (
                    <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-700 border-blue-200 text-xs px-3 py-1 rounded-full">
                      <Sparkles className="w-3 h-3 mr-1" />
                      NEW
                    </Badge>
                  )}
                  {category.type === "service" && (
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-700 border-purple-200 text-xs px-3 py-1 rounded-full">
                      <Zap className="w-3 h-3 mr-1" />
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
