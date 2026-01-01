import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EventCardProps {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  image: string;
  category: string;
  price: number;
  rating?: number;
  className?: string;
}

export default function EventCard({
  id,
  title,
  venue,
  date,
  time,
  image,
  category,
  price,
  rating,
  className,
}: EventCardProps) {
  return (
    <Card className={cn("overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105", className)}>
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            {category}
          </span>
        </div>
        {rating && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            ★ {rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Venue */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 flex-shrink-0 text-accent" />
          <span className="truncate">{venue}</span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4 flex-shrink-0 text-accent" />
          <span>{date} at {time}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex flex-col leading-tight">
            <span className="text-xs text-muted-foreground">Starting from</span>
            <span className="text-lg font-bold text-primary">
              PKR {price.toLocaleString()}
            </span>
          </div>

          <Link to={`/events/${id}/seats`}>
            <Button className="btn-primary text-sm">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
