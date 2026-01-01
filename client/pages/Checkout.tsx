import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, CreditCard, Banknote, Smartphone } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();

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

          <h1 className="text-4xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Selected Seats */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Selected Seats</h2>
                <p className="text-muted-foreground text-sm">
                  Your seat selections will appear here
                </p>
              </Card>

              {/* Customer Info */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Your Details</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="mt-1 rounded-lg border-2 border-border focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="mt-1 rounded-lg border-2 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1 rounded-lg border-2 border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+92 98765 43210"
                      className="mt-1 rounded-lg border-2 border-border focus:border-primary"
                    />
                  </div>
                </form>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-primary rounded-lg cursor-pointer hover:bg-primary/5">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                    <CreditCard className="w-5 h-5 ml-3 text-accent" />
                    <span className="ml-3 font-medium text-foreground">
                      Credit / Debit Card
                    </span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-card">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <Banknote className="w-5 h-5 ml-3 text-accent" />
                    <span className="ml-3 font-medium text-foreground">
                      Bank Transfer
                    </span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-card">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <Smartphone className="w-5 h-5 ml-3 text-accent" />
                    <span className="ml-3 font-medium text-foreground">
                      Mobile Wallet
                    </span>
                  </label>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>

                <div className="space-y-3 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
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

                <div className="flex justify-between mt-4 mb-6">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-accent">PKR 3,690</span>
                </div>

                <Link to="/booking/success" className="block">
                  <Button className="w-full btn-primary rounded-lg h-12 mb-3">
                    Complete Payment
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full rounded-lg border-2 border-border hover:border-primary"
                >
                  Continue Shopping
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
