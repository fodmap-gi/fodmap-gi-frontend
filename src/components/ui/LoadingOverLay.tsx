import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
  show: boolean;
  message?: string;
}

export function LoadingOverlay({ show, message = "กำลังตรวจสอบ..." }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center text-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
