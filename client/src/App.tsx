import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import SupportLayout from "@/components/SupportLayout";

// Pages
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/not-found";

// Footer pages
import Contact from "@/pages/Contact";
import Faqs from "@/pages/Faqs";
import ShippingReturns from "@/pages/ShippingReturns";
import Warranty from "@/pages/Warranty";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

function Router() {
  const [location] = useLocation();
  const isSupportPage = ["/contact", "/faqs", "/shipping-returns", "/warranty", "/privacy", "/terms"].includes(location);

  if (isSupportPage) {
    return (
      <SupportLayout>
        <Switch>
          <Route path="/contact" component={Contact} />
          <Route path="/faqs" component={Faqs} />
          <Route path="/shipping-returns" component={ShippingReturns} />
          <Route path="/warranty" component={Warranty} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
        </Switch>
      </SupportLayout>
    );
  }

  // ❌ ЭТОГО НЕ ХВАЛО!
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
