import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeatFiltersProps {
  onPriceRangeChange?: (min: number, max: number) => void;
  onSectionChange?: (section: string) => void;
  onAccessibilityChange?: (enabled: boolean) => void;
}

export default function SeatFilters({
  onPriceRangeChange,
  onSectionChange,
  onAccessibilityChange,
}: SeatFiltersProps) {
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [selectedSection, setSelectedSection] = useState("all");
  const [showAccessible, setShowAccessible] = useState(false);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onPriceRangeChange?.(value[0], value[1]);
  };

  const handleSectionChange = (value: string) => {
    setSelectedSection(value);
    onSectionChange?.(value);
  };

  const handleAccessibilityChange = (checked: boolean) => {
    setShowAccessible(checked);
    onAccessibilityChange?.(checked);
  };

  return (
    <div className="space-y-4">
      {/* Price Range Filter */}
      <Card className="p-4">
        <h4 className="font-semibold text-foreground mb-4">Price Range</h4>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={5000}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>PKR {priceRange[0].toLocaleString()}</span>
            <span>PKR {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Section Filter */}
      <Card className="p-4">
        <h4 className="font-semibold text-foreground mb-4">Section</h4>
        <Select value={selectedSection} onValueChange={handleSectionChange}>
          <SelectTrigger className="bg-background border-2 border-border hover:border-primary focus:border-primary transition-colors rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sections</SelectItem>
            <SelectItem value="front">Front Section</SelectItem>
            <SelectItem value="premium">Premium Section</SelectItem>
            <SelectItem value="vip">VIP Section</SelectItem>
            <SelectItem value="wheelchair">Wheelchair Access</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Accessibility Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id="accessibility"
            checked={showAccessible}
            onCheckedChange={(checked) =>
              handleAccessibilityChange(checked as boolean)
            }
          />
          <Label
            htmlFor="accessibility"
            className="text-sm font-medium text-foreground cursor-pointer flex-1"
          >
            Accessibility Seating Only
          </Label>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Filter to show only wheelchair accessible seats
        </p>
      </Card>

      {/* Category Legend */}
      <Card className="p-4 bg-card/50">
        <h4 className="font-semibold text-foreground mb-3 text-sm">
          By Category
        </h4>
        <div className="space-y-2">
          {[
            { label: "Standard", price: "PKR 500" },
            { label: "VIP", price: "PKR 1000" },
            { label: "VVIP", price: "PKR 2000" },
          ].map((item) => (
            <label
              key={item.label}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 cursor-pointer transition-colors"
            >
              <Checkbox defaultChecked />
              <span className="text-sm text-foreground flex-1">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.price}</span>
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}
