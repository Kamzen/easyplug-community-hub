
import { Button } from "@/components/ui/button";
import { Home, Search, Plus, MessageCircle, Menu } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-t border-border/50 shadow-lg z-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-around py-2 sm:py-3 max-w-md mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center p-2 sm:p-3 text-primary hover:text-primary hover:bg-primary/10 min-h-[60px] sm:min-h-[64px]"
          >
            <Home className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center p-2 sm:p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 min-h-[60px] sm:min-h-[64px]"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
            <span className="text-xs font-medium">Search</span>
          </Button>
          
          <Button 
            size="sm" 
            className="flex flex-col items-center p-3 sm:p-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-w-[56px] min-h-[56px] sm:min-w-[64px] sm:min-h-[64px] -mt-2"
          >
            <Plus className="w-6 h-6 sm:w-7 sm:h-7" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center p-2 sm:p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 min-h-[60px] sm:min-h-[64px]"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
            <span className="text-xs font-medium">Chat</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center p-2 sm:p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 min-h-[60px] sm:min-h-[64px]"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
            <span className="text-xs font-medium">Menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
