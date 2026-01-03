import { useState, useEffect } from "react";
import { useSeatSelection, SelectedSeat } from "@/store/SeatSelectionContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
// import { mockSeats } from "@/data/mockData";
import type { Seat } from "@/data/mockData";
import { cn } from "@/lib/utils";
interface SeatCanvasProps {
  venueId: number; // or number if your ID is numeric
}

export default function SeatCanvas({ venueId }: SeatCanvasProps) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [venueSize, setVenueSize] = useState({width: 600, height: 400,});
  const { selectedSeats, addSeat, removeSeat, isSeatSelected } = useSeatSelection();
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
  // fetch("/api/venues/1/seats")
  fetch(`http://localhost:8000/venues/${venueId}/seats`)
    .then((res) => res.json())
    .then((data) => {
      setSeats(data.seats);
      setVenueSize({
        width: data.width,
        height: data.height,
      });
      const normalizedSeats = data.seats.map((s: any) => ({
        id: s.id,
        x: s.x,
        y: s.y,
        row: s.seat_row,
        number: s.seat_number,
        category: s.category,
        price: s.price,
        section: s.section,
        available: s.available,
      }));

      setSeats(normalizedSeats);

    })
      .catch((err) => {
        console.error("Failed to load seat map", err);
      });
  }, [venueId]);


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("/api/venues/1/map-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Upload success:", data);
      alert("Upload success!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "standard":
        return "#3b82f6"; // blue
      case "vip":
        return "#a855f7"; // purple
      case "vvip":
        return "#ef4444"; // red
      case "disabled":
        return "#22c55e"; // green
      default:
        return "#6b7280"; // gray
    }
  };

  const handleSeatClick = (seat: any) => {
    if (!seat.available) return;

    const selectedSeat: SelectedSeat = {
      id: seat.id,
      row: seat.row,
      number: seat.number,
      category: seat.category,
      price: seat.price,
      section: seat.section,
    };

    if (isSeatSelected(seat.id)) {
      removeSeat(seat.id);
    } else {
      addSeat(selectedSeat);
    }
  };

  const handleProcessImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/venues/1/process-image", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log("Seats from Python API:", data.seats);

  setSeats(data.seats);
  setVenueSize({ width: data.width, height: data.height });
};


  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[600px] w-full">
      <div className="flex flex-col gap-2">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button
                onClick={handleUpload}
                disabled={uploading || !selectedFile}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {uploading ? "Uploading..." : "Upload Venue Map"}
              </button>
            </div>
      {/* SVG Venue Map */}
      <div className="overflow-auto bg-card rounded-xl border border-border p-4 w-full">  
        {/* <svg
          viewBox="0 0 600 400" */}
        <svg
          viewBox={`0 0 ${venueSize.width} ${venueSize.height}`}
          className="w-full h-auto"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          {/* Stage */}
          <rect
            x="50"
            y="20"
            width="500"
            height="40"
            fill="#fbbf24"
            opacity="0.6"
            rx="4"
          />
          <text
            x="300"
            y="48"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#1f2937"
          >
            🎪 STAGE 🎪
          </text>

          {/* Section Labels */}
          <text
            x="20"
            y="100"
            fontSize="12"
            fontWeight="bold"
            fill="#6b7280"
            textAnchor="middle"
          >
            Front
          </text>
          <text
            x="20"
            y="160"
            fontSize="12"
            fontWeight="bold"
            fill="#6b7280"
            textAnchor="middle"
          >
            Premium
          </text>
          <text
            x="20"
            y="210"
            fontSize="12"
            fontWeight="bold"
            fill="#6b7280"
            textAnchor="middle"
          >
            VIP
          </text>

          {/* Seats */}
          {/* {mockSeats.map((seat) => { */}
          {seats.map((seat) => {
            const isSelected = isSeatSelected(seat.id);
            const isHovered = hoveredSeat === seat.id;
            const color = seat.available
              ? getCategoryColor(seat.category)
              : "#d1d5db";

            
            return (
              <Tooltip key={seat.id}>
                <TooltipTrigger asChild>
                  <circle
                    cx={seat.x}
                    cy={seat.y}
                    r={isSelected || isHovered ? 10 : 8}
                    fill={isSelected ? "#19C37D" : color}
                    stroke={isSelected ? "#059669" : "white"}
                    strokeWidth={isSelected ? 2 : 1}
                    opacity={seat.available ? 1 : 0.5}
                    cursor={seat.available ? "pointer" : "not-allowed"}
                    className="transition-all duration-200 hover:r-10"
                    onClick={() => handleSeatClick(seat)}
                    onMouseEnter={() => seat.available && setHoveredSeat(seat.id)}
                    onMouseLeave={() => setHoveredSeat(null)}
                    style={{
                      filter: isHovered ? "drop-shadow(0 0 8px rgba(26, 195, 125, 0.5))" : "none",
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs space-y-1">
                    <p className="font-bold">
                      {seat.row}{seat.number}
                    </p>
                    <p className="text-muted-foreground capitalize">
                      {seat.category === "vvip"
                        ? "VVIP"
                        : seat.category === "vip"
                        ? "VIP"
                        : seat.category.charAt(0).toUpperCase() +
                        seat.category.slice(1)}
                    </p>
                    <p className="text-accent font-semibold">
                      PKR{seat.price.toLocaleString()}
                    </p>
                    {!seat.available && (
                      <p className="text-destructive">
                        🔒 Unavailable
                      </p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </svg>
      </div>
      {/* Zoom Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
        >
          −
        </button>
        <button
          onClick={() => setZoom(1)}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => setZoom(Math.min(2, zoom + 0.2))}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
        >
          +
        </button>
        <span className="px-4 py-2 text-sm text-muted-foreground">
          Zoom: {(zoom * 100).toFixed(0)}%
        </span>
      </div>

      {/* Legend Helper */}
      <div className="text-center text-sm text-muted-foreground max-w-md">
        <p>Select your seats from the map above. Unavailable seats are shown in gray.</p>
      </div>
    </div>
  );
}
