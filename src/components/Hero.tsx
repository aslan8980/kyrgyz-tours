import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Slide1 from "../assets/images/slide-1.webp";
import Slide2 from "../assets/images/slide-2.webp";
import Slide3 from "../assets/images/slide-3.webp";

const slides = [
  {
    image: Slide1,
    title: "Discover the Heart of Kyrgyzstan",
    description:
      "Explore breathtaking mountains, crystal-clear lakes, ancient landscapes and the unique nomadic culture of Kyrgyzstan.",
  },
  {
    image: Slide2,
    title: "Your Journey Starts Here",
    description:
      "From the shores of Issyk-Kul to the high mountains of Karakol, discover unforgettable places and experiences across Kyrgyzstan.",
  },
  {
    image: Slide3,
    title: "Experience the Spirit of the Nomads",
    description:
      "Ride through mountain valleys, stay in traditional yurts and experience the culture, nature and hospitality of Kyrgyzstan.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setImageLoaded(false);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setImageLoaded(false);
  };

  // Previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
    setImageLoaded(false);
  };

  // Image loaded
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Scroll to itineraries
  const handleExploreClick = () => {
    const itinerariesSection =
      document.getElementById("itineraries");

    if (itinerariesSection) {
      itinerariesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          aria-hidden={currentSlide !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className={`absolute inset-0 bg-cover bg-center ${
              imageLoaded ? "" : "bg-gray-300"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Hidden image for loading */}
            <img
              src={slide.image}
              alt={slide.title}
              onLoad={handleImageLoad}
              className="hidden"
              loading="lazy"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
          </div>

          {/* Slide Content */}
          <div className="relative h-full flex items-center justify-center text-center text-white p-4 z-20">
            <div className="max-w-4xl animate-fadeIn">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                {slide.title}
              </h1>

              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                {slide.description}
              </p>

              {/* Explore Button */}
              <Button
                onClick={handleExploreClick}
                className="bg-white text-safari-green hover:bg-safari-gold hover:text-white z-30"
              >
                Explore Now
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors z-30"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors z-30"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default Hero;