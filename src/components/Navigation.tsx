
import { Button } from "@/components/ui/button";
import { Home, Search, Plus, MessageCircle, Menu, Sparkles } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-around py-2 px-2 max-w-md mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center p-3 text-primary hover:text-primary hover:bg-primary/10 min-h-[64px] rounded-xl transition-all"
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 min-h-[64px] rounded-xl transition-all"
          >
            <Search className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Explore</span>
          </Button>
          
          <Button 
            size="sm" 
            className="flex flex-col items-center p-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[64px] min-h-[64px] -mt-4 relative animate-pulse-glow"
          >
            <Plus className="w-7 h-7" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-ping"></div>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 min-h-[64px] rounded-xl transition-all"
          >
            <MessageCircle className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Chat</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 min-h-[64px] rounded-xl transition-all"
          >
            <Menu className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">More</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
