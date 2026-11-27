import { Switch, Route } from "wouter";
import { MotionConfig } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { ModalProvider } from "@/context/ModalContext";
import { SeoHead } from "@/components/SeoHead";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentScripts } from "@/components/ConsentScripts";

import { PageLayout } from "@/components/layout/PageLayout";

import Home from "@/pages/Home";
import ProductsIndex from "@/pages/ProductsIndex";
import ProductDetail from "@/pages/ProductDetail";
import Pricing from "@/pages/Pricing";
import Industries from "@/pages/OurWorks";
import IndustryDetail from "@/pages/IndustryDetail";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import SitemapPage from "@/pages/SitemapPage";

function Router() {
  return (
    <PageLayout>
      <SeoHead />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={ProductsIndex} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/industries" component={Industries} />
        <Route path="/industries/:slug" component={IndustryDetail} />
        <Route path="/about" component={AboutUs} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/sitemap" component={SitemapPage} />
        <Route component={NotFound} />
      </Switch>
    </PageLayout>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <Router />
          <Toaster />
          <CookieConsent />
          <ConsentScripts />
        </ModalProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
}

export default App;
