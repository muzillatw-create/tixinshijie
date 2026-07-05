import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cart-context";
import { AiChat } from "@/components/ai-chat";
import NotFound from "@/pages/not-found";
import Home from "./pages/home";
import OrderPage from "./pages/order";
import TrackPage from "./pages/track";
import VideosPage from "./pages/videos";
import PurpleVideosPage from "./pages/purple-videos";
import HappinessPage from "./pages/happiness";
import EatPage from "./pages/eat";
import DrinkPage from "./pages/drink";
import PlayPage from "./pages/play";
import FunPage from "./pages/fun";
import AdminPage from "./pages/admin";
import AboutPage from "./pages/about";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/order" component={OrderPage} />
      <Route path="/track" component={TrackPage} />
      <Route path="/videos" component={VideosPage} />
      <Route path="/purple-videos" component={PurpleVideosPage} />
      <Route path="/happiness" component={HappinessPage} />
      <Route path="/eat" component={EatPage} />
      <Route path="/drink" component={DrinkPage} />
      <Route path="/play" component={PlayPage} />
      <Route path="/fun" component={FunPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/about" component={AboutPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Router />
          </WouterRouter>
          <AiChat />
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
