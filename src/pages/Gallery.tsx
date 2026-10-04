import Navigation from "../components/Navigation";
import { ArrowRight } from "lucide-react";

import Slide1 from "../assets/images/slide-1.webp";
import Slide2 from "../assets/images/slide-2.webp";
import Slide3 from "../assets/images/slide-3.webp";
import ThreeDays from "../assets/images/3-days.webp";
import FourDays from "../assets/images/4-days.webp";
import FiveDays from "../assets/images/5-days.webp";
import FourteenDays from "../assets/images/14-days.webp";

const galleryImages = [
  {
    image: Slide1,
    title: "Mountain Adventures",
    category: "Nature",
  },
  {
    image: Slide2,
    title: "The Beauty of Kyrgyzstan",
    category: "Landscapes",
  },
  {
    image: Slide3,
    title: "Nature & Culture",
    category: "Experience",
  },
  {
    image: ThreeDays,
    title: "Ala-Archa",
    category: "Mountains",
  },
  {
    image: FourDays,
    title: "Issyk-Kul & Song-Kul",
    category: "Lakes",
  },
  {
    image: FiveDays,
    title: "Karakol",
    category: "Adventure",
  },
  {
    image: FourteenDays,
    title: "Across Kyrgyzstan",
    category: "Journey",
  },
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* HERO */}
      <section className="relative min-h-[620px] flex items-center overflow-hidden">
        <img
          src={Slide2}
          alt="Kyrgyzstan landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 pt-28">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#d7b85a] rounded-full" />
              <span className="text-sm font-medium">
                The Kyrgyzstan Experience
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              See the Journey.
              <br />
              Feel the Place.
            </h1>

            <p className="mt-7 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
              Mountains, lakes, valleys and unforgettable moments. Take a
              visual journey through the places that make Kyrgyzstan unique.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c9cebd] rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-[#4a5c23] rounded-full" />
                <span className="text-sm font-medium">
                  Explore Through Photos
                </span>
              </div>

              <h2 className="mt-6 text-4xl md:text-5xl font-bold">
                Moments from Kyrgyzstan
              </h2>
            </div>

            <p className="max-w-md text-gray-600 leading-relaxed">
              Every landscape tells a story. Explore some of the places and
              experiences waiting for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {galleryImages.map((item, index) => (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-3xl ${
                  index === 0
                    ? "lg:row-span-2"
                    : index === 4
                    ? "lg:col-span-2"
                    : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    index === 0
                      ? "h-[620px]"
                      : index === 4
                      ? "h-[300px]"
                      : "h-[300px]"
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
                  <p className="text-sm text-white/70">
                    {item.category}
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO STORY */}
      <section className="bg-[#f4f5f0] py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-[#4a5c23] rounded-full" />
              <span className="text-sm font-medium">
                More Than A Photograph
              </span>
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
              Come for the views.
              <br />
              Stay for the stories.
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              The most memorable part of traveling through Kyrgyzstan isn't
              always the destination. It's the people you meet, the roads you
              take and the moments you never planned for.
            </p>

            <a
              href="/itineraries"
              className="inline-flex items-center gap-2 mt-8 bg-[#4A5C23] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#364518] transition-colors"
            >
              Explore Our Journeys
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <img
            src={Slide3}
            alt="Kyrgyzstan experience"
            className="w-full h-[500px] object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2rem]">
          <img
            src={FourteenDays}
            alt="Discover Kyrgyzstan"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 py-24 px-6 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold">
              Ready to see it
              <br />
              for yourself?
            </h2>

            <p className="mt-6 text-lg text-white/85">
              Your Kyrgyzstan story could be the next one in our gallery.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;