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
import HomeArchive from "./pages/HomeArchive";
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
const CarsVehicles2 = lazy(() => import("./pages/CarsVehicles2"));
const JetsAviation = lazy(() => import("./pages/JetsAviation"));
const Gigs = lazy(() => import("./pages/Gigs"));
const RealEstate = lazy(() => import("./pages/RealEstate"));
const Hotels = lazy(() => import("./pages/Hotels"));
const RestaurantsBars = lazy(() => import("./pages/RestaurantsBars"));
const About = lazy(() => import("./pages/About"));
const FairShareCrew = lazy(() => import("./pages/FairShareCrew"));
const FairShareEligibility = lazy(() => import("./pages/FairShareEligibility"));
const FAQs = lazy(() => import("./pages/FAQs"));
const CrewInstructions = lazy(() => import("./pages/CrewInstructions"));
const MuseumsGalleries = lazy(() => import("./pages/MuseumsGalleries"));
const EducationAndSchools = lazy(() => import("./pages/EducationAndSchools"));
const ExperiencesAttractions = lazy(() => import("./pages/ExperiencesAttractions"));
const CruiseShips = lazy(() => import("./pages/CruiseShips"));
const Developments = lazy(() => import("./pages/Developments"));
const UAEDevelopments = lazy(() => import("./pages/UAEDevelopments"));
const GolfCourses = lazy(() => import("./pages/GolfCourses"));
const TrainsAndTrams = lazy(() => import("./pages/TrainsAndTrams"));
const RetailAndPopups = lazy(() => import("./pages/RetailAndPopups"));

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
              <Route path="/home-archive" element={<AppLayout><HomeArchive /></AppLayout>} />
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
              <Route path="/cars-vehicles-2" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><CarsVehicles2 /></Suspense></AppLayout>} />
              <Route path="/jets-aviation" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><JetsAviation /></Suspense></AppLayout>} />
              <Route path="/yacht-brokerage" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><YachtBrokerage /></Suspense></AppLayout>} />
              <Route path="/fairshare" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><YachtCrewOffer /></Suspense></AppLayout>} />
              <Route path="/yacht-owners-clients" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><YachtOwnersClients /></Suspense></AppLayout>} />
              <Route path="/gigs" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><Gigs /></Suspense></AppLayout>} />
              <Route path="/real-estate" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><RealEstate /></Suspense></AppLayout>} />
              <Route path="/hotels" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><Hotels /></Suspense></AppLayout>} />
              <Route path="/restaurants-bars" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><RestaurantsBars /></Suspense></AppLayout>} />
              <Route path="/about" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><About /></Suspense></AppLayout>} />
              <Route path="/fairshare-crew" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><FairShareCrew /></Suspense></AppLayout>} />
              <Route path="/fairshare-eligibility" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><FairShareEligibility /></Suspense></AppLayout>} />
              <Route path="/crew-instructions" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><CrewInstructions /></Suspense></AppLayout>} />
              <Route path="/faqs" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><FAQs /></Suspense></AppLayout>} />
              <Route path="/museums-galleries" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><MuseumsGalleries /></Suspense></AppLayout>} />
              <Route path="/education-and-schools" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><EducationAndSchools /></Suspense></AppLayout>} />
              <Route path="/experiences-and-attractions" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><ExperiencesAttractions /></Suspense></AppLayout>} />
              <Route path="/cruise-ships" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><CruiseShips /></Suspense></AppLayout>} />
              <Route path="/developments" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><Developments /></Suspense></AppLayout>} />
              <Route path="/uae-developments" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><UAEDevelopments /></Suspense></AppLayout>} />
              <Route path="/golf-courses" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><GolfCourses /></Suspense></AppLayout>} />
              <Route path="/trains-and-trams" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><TrainsAndTrams /></Suspense></AppLayout>} />
              <Route path="/retail-and-popups" element={<AppLayout><Suspense fallback={<div className="p-6"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>}><RetailAndPopups /></Suspense></AppLayout>} />
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