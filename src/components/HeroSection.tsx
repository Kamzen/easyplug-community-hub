
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, ShoppingBag } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Connect, Buy & Sell with Your Neighbors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            EasyPlug connects local South African communities. Trade with verified neighbors, 
            support local SMMEs, and build stronger community relationships.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="text-center">
            <div className="bg-white rounded-lg p-3 shadow-sm mb-2 mx-auto w-12 h-12 flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-lg font-semibold text-gray-900">1,000+</div>
            <div className="text-sm text-gray-600">Local Traders</div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-lg p-3 shadow-sm mb-2 mx-auto w-12 h-12 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-lg font-semibold text-gray-900">5,000+</div>
            <div className="text-sm text-gray-600">Items Listed</div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-lg p-3 shadow-sm mb-2 mx-auto w-12 h-12 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-lg font-semibold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Local Areas</div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center space-x-2 mt-6">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            ✓ Verified Locals
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            ✓ Safe Meetups
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            ✓ Community Driven
          </Badge>
        </div>
      </div>
    </section>
  );
};
