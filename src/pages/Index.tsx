import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListings } from "@/components/FeaturedListings";
import { AuthModal } from "@/components/AuthModal";
import { NavBar } from "@/components/NavBar";

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
            <FeaturedListings />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
