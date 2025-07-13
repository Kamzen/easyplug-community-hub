
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
          className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-muted/50 text-xs sm:text-sm max-w-[120px] sm:max-w-[160px]"
        >
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{selectedLocation}</span>
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 sm:w-56 bg-background/95 backdrop-blur-md border-border/50 shadow-xl z-50"
      >
        {locations.map((location) => (
          <DropdownMenuItem 
            key={location}
            onClick={() => onLocationChange(location)}
            className="hover:bg-muted/50 focus:bg-muted/50 cursor-pointer"
          >
            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{location}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
