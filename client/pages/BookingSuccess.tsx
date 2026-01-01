import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, Smartphone, ArrowRight } from "lucide-react";

export default function BookingSuccess() {
  const [orderId] = useState("VT2024001234");
  const [qrCode] = useState("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=VT2024001234");

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 w-full">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
          {/* Success Animation */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent to-green-400 mb-6 animate-pulse-gentle">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Your tickets are ready
            </p>
            <p className="text-sm text-muted-foreground">
              Check your email for confirmation and details
            </p>
          </div>

          {/* Order Details */}
          <Card className="p-6 md:p-8 mb-8 bg-gradient-to-br from-accent/10 to-primary/10">
            <div className="grid grid-cols-2 gap-6 text-center mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  {orderId}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Booking Date</p>
                <p className="text-2xl md:text-3xl font-bold text-accent">
                  Today
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Event</p>
                  <p className="font-semibold text-foreground">
                    Carnival of Lights
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dec 15, 2024 at 7:30 PM
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Seats</p>
                  <p className="font-semibold text-foreground">
                    A1, A2, A3
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Front Section
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* QR Code */}
          <Card className="p-8 text-center mb-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Your Ticket</h3>
            <div className="flex justify-center mb-6 p-4 bg-white rounded-lg inline-block w-full md:w-auto md:mx-auto md:block">
              <img
                src={qrCode}
                alt="QR Code"
                className="w-48 h-48"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Show this QR code at the venue for entry
            </p>
          </Card>

          {/* Price Summary */}
          <Card className="p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Amount Paid</h3>
            <div className="space-y-3 pb-4 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">3 Tickets × PKR 1,000</span>
                <span className="font-medium">PKR 3,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Convenience Fee</span>
                <span className="font-medium">PKR 150</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="font-medium">PKR 540</span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <span className="font-bold">Total Paid</span>
              <span className="text-2xl font-bold text-accent">PKR 3,690</span>
            </div>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button className="btn-primary rounded-lg h-12 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Ticket
            </Button>
            <Button
              variant="outline"
              className="rounded-lg h-12 border-2 border-accent text-accent hover:bg-accent/5 flex items-center justify-center gap-2"
            >
              <Smartphone className="w-5 h-5" />
              Add to Wallet
            </Button>
          </div>

          {/* Next Steps */}
          <Card className="p-6 mb-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-foreground mb-3">Next Steps</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>A confirmation email has been sent to your email address</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Save your ticket or add it to your mobile wallet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Show the QR code at the venue entrance on the day of the event</span>
              </li>
            </ul>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="flex-1">
              <Button className="w-full btn-primary rounded-lg h-12 flex items-center justify-center gap-2">
                Back to Home
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="flex-1 rounded-lg h-12 border-2 border-primary text-primary hover:bg-primary/5"
            >
              Share with Friends
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
