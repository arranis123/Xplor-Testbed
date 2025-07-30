import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Spaces from "./pages/Spaces";

import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import Users from "./pages/Users";
import Trial from "./pages/Trial";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";

// Dynamic import for CaptureServices to avoid potential circular dependency issues
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const CaptureServices = lazy(() => import("./pages/CaptureServices"));
const VRCameras = lazy(() => import("./pages/VRCameras"));
const CaptureBusinessSignup = lazy(() => import("./pages/CaptureBusinessSignup"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Index /></AppLayout>} />
          <Route path="/trial" element={<Trial />} />
          <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
          
          {/* Matterport-style workspace routes */}
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/spaces" element={<AppLayout><Spaces /></AppLayout>} />
          
          <Route path="/accounts" element={<AppLayout><Accounts /></AppLayout>} />
          <Route path="/statistics" element={<AppLayout><Statistics /></AppLayout>} />
          <Route path="/users" element={<AppLayout><Users /></AppLayout>} />
          <Route path="/capture-services" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><CaptureServices /></Suspense></AppLayout>} />
          <Route path="/capture-business-signup" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><CaptureBusinessSignup /></Suspense></AppLayout>} />
          <Route path="/vr-cameras" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><VRCameras /></Suspense></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="/admin" element={<AppLayout><Admin /></AppLayout>} />
          <Route path="/auth" element={<Auth />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;