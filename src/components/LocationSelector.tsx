
import { useState } from "react";
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
        <Button variant="outline" size="sm" className="bg-white">
          <MapPin className="w-4 h-4 mr-1" />
          {selectedLocation}
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg border">
        {locations.map((location) => (
          <DropdownMenuItem 
            key={location}
            onClick={() => onLocationChange(location)}
            className="hover:bg-gray-50"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {location}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
