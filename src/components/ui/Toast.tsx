import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  show: boolean;
  onClose: () => void;
}

export function Toast({ message, type = "success", show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed top-4 right-4 z-50 rounded-md px-4 py-2 text-white shadow-lg",
            type === "success" ? "bg-green-500" : "bg-red-500"
          )}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
