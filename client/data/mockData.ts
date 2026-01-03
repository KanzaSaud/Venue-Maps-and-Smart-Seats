export interface Event {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  image: string;
  category: string;
  price: number;
  rating?: number;
  description?: string;
  venueId: number;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  image: string;
  address?: string;
}

export const mockFeaturedEvents: Event[] = [
  {
    id: "event-1",
    title: "Carnival of Lights",
    venue: "The Palm Marquee (Clifton)",
    date: "Dec 06, 2025",
    time: "6:00 PM",
    image: "/assets/carnival-of-lights-6th-december.jpg",
    category: "Music",
    price: 2500,
    rating: 4.8,
    venueId: 1,
    description: "Experience Carnival of Lights with exotic colors as the night sky lights up.",
  },
  {
    id: "event-2",
    title: "Monkey Business",
    venue: "Arts Council Karachi",
    date: "Dec 10, 2024",
    time: "7:30 PM",
    image: "assets/monkey-business-karachi.jpg",
    category: "Comedy",
    price: 2500,
    rating: 4.7,
    venueId: 2,
    description: "A hilarious comedy play by Yasir Hussain. Satire and laughs at Karachi’s Arts Council.",
  },
  {
    id: "event-3",
    title: "Adrenaline",
    venue: "OLOMOPOLO Media| 43-A, Block D, New Muslim Town, Lahore",
    date: "Dec 29, 2025",
    time: "7:00 PM",
    image: "assets/adrenaline.jpg",
    category: "Theatre",
    price: 2000,
    rating: undefined,
    venueId: 3,
    description: "A bold new play by 7Spices Theatre (Canada & Syria) exploring displacement, memory, and identity.",
  },
  {
    id: "event-4",
    title: "Game Night",
    venue: "Filli Cafe Global Heights, Johar Town, Lahore",
    date: "Nov 30, 2025",
    time: "5:00 PM",
    image: "assets/game-night.webp",
    category: "Other Events",
    price: 1200,
    rating: 4.5,
    venueId: 4,
    description: "OFFSCRIPT is calling you to unplug from the simulated reality and dive into an epic night inspired by The Matrix.",
  },
  {
    id: "event-5",
    title: "Silent Movie Night",
    venue: "Cortado, DHA Phase 5 (Tauheed Commercial)",
    date: "Nov 30, 2025",
    time: "6:30 PM",
    image: "assets/silent-movie-night-on-the-cortado-rooftop.png",
    category: "Other Events",
    price: 3000,
    rating: undefined,
    venueId: 5,
    description: "Enjoy a rooftop silent-movie screening under the stars at Cortado, complete with headphones, a snack, and coffee. A perfect evening out!",
  },
  {
    id: "event-6",
    title: "Chef",
    venue: "Arts Council Karachi",
    date: "Nov 27, 2025",
    time: "7:00 PM",
    image: "assets/chef.jpg",
    category: "Theatre",
    price: 1500,
    rating: 4.4,
    venueId: 6,
    description: "A humorous and chaotic kitchen-themed play where everything is set except the chef himself. Expect laughter, surprises, and theatrical fun!",
  },
];

export const mockVenues: Venue[] = [
  {
    id: "venue-1",
    name: "Arts Council of Pakistan",
    location: "Karachi",
    capacity: 1500,
    image: "assets/arts-council-karachi.webp",
    address: "M. R, Kiyani Road, Karachi",
  },
  {
    id: "venue-2",
    name: "The Palm Marquee",
    location: "Karachi",
    capacity: 1000,
    image: "/assets/the-palm-marquee-clifton.jpg",
    address: "Plot Commercial-5, Shahrah-Attar, Block 4 Block 3 Clifton, Karachi",
  },
  {
    id: "venue-3",
    name: "Frere Hall",
    location: "Karachi",
    capacity: 700,
    image: "/assets/frere-hall.jpg",
    address: "Churchgate, Mumbai Central, Mumbai",
  },
  {
    id: "venue-4",
    name: "Culture ShawQ",
    location: "Lahore",
    capacity: 50,
    image: "assets/Culture ShawQ.webp",
    address: "Culture ShawQ Comedy Club, Main Boulevard Gulberg, Block D1 Gulberg III, Lahore, Pakistan",
  },
  {
    id: "venue-5",
    name: "Third Space",
    location: "Islamabad",
    capacity: 100,
    image: "/assets/third-space.webp",
    address: " Plot 06, sagheer market, F-10/4 F 10/4 F-10, Islamabad",
  },
  {
    id: "venue-6",
    name: "Filli Cafe Global Heights",
    location: "Lahore",
    capacity: 100,
    image: "/assets/filli-cafe-pakistan.png",
    address: "21, J 3 Block Block J 3 Phase 2 Johar Town, Lahore, 53780",
  },
];

// Seat data for venue map
export interface Seat {
  id: string;
  row: string;
  number: number;
  section: string;
  category: "standard" | "vip" | "vvip" | "disabled";
  price: number;
  available: boolean;
  x: number; // SVG x coordinate
  y: number; // SVG y coordinate
}

export const mockSeats: Seat[] = [
  // Standard seats (rows A-C)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `A${i + 1}`,
    row: "A",
    number: i + 1,
    section: "Front",
    category: "standard" as const,
    price: 500,
    available: Math.random() > 0.2,
    x: 50 + i * 30,
    y: 100,
  })),
  // VIP seats (rows D-F)
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `D${i + 1}`,
    row: "D",
    number: i + 1,
    section: "Premium",
    category: "vip" as const,
    price: 1000,
    available: Math.random() > 0.25,
    x: 40 + i * 28,
    y: 150,
  })),
  // VVIP seats (rows G-H)
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `G${i + 1}`,
    row: "G",
    number: i + 1,
    section: "VIP",
    category: "vvip" as const,
    price: 2000,
    available: Math.random() > 0.3,
    x: 120 + i * 30,
    y: 200,
  })),
  // Disabled accessible seats
  {
    id: "W1",
    row: "W",
    number: 1,
    section: "Wheelchair",
    category: "disabled" as const,
    price: 500,
    available: true,
    x: 50,
    y: 300,
  },
  {
    id: "W2",
    row: "W",
    number: 2,
    section: "Wheelchair",
    category: "disabled" as const,
    price: 500,
    available: true,
    x: 100,
    y: 300,
  },
];
