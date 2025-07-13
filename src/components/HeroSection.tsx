
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, ShoppingBag, Star } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
              Connect, Buy & Sell with Your
              <span className="block text-primary">Local Community</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              EasyPlug connects local South African communities. Trade with verified neighbors, 
              support local SMMEs, and build stronger relationships.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 lg:p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">1,000+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Local Traders</div>
            </div>
            
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 lg:p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="bg-accent/10 rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-accent" />
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">5,000+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Items Listed</div>
            </div>
            
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 lg:p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">50+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Local Areas</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 px-3 py-1">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Verified Locals
            </Badge>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-3 py-1">
              <MapPin className="w-3 h-3 mr-1" />
              Safe Meetups
            </Badge>
            <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 px-3 py-1">
              <Users className="w-3 h-3 mr-1" />
              Community Driven
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
