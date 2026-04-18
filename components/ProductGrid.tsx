"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { ShopifyProduct } from "@/types";

interface ProductGridProps {
  products: ShopifyProduct[];
  loading?: boolean;
  onAddToCart: (productId: string, variantId: string) => void;
  onQuickView: (product: ShopifyProduct) => void;
}

export default function ProductGrid({
  products,
  loading = false,
  onAddToCart,
  onQuickView,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 px-3 sm:px-6 lg:px-8 py-6">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-gray-200 rounded-xl sm:rounded-2xl h-48 sm:h-56 lg:h-64 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        className="flex items-center justify-center py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="text-4xl mb-3">🛒</div>
          <p className="text-gray-500 text-base sm:text-lg mb-2">No products found</p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Try selecting a different category
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 px-3 sm:px-6 lg:px-8 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      layout
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
          index={index}
        />
      ))}
    </motion.div>
  );
}
