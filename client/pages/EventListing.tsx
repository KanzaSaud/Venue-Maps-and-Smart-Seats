import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { mockFeaturedEvents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EventListing() {
  const [events] = useState(mockFeaturedEvents);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Browse Events
            </h1>
            <p className="text-muted-foreground">
              Discover amazing events in your area
            </p>
          </div>

          {/* Filters would go here */}
          <div className="mb-8 p-4 bg-card rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              💡 Filter functionality coming soon
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
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
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button className="btn-primary rounded-lg px-8 py-3">
              Load More Events
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
