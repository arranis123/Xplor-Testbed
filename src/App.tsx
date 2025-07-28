import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Spaces from "./pages/Spaces";
import Statistics from "./pages/Statistics";
import Trial from "./pages/Trial";
import NotFound from "./pages/NotFound";

// Dynamic import for CaptureServices to avoid potential circular dependency issues
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const CaptureServices = lazy(() => import("./pages/CaptureServices"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
          <Route path="/public-spaces" element={<AppLayout><div className="p-6"><h1 className="text-2xl font-bold">Public & Unlisted Spaces</h1><p className="text-muted-foreground">Manage public and unlisted space visibility</p></div></AppLayout>} />
          <Route path="/statistics" element={<AppLayout><Statistics /></AppLayout>} />
          <Route path="/capture-services" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><CaptureServices /></Suspense></AppLayout>} />
          <Route path="/settings" element={<AppLayout><div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Account and workspace settings</p></div></AppLayout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;