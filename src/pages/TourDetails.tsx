import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Check,
  MessageCircle,
} from "lucide-react";

import { itineraryData } from "../data";

const TourDetails = () => {
  const { id } = useParams();

  const tour =
    itineraryData[id as keyof typeof itineraryData];

  if (!tour) {
    return (
      <div className="min-h-screen bg-[#f7f8f5] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Tour not found
          </h1>

          <p className="text-gray-600 mt-4">
            The tour you are looking for does not exist.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 bg-[#4A5C23] text-white px-6 py-3 rounded-lg hover:bg-[#85BC03] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5]">

      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#4A5C23] font-medium hover:text-[#85BC03] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Kyrgyz Tours
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="h-[420px] md:h-[520px] relative overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div className="max-w-3xl text-white">
                <p className="text-sm uppercase tracking-widest font-medium mb-4">
                  Kyrgyz Tours
                </p>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {tour.title}
                </h1>

                <p className="text-lg md:text-xl mt-6 text-white/90 max-w-2xl leading-relaxed">
                  {tour.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">

        {/* Tour info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">

          <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#eef2e9] flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-[#4A5C23]" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Duration
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {tour.duration}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#eef2e9] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#4A5C23]" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {tour.location}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#eef2e9] flex items-center justify-center">
              <Check className="w-6 h-6 text-[#4A5C23]" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Experience
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                Nature & Culture
              </p>
            </div>
          </div>

        </div>

        {/* Itinerary */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">

          <div>
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-[#c9cebd] rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-[#4a5c23] rounded-full" />

                <span className="text-sm font-medium">
                  Tour Itinerary
                </span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mt-4">
                Your Journey
              </h2>
            </div>

            <div className="space-y-6">
              {tour.days.map((day, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex gap-5">

                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-full bg-[#4A5C23] text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#4A5C23]">
                        {day.day}
                      </p>

                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                        {day.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mt-3">
                        {day.description}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <aside>
            <div className="bg-white rounded-2xl shadow-sm p-7 sticky top-8">

              <h3 className="text-2xl font-bold text-gray-900">
                Interested in this tour?
              </h3>

              <p className="text-gray-600 leading-relaxed mt-4">
                Contact us to learn more about availability,
                pricing and personalized options for this journey.
              </p>

              <button
                className="w-full mt-7 bg-[#4A5C23] hover:bg-[#85BC03] text-white font-medium py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Us
              </button>

              <Link
                to="/"
                className="w-full mt-3 border border-gray-200 text-gray-700 font-medium py-3.5 rounded-lg transition-colors hover:bg-gray-50 flex items-center justify-center"
              >
                Back to Tours
              </Link>

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default TourDetails;