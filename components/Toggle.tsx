"use client";

import { motion } from "framer-motion";
import type { Mode } from "@/types";

interface ToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export default function Toggle({ mode, onChange }: ToggleProps) {
  const isCouple = mode === "couple";

  return (
    <div className="flex flex-col items-center gap-8 mb-8">
      {/* Main Toggle Wrapper */}
      <motion.div
        className="relative inline-flex items-center gap-0 rounded-full p-1 bg-gradient-to-r from-pink-500 to-red-500 cursor-default overflow-hidden"
        whileHover={{ scale: 1.02 }}
        initial={false}
      >
        {/* Animated Background Pill */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-100 to-red-100"
          layoutId="pill-background"
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 350,
          }}
        />

        {/* Container */}
        <div className="relative flex items-center rounded-full bg-white">
          {/* Animated Active Indicator */}
          <motion.div
            className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-pink-500 to-red-500 opacity-10"
            animate={{
              left: isCouple ? 0 : "50%",
              width: "50%",
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 350,
            }}
          />

          {/* Couple Mode Button */}
          <motion.button
            className={`relative px-8 py-3 text-sm font-bold transition-all duration-200 ${
              isCouple
                ? "text-white"
                : "text-gray-600"
            }`}
            onClick={() => isCouple ? null : onChange("couple")}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-red-500"
              initial={false}
              animate={{
                opacity: isCouple ? 1 : 0,
                scale: isCouple ? 1 : 0.8,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 350,
              }}
              style={{ zIndex: -1 }}
            />
            <motion.span
              animate={{
                scale: isCouple ? 1 : 0.95,
              }}
              transition={{ duration: 0.2 }}
            >
              💑 Couple Mode
            </motion.span>
          </motion.button>

          {/* Divider */}
          <motion.div
            className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent"
            animate={{
              opacity: 0.5,
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
          />

          {/* Single Mode Button */}
          <motion.button
            className={`relative px-8 py-3 text-sm font-bold transition-all duration-200 ${
              !isCouple
                ? "text-white"
                : "text-gray-900"
            }`}
            onClick={() => isCouple ? onChange("single") : null}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-red-500"
              initial={false}
              animate={{
                opacity: !isCouple ? 1 : 0,
                scale: !isCouple ? 1 : 0.8,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 350,
              }}
              style={{ zIndex: -1 }}
            />
            <motion.span
              animate={{
                scale: !isCouple ? 1 : 0.95,
              }}
              transition={{ duration: 0.2 }}
            >
              ✨ Single Mode
            </motion.span>
          </motion.button>
        </div>
      </motion.div>

      {/* Animated Indicator Text */}
      <motion.div
        className="flex items-center gap-2"
        initial={false}
      >
        <motion.span
          className="text-lg font-semibold"
          animate={{
            color: isCouple ? "#dc2626" : "#1f2937",
          }}
          transition={{ duration: 0.3 }}
        >
          {isCouple ? "👫" : "👤"}
        </motion.span>
        <motion.p
          className="text-sm font-medium"
          animate={{
            color: isCouple ? "#dc2626" : "#1f2937",
            opacity: [1, 0.7, 1],
          }}
          transition={{
            color: { duration: 0.3 },
            opacity: { duration: 2.5, repeat: Infinity },
          }}
        >
          {isCouple
            ? "Celebrating love together"
            : "Self-love & personal growth"}
        </motion.p>
      </motion.div>

      {/* Premium floating hearts/sparkles */}
      <div className="relative w-32 h-12 flex items-center justify-center">
        {isCouple ? (
          <>
            <motion.span
              className="text-2xl absolute"
              animate={{
                y: [0, -20, 0],
                x: [-10, -20, -10],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              ❤️
            </motion.span>
            <motion.span
              className="text-2xl absolute"
              animate={{
                y: [0, -20, 0],
                x: [10, 20, 10],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 0.3,
              }}
            >
              ❤️
            </motion.span>
          </>
        ) : (
          <>
            <motion.span
              className="text-2xl absolute"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              ✨
            </motion.span>
            <motion.span
              className="text-2xl absolute"
              animate={{
                y: [0, -15, 0],
                rotate: [0, -10, 10, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 0.3,
              }}
            >
              ✨
            </motion.span>
          </>
        )}
      </div>
    </div>
  );
}
