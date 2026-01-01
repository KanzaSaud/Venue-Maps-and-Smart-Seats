import { useSeatSelection } from "@/store/SeatSelectionContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SeatLegend() {
  const { selectedSeats, totalPrice, clearSelection } = useSeatSelection();

  const seatCategories = [
    { category: "standard", label: "Standard", color: "bg-blue-400", price: "PKR 500" },
    { category: "vip", label: "VIP", color: "bg-purple-400", price: "PKR 1000" },
    { category: "vvip", label: "VVIP", color: "bg-red-400", price: "PKR 2000" },
    { category: "disabled", label: "Accessible", color: "bg-green-400", price: "PKR 500" },
  ];

  return (
    <div className="space-y-6">
      {/* Legend */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4 text-foreground">Seat Categories</h3>
        <div className="space-y-3">
          {seatCategories.map((item) => (
            <div key={item.category} className="flex items-center gap-3">
              <div className={cn("w-4 h-4 rounded-full", item.color)} />
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">{item.label}</p>
              </div>
              <span className="text-xs text-muted-foreground">{item.price}</span>
            </div>
          ))}

          {/* Additional Indicators */}
          <div className="border-t border-border pt-3 mt-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-accent" />
              <p className="text-sm text-foreground">Selected</p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-4 h-4 rounded-full bg-gray-400" />
              <p className="text-sm text-muted-foreground">Unavailable</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Selected Seats Summary */}
      <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
        <h3 className="font-bold text-lg mb-4 text-foreground">Selection Summary</h3>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Selected Seats:</span>
            <span className="font-bold text-foreground">{selectedSeats.length}</span>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex justify-between">
              <span className="font-bold text-foreground">Total Price:</span>
              <span className="text-xl font-bold text-accent">PKR {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <Button
            variant="outline"
            onClick={clearSelection}
            className="w-full flex items-center gap-2 text-destructive hover:text-destructive border-destructive/50 hover:border-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Clear Selection
          </Button>
        )}
      </Card>

      {/* Best Available Seats */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4 text-foreground">Quick Actions</h3>
        <Button className="w-full btn-primary mb-3">
          🎯 Best Available Seats
        </Button>
        <Button variant="outline" className="w-full rounded-lg border-2 border-primary text-primary hover:bg-primary/5">
          👨‍👩‍👧‍👦 Group Selection
        </Button>
      </Card>

      {/* Info */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-900 dark:text-blue-100">
          💡 <strong>Tip:</strong> Hover over seats to see details. Click to select.
        </p>
      </Card>
    </div>
  );
}
