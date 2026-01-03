import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SeatSelectionProvider } from "@/store/SeatSelectionContext";
import SeatLegend from "@/components/SeatMap/SeatLegend";
import SeatFilters from "@/components/SeatMap/SeatFilters";
import SeatCanvas from "@/components/SeatMap/SeatCanvas";
import SeatSummary from "@/components/SeatMap/SeatSummary";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { mockFeaturedEvents } from "@/data/mockData";

export default function SeatMap() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the event details
  const event = mockFeaturedEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Button
              className="btn-primary rounded-lg"
              onClick={() => navigate("/events")}
            >
              Back to Events
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <SeatSelectionProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        {/* Event Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center gap-2 hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {event.title}
              </h1>
              <p className="text-muted-foreground">
                {event.date} at {event.time} • {event.venue}
              </p>
            </div>
          </div>
        </div>

        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Panel - Legend & Filters */}
              <div className="lg:col-span-1 space-y-6">
                <SeatLegend />
                <div>
                  <h3 className="font-bold text-lg mb-4 text-foreground">
                    Filters
                  </h3>
                  <SeatFilters />
                </div>
              </div>

              {/* Center Panel - Seat Map */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Select Your Seats
                  </h2>
                  <SeatCanvas venueId={event.venueId} />
                </Card>
              </div>

              {/* Right Panel - Summary */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24 max-h-[calc(100vh-120px)] flex flex-col">
                  <SeatSummary />
                </Card>
              </div>
            </div>

            {/* Additional Info */}
            <Card className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-foreground mb-2">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground">Venue Capacity</p>
                  <p className="font-bold text-foreground">33,108 Seats</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Available Seats</p>
                  <p className="font-bold text-foreground">12,450 Seats</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Price Range</p>
                  <p className="font-bold text-foreground">
                    PKR 500 - PKR 2,000
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </SeatSelectionProvider>
  );
}
