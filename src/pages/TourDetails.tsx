
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  Heart,
  Languages,
  MapPin,
  MessageCircle,
  Minus,
  Mountain,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react";

import Navigation from "../components/Navigation";
import { itineraryData } from "../data";

type Currency = "USD" | "EUR" | "KGS";

type TourDay = {
  day: number;
  title: string;
  description: string;
};

type Tour = {
  title: string;
  shortDescription: string;
  duration: string;
  location: string;
  image: string;
  days: TourDay[];
};

type DemoReview = {
  name: string;
  country: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  initials: string;
};

const CURRENCY_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.86,
  KGS: 87,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  KGS: "сом",
};

const TOUR_PRICES: Record<string, number> = {
  "3-days": 149,
  "4-days": 229,
  "5-days": 349,
  "14-days": 899,
};

// Fictional examples for development preview only.
const DEMO_REVIEWS: DemoReview[] = [
  {
    name: "Emily",
    country: "United Kingdom",
    date: "12 September 2026",
    rating: 5,
    title: "An unforgettable mountain adventure",
    text: "The landscapes were absolutely beautiful. We loved discovering the local culture, stopping at scenic viewpoints and learning about life in Kyrgyzstan. A wonderful experience from beginning to end.",
    initials: "E",
  },
  {
    name: "Marco",
    country: "Italy",
    date: "28 August 2026",
    rating: 5,
    title: "Beautiful places and a great experience",
    text: "The mountains were breathtaking, and the journey gave us a chance to see a completely different side of Central Asia. I would recommend this kind of trip to anyone who loves nature.",
    initials: "M",
  },
  {
    name: "Sophie",
    country: "Germany",
    date: "16 August 2026",
    rating: 4,
    title: "A lovely way to explore Kyrgyzstan",
    text: "We enjoyed the scenery, the stops along the way and the opportunity to learn more about local traditions. Bring comfortable shoes and a camera!",
    initials: "S",
  },
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatPrice = (amount: number, currency: Currency) => {
  const converted = amount * CURRENCY_RATES[currency];

  if (currency === "KGS") {
    return `${Math.round(converted).toLocaleString("en-US")} сом`;
  }

  return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 0,
    }
  )}`;
};

const getSavedTours = (): string[] => {
  try {
    const saved = localStorage.getItem("kyrgyz-tours-favorites");
    const parsed: unknown = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
};

const isDateAvailable = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Prototype availability only. Connect real availability later.
  return date >= today;
};

const TourDetails = () => {
  const { id } = useParams<{ id: string }>();

  const allTours = Object.entries(
    itineraryData as Record<string, Tour>
  );

  const tour = id
    ? (itineraryData as Record<string, Tour>)[id]
    : undefined;

  const [currency, setCurrency] = useState<Currency>("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedTours, setSavedTours] = useState<string[]>(getSavedTours);

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(2);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [guideContactOpen, setGuideContactOpen] = useState(false);
  const [notice, setNotice] = useState("");

  if (!tour || !id) {
    return (
      <div className="min-h-screen bg-[#f7f8f4]">
        <Navigation />

        <main className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
          <Mountain className="mx-auto mb-5 h-12 w-12 text-[#4A5C23]" />

          <h1 className="text-3xl font-bold text-[#17200f]">
            Tour not found
          </h1>

          <p className="mt-3 text-gray-600">
            This tour may have been moved or is no longer available.
          </p>

          <Link
            to="/itineraries"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#4A5C23] px-6 py-3 font-semibold text-white transition hover:bg-[#35451a]"
          >
            <ArrowLeft size={18} />
            Browse all tours
          </Link>
        </main>
      </div>
    );
  }

  const price = TOUR_PRICES[id] ?? 199;
  const isSaved = savedTours.includes(id);

  const galleryImages = [
    tour.image,
    ...allTours
      .filter(([tourId]) => tourId !== id)
      .slice(0, 3)
      .map(([, item]) => item.image),
  ].filter(Boolean);

  const searchResults = allTours.filter(([, item]) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return false;

    return `${item.title} ${item.location} ${item.shortDescription}`
      .toLowerCase()
      .includes(query);
  });

  const toggleFavorite = () => {
    const next = isSaved
      ? savedTours.filter((savedId) => savedId !== id)
      : [...savedTours, id];

    setSavedTours(next);

    try {
      localStorage.setItem(
        "kyrgyz-tours-favorites",
        JSON.stringify(next)
      );

      setNotice(
        isSaved ? "Removed from favorites." : "Saved to favorites."
      );
    } catch {
      setNotice("Browser storage is unavailable. The change may not persist.");
    }
  };

  const moveMonth = (amount: number) => {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + amount,
        1
      )
    );
  };

  const selectDate = (date: Date) => {
    if (!isDateAvailable(date)) return;

    setSelectedDate(getDateKey(date));
    setNotice("");
  };

  const openBooking = () => {
    if (!selectedDate) {
      setNotice("Please select a departure date first.");
      document.getElementById("available-dates")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setBookingOpen(true);

    window.setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNotice(
      "Demo form only. Booking submission is not connected to a server yet."
    );
  };

  const handleGuideContactSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuideContactOpen(false);
    setNotice(
      "Demo form only. Message delivery is not connected to a server yet."
    );
  };

  const changeGallery = (direction: number) => {
    setGalleryIndex((current) => {
      return (
        (current + direction + galleryImages.length) %
        galleryImages.length
      );
    });
  };

  const renderMonth = (monthOffset: number) => {
    const monthDate = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + monthOffset,
      1
    );

    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDayOffset = (monthDate.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return (
      <div key={`${year}-${month}`} className="min-w-0">
        <h3 className="mb-3 text-center font-semibold text-[#17200f]">
          {MONTH_NAMES[month]} {year}
        </h3>

        <div className="grid grid-cols-7 gap-1">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-[10px] font-medium text-gray-400 sm:text-xs"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: firstDayOffset }, (_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {Array.from({ length: daysInMonth }, (_, index) => {
            const date = new Date(year, month, index + 1);
            const dateKey = getDateKey(date);
            const available = isDateAvailable(date);
            const selected = selectedDate === dateKey;

            return (
              <button
                key={dateKey}
                type="button"
                disabled={!available}
                onClick={() => selectDate(date)}
                aria-label={`${dateKey}${available ? ", available" : ", unavailable"}`}
                aria-pressed={selected}
                className={`min-w-0 rounded-lg px-0.5 py-2 text-center transition sm:rounded-xl sm:py-3 ${
                  selected
                    ? "bg-[#4A5C23] text-white"
                    : available
                    ? "bg-[#f4f5f0] text-[#20251c] hover:bg-[#e6eadc]"
                    : "cursor-not-allowed text-gray-300"
                }`}
              >
                <span className="block text-xs sm:text-sm">
                  {index + 1}
                </span>

                {available && (
                  <span
                    className={`mt-1 block truncate text-[8px] sm:text-[9px] ${
                      selected ? "text-white/80" : "text-[#4A5C23]"
                    }`}
                  >
                    {formatPrice(price, currency)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#20251c]">
      <Navigation />

      {/* SEARCH AND CURRENCY */}
      <div className="relative z-30 border-b border-gray-100 bg-white pt-24">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3 px-4 py-4 md:px-8">
          <div className="relative min-w-[220px] flex-1">
            <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-[#f8f9f6] px-4 py-3 focus-within:border-[#4A5C23]">
              <Search size={19} className="shrink-0 text-gray-500" />

              <input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => {
                  window.setTimeout(() => setSearchOpen(false), 150);
                }}
                placeholder="Search places and tours"
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                aria-label="Search tours"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {searchOpen && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                {searchResults.length ? (
                  searchResults.map(([tourId, item]) => (
                    <Link
                      key={tourId}
                      to={`/itineraries/${tourId}`}
                      className="flex items-center gap-3 rounded-xl p-3 hover:bg-[#f4f5f0]"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="h-12 w-14 rounded-lg object-cover"
                      />

                      <div>
                        <p className="text-sm font-semibold">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.duration} · {item.location}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="p-4 text-sm text-gray-500">
                    No matching tours found.
                  </p>
                )}
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-3 text-sm">
            <span className="text-gray-500">Currency</span>

            <select
              value={currency}
              onChange={(event) =>
                setCurrency(event.target.value as Currency)
              }
              className="cursor-pointer bg-transparent font-semibold outline-none"
              aria-label="Select currency"
            >
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="KGS">KGS сом</option>
            </select>
          </label>

          <button
            type="button"
            onClick={() =>
              setNotice(
                savedTours.length
                  ? `You have ${savedTours.length} saved tour(s) in this browser.`
                  : "You have no saved tours yet."
              )
            }
            className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition hover:bg-[#f4f5f0]"
          >
            <Heart
              size={20}
              className={
                savedTours.length
                  ? "fill-[#4A5C23] text-[#4A5C23]"
                  : ""
              }
            />
            <span className="hidden sm:inline">Saved</span>

            {savedTours.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4A5C23] px-1 text-xs text-white">
                {savedTours.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-[1440px] px-4 pb-28 md:px-8 md:pb-24">
        {/* BREADCRUMBS */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 py-5 text-sm text-gray-500"
        >
          <Link to="/" className="hover:text-[#4A5C23]">
            Home
          </Link>
          <span>/</span>
          <Link to="/itineraries" className="hover:text-[#4A5C23]">
            Itineraries
          </Link>
          <span>/</span>
          <span className="max-w-[240px] truncate text-gray-800">
            {tour.title}
          </span>
        </nav>

        {/* PHOTO GALLERY */}
        <section className="relative">
          <div className="grid h-[300px] grid-cols-2 gap-2 overflow-hidden rounded-[24px] md:h-[460px] md:grid-cols-4">
            <button
              type="button"
              onClick={() => {
                setGalleryIndex(0);
                setGalleryOpen(true);
              }}
              className="group relative col-span-2 row-span-2 overflow-hidden text-left"
              aria-label="Open main tour photo"
            >
              <img
                src={galleryImages[0]}
                alt={tour.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </button>

            {galleryImages.slice(1, 4).map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => {
                  setGalleryIndex(index + 1);
                  setGalleryOpen(true);
                }}
                className="group relative hidden overflow-hidden md:block"
                aria-label={`Open tour photo ${index + 2}`}
              >
                <img
                  src={image}
                  alt={`${tour.title} view ${index + 2}`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleFavorite}
            className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-sm transition md:left-6 md:top-6 ${
              isSaved
                ? "bg-[#4A5C23] text-white"
                : "bg-white text-[#20251c] hover:bg-[#f4f5f0]"
            }`}
          >
            <Heart size={19} className={isSaved ? "fill-current" : ""} />
            {isSaved ? "Saved to favorites" : "Save to favorites"}
          </button>

          <button
            type="button"
            onClick={() => {
              setGalleryIndex(0);
              setGalleryOpen(true);
            }}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold shadow-md transition hover:bg-[#f4f5f0] md:bottom-6 md:right-6"
          >
            <Camera size={17} />
            View photos
          </button>
        </section>

        {/* MAIN CONTENT AND BOOKING CARD */}
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_350px] xl:gap-20">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="rounded-full bg-[#edf0e6] px-3 py-1.5 font-medium text-[#4A5C23]">
                Kyrgyzstan
              </span>
              <span>·</span>
              <span>{tour.location}</span>
              <span>·</span>
              <span>{tour.duration}</span>
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#17200f] md:text-5xl xl:text-6xl">
              {tour.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              {tour.shortDescription}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-100 pb-7">
              <div className="flex items-center gap-2">
                <Star size={22} className="text-[#4A5C23]" />
                <span className="text-xl font-bold">Sample reviews</span>
              </div>
              <span className="text-sm text-gray-500">
                Fictional preview content
              </span>
            </div>

            {/* TOUR FACTS */}
            <div className="grid grid-cols-1 gap-5 border-b border-gray-100 py-7 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f2eb] text-[#4A5C23]">
                  <Clock3 size={21} />
                </span>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold">{tour.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f2eb] text-[#4A5C23]">
                  <MapPin size={21} />
                </span>
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-semibold">{tour.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f2eb] text-[#4A5C23]">
                  <Users size={21} />
                </span>
                <div>
                  <p className="text-sm text-gray-500">Group size</p>
                  <p className="font-semibold">Confirm with organizer</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f2eb] text-[#4A5C23]">
                  <Languages size={21} />
                </span>
                <div>
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="font-semibold">Confirm before booking</p>
                </div>
              </div>
            </div>

            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-32 py-10">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#71805a]">
                The experience
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#17200f]">
                About this tour
              </h2>

              <p className="mt-5 max-w-3xl whitespace-pre-line text-base leading-8 text-gray-600">
                {tour.shortDescription}
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600">
                Explore Kyrgyzstan's mountain landscapes, culture and local
                hospitality. Confirm the final itinerary, inclusions and
                travel conditions with the organizer before booking.
              </p>
            </section>

            {/* ITINERARY */}
            <section
              id="itinerary"
              className="scroll-mt-32 border-t border-gray-100 py-10"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#71805a]">
                Your journey
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#17200f]">
                Itinerary, day by day
              </h2>

              {tour.days?.length ? (
                <div className="mt-7 space-y-3">
                  {tour.days.map((day, index) => (
                    <details
                      key={`${day.day}-${day.title}`}
                      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white"
                      open={index === 0}
                    >
                      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#edf0e6] text-sm font-bold text-[#4A5C23]">
                          {String(day.day).padStart(2, "0")}
                        </span>

                        <span className="flex-1">
                          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Day {day.day}
                          </span>
                          <span className="mt-1 block font-semibold text-[#20251c]">
                            {day.title}
                          </span>
                        </span>

                        <ChevronDown
                          size={20}
                          className="shrink-0 text-gray-500 transition group-open:rotate-180"
                        />
                      </summary>

                      <div className="border-t border-gray-100 px-5 pb-6 pt-4 pl-[84px] md:px-6 md:pl-[92px]">
                        <p className="leading-7 text-gray-600">
                          {day.description}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              ) : (
                <p className="mt-5 rounded-2xl bg-[#f7f8f4] p-5 leading-7 text-gray-600">
                  The detailed daily itinerary is being prepared. Contact
                  the organizer for the current route.
                </p>
              )}
            </section>

            {/* INCLUSIONS */}
            <section
              id="included"
              className="scroll-mt-32 border-t border-gray-100 py-10"
            >
              <h2 className="text-3xl font-bold text-[#17200f]">
                What's included
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Confirm the final list of services with the organizer.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Transport between itinerary stops",
                  "Local guide or tour coordinator",
                  "Accommodation, if specified",
                  "Activities in the confirmed itinerary",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className="mt-0.5 shrink-0 text-[#4A5C23]"
                    />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl bg-[#f7f8f4] p-5">
                <h3 className="font-semibold">Before you travel</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Ask about meals, entrance tickets, accommodation,
                  luggage, insurance, cancellation conditions and seasonal
                  road access.
                </p>
              </div>
            </section>

            {/* MEETING POINT */}
            <section
              id="meeting-point"
              className="scroll-mt-32 border-t border-gray-100 py-10"
            >
              <h2 className="text-3xl font-bold text-[#17200f]">
                Meeting point
              </h2>

              <div className="mt-5 flex gap-4 rounded-2xl bg-[#f7f8f4] p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#4A5C23]">
                  <MapPin size={22} />
                </span>

                <div>
                  <p className="font-semibold">{tour.location}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    The exact meeting location and departure time must be
                    confirmed with the organizer.
                  </p>
                </div>
              </div>
            </section>

            {/* GUIDE */}
            <section
              id="guide"
              className="scroll-mt-32 border-t border-gray-100 py-10"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#71805a]">
                Meet your host
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#17200f]">
                Your guide
              </h2>

              <div className="mt-6 rounded-3xl border border-gray-200 p-6">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#edf0e6] text-[#4A5C23]">
                    <Compass size={38} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold">
                        Kyrgyz Tours team
                      </h3>
                      <BadgeCheck size={19} className="text-[#4A5C23]" />
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      Local tour organizer · Kyrgyzstan
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="rounded-full bg-[#f4f5f0] px-3 py-1.5">
                        Local experience
                      </span>
                      <span className="rounded-full bg-[#f4f5f0] px-3 py-1.5">
                        Tour organizer
                      </span>
                    </div>

                    <p className="mt-4 leading-7 text-gray-600">
                      Discover Kyrgyzstan with a local team. Ask us about
                      the route, meeting point, travel conditions and what
                      to bring.
                    </p>

                    <p className="mt-3 text-xs leading-5 text-gray-400">
                      Replace this sample profile with your actual guide's
                      name, photo, languages and experience.
                    </p>

                    <button
                      type="button"
                      onClick={() => setGuideContactOpen(true)}
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#4A5C23] px-6 py-3 font-semibold text-white transition hover:bg-[#35451a]"
                    >
                      <MessageCircle size={18} />
                      Contact the guide
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* AVAILABLE DATES — MAIN COLUMN */}
            <section
              id="available-dates"
              className="scroll-mt-32 border-t border-gray-100 py-10"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#71805a]">
                Plan your trip
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#17200f] md:text-4xl">
                Available dates
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Choose a departure date to see the price for your trip.
                Select a date and send a booking request.
              </p>

              <div className="mt-7 rounded-3xl border border-gray-200 p-4 sm:p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => moveMonth(-1)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 transition hover:bg-[#f4f5f0]"
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="text-center">
                    <p className="font-semibold text-[#17200f]">
                      {MONTH_NAMES[calendarMonth.getMonth()]}{" "}
                      {calendarMonth.getFullYear()}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      and the following month
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => moveMonth(1)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 transition hover:bg-[#f4f5f0]"
                    aria-label="Next month"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
                  {renderMonth(0)}
                  {renderMonth(1)}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-5 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-[#f4f5f0]" />
                    Available
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-[#4A5C23]" />
                    Selected
                  </span>
                </div>

                {selectedDate && (
                  <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[#f4f5f0] p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Your selected date
                      </p>

                      <p className="mt-1 font-semibold text-[#17200f]">
                        {new Date(
                          `${selectedDate}T12:00:00`
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {guests} traveler{guests === 1 ? "" : "s"} ·{" "}
                        {formatPrice(price * guests, currency)} total
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={openBooking}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4A5C23] px-6 py-3 font-semibold text-white transition hover:bg-[#35451a]"
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-4 text-xs leading-5 text-gray-400">
                Dates and prices are currently for demonstration. Actual
                availability must be confirmed by the tour organizer.
              </p>
            </section>

            {/* BOOKING CONDITIONS */}
            <section
              id="booking-conditions"
              className="scroll-mt-32 border-t border-gray-100 py-10"
            >
              <h2 className="text-3xl font-bold text-[#17200f]">
                Booking conditions
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                The final price, payment schedule, cancellation policy and
                inclusions should be confirmed before payment.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={21}
                    className="mt-0.5 shrink-0 text-[#4A5C23]"
                  />
                  <div>
                    <p className="font-semibold">Confirm before payment</p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Confirm the final price and availability with the
                      organizer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={21}
                    className="mt-0.5 shrink-0 text-[#4A5C23]"
                  />
                  <div>
                    <p className="font-semibold">Departure date</p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Your selected date is a request until the organizer
                      confirms availability.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* REVIEWS */}
            <section
              id="reviews"
              className="scroll-mt-32 border-t border-gray-100 py-10"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#71805a]">
                Traveler feedback
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#17200f] md:text-4xl">
                Reviews
              </h2>

              <div className="mt-6 flex flex-wrap items-center gap-5 rounded-3xl bg-[#f7f8f4] p-6 md:p-8">
                <div>
                  <p className="text-5xl font-bold tracking-tight text-[#17200f]">
                    4.7
                  </p>

                  <div className="mt-2 flex gap-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        size={17}
                        className="fill-[#4A5C23] text-[#4A5C23]"
                      />
                    ))}
                  </div>
                </div>

                <div className="min-w-[180px] flex-1">
                  <p className="font-semibold text-[#17200f]">
                    Sample traveler feedback
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Fictional examples for layout preview. This is not a
                    verified customer rating.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-7">
                {DEMO_REVIEWS.map((review) => (
                  <article
                    key={`${review.name}-${review.date}`}
                    className="border-b border-gray-100 pb-7 last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#edf0e6] text-lg font-bold text-[#4A5C23]">
                        {review.initials}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-[#17200f]">
                              {review.name}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                              {review.country}
                            </p>
                          </div>

                          <span className="text-xs text-gray-400">
                            {review.date}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              key={index}
                              size={15}
                              className={
                                index < review.rating
                                  ? "fill-[#4A5C23] text-[#4A5C23]"
                                  : "text-gray-300"
                              }
                            />
                          ))}

                          <span className="ml-2 text-xs text-gray-500">
                            {review.rating}/5
                          </span>
                        </div>

                        <h4 className="mt-3 font-semibold text-[#17200f]">
                          {review.title}
                        </h4>

                        <p className="mt-2 leading-7 text-gray-600">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-2 rounded-xl bg-[#f7f8f4] p-4 text-xs leading-5 text-gray-500">
                These reviews are fictional examples for development.
                Replace them with genuine customer feedback before
                publishing the website.
              </p>
            </section>

            {/* FAQ */}
            <section className="border-t border-gray-100 py-10">
              <h2 className="text-3xl font-bold text-[#17200f]">
                Frequently asked questions
              </h2>

              <div className="mt-6 space-y-3">
                {[
                  {
                    question: "How do I reserve a place?",
                    answer:
                      "Choose a date and the number of travelers, then submit a request. Booking becomes active after the booking backend is connected.",
                  },
                  {
                    question: "What should I bring?",
                    answer:
                      "Clothing and equipment depend on the season and route. Confirm the recommended packing list with your guide.",
                  },
                  {
                    question: "Can the itinerary change?",
                    answer:
                      "Weather and road conditions can affect mountain routes. Ask the organizer about alternatives and cancellation conditions.",
                  },
                ].map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-2xl border border-gray-200 p-5"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                      {faq.question}
                      <ChevronDown
                        size={19}
                        className="shrink-0 transition group-open:rotate-180"
                      />
                    </summary>

                    <p className="mt-4 leading-7 text-gray-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* PRICE AND BOOKING SIDEBAR */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-[0_15px_60px_rgba(23,32,15,0.08)] md:p-7">
              <p className="text-sm text-gray-500">Price per person</p>

              <p className="mt-1 text-4xl font-bold tracking-tight text-[#17200f]">
                {formatPrice(price, currency)}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Demonstration price — confirm before booking
              </p>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Travelers</span>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 disabled:opacity-30"
                      aria-label="Remove traveler"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="min-w-4 text-center font-semibold">
                      {guests}
                    </span>

                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(20, guests + 1))}
                      disabled={guests >= 20}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 disabled:opacity-30"
                      aria-label="Add traveler"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5 text-sm">
                <span className="text-gray-500">Total for {guests}</span>
                <span className="text-lg font-bold">
                  {formatPrice(price * guests, currency)}
                </span>
              </div>

              {selectedDate && (
                <div className="mt-4 rounded-xl bg-[#f4f5f0] p-3 text-sm">
                  <p className="text-gray-500">Selected date</p>
                  <p className="mt-1 font-semibold text-[#17200f]">
                    {new Date(
                      `${selectedDate}T12:00:00`
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={openBooking}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#4A5C23] px-5 py-4 font-semibold text-white transition hover:bg-[#35451a]"
              >
                <CalendarDays size={19} />
                Request to book
              </button>

              <button
                type="button"
                onClick={toggleFavorite}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3.5 font-semibold transition hover:bg-[#f7f8f4]"
              >
                <Heart
                  size={18}
                  className={isSaved ? "fill-[#4A5C23] text-[#4A5C23]" : ""}
                />
                {isSaved ? "Saved to favorites" : "Save tour"}
              </button>

              <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-[#4A5C23]"
                  />
                  <p className="text-sm leading-6 text-gray-600">
                    Confirm the price and booking conditions before paying.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle
                    size={19}
                    className="mt-0.5 shrink-0 text-[#4A5C23]"
                  />
                  <button
                    type="button"
                    onClick={() => setGuideContactOpen(true)}
                    className="text-left text-sm leading-6 text-gray-600 underline decoration-gray-300 underline-offset-4 hover:text-[#4A5C23]"
                  >
                    Ask the guide about availability
                  </button>
                </div>
              </div>

              {bookingOpen && (
                <form
                  id="booking-form"
                  onSubmit={handleBookingSubmit}
                  className="mt-6 space-y-4 border-t border-gray-100 pt-6"
                >
                  <div>
                    <h3 className="text-lg font-bold">Booking request</h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Tour: {tour.title}
                    </p>

                    <p className="text-sm leading-6 text-gray-500">
                      Date: {selectedDate || "Choose a date"}
                    </p>

                    <p className="text-sm leading-6 text-gray-500">
                      Travelers: {guests}
                    </p>
                  </div>

                  <input
                    required
                    name="name"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#4A5C23]"
                  />

                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#4A5C23]"
                  />

                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone / WhatsApp (optional)"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#4A5C23]"
                  />

                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Questions or special requests"
                    className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#4A5C23]"
                  />

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#17200f] px-5 py-4 font-semibold text-white transition hover:bg-[#35451a]"
                  >
                    Send request
                  </button>

                  <p className="text-xs leading-5 text-gray-400">
                    Demo form only. It does not submit a real booking yet.
                  </p>
                </form>
              )}
            </div>
          </aside>
        </div>

        {/* RELATED TOURS */}
        {allTours.filter(([tourId]) => tourId !== id).length > 0 && (
          <section className="mt-16 border-t border-gray-100 pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#71805a]">
                  Keep exploring
                </span>

                <h2 className="mt-3 text-3xl font-bold text-[#17200f] md:text-4xl">
                  You may also like
                </h2>
              </div>

              <Link
                to="/itineraries"
                className="inline-flex items-center gap-2 font-semibold text-[#4A5C23] hover:gap-3"
              >
                All tours
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allTours
                .filter(([tourId]) => tourId !== id)
                .slice(0, 3)
                .map(([tourId, item]) => (
                  <Link
                    key={tourId}
                    to={`/itineraries/${tourId}`}
                    className="group overflow-hidden rounded-3xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#4A5C23]">
                        {item.duration}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-sm text-gray-500">
                        {item.location}
                      </p>

                      <h3 className="mt-2 text-xl font-bold leading-snug text-[#17200f]">
                        {item.title}
                      </h3>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                        {item.shortDescription}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          From{" "}
                          {formatPrice(
                            TOUR_PRICES[tourId] ?? 199,
                            currency
                          )}
                        </span>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf0e6] text-[#4A5C23] transition group-hover:bg-[#4A5C23] group-hover:text-white">
                          <ArrowRight size={17} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </main>

      {/* MOBILE BOOKING BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-4 border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div>
          <p className="text-xs text-gray-500">Price per person</p>
          <p className="text-xl font-bold">
            {formatPrice(price, currency)}
          </p>
        </div>

        <button
          type="button"
          onClick={openBooking}
          className="rounded-full bg-[#4A5C23] px-6 py-3 font-semibold text-white"
        >
          Book tour
        </button>
      </div>

      {/* PHOTO LIGHTBOX */}
      {galleryOpen && galleryImages.length > 0 && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Tour photo gallery"
          onClick={() => setGalleryOpen(false)}
        >
          <button
            type="button"
            onClick={() => setGalleryOpen(false)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>

          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                changeGallery(-1);
              }}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-8"
              aria-label="Previous photo"
            >
              <ArrowLeft size={22} />
            </button>
          )}

          <img
            src={galleryImages[galleryIndex]}
            alt={`${tour.title} photo ${galleryIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
          />

          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                changeGallery(1);
              }}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-8"
              aria-label="Next photo"
            >
              <ArrowRight size={22} />
            </button>
          )}

          <span className="absolute bottom-5 text-sm text-white/80">
            {galleryIndex + 1} / {galleryImages.length}
          </span>
        </div>
      )}

      {/* GUIDE CONTACT MODAL */}
      {guideContactOpen && (
        <div
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setGuideContactOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-contact-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="guide-contact-title"
                  className="text-2xl font-bold text-[#17200f]"
                >
                  Contact the guide
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Ask a question about {tour.title}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setGuideContactOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Close contact form"
              >
                <X size={21} />
              </button>
            </div>

            <form
              className="mt-6 space-y-4"
              onSubmit={handleGuideContactSubmit}
            >
              <input
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#4A5C23]"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#4A5C23]"
              />

              <textarea
                name="message"
                required
                rows={4}
                defaultValue={`Hello! I have a question about ${tour.title}.`}
                placeholder="Your question"
                className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#4A5C23]"
              />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4A5C23] px-5 py-4 font-semibold text-white transition hover:bg-[#35451a]"
              >
                <Send size={18} />
                Send message
              </button>

              <p className="text-xs leading-5 text-gray-400">
                Message delivery will work after the backend or messaging
                integration is connected.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* STATUS NOTICE */}
      {notice && (
        <div
          className="fixed bottom-24 left-1/2 z-[10002] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-[#17200f] px-5 py-4 text-sm text-white shadow-xl md:bottom-6"
          role="status"
        >
          <span className="flex-1 leading-6">{notice}</span>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TourDetails;
