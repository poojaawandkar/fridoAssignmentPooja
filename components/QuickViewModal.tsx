"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { formatPrice, calculateDiscount } from "@/lib/shopify";
import type { ShopifyProduct } from "@/types";

interface QuickViewModalProps {
  product: ShopifyProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: string, variantId: string) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  // Reset variant when product changes
  useEffect(() => {
    if (product?.variants?.edges?.[0]) {
      setSelectedVariant(product.variants.edges[0].node);
    }
  }, [product]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const currentPrice = selectedVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount || "0";
  const compareAtPrice = selectedVariant?.compareAtPrice?.amount;
  const discount = calculateDiscount(compareAtPrice, currentPrice);

  const handleAddToCart = () => {
    if (selectedVariant) {
      onAddToCart(product.id, selectedVariant.id);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-lg font-bold"
          >
            ✕
          </button>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-[500px] relative bg-gray-100">
            {product.featuredImage?.url ? (
              <Image
                src={product.featuredImage.url}
                alt={product.title || "Product"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{discount}% OFF
              </div>
            )}
          </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h2>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(currentPrice)}
                  </span>
                  {compareAtPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(compareAtPrice)}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(42 reviews)</span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <div
                    className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: product.description || "No description available.",
                    }}
                  />
                </div>

                {/* Variants */}
                {product.variants?.edges?.length > 1 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Options</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.edges.map((edge, index) => (
                        <button
                          key={edge.node.id}
                          onClick={() => setSelectedVariant(edge.node)}
                          className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                            selectedVariant?.id === edge.node.id
                              ? "border-pink-500 bg-pink-50 text-pink-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {edge.node.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-linear-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  🛒 Add to Cart
                </button>

                {/* Extra Info */}
                <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 flex-wrap">
                  <span className="flex items-center gap-1">✓ In Stock</span>
                  <span className="flex items-center gap-1">🚚 Free Shipping</span>
                  <span className="flex items-center gap-1">↩️ Easy Returns</span>
                </div>
              </div>
            </div>
          </motion.div>
      </>
  );
}