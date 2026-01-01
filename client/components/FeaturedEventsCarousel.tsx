import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  image: string;
  category: string;
  price: number;
  rating?: number;
}

interface FeaturedEventsCarouselProps {
  events: Event[];
}

export default function FeaturedEventsCarousel({ events }: FeaturedEventsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", skipSnaps: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const onSelect = () => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {events.map((event) => (
            <div key={event.id} className="flex-shrink-0 min-w-0 w-full sm:w-1/2 lg:w-1/3">
              <EventCard
                id={event.id}
                title={event.title}
                venue={event.venue}
                date={event.date}
                time={event.time}
                image={event.image}
                category={event.category}
                price={event.price}
                rating={event.rating}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 rounded-full",
          "hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 border-0 disabled:opacity-50"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 rounded-full",
          "hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 border-0 disabled:opacity-50"
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Mobile Navigation (Dots) */}
      <div className="flex md:hidden justify-center gap-2 mt-6">
        {events.map((_, idx) => (
          <button
            key={idx}
            className="w-2 h-2 rounded-full bg-border hover:bg-primary transition-colors"
            onClick={() => emblaApi?.scrollTo(idx)}
          />
        ))}
      </div>
    </div>
  );
}
