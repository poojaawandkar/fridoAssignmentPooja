"use client";

import { motion } from "framer-motion";
import type { Mode } from "@/types";
import Toggle from "./Toggle";

interface HeroProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export default function Hero({ mode, onChange }: HeroProps) {
  const isCouple = mode === "couple";

  const backgroundGradient = isCouple
    ? "from-red-600 via-pink-500 to-orange-400"
    : "from-slate-900 via-slate-800 to-slate-900";

  const videoUrl = isCouple
    ? "https://cdn.shopify.com/videos/c/o/v/c102dc6ee2be49fc9935403b43e413bb.mp4"
    : "https://cdn.shopify.com/videos/c/o/v/452bedba47694a96a7e5684c79a0eeb3.mp4";

  const headline = isCouple
    ? "This Valentine's Gift Comfort"
    : "Be Your Own Bae";

  return (
    <motion.section
      className={`relative w-full h-screen overflow-hidden bg-gradient-to-br ${backgroundGradient}`}
      animate={{
        background: isCouple
          ? "linear-gradient(135deg, rgb(220, 38, 38), rgb(236, 72, 153), rgb(251, 146, 60))"
          : "linear-gradient(135deg, rgb(15, 23, 42), rgb(30, 41, 59), rgb(15, 23, 42))",
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Video Background */}
      <motion.video
        key={videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.4, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        <source src={videoUrl} type="video/mp4" />
      </motion.video>

      {/* Overlay Gradient */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: isCouple ? 0.3 : 0.5 }}
        animate={{ opacity: isCouple ? 0.3 : 0.5 }}
        transition={{ duration: 0.8 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Animated Badge */}
          <motion.div
            className={`inline-block mb-6 px-4 py-2 rounded-full text-sm font-semibold ${
              isCouple
                ? "bg-white/20 text-white border border-white/30"
                : "bg-white/10 text-gray-100 border border-white/20"
            }`}
            animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {isCouple ? "💑 Special For Two" : "✨ Self Love Edition"}
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            key={headline}
            className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isCouple
              ? "Celebrate love with premium comfort designed for togetherness"
              : "Treat yourself with our exclusive self-care collection"}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all ${
                isCouple
                  ? "bg-white text-red-600 hover:shadow-2xl hover:scale-105"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl hover:scale-105"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </motion.div>

          {/* Toggle Button */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Toggle mode={mode} onChange={onChange} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <span
            className={`text-sm font-medium ${
              isCouple ? "text-white" : "text-gray-300"
            }`}
          >
            Explore
          </span>
          <svg
            className={`w-5 h-5 mt-2 ${
              isCouple ? "text-white" : "text-gray-300"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </motion.section>
  );
}
