
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServicePage from "./pages/ServicePage";
import LocationPage from "./pages/LocationPage";
import BookingPage from "./pages/BookingPage";
import MyWashesPage from "./pages/MyWashesPage";
import WasherPortalPage from "./pages/WasherPortalPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicePage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/my-washes" element={<MyWashesPage />} />
              <Route path="/washer-portal" element={<WasherPortalPage />} />
              <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
