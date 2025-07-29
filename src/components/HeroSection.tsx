import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  ShoppingBag,
  Star,
  Sparkles,
  Heart
} from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute top-32 right-16 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/30 rounded-full blur-lg animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-6 mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                South Africa's Local Marketplace
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Connect & Trade with
              <span className="block gradient-text">Your Community</span>
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of locals buying, selling, and supporting each
              other. From fresh produce to professional services - discover it
              all nearby.
            </p>
          </div>

          {/* Stats Cards with new design */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mb-12">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative bg-background/90 backdrop-blur-sm rounded-3xl p-6 border border-border/50 hover:border-primary/30 transition-all transform hover:scale-105">
                <div className="bg-gradient-to-br from-primary to-accent rounded-2xl w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold gradient-text">5K+</div>
                <div className="text-sm text-muted-foreground">
                  Active Locals
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative bg-background/90 backdrop-blur-sm rounded-3xl p-6 border border-border/50 hover:border-accent/30 transition-all transform hover:scale-105">
                <div className="bg-gradient-to-br from-accent to-primary rounded-2xl w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="text-2xl font-bold gradient-text">15K+</div>
                <div className="text-sm text-muted-foreground">
                  Items Listed
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative bg-background/90 backdrop-blur-sm rounded-3xl p-6 border border-border/50 hover:border-primary/30 transition-all transform hover:scale-105">
                <div className="bg-gradient-to-br from-primary to-accent rounded-2xl w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold gradient-text">100+</div>
                <div className="text-sm text-muted-foreground">Local Areas</div>
              </div>
            </div>
          </div>

          {/* Trust Badges with enhanced design */}
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-700 border-emerald-200 hover:from-emerald-500/20 hover:to-emerald-600/20 px-4 py-2 rounded-full">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Verified Locals
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200 hover:from-blue-500/20 hover:to-blue-600/20 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 mr-2" />
              Safe Meetups
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-200 hover:from-purple-500/20 hover:to-purple-600/20 px-4 py-2 rounded-full">
              <Heart className="w-4 h-4 mr-2" />
              Community First
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
