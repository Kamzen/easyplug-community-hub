import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListings, listings } from "@/components/FeaturedListings";
import { ListingTile } from "@/components/FeaturedListings";
import { AuthModal } from "@/components/AuthModal";
import { NavBar } from "@/components/NavBar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  // Get user state from local storage
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar
        isLoggedIn={isLoggedIn}
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <HeroSection />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={() => navigate("/start-selling")}
                className="w-full h-14 bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all animate-float"
              >
                <Plus className="w-6 h-6 mr-3" />
                Start Selling Now
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/browse")}
                className="w-full h-14 border-2 border-primary/40 text-primary hover:bg-primary hover:text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                Browse Marketplace
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Popular picks around Polokwane
            </h2>
            {/* Home ads row carousel */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Sponsored suggestions</h3>
              </div>
              <div className="relative">
                <Carousel
                  className="w-full"
                  opts={{ align: "start", loop: false }}
                >
                  <CarouselContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <CarouselItem
                        key={`home-ads-${n}`}
                        className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
                        <ListingTile
                          // Casting to unknown then to the exported ListingItem type from FeaturedListings
                          listing={
                            {
                              id: Number(`300000${n}`),
                              title: `Special offer ${n}`,
                              price: "Sponsored",
                              location: "Featured",
                              rating: 5,
                              reviews: 0,
                              image: `https://picsum.photos/seed/${n}/600/360`,
                              timeAgo: "Just now",
                              verified: false,
                              category: "Sponsored"
                            } as unknown as Parameters<
                              typeof ListingTile
                            >[0]["listing"]
                          }
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              </div>
            </div>
            <FeaturedListings
              items={listings}
              sponsoredRow={{
                after: 8,
                items: [
                  {
                    id: "home-mid-1",
                    title: "Local Pro Cleaning",
                    image:
                      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&auto=format&fit=crop"
                  },
                  {
                    id: "home-mid-2",
                    title: "Mobile Mechanics",
                    image:
                      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop"
                  },
                  {
                    id: "home-mid-3",
                    title: "Chef at Home",
                    image:
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop"
                  },
                  {
                    id: "home-mid-4",
                    title: "Handyman Special",
                    image:
                      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop"
                  }
                ]
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
