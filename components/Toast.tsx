"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const icon = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 ${bgColor[type]} text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 font-medium`}
    >
      <span className="text-lg">{icon[type]}</span>
      <span>{message}</span>
    </motion.div>
  );
}

// Toast context for global access
interface ToastState {
  message: string;
  type: "success" | "error" | "info";
  visible: boolean;
}

let showToastFn: ((message: string, type?: "success" | "error" | "info") => void) | null = null;

export function showToast(message: string, type: "success" | "error" | "info" = "success") {
  if (showToastFn) {
    showToastFn(message, type);
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({ message: "", type: "success", visible: false });

  useEffect(() => {
    showToastFn = (message, type = "success") => {
      setToast({ message, type, visible: true });
    };
    return () => {
      showToastFn = null;
    };
  }, []);

  const closeToast = () => setToast(prev => ({ ...prev, visible: false }));

  return (
    <>
      {children}
      <AnimatePresence>
        {toast.visible && (
          <Toast message={toast.message} type={toast.type} onClose={closeToast} />
        )}
      </AnimatePresence>
    </>
  );
}