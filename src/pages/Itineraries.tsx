
import { Link } from "react-router-dom";
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
      <section className="relative flex min-h-[580px] items-center overflow-hidden">
        <img
          src={FourteenDays}
          alt="Discover Kyrgyzstan"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 md:px-8">
          <div className="max-w-3xl text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#d7b85a]" />
              <span className="text-sm font-medium">Our Journeys</span>
            </div>

            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Discover
              <br />
              Kyrgyzstan Your Way
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              From short mountain escapes to unforgettable journeys across
              the country, choose the experience that fits your adventure.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO AND TOURS */}
      <section className="px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#c9cebd] px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#4a5c23]" />
                <span className="text-sm font-medium">
                  Choose Your Adventure
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                Journeys made for
                <br />
                curious travelers.
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              Every itinerary is designed to help you experience more than
              just the famous places. Discover landscapes, local traditions,
              mountain adventures and the people who make Kyrgyzstan special.
            </p>
          </div>

          {/* COMPACT, FULLY CLICKABLE TOUR CARDS */}
          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
            {tours.map((tour) => (
              <Link
                key={tour.id}
                to={`/itineraries/${tour.id}`}
                className="group block overflow-hidden rounded-3xl bg-[#f4f5f0] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4A5C23]/40"
                aria-label={`View journey: ${tour.title}`}
              >
                <div className="relative h-[250px] overflow-hidden sm:h-[270px] md:h-[285px]">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 backdrop-blur-md">
                    <Clock className="h-4 w-4 text-[#4A5C23]" />
                    <span className="text-sm font-semibold">
                      {tour.duration}
                    </span>
                  </span>
                </div>

                <div className="flex min-h-[285px] flex-col p-6 md:p-7">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 shrink-0 text-[#4A5C23]" />
                    {tour.location}
                  </div>

                  <h3 className="mt-3 text-xl font-bold leading-snug text-[#17200f] transition-colors group-hover:text-[#4A5C23] md:text-2xl">
                    {tour.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
                    {tour.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {tour.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full bg-white px-3 py-1.5 text-xs text-gray-600 md:text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-6 font-semibold text-[#4A5C23]">
                    View Journey
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="px-4 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-3 md:gap-4">
          <img
            src={ThreeDays}
            alt="Ala-Archa"
            className="h-[160px] w-full rounded-2xl object-cover md:h-[300px] md:rounded-3xl"
          />

          <img
            src={FourDays}
            alt="Issyk-Kul and Song-Kul"
            className="h-[160px] w-full rounded-2xl object-cover md:h-[300px] md:rounded-3xl"
          />

          <img
            src={FiveDays}
            alt="Karakol"
            className="h-[160px] w-full rounded-2xl object-cover md:h-[300px] md:rounded-3xl"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#17200f] px-6 py-16 text-center text-white md:px-12 md:py-20">
          <h2 className="text-4xl font-bold md:text-5xl">
            Not sure which journey
            <br />
            is right for you?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Tell us what kind of experience you're looking for and we'll
            help you plan your perfect Kyrgyzstan adventure.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-gray-900 transition-colors hover:bg-gray-100"
          >
            Talk to Us
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Itineraries;
