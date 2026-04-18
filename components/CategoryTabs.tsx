"use client";

import { motion } from "framer-motion";
import type { Mode, CategoryTab } from "@/types";

interface CategoryTabsProps {
  mode: Mode;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({
  mode,
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const categories: CategoryTab[] =
    mode === "couple"
      ? [
          { id: "sleep", label: "😴 Sleep", handle: "sleep" },
          { id: "travel", label: "✈️ Travel", handle: "travel" },
          { id: "wfh", label: "💻 WFH", handle: "wfh" },
          { id: "gym", label: "🏋️ GYM", handle: "gym" },
        ]
      : [
          { id: "mom", label: "👩 Mom", handle: "mom" },
          { id: "dad", label: "👨 Dad", handle: "dad" },
          { id: "bff", label: "👯 BFF", handle: "bff" },
          { id: "kids", label: "🧒 Kids", handle: "kids" },
        ];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-4 sm:px-6 py-4 min-w-max">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all text-xs sm:text-sm ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg shadow-pink-500/25"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            layout
          >
            {category.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
