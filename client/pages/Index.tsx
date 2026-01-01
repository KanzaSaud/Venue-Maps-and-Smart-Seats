import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar, { SearchFilters } from "@/components/SearchBar";
import FeaturedEventsCarousel from "@/components/FeaturedEventsCarousel";
import CategoriesGrid from "@/components/CategoriesGrid";
import VenueCard from "@/components/VenueCard";
import { Button } from "@/components/ui/button";
import { mockFeaturedEvents, mockVenues } from "@/data/mockData";
import { Link } from "react-router-dom";

export default function Index() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    city: "",
    category: "",
    date: null,
  });

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    // In a real app, this would trigger an API call or filter the events
    console.log("Search filters:", filters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 -z-10" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
          {/* Main Hero Content */}
          <div className="space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Welcome to VenueTicket</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Book Your Perfect
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}Event Tickets
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Discover amazing events near you with our smart seat selection system.
              From concerts to sports, find and book your tickets in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/events">
                <Button className="btn-primary h-12 px-8 text-base rounded-lg flex items-center gap-2 w-full sm:w-auto">
                  Explore Events
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-12 px-8 text-base rounded-lg border-2 border-primary text-primary hover:bg-primary/5 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-12">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <main className="flex-1 w-full">
        {/* Featured Events Section */}
        <section className="section-padding border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Featured Events
                </h2>
                <p className="text-muted-foreground">
                  Trending this week - Don't miss out!
                </p>
              </div>
              <Button
                variant="outline"
                className="hidden md:flex rounded-lg border-2 border-primary text-primary hover:bg-primary/5"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <FeaturedEventsCarousel events={mockFeaturedEvents} />
          </div>
        </section>

        {/* Categories Section */}
        <section className="section-padding border-b border-border bg-card/50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Browse by Category
              </h2>
              <p className="text-muted-foreground">
                Find events that match your interests
              </p>
            </div>

            <CategoriesGrid onCategorySelect={(categoryId) => {
              console.log("Selected category:", categoryId);
            }} />
          </div>
        </section>

        {/* Popular Venues Section */}
        <section className="section-padding border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Popular Venues
                </h2>
                <p className="text-muted-foreground">
                  Host to amazing events
                </p>
              </div>
              <Button
                variant="outline"
                className="hidden md:flex rounded-lg border-2 border-primary text-primary hover:bg-primary/5"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVenues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  id={venue.id}
                  name={venue.name}
                  location={venue.location}
                  capacity={venue.capacity}
                  image={venue.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Book Your Next Event?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of happy customers who found their perfect event tickets
              using VenueTicket's smart seat selection system.
            </p>
            <Button className="btn-primary h-12 px-8 text-base rounded-lg flex items-center gap-2 mx-auto">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Choose VenueTicket?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Seat Selection",
                  description:
                    "Interactive venue maps with real-time availability and intelligent seat recommendations.",
                  icon: "🎯",
                },
                {
                  title: "Secure Booking",
                  description:
                    "Fast, secure transactions with multiple payment options and instant confirmations.",
                  icon: "🔒",
                },
                {
                  title: "Best Prices",
                  description:
                    "Competitive pricing with exclusive deals and early bird discounts for popular events.",
                  icon: "💰",
                },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-card/50 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Events Listed", value: "10,000+" },
                { label: "Happy Customers", value: "500K+" },
                { label: "Tickets Sold", value: "2M+" },
                { label: "Partner Venues", value: "200+" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
