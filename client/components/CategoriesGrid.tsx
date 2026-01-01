import { Music, Sparkles, Laugh, Trophy, Drama, Radio } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const categories: Category[] = [
  {
    id: "music",
    name: "Music",
    icon: <Music className="w-8 h-8" />,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "festivals",
    name: "Festivals",
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "comedy",
    name: "Comedy",
    icon: <Laugh className="w-8 h-8" />,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: "sports",
    name: "Sports",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-red-500 to-red-600",
  },
  {
    id: "theatre",
    name: "Theatre",
    icon: <Drama className="w-8 h-8" />,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "other",
    name: "Other Events",
    icon: <Radio className="w-8 h-8" />,
    color: "from-green-500 to-green-600",
  },
];

interface CategoriesGridProps {
  onCategorySelect?: (categoryId: string) => void;
}

export default function CategoriesGrid({ onCategorySelect }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Card
          key={category.id}
          className={cn(
            "p-4 md:p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105",
            "flex flex-col items-center justify-center gap-3"
          )}
          onClick={() => onCategorySelect?.(category.id)}
        >
          <div
            className={cn(
              "w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br",
              category.color,
              "flex items-center justify-center text-white"
            )}
          >
            {category.icon}
          </div>
          <h3 className="font-semibold text-sm md:text-base text-foreground">
            {category.name}
          </h3>
          <p className="text-xs text-muted-foreground hidden md:block">
            Explore
          </p>
        </Card>
      ))}
    </div>
  );
}
