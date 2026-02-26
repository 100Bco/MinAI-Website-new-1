import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDemoRequestSchema } from "@shared/schema";
import type { DemoRequestInput } from "@shared/routes";
import { useCreateDemoRequest } from "@/hooks/use-demo-requests";
import { useModal } from "@/context/ModalContext";

export function BookDemoModal() {
  const { isDemoModalOpen, closeDemoModal } = useModal();
  const { mutate: submitDemo, isPending } = useCreateDemoRequest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoRequestInput>({
    resolver: zodResolver(insertDemoRequestSchema),
  });

  const onSubmit = (data: DemoRequestInput) => {
    submitDemo(data, {
      onSuccess: () => {
        reset();
        closeDemoModal();
      },
    });
  };

  return (
    <AnimatePresence>
      {isDemoModalOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDemoModal}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
          >
            <div className="bg-white overflow-hidden rounded-3xl relative premium-shadow border border-black/5">
              {/* Decorative gradient top edge */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-blue-400 to-primary opacity-80" />

              <button
                onClick={closeDemoModal}
                className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-10">
                <h2 className="text-3xl font-bold font-display text-foreground mb-2">
                  See MinAI in Action
                </h2>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  Fill out the form below and our team will show you how to automate your revenue machine.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/70 uppercase tracking-widest pl-1">Name</label>
                      <input
                        {...register("name")}
                        className="w-full bg-secondary border border-black/5 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-destructive text-xs pl-1 font-medium">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/70 uppercase tracking-widest pl-1">Email</label>
                      <input
                        {...register("email")}
                        className="w-full bg-secondary border border-black/5 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="text-destructive text-xs pl-1 font-medium">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/70 uppercase tracking-widest pl-1">Phone</label>
                      <input
                        {...register("phone")}
                        className="w-full bg-secondary border border-black/5 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/70 uppercase tracking-widest pl-1">Company</label>
                      <input
                        {...register("company")}
                        className="w-full bg-secondary border border-black/5 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/70 uppercase tracking-widest pl-1">How can we help?</label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      className="w-full bg-secondary border border-black/5 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none placeholder:text-muted-foreground/50"
                      placeholder="I want to stop paying for 10 different tools..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-4 bg-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isPending && <Loader2 size={18} className="animate-spin" />}
                    {isPending ? "Submitting..." : "Get My Custom Demo"}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
