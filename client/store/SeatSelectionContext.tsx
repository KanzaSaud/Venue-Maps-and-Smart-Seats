import { createContext, useContext, useState, ReactNode } from "react";

export interface SelectedSeat {
  id: string;
  row: string;
  number: number;
  category: "standard" | "vip" | "vvip" | "disabled";
  price: number;
  section: string;
}

interface SeatSelectionContextType {
  selectedSeats: SelectedSeat[];
  totalPrice: number;
  addSeat: (seat: SelectedSeat) => void;
  removeSeat: (seatId: string) => void;
  clearSelection: () => void;
  isSeatSelected: (seatId: string) => boolean;
}

const SeatSelectionContext = createContext<SeatSelectionContextType | undefined>(
  undefined
);

export function SeatSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const addSeat = (seat: SelectedSeat) => {
    setSelectedSeats((prev) => {
      // Check if seat is already selected
      if (prev.some((s) => s.id === seat.id)) {
        return prev;
      }
      return [...prev, seat];
    });
  };

  const removeSeat = (seatId: string) => {
    setSelectedSeats((prev) => prev.filter((s) => s.id !== seatId));
  };

  const clearSelection = () => {
    setSelectedSeats([]);
  };

  const isSeatSelected = (seatId: string) => {
    return selectedSeats.some((s) => s.id === seatId);
  };

  return (
    <SeatSelectionContext.Provider
      value={{
        selectedSeats,
        totalPrice,
        addSeat,
        removeSeat,
        clearSelection,
        isSeatSelected,
      }}
    >
      {children}
    </SeatSelectionContext.Provider>
  );
}

export function useSeatSelection() {
  const context = useContext(SeatSelectionContext);
  if (!context) {
    throw new Error("useSeatSelection must be used within SeatSelectionProvider");
  }
  return context;
}
