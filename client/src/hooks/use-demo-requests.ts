import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { DemoRequestInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateDemoRequest() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: DemoRequestInput) => {
      // Use the exact route path from the API manifest
      const res = await fetch(api.demoRequests.create.path, {
        method: api.demoRequests.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Failed to submit request" }));
        throw new Error(error.message || "An unexpected error occurred");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Received",
        description: "We'll be in touch shortly to schedule your demo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
