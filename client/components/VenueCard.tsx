import { Users, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VenueCardProps {
  id: string;
  name: string;
  location: string;
  capacity: number;
  image: string;
  className?: string;
}

export default function VenueCard({
  id,
  name,
  location,
  capacity,
  image,
  className,
}: VenueCardProps) {
  return (
    <Card className={cn("overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105", className)}>
      {/* Image */}
      <div className="relative h-40 md:h-48 overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 flex-shrink-0 text-accent" />
          <span>{location}</span>
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Users className="w-4 h-4 flex-shrink-0 text-accent" />
          <span>{capacity.toLocaleString()} Seats</span>
        </div>

        {/* CTA */}
        <Button className="w-full btn-accent">
          View Events
        </Button>
      </div>
    </Card>
  );
}
