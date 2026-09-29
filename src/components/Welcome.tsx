import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import KyrgyzstanImage from "../assets/images/cheetah-close.webp";

const Welcome = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left text content */}
        <div className="space-y-6">
          {/* Highlighted label */}
          <h3 className="inline-flex items-center gap-2 bg-[#c9cebd] rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-[#4a5c23] rounded-full"></span>
            <span className="text-sm font-medium">
              Welcome to Kyrgyzstan
            </span>
          </h3>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Discover the Land of Mountains and Nomads
          </h2>

          {/* Paragraphs */}
          <p className="text-gray-600 leading-relaxed">
            Kyrgyzstan is a country of breathtaking mountains, crystal-clear
            lakes, vast valleys and centuries-old nomadic traditions. From
            peaceful mountain landscapes to unforgettable adventures, every
            journey offers something new to discover.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Explore the beauty of Issyk-Kul, hike through Ala-Archa, discover
            Karakol and experience the unique hospitality and culture of the
            Kyrgyz people.
          </p>

          {/* Call to action button */}
          <Link to="/#itineraries" aria-label="Explore Kyrgyzstan itineraries">
            <Button className="bg-[#4A5C23] hover:bg-[#85BC03] text-white mt-4">
              Explore Itineraries
            </Button>
          </Link>
        </div>

        {/* Right image content */}
        <div className="relative">
          <img
            src={KyrgyzstanImage}
            alt="Beautiful landscape of Kyrgyzstan"
            className="w-full h-[420px] rounded-lg relative z-10 object-cover"
          />

          {/* Decorative background circle */}
          <div className="bg-[#95D103]/10 absolute -bottom-4 -right-4 w-32 h-32 rounded-full z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;