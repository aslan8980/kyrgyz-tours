import { Mail, MapPin, Phone } from "lucide-react";
import Navigation from "../components/Navigation";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Main Navigation */}
      <Navigation />

      {/* Page Hero */}
      <section className="pt-40 pb-20 px-4 md:px-8">

        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-[#c9cebd] rounded-full px-4 py-2">

            <span className="w-2 h-2 bg-[#4a5c23] rounded-full" />

            <span className="text-sm font-medium">
              Get in Touch
            </span>

          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold text-gray-900">
            Start Your Journey
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600 leading-relaxed">
            Have a question about traveling in Kyrgyzstan?
            Get in touch with us and start planning your adventure.
          </p>

        </div>

      </section>

      {/* Contact Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div className="bg-[#f7f8f5] rounded-2xl p-8 md:p-10">

            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-7">

              {/* Location */}
              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-full bg-[#4A5C23] flex items-center justify-center shrink-0">
                  <MapPin className="text-white w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Location
                  </h3>

                  <p className="text-gray-600 mt-1">
                    Bishkek, Kyrgyzstan
                  </p>
                </div>

              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-full bg-[#4A5C23] flex items-center justify-center shrink-0">
                  <Phone className="text-white w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Phone
                  </h3>

                  <p className="text-gray-600 mt-1">
                    Coming soon
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-full bg-[#4A5C23] flex items-center justify-center shrink-0">
                  <Mail className="text-white w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Email
                  </h3>

                  <p className="text-gray-600 mt-1">
                    Coming soon
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div>

            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Send Us a Message
            </h2>

            <form className="space-y-6">

              {/* Name */}
              <div>

                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#4A5C23] focus:ring-1 focus:ring-[#4A5C23]"
                />

              </div>

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#4A5C23] focus:ring-1 focus:ring-[#4A5C23]"
                />

              </div>

              {/* Message */}
              <div>

                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us about your trip..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none resize-none focus:border-[#4A5C23] focus:ring-1 focus:ring-[#4A5C23]"
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full md:w-auto bg-[#4A5C23] hover:bg-[#85BC03] text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Contact;