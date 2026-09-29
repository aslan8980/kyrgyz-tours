const testimonials = [
  {
    name: "Alex",
    country: "Germany",
    text: "Kyrgyzstan surprised me with its incredible mountains, beautiful lakes and warm hospitality.",
  },
  {
    name: "Sofia",
    country: "Italy",
    text: "The landscapes were unforgettable. From the mountains to Issyk-Kul, every day felt like a new adventure.",
  },
  {
    name: "Daniel",
    country: "United Kingdom",
    text: "A completely different travel experience. The nature, culture and nomadic traditions were amazing.",
  },
];

const Testimonials = () => {
  return (
    <section className="min-h-screen bg-[#f7f8f5] py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#c9cebd] rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-[#4a5c23] rounded-full"></span>
            <span className="text-sm font-medium">
              Traveler Stories
            </span>
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
            What Travelers Say
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-gray-600 leading-relaxed">
            Discover what travelers have to say about their experiences
            exploring Kyrgyzstan.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-8 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6 text-[#4A5C23]">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              {/* Review */}
              <p className="text-gray-600 leading-relaxed flex-1">
                “{testimonial.text}”
              </p>

              {/* Author */}
              <div className="mt-8 pt-5 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {testimonial.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;