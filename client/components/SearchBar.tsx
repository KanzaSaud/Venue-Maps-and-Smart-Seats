import { useState } from "react";
import { Search, MapPin, Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  city: string;
  category: string;
  date: Date | null;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ city, category, date });
    }
  };

  const categories = [
    "All Categories",
    "Music",
    "Festivals",
    "Comedy",
    "Sports",
    "Theatre",
    "Dance",
    "Cinema",
  ];

  const cities = [
    "All Cities",
    "Islamabad",
    "Karachi",
    "Lahore",
    "Multan",
    "Quetta",
    "Bahawalpur",
    "Hyderabad",
    "Peshawar",
    "Jacobabad",
  ];

  return (
    <div className="w-full bg-white dark:bg-card rounded-2xl shadow-xl p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* City Selector */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            <MapPin className="w-4 h-4 text-accent" />
            City
          </label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="bg-background border-2 border-border hover:border-primary focus:border-primary transition-colors rounded-lg">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Selector */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            <Zap className="w-4 h-4 text-accent" />
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-background border-2 border-border hover:border-primary focus:border-primary transition-colors rounded-lg">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Picker */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            <Calendar className="w-4 h-4 text-accent" />
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal rounded-lg border-2 border-border hover:border-primary",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "MMM dd, yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date || undefined}
                onSelect={setDate}
                disabled={(d) => d < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full btn-primary h-10 rounded-lg flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">Search</span>
          </Button>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2 pt-2">
        <span className="text-xs font-semibold text-muted-foreground">Popular:</span>
        {["Carnival of Lights", "Monkey Business", "Adrenaline"].map((tag) => (
          <button
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium"
            onClick={() => {
              // Handle quick search
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
