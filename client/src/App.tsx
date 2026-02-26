import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { ModalProvider } from "@/context/ModalContext";

import { PageLayout } from "@/components/layout/PageLayout";

import Home from "@/pages/Home";
import ProductsIndex from "@/pages/ProductsIndex";
import ProductDetail from "@/pages/ProductDetail";
import Pricing from "@/pages/Pricing";
import Testimonials from "@/pages/Testimonials";
import OurWorks from "@/pages/OurWorks";
import AboutUs from "@/pages/AboutUs";

function Router() {
  return (
    <PageLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={ProductsIndex} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/works" component={OurWorks} />
        <Route path="/about" component={AboutUs} />
        <Route component={NotFound} />
      </Switch>
    </PageLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Router />
        <Toaster />
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
