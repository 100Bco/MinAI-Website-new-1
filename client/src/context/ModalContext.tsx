import React, { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { trackEvent } from "@/lib/consent";

interface ModalContextType {
  isDemoModalOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const openDemoModal = useCallback(() => {
    trackEvent("book_demo_open", { page_path: window.location.pathname });
    setIsDemoModalOpen(true);
  }, []);
  const closeDemoModal = useCallback(() => setIsDemoModalOpen(false), []);

  return (
    <ModalContext.Provider value={{ isDemoModalOpen, openDemoModal, closeDemoModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
