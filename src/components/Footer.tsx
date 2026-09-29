import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import LogoLight from "../assets/images/logo-light2.webp";

import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2A624C]/90 text-white relative overflow-hidden">

      {/* Background Design Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">

        <svg
          className="absolute bottom-0 left-0 h-64 w-64"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFFFF"
            d="M39.9,-51.2C50.1,-39.4,56.2,-25.7,59.6,-10.9C63,3.9,63.7,19.8,57.1,31.5C50.5,43.2,36.5,50.7,21.7,56.6C6.9,62.5,-8.6,66.8,-23.3,63.6C-38,60.4,-51.8,49.8,-59.8,36C-67.8,22.2,-69.9,5.2,-66.1,-10.1C-62.3,-25.4,-52.6,-39,-40.2,-50.8C-27.8,-62.5,-13.9,-72.5,0.4,-73.1C14.8,-73.6,29.6,-64.9,39.9,-51.2Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="absolute top-0 right-0 h-64 w-64"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFFFF"
            d="M47.6,-57.3C57.9,-48.3,60.2,-29.8,62.1,-12.2C64,5.5,65.6,22.2,58.8,34.8C52,47.4,36.8,55.8,20.4,62.4C4.1,69,-13.4,73.8,-29,69.9C-44.5,66.1,-58.2,53.6,-65.3,38.4C-72.5,23.1,-73.2,5.1,-69.7,-11.3C-66.3,-27.8,-58.8,-42.6,-46.5,-51.4C-34.2,-60.2,-17.1,-62.9,0.6,-63.7C18.3,-64.4,36.7,-63.3,47.6,-57.3Z"
            transform="translate(100 100)"
          />
        </svg>

      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo & About */}
          <div>

            <img
              src={LogoLight}
              alt="Kyrgyz Tours"
              className="p-1 rounded-lg mb-4"
              width={180}
              height={120}
            />

            <p className="mb-6 text-gray-200 leading-relaxed">
              Discover the beauty of Kyrgyzstan through breathtaking
              landscapes, unforgettable journeys and authentic nomadic
              experiences.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">

              <a
                href="#"
                aria-label="Facebook"
                className="text-white hover:text-[#85BC03] transition-colors"
              >
                <FaFacebook size={25} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="text-white hover:text-[#85BC03] transition-colors"
              >
                <FaInstagram size={25} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="text-white hover:text-[#85BC03] transition-colors"
              >
                <FaTwitter size={25} />
              </a>

              <a
                href="#"
                aria-label="WhatsApp"
                className="text-white hover:text-[#85BC03] transition-colors"
              >
                <FaWhatsapp size={25} />
              </a>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="#home"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#itineraries"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Itineraries
                </a>
              </li>

              <li>
                <a
                  href="#gallery"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>

              <li>
                <a
                  href="#testimonials"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Testimonials
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>

            </ul>

          </div>

          {/* Popular Tours */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Popular Tours
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="#itineraries"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  3 Days — Bishkek & Ala-Archa
                </a>
              </li>

              <li>
                <a
                  href="#itineraries"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  4 Days — Issyk-Kul
                </a>
              </li>

              <li>
                <a
                  href="#itineraries"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  5 Days — Issyk-Kul & Karakol
                </a>
              </li>

              <li>
                <a
                  href="#itineraries"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  14 Days — Discover Kyrgyzstan
                </a>
              </li>

            </ul>

          </div>

          {/* Contact Info */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact Us
            </h3>

            <ul className="space-y-5">

              {/* Location */}
              <li className="flex items-start">

                <MapPin className="mr-3 h-5 w-5 flex-shrink-0 mt-0.5" />

                <span className="text-gray-200">
                  Bishkek, Kyrgyzstan
                </span>

              </li>

              {/* Phone */}
              <li className="flex items-center">

                <Phone className="mr-3 h-5 w-5 flex-shrink-0" />

                <span className="text-gray-200">
                  Coming soon
                </span>

              </li>

              {/* Email */}
              <li className="flex items-center">

                <Mail className="mr-3 h-5 w-5 flex-shrink-0" />

                <span className="text-gray-200">
                  Coming soon
                </span>

              </li>

              {/* WhatsApp */}
              <li className="flex items-center">

                <FaWhatsapp className="mr-3 w-5 h-5" />

                <span className="text-gray-200">
                  Coming soon
                </span>

              </li>

            </ul>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-300">

          <p>
            © {new Date().getFullYear()} Kyrgyz Tours. All rights reserved.
          </p>

          <a
            href="#"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </a>

        </div>

      </div>

    </footer>
  );
};

export default Footer;