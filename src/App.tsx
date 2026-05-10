import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Sponsors from "@/pages/Sponsors";
import News from "@/pages/News";
import Article from "@/pages/Article";
import Studio from "./pages/Studio";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/news" component={News} />
      <Route path="/news/:slug" component={Article} />
      <Route path="/studio" component={Studio} />
      {/* Fallback pattern to catch all nested studio routes for Sanity */}
      <Route path="/studio/*" component={Studio} />
      <Route path="/contact" component={Contact} />
      <Route path="/sponsors" component={Sponsors} />
      <Route component={NotFound} />
    </Switch>
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
