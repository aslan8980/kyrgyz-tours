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
  },
  {
    image: Slide2,
    title: "Discover Kyrgyzstan",
  },
  {
    image: Slide3,
    title: "Nature & Culture",
  },
  {
    image: ThreeDays,
    title: "Ala-Archa",
  },
  {
    image: FourDays,
    title: "Issyk-Kul",
  },
  {
    image: FiveDays,
    title: "Karakol",
  },
  {
    image: FourteenDays,
    title: "Explore Kyrgyzstan",
  },
];

const Gallery = () => {
  return (
    <section className="min-h-screen bg-white py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#c9cebd] rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-[#4a5c23] rounded-full"></span>
            <span className="text-sm font-medium">
              Explore Kyrgyzstan
            </span>
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
            Discover the Beauty of Kyrgyzstan
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-gray-600 leading-relaxed">
            From dramatic mountain landscapes and alpine lakes to nomadic
            traditions and unforgettable adventures, discover the places that
            make Kyrgyzstan unique.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl ${
                index === 0 || index === 3
                  ? "lg:row-span-2"
                  : ""
              }`}
            >
              <img
                src={item.image}
                alt={`${item.title} | Kyrgyz Tours`}
                className="w-full h-full min-h-[280px] object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                <div className="w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;