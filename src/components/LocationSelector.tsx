
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MapPin, ChevronDown } from "lucide-react";

const locations = [
  "Polokwane",
  "Moletjie", 
  "Ga-Rampuru",
  "Seshego",
  "Lebowakgomo",
  "Mokopane",
  "Tzaneen",
  "Phalaborwa",
  "Burgersfort",
  "Groblersdal"
];

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export const LocationSelector = ({ selectedLocation, onLocationChange }: LocationSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gradient-to-r from-background/80 to-muted/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-sm max-w-[140px] rounded-full shadow-md transition-all"
        >
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-primary" />
          <span className="truncate font-medium">{selectedLocation}</span>
          <ChevronDown className="w-4 h-4 ml-1 flex-shrink-0 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-2xl z-50 p-2"
      >
        {locations.map((location) => (
          <DropdownMenuItem 
            key={location}
            onClick={() => onLocationChange(location)}
            className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer rounded-xl p-3 transition-all"
          >
            <MapPin className="w-4 h-4 mr-3 text-primary" />
            <span className="font-medium">{location}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
