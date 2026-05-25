import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Sponsors from "@/pages/Sponsors";
import News from "@/pages/News";
import Article from "@/pages/Article";
import Downloads from "@/pages/Downloads";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Studio from "./pages/Studio";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/news" component={News} />
        <Route path="/news/:slug" component={Article} />
        <Route path="/downloads" component={Downloads} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/studio" component={Studio} />
        {/* Fallback pattern to catch all nested studio routes for Sanity */}
        <Route path="/studio/*" component={Studio} />
        <Route path="/contact" component={Contact} />
        <Route path="/sponsors" component={Sponsors} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
