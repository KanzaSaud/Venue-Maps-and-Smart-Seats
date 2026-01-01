import { useSeatSelection } from "@/store/SeatSelectionContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function SeatSummary() {
  const { selectedSeats, totalPrice, removeSeat } = useSeatSelection();

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      standard: { label: "Standard", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
      vip: { label: "VIP", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
      vvip: { label: "VVIP", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
      disabled: { label: "Accessible", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    };
    return badges[category] || badges.standard;
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/10">
        <h3 className="font-bold text-lg text-foreground mb-1">Booking Summary</h3>
        <p className="text-sm text-muted-foreground">
          {selectedSeats.length} seat{selectedSeats.length !== 1 ? "s" : ""} selected
        </p>
      </Card>

      {/* Seats List */}
      {selectedSeats.length > 0 ? (
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-2">
            {selectedSeats.map((seat) => {
              const badge = getCategoryBadge(seat.category);
              return (
                <Card
                  key={seat.id}
                  className="p-3 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-foreground">
                        {seat.row}{seat.number}
                      </span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", badge.color)}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {seat.section}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">
                      PKR{seat.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeSeat(seat.id)}
                      className="text-destructive hover:text-destructive/80 transition-colors mt-1"
                      aria-label="Remove seat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center py-8">
          <div>
            <p className="text-muted-foreground mb-2">No seats selected yet</p>
            <p className="text-xs text-muted-foreground">
              Click on seats in the map to add them
            </p>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Price Summary */}
      <Card className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">
              PKR {totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Convenience Fee</span>
            <span className="font-medium text-foreground">
              PKR {Math.round(totalPrice * 0.05).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="font-medium text-foreground">
              PKR {Math.round(totalPrice * 0.18).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="font-bold text-foreground">Total</span>
            <span className="text-xl font-bold text-accent">
              PKR {Math.round(totalPrice * 1.23).toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      {/* CTA Buttons */}
      <div className="space-y-3 sticky bottom-0 pt-4">
        <Link to="/checkout" className="block">
          <Button
            disabled={selectedSeats.length === 0}
            className={cn(
              "w-full h-12 rounded-lg flex items-center justify-center gap-2 font-bold",
              selectedSeats.length > 0
                ? "btn-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            <CheckCircle className="w-5 h-5" />
            Proceed to Checkout
          </Button>
        </Link>
        <Button
          variant="outline"
          className="w-full rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
