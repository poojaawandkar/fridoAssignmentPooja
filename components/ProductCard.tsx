"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { calculateDiscount, formatPrice } from "@/lib/shopify";
import { showToast } from "@/components/Toast";
import type { ShopifyProduct } from "@/types";

interface ProductCardProps {
  product: ShopifyProduct;
  onAddToCart: (productId: string, variantId: string) => void;
  index?: number;
}

export default function ProductCard({
  product,
  onAddToCart,
  index = 0,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const variant = product.variants.edges[0]?.node;
  const compareAtPrice = variant?.compareAtPrice?.amount;
  const salePrice = variant?.price.amount || product.priceRange.minVariantPrice.amount;
  const discount = calculateDiscount(compareAtPrice, salePrice);

  const handleAddToCart = () => {
    if (variant) {
      onAddToCart(product.id, variant.id);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (!isLiked) {
      showToast("Added to wishlist!", "success");
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (!isSaved) {
      showToast("Product saved!", "success");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100">
        {/* Image Container */}
        <div className="relative w-full h-40 sm:h-48 lg:h-56 overflow-hidden bg-gray-100">
          {product.featuredImage?.url ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-sm sm:text-base">No Image</span>
            </div>
          )}

          {/* Sale Badge */}
          {discount > 0 && (
            <motion.div
              className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              -{discount}%
            </motion.div>
          )}

          {/* Like Button (Heart) */}
          <motion.button
            onClick={handleLike}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:scale-110"
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="text-sm"
            >
              {isLiked ? "❤️" : "🤍"}
            </motion.span>
          </motion.button>

          {/* Hover Overlay - Desktop Only */}
          <motion.div
            className="hidden sm:flex absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center"
          >
            <motion.button
              onClick={handleAddToCart}
              className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quick Add
            </motion.button>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          {/* Product Title */}
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 mb-1">
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              {formatPrice(salePrice)}
            </span>
            {compareAtPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-yellow-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="text-xs text-gray-400">(42)</span>
          </div>

          {/* Mobile Action Buttons - Always Visible */}
          <div className="flex gap-2 mt-auto sm:hidden">
            <motion.button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              whileTap={{ scale: 0.98 }}
            >
              <span>🛒</span> Add to Cart
            </motion.button>
            <motion.button
              onClick={handleSave}
              className={`py-2.5 px-3 rounded-lg font-semibold text-xs flex items-center justify-center transition-all active:scale-95 ${isSaved ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'}`}
              whileTap={{ scale: 0.98 }}
            >
              {isSaved ? "❤️" : "♡"}
            </motion.button>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex gap-2 mt-auto">
            <motion.button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              <span>🛒</span> Add to Cart
            </motion.button>
            <motion.button
              onClick={handleSave}
              className={`py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center gap-1.5 ${isSaved ? 'bg-pink-50 text-pink-600 border border-pink-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              whileTap={{ scale: 0.98 }}
            >
              {isSaved ? "❤️" : "♡"} Save
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
