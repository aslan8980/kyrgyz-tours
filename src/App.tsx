import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import About from "./pages/About";
import Itineraries from "./pages/Itineraries";
import TourDetails from "./pages/TourDetails";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Map from "./pages/Map";
import Contact from "./pages/Contact us";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/itineraries/:id" element={<TourDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/map" element={<Map />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;