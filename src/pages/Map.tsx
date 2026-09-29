import {
  MapPin,
  Hotel,
  Utensils,
  Coffee,
  Mountain,
  Compass,
  Leaf,
} from "lucide-react";
import { useState } from "react";

type Category =
  | "all"
  | "hotels"
  | "restaurants"
  | "cafes"
  | "attractions"
  | "activities";

const categories = [
  {
    id: "all",
    name: "All Places",
    icon: Compass,
  },
  {
    id: "hotels",
    name: "Hotels",
    icon: Hotel,
  },
  {
    id: "restaurants",
    name: "Restaurants",
    icon: Utensils,
  },
  {
    id: "cafes",
    name: "Cafes",
    icon: Coffee,
  },
  {
    id: "attractions",
    name: "Attractions",
    icon: Mountain,
  },
  {
    id: "activities",
    name: "Activities",
    icon: Compass,
  },
];

const places = [
  {
    id: 1,
    name: "Ala-Archa National Park",
    category: "attractions",
    location: "Chuy Region",
    description:
      "A spectacular mountain destination located near Bishkek.",
  },
  {
    id: 2,
    name: "Issyk-Kul Lake",
    category: "attractions",
    location: "Issyk-Kul Region",
    description:
      "One of the largest high-altitude lakes in the world.",
  },
  {
    id: 3,
    name: "Karakol",
    category: "activities",
    location: "Issyk-Kul Region",
    description:
      "A gateway to some of Kyrgyzstan's most beautiful mountain adventures.",
  },
  {
    id: 4,
    name: "Song-Kul",
    category: "attractions",
    location: "Naryn Region",
    description:
      "A remote alpine lake surrounded by vast mountain landscapes.",
  },
];

const Map = () => {
  const [activeCategory, setActiveCategory] =
    useState<Category>("all");

  const filteredPlaces =
    activeCategory === "all"
      ? places
      : places.filter(
          (place) => place.category === activeCategory
        );

  return (
    <section
      id="map"
      className="bg-[#f7f8f5] py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-[#c9cebd] rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-[#4a5c23] rounded-full"></span>

            <span className="text-sm font-medium">
              Explore Kyrgyzstan
            </span>
          </div>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
            Discover Places Across Kyrgyzstan
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-gray-600 leading-relaxed">
            Find hotels, restaurants, cafes, attractions and
            unforgettable activities across Kyrgyzstan.
          </p>

        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">

            <h3 className="text-lg font-semibold text-gray-900 mb-5">
              Explore by category
            </h3>

            <div className="space-y-2">

              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.id}
                    onClick={() =>
                      setActiveCategory(
                        category.id as Category
                      )
                    }
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? "bg-[#4A5C23] text-white"
                        : "text-gray-700 hover:bg-[#f1f3ed]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />

                    <span className="text-sm font-medium">
                      {category.name}
                    </span>
                  </button>
                );
              })}

            </div>

            {/* Dietary filters */}
            <div className="border-t border-gray-100 mt-7 pt-6">

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Dietary Options
              </h3>

              <div className="space-y-3">

                <label className="flex items-center gap-3 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#4A5C23]"
                  />
                  <span>Halal</span>
                </label>

                <label className="flex items-center gap-3 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#4A5C23]"
                  />
                  <span>Vegetarian</span>
                </label>

                <label className="flex items-center gap-3 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#4A5C23]"
                  />
                  <span>Vegan</span>
                </label>

              </div>

            </div>

          </div>

          {/* Map area */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* Fake map */}
            <div className="relative min-h-[600px] bg-[#e8eee4] overflow-hidden">

              {/* Decorative map background */}
              <div className="absolute inset-0 opacity-40">

                <div className="absolute top-20 left-20 w-72 h-40 bg-[#cbd8c5] rounded-[50%] rotate-12"></div>

                <div className="absolute top-60 right-20 w-80 h-48 bg-[#d5dfd0] rounded-[50%] -rotate-12"></div>

                <div className="absolute bottom-20 left-1/3 w-96 h-52 bg-[#c3d2bd] rounded-[50%] rotate-6"></div>

              </div>

              {/* Map title */}
              <div className="absolute top-6 left-6 bg-white rounded-lg shadow-md px-4 py-3 z-10">

                <p className="text-sm font-semibold text-gray-900">
                  Kyrgyzstan
                </p>

                <p className="text-xs text-gray-500">
                  Interactive map coming soon
                </p>

              </div>

              {/* Location markers */}
              <div className="absolute inset-0">

                {filteredPlaces.map((place, index) => {

                  const positions = [
                    "top-[25%] left-[28%]",
                    "top-[45%] left-[65%]",
                    "top-[58%] left-[72%]",
                    "top-[70%] left-[45%]",
                  ];

                  return (
                    <div
                      key={place.id}
                      className={`absolute ${positions[index % positions.length]}`}
                    >

                      <div className="group relative">

                        <button
                          className="w-10 h-10 rounded-full bg-[#4A5C23] text-white shadow-lg flex items-center justify-center hover:bg-[#85BC03] transition-colors"
                          aria-label={place.name}
                        >
                          <MapPin className="w-5 h-5" />
                        </button>

                        {/* Popup */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-xl p-4 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-20">

                          <h4 className="font-semibold text-gray-900">
                            {place.name}
                          </h4>

                          <p className="text-xs text-[#4A5C23] mt-1">
                            {place.location}
                          </p>

                          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                            {place.description}
                          </p>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Places list */}
            <div className="p-6 border-t border-gray-100">

              <h3 className="text-xl font-semibold text-gray-900 mb-5">
                Places to Explore
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {filteredPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >

                    <div className="flex items-start gap-3">

                      <div className="w-10 h-10 rounded-full bg-[#eef2e9] flex items-center justify-center shrink-0">
                        <Mountain className="w-5 h-5 text-[#4A5C23]" />
                      </div>

                      <div>

                        <h4 className="font-semibold text-gray-900">
                          {place.name}
                        </h4>

                        <p className="text-xs text-[#4A5C23] mt-1">
                          {place.location}
                        </p>

                        <p className="text-sm text-gray-600 mt-2">
                          {place.description}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Map;