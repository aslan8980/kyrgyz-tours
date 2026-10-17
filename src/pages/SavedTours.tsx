
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { ArrowLeft, ArrowRight, Clock, Heart, MapPin, Trash2 } from "lucide-react";

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
      "Explore Bishkek and discover the breathtaking landscapes of Ala-Archa National Park.",
  },
  {
    id: "4-days",
    title: "4 Days — Issyk-Kul & Song-Kul",
    duration: "4 Days",
    location: "Issyk-Kul & Song-Kul",
    image: FourDays,
    description:
      "Discover Kyrgyzstan's iconic mountain lake, alpine scenery and nomadic culture.",
  },
  {
    id: "5-days",
    title: "5 Days — Skiing & Snowboarding in Karakol",
    duration: "5 Days",
    location: "Karakol",
    image: FiveDays,
    description:
      "Experience winter adventures, mountain slopes and Kyrgyz hospitality.",
  },
  {
    id: "14-days",
    title: "14 Days — Discover Kyrgyzstan",
    duration: "14 Days",
    location: "Across Kyrgyzstan",
    image: FourteenDays,
    description:
      "Travel across Kyrgyzstan to discover mountains, lakes, canyons and nomadic culture.",
  },
];

const STORAGE_KEY = "savedTours";

const SavedTours = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const loadSavedTours = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
          setSavedIds([]);
          return;
        }

        const parsed: unknown = JSON.parse(stored);

        if (!Array.isArray(parsed)) {
          setSavedIds([]);
          return;
        }

        const ids = parsed
          .map((item: unknown) => {
            if (typeof item === "string") return item;

            if (item && typeof item === "object" && "id" in item) {
              const id = (item as { id?: unknown }).id;
              return typeof id === "string" ? id : null;
            }

            return null;
          })
          .filter((id): id is string => typeof id === "string");

        setSavedIds(ids);
      } catch {
        setSavedIds([]);
      }
    };

    loadSavedTours();

    window.addEventListener("storage", loadSavedTours);
    window.addEventListener("savedToursUpdated", loadSavedTours);

    return () => {
      window.removeEventListener("storage", loadSavedTours);
      window.removeEventListener("savedToursUpdated", loadSavedTours);
    };
  }, []);

  const savedTours = tours.filter((tour) => savedIds.includes(tour.id));

  const removeTour = (id: string) => {
    const updated = savedIds.filter((savedId) => savedId !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedIds(updated);
    window.dispatchEvent(new Event("savedToursUpdated"));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* HEADER */}
      <section className="px-4 pb-10 pt-36 md:px-8 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/itineraries"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#4A5C23]"
          >
            <ArrowLeft size={17} />
            Back to itineraries
          </Link>


          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Saved journeys.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
                All the places and adventures you want to explore in
                Kyrgyzstan, collected in one place.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {savedTours.length}{" "}
              {savedTours.length === 1 ? "journey" : "journeys"} saved
            </span>
          </div>
        </div>
      </section>

      {/* SAVED TOUR CARDS */}
      <section className="px-4 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          {savedTours.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedTours.map((tour) => (
                <article
                  key={tour.id}
                  className="group overflow-hidden rounded-3xl bg-[#f4f5f0] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    to={`/itineraries/${tour.id}`}
                    className="block"
                    aria-label={`View ${tour.title}`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold">
                        <Clock size={15} className="text-[#4A5C23]" />
                        {tour.duration}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} className="text-[#4A5C23]" />
                      {tour.location}
                    </div>

                    <Link to={`/itineraries/${tour.id}`}>
                      <h2 className="mt-3 text-xl font-bold leading-snug text-[#17200f] transition-colors hover:text-[#4A5C23]">
                        {tour.title}
                      </h2>
                    </Link>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {tour.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-200 pt-5">
                      <Link
                        to={`/itineraries/${tour.id}`}
                        className="inline-flex items-center gap-2 font-semibold text-[#4A5C23]"
                      >
                        View journey
                        <ArrowRight size={17} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeTour(tour.id)}
                        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remove ${tour.title} from saved tours`}
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-[#f4f5f0] px-6 py-16 text-center md:py-24">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <Heart size={28} className="text-[#4A5C23]" />
              </div>

              <h2 className="mt-6 text-2xl font-bold md:text-3xl">
                No saved journeys yet
              </h2>

              <p className="mx-auto mt-3 max-w-md leading-relaxed text-gray-600">
                Found a tour you love? Tap the heart on its page and it will
                appear here. No account needed.
              </p>

              <Link
                to="/itineraries"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#4A5C23] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#35451a]"
              >
                Explore itineraries
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SavedTours;
