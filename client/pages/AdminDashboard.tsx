import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, BarChart3, Calendar, MapPin } from "lucide-react";
import { useState } from "react";


export default function AdminDashboard() {
 const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setSelectedFile(e.target.files[0]);
  }
};

// const handleUpload = async () => {
//   if (!selectedFile) return;
//   setUploading(true);

//   const formData = new FormData();
//   formData.append("image", selectedFile);

//   try {
//     const res = await fetch("/api/venues/1/map-image", {
//       method: "POST",
//       body: formData,
//     });
//     const data = await res.json();
//     console.log("Upload success:", data);
//     alert("Upload success!");
//     setSelectedFile(null);
//     setShowUpload(false);
//   } catch (err) {
//     console.error(err);
//     alert("Upload failed");
//   } finally {
//     setUploading(false);
//   }
// };
// const handleUpload = async (file: File) => {
//   const formData = new FormData();
//   formData.append("image", file);

//   const res = await fetch(`/api/venues/1/process-image`, {
//     method: "POST",
//     body: formData,
//   });

//   const data = await res.json();

//   if (data.status === "ok") {
//     alert(`Seats generated successfully: ${data.seats.length} seats`);
//     // You can now proceed to save seats in DB or show them in SeatCanvas
//   } else {
//     alert(`Failed: ${data.message}`);
//   }
// };
const handleUpload = async () => {
  if (!selectedFile) return;

  setUploading(true);

  const formData = new FormData();
  formData.append("image", selectedFile);

  try {
    const res = await fetch("http://127.0.0.1:8000/process-venue-image/1", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.status === "ok") {
      alert(`Seats generated successfully: ${data.seats.length}`);
    } else {
      alert(`Failed: ${data.message}`);
    }
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};



  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary hover:opacity-80 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your events, venues, and view reports
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Events", value: "24", icon: "🎪" },
              { label: "Total Venues", value: "12", icon: "🏢" },
              { label: "Total Revenue", value: "₹45,62,000", icon: "💰" },
              { label: "Tickets Sold", value: "15,234", icon: "🎟️" },
            ].map((stat, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <span className="text-4xl">{stat.icon}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 rounded-lg border-2 border-border">
              <TabsTrigger value="events" className="rounded-lg">
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger value="venues" className="rounded-lg">
                <MapPin className="w-4 h-4 mr-2" />
                Venues
              </TabsTrigger>
              <TabsTrigger value="reports" className="rounded-lg">
                <BarChart3 className="w-4 h-4 mr-2" />
                Reports
              </TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Event Management</h2>
                  <Button className="btn-primary rounded-lg flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Event
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: "Carnival of Lights",
                      date: "Dec 15, 2024",
                      tickets: "8,450/10,000",
                      status: "Active",
                    },
                    {
                      name: "Monkey Business",
                      date: "Dec 18, 2024",
                      tickets: "25,000/33,108",
                      status: "Active",
                    },
                    {
                      name: "Adrenaline",
                      date: "Dec 20, 2024",
                      tickets: "450/500",
                      status: "Almost Full",
                    },
                  ].map((event, idx) => (
                    <Card
                      key={idx}
                      className="p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        <p className="font-bold text-foreground">{event.name}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {event.tickets}
                        </p>
                        <p className={`text-xs font-semibold ${
                          event.status === "Active"
                            ? "text-accent"
                            : "text-yellow-600 dark:text-yellow-500"
                        }`}>
                          {event.status}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mt-6">
                  💡 Full event management interface coming soon
                </p>
              </Card>
            </TabsContent>

            {/* Venues Tab */}
            <TabsContent value="venues" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Venue Management</h2>
                  <Button className="btn-primary rounded-lg flex items-center gap-2"
                  onClick={() => setShowUpload(!showUpload)}>
                    <Plus className="w-4 h-4" />
                    Add Venue
                  </Button>
                  {showUpload && (
  <div className="mt-4 p-4 border-2 border-dashed border-border rounded-lg flex flex-col gap-2">
    <input type="file" accept="image/*" onChange={handleFileChange} />
    {selectedFile && <p className="text-sm text-muted-foreground">{selectedFile.name}</p>}
    <div className="flex gap-2">
      <button
        onClick={handleUpload}
        disabled={uploading || !selectedFile}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {uploading ? "Uploading..." : "Upload Venue Map"}
      </button>
      <button
        onClick={() => { setShowUpload(false); setSelectedFile(null); }}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
)}

                </div>

                <div className="space-y-3">
                  {[
                    { name: "Arts Council of Pakistan", capacity: "65,000", events: "3" },
                    { name: "The Palm Marquee", capacity: "33,108", events: "2" },
                    { name: "Frere Hall", capacity: "16,000", events: "5" },
                  ].map((venue, idx) => (
                    <Card
                      key={idx}
                      className="p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        <p className="font-bold text-foreground">{venue.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {venue.capacity} capacity
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {venue.events} events
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mt-6">
                  💡 Venue layout editor and seat map creator coming soon
                </p>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Revenue Reports</h2>

                <div className="space-y-4">
                  <Card className="p-4 border-l-4 border-accent">
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-3xl font-bold text-accent">₹45,62,000</p>
                  </Card>

                  <Card className="p-4 border-l-4 border-primary">
                    <p className="text-sm text-muted-foreground">Last Month</p>
                    <p className="text-3xl font-bold text-primary">₹38,90,000</p>
                  </Card>

                  <Card className="p-4 border-l-4 border-green-500">
                    <p className="text-sm text-muted-foreground">Growth</p>
                    <p className="text-3xl font-bold text-green-500">+17.3%</p>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-card rounded-lg border-2 border-border h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization coming soon</p>
                </div>

                <div className="mt-6 space-y-3">
                  <h3 className="font-bold text-foreground">Occupancy Heatmap</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg"
                        style={{
                          backgroundColor: `rgba(26, 195, 125, ${Math.random() * 0.6 + 0.2})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
