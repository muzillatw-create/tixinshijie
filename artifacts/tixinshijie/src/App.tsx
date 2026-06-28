import { Switch, Route, Router as WouterRouter } from "wouter";
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
import AdminPage from "./pages/admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/order" component={OrderPage} />
      <Route path="/track" component={TrackPage} />
      <Route path="/videos" component={VideosPage} />
      <Route path="/purple-videos" component={PurpleVideosPage} />
      <Route path="/happiness" component={HappinessPage} />
      <Route path="/admin" component={AdminPage} />
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
