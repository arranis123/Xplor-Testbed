import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import HomePageTwo from "./pages/HomePageTwo";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Spaces from "./pages/Spaces";
import RecentlyViewed from "./pages/RecentlyViewed";

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
const YachtBrokerage = lazy(() => import("./pages/YachtBrokerage"));
const YachtCrewOffer = lazy(() => import("./pages/YachtCrewOffer"));
const YachtOwnersClients = lazy(() => import("./pages/YachtOwnersClients"));
const CarsVehicles = lazy(() => import("./pages/CarsVehicles"));
const Gigs = lazy(() => import("./pages/Gigs"));
const RealEstate = lazy(() => import("./pages/RealEstate"));
const About = lazy(() => import("./pages/About"));
const FairShareCrew = lazy(() => import("./pages/FairShareCrew"));

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering');
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout><Index /></AppLayout>} />
              <Route path="/home-page-2" element={<AppLayout><HomePageTwo /></AppLayout>} />
              <Route path="/trial" element={<Trial />} />
              <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
              
              {/* Protected workspace routes */}
              <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
              <Route path="/spaces" element={<ProtectedRoute><AppLayout><Spaces /></AppLayout></ProtectedRoute>} />
              <Route path="/recently-viewed" element={<ProtectedRoute><AppLayout><RecentlyViewed /></AppLayout></ProtectedRoute>} />
              
              <Route path="/accounts" element={<ProtectedRoute><AppLayout><Accounts /></AppLayout></ProtectedRoute>} />
              <Route path="/statistics" element={<ProtectedRoute><AppLayout><Statistics /></AppLayout></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><AppLayout><Users /></AppLayout></ProtectedRoute>} />
              <Route path="/capture-services" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><CaptureServices /></Suspense></AppLayout>} />
              <Route path="/capture-business-signup" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><CaptureBusinessSignup /></Suspense></AppLayout>} />
              <Route path="/vr-cameras" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><VRCameras /></Suspense></AppLayout>} />
              <Route path="/cars-vehicles" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><CarsVehicles /></Suspense></AppLayout>} />
              <Route path="/yacht-brokerage" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><YachtBrokerage /></Suspense></AppLayout>} />
              <Route path="/yacht-crew-offer" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><YachtCrewOffer /></Suspense></AppLayout>} />
              <Route path="/yacht-owners-clients" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><YachtOwnersClients /></Suspense></AppLayout>} />
              <Route path="/gigs" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><Gigs /></Suspense></AppLayout>} />
              <Route path="/real-estate" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><RealEstate /></Suspense></AppLayout>} />
              <Route path="/about" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><About /></Suspense></AppLayout>} />
              <Route path="/fairshare-crew" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><FairShareCrew /></Suspense></AppLayout>} />
              <Route path="/settings" element={<ProtectedRoute><AppLayout><Settings /></AppLayout></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AppLayout><Admin /></AppLayout></ProtectedRoute>} />
              <Route path="/auth" element={<Auth />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;