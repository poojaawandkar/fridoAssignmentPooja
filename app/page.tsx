"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import CategoryTabs from "@/components/CategoryTabs";
import ProductGrid from "@/components/ProductGrid";
import { ToastProvider, showToast } from "@/components/Toast";
import QuickViewModal from "@/components/QuickViewModal";
import { getProductsByCollection } from "@/lib/shopify";
import type { Mode, ShopifyProduct } from "@/types";

export default function Home() {
  const [mode, setMode] = useState<Mode>("couple");
  const [selectedCategory, setSelectedCategory] = useState<string>("sleep");
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Initialize category based on mode
  useEffect(() => {
    const initialCategory = mode === "couple" ? "sleep" : "mom";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCategory(initialCategory);
  }, [mode]);

  // Fetch products based on selected category from Shopify Storefront API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Map category to Shopify collection handles
        const collectionMap: Record<string, string> = {
          sleep: "sleep",
          travel: "travel-products",
          wfh: "work-from-home",
          gym: "gym-fitness",
          mom: "gifts-for-mom",
          dad: "gifts-for-dad",
          bff: "gifts-for-friends",
          kids: "gifts-for-kids",
        };

        const collectionHandle = collectionMap[selectedCategory] || "";

        // Only fetch if collection exists
        if (!collectionHandle) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // Fetch from Shopify Storefront API (Real Data)
        const shopifyProducts = await getProductsByCollection(collectionHandle, 12);

        setProducts(shopifyProducts);
      } catch (error) {
        console.error("Error fetching products from Shopify:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, mode]);

  const handleAddToCart = (productId: string, variantId: string) => {
    console.log("Added to cart:", { productId, variantId });
    showToast("Product added to cart!", "success");
  };

  const handleQuickView = (product: ShopifyProduct) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <ToastProvider>
    <div className="min-h-screen bg-white">
      <Hero mode={mode} onChange={setMode} />

      <motion.section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryTabs
              mode={mode}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </motion.div>
        </AnimatePresence>
      </motion.section>

      <motion.section className="bg-white py-12 sm:py-16">
        <div className="max-w-full">
          <motion.div
            className="px-4 sm:px-6 lg:px-8 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 capitalize">
              {selectedCategory} Collection
            </h2>
            <p className="text-gray-600 mt-2">
              {mode === "couple"
                ? "Premium comfort for couples celebrating togetherness"
                : "Thoughtful gifts and essentials for the special people in your life"}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductGrid
                products={products}
                loading={loading}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      <motion.footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About Us</h4>
              <p className="text-gray-400 text-sm">
                Celebrating love in all its forms with premium comfort products.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Couple Mode
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Single Mode
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; 2025 Valentine&apos;s Shop. All rights reserved. Made with <span className="text-red-500">❤️</span>
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
      />
    </div>
    </ToastProvider>
  );
}
