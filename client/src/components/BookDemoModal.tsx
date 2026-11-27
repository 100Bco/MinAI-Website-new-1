import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { DemoForm } from "@/components/DemoForm";

export function BookDemoModal() {
  const { isDemoModalOpen, closeDemoModal } = useModal();

  useEffect(() => {
    if (!isDemoModalOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDemoModal();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isDemoModalOpen, closeDemoModal]);

  return (
    <AnimatePresence>
      {isDemoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeDemoModal}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book a demo"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl relative premium-shadow border border-black/5 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-blue-400 to-primary opacity-80 z-10 rounded-t-3xl" />

            <button
              onClick={closeDemoModal}
              className="sticky top-3 float-right mr-4 rounded-full p-2 text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors z-20 bg-white/90 backdrop-blur-sm shadow-sm"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="px-2">
              <DemoForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
