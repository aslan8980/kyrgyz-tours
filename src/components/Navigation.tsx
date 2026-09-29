import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import Logo from "../assets/images/logo1.webp";

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between h-24">

          {/* Logo */}
          <a
            href="#home"
            onClick={closeMenu}
            className="flex items-center"
          >
            <img
              src={Logo}
              alt="Kyrgyz Tours"
              className="w-[140px] h-auto object-contain"
            />
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">

            <a
              href="#home"
              className="text-gray-800 hover:text-[#4A5C23] transition-colors"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-gray-800 hover:text-[#4A5C23] transition-colors"
            >
              About Us
            </a>

            <a
              href="#itineraries"
              className="text-gray-800 hover:text-[#4A5C23] transition-colors"
            >
              Itineraries
            </a>

            <a
              href="#gallery"
              className="text-gray-800 hover:text-[#4A5C23] transition-colors"
            >
              Gallery
            </a>

            <a
              href="#testimonials"
              className="text-gray-800 hover:text-[#4A5C23] transition-colors"
            >
              Testimonials
            </a>

            <a
              href="#map"
              className="text-gray-800 hover:text-[#4A5C23] transition-colors"
            >
              Map
            </a>

            <a
              href="#contact"
              className="text-gray-800 hover:text-[#4A5C23] transition-colors"
            >
              Contact Us
            </a>

          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800 text-2xl"
            aria-label="Toggle menu"
          >
            ☰
          </button>

        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="md:hidden pb-6">

            <div className="flex flex-col space-y-4">

              <a
                href="#home"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#4A5C23]"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#4A5C23]"
              >
                About Us
              </a>

              <a
                href="#itineraries"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#4A5C23]"
              >
                Itineraries
              </a>

              <a
                href="#gallery"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#4A5C23]"
              >
                Gallery
              </a>

              <a
                href="#testimonials"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#4A5C23]"
              >
                Testimonials
              </a>

              <a
                href="#map"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#4A5C23]"
              >
                Map
              </a>

              <a
                href="#contact"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#4A5C23]"
              >
                Contact Us
              </a>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navigation;