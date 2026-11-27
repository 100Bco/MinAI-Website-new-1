import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BookDemoModal } from "../BookDemoModal";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative bg-background overflow-x-clip">
      <Navbar />
      <main className="flex-grow pt-[72px] md:pt-24">
        {children}
      </main>
      <Footer />
      <BookDemoModal />
    </div>
  );
}
