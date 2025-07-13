
import { Button } from "@/components/ui/button";
import { Home, Search, Plus, MessageCircle, User, Menu } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          <Button variant="ghost" size="sm" className="flex flex-col items-center p-2 text-orange-600">
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-600">
            <Search className="w-5 h-5" />
            <span className="text-xs mt-1">Search</span>
          </Button>
          
          <Button 
            size="sm" 
            className="flex flex-col items-center p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12"
          >
            <Plus className="w-6 h-6" />
          </Button>
          
          <Button variant="ghost" size="sm" className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-600">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs mt-1">Chat</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-600">
            <Menu className="w-5 h-5" />
            <span className="text-xs mt-1">Menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
