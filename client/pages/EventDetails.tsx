import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Calendar, Clock, Users, Share2 } from "lucide-react";
import { mockFeaturedEvents } from "@/data/mockData";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = mockFeaturedEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The event you're looking for doesn't exist.
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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 w-full">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="space-y-6">
            {/* Event Banner */}
            <div className="h-96 rounded-xl overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title & Category */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      {event.category}
                    </span>
                    {event.rating && (
                      <span className="flex items-center gap-1 text-sm">
                        ★ {event.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                    {event.title}
                  </h1>
                </div>

                {/* Event Info */}
                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-semibold">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Clock className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-semibold">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Venue</p>
                      <p className="font-semibold">{event.venue}</p>
                    </div>
                  </div>
                </Card>

                {/* Description */}
                <Card className="p-6">
                  <h3 className="text-2xl font-bold mb-4">About This Event</h3>
                  <p className="text-foreground leading-relaxed">
                    {event.description || "This is an amazing event you won't want to miss! Join us for an unforgettable experience with world-class entertainment and performances."}
                  </p>
                </Card>

                {/* Venue Details */}
                <Card className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Venue Details</h3>
                  <div className="space-y-4">
                    <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Map preview coming soon</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-semibold text-foreground">
                        {event.venue}, Mumbai
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Capacity</p>
                        <p className="font-semibold text-foreground">33,108 Seats</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Facilities</p>
                        <p className="font-semibold text-foreground">Wheelchair Accessible</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 sticky top-24">
                  <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                  <p className="text-3xl font-bold text-accent mb-6">
                    PKR {event.price.toLocaleString()}
                  </p>

                  <Link to={`/events/${event.id}/seats`} className="block">
                    <Button className="w-full btn-primary rounded-lg h-12 mb-3">
                      Choose Your Seats
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full rounded-lg border-2 border-primary text-primary hover:bg-primary/5"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Event
                  </Button>
                </Card>

                {/* Quick Info */}
                <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
                  <div className="flex gap-2 text-sm">
                    <Users className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-semibold text-foreground">Selling Fast</p>
                      <p className="text-xs text-muted-foreground">
                        Only 450 seats left
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
