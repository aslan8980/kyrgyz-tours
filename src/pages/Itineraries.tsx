import Navigation from "../components/Navigation";
import { ArrowRight, Clock, MapPin } from "lucide-react";

import ThreeDays from "../assets/images/3-days.webp";
import FourDays from "../assets/images/4-days.webp";
import FiveDays from "../assets/images/5-days.webp";
import FourteenDays from "../assets/images/14-days.webp";

const tours = [
  {
    id: "3-days",
    title: "3 Days — Bishkek & Ala-Archa",
    duration: "3 Days",
    location: "Bishkek & Ala-Archa",
    image: ThreeDays,
    description:
      "A perfect introduction to Kyrgyzstan combining the energy of Bishkek with the breathtaking landscapes of Ala-Archa National Park.",
    highlights: ["Bishkek", "Ala-Archa", "Mountain landscapes"],
  },
  {
    id: "4-days",
    title: "4 Days — Issyk-Kul & Song-Kul",
    duration: "4 Days",
    location: "Issyk-Kul & Song-Kul",
    image: FourDays,
    description:
      "Discover two of Kyrgyzstan's most iconic destinations — the crystal-clear Issyk-Kul and the spectacular alpine Song-Kul.",
    highlights: ["Issyk-Kul", "Song-Kul", "Yurt experience"],
  },
  {
    id: "5-days",
    title: "5 Days — Skiing & Snowboarding in Karakol",
    duration: "5 Days",
    location: "Karakol",
    image: FiveDays,
    description:
      "An unforgettable winter adventure in the mountains of Karakol, combining skiing, snowboarding and Kyrgyz hospitality.",
    highlights: ["Karakol", "Skiing", "Snowboarding"],
  },
  {
    id: "14-days",
    title: "14 Days — Discover Kyrgyzstan",
    duration: "14 Days",
    location: "Across Kyrgyzstan",
    image: FourteenDays,
    description:
      "The ultimate Kyrgyzstan experience. Travel across the country and discover mountains, lakes, canyons, valleys and nomadic culture.",
    highlights: ["Mountains", "Lakes", "Nomadic culture"],
  },
];

const Itineraries = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* HERO */}
      <section className="relative min-h-[620px] flex items-center overflow-hidden">
        <img
          src={FourteenDays}
          alt="Discover Kyrgyzstan"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 pt-28">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#d7b85a] rounded-full" />
              <span className="text-sm font-medium">
                Our Journeys
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Discover
              <br />
              Kyrgyzstan Your Way
            </h1>

            <p className="mt-7 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
              From short mountain escapes to unforgettable journeys across
              the country, choose the experience that fits your adventure.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c9cebd] rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-[#4a5c23] rounded-full" />
                <span className="text-sm font-medium">
                  Choose Your Adventure
                </span>
              </div>

              <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                Journeys made for
                <br />
                curious travelers.
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Every itinerary is designed to help you experience more than
              just the famous places. Discover landscapes, local traditions,
              mountain adventures and the people who make Kyrgyzstan special.
            </p>
          </div>

          {/* TOURS */}
          <div className="grid md:grid-cols-2 gap-7 mt-16">
            {tours.map((tour) => (
              <article
                key={tour.id}
                className="group bg-[#f4f5f0] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-[330px] overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#4A5C23]" />
                    <span className="text-sm font-semibold">
                      {tour.duration}
                    </span>
                  </div>
                </div>

                <div className="p-7 md:p-8">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-[#4A5C23]" />
                    {tour.location}
                  </div>

                  <h3 className="mt-4 text-2xl font-bold">
                    {tour.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {tour.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {tour.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-white rounded-full px-3 py-1.5 text-sm text-gray-600"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`/itineraries/${tour.id}`}
                    className="inline-flex items-center gap-2 mt-7 font-semibold text-[#4A5C23] hover:gap-3 transition-all"
                  >
                    View Journey
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="px-4 md:px-8 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
          <img
            src={ThreeDays}
            alt="Ala-Archa"
            className="w-full h-[220px] md:h-[350px] object-cover rounded-3xl"
          />

          <img
            src={FourDays}
            alt="Issyk-Kul and Song-Kul"
            className="w-full h-[220px] md:h-[350px] object-cover rounded-3xl"
          />

          <img
            src={FiveDays}
            alt="Karakol"
            className="w-full h-[220px] md:h-[350px] object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 pb-24">
        <div className="max-w-7xl mx-auto bg-[#17200f] rounded-[2rem] px-6 md:px-12 py-20 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold">
            Not sure which journey
            <br />
            is right for you?
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-white/70 text-lg">
            Tell us what kind of experience you're looking for and we'll
            help you plan your perfect Kyrgyzstan adventure.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Talk to Us
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Itineraries;