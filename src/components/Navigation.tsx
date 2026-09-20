import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import Logo from "../assets/images/logo1.webp";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[80px]">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="Kyrgyz Tours"
              className="p-2"
              width={200}
              height={150}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/itineraries">Itineraries</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/testimonials">Testimonials</NavLink>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#2A624C]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 shadow-md transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col justify-between`}
      >
        <div>

          {/* Mobile Logo + Close */}
          <div className="flex items-center justify-between p-4">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => setMenuOpen(false)}
            >
              <img
                src={Logo}
                alt="Kyrgyz Tours"
                className="p-2"
                width={170}
                height={100}
              />
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-700 bg-[#e9ebea] rounded-full p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex flex-col space-y-5 p-5">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </NavLink>

            <NavLink
              to="/itineraries"
              onClick={() => setMenuOpen(false)}
            >
              Itineraries
            </NavLink>

            <NavLink
              to="/gallery"
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </NavLink>

            <NavLink
              to="/testimonials"
              onClick={() => setMenuOpen(false)}
            >
              Testimonials
            </NavLink>

            <NavLink
              to="/map"
              onClick={() => setMenuOpen(false)}
            >
              Map
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </NavLink>
          </div>
        </div>

        {/* Bottom Contact Section */}
        <div className="p-4">

          <ul className="space-y-4 text-[#2A624C]">
            <li className="flex items-center">
              <Mail className="mr-2 h-5 w-5 flex-shrink-0" />
              <span>info@kyrgyztours.com</span>
            </li>

            <li className="flex items-center">
              <Phone className="mr-2 h-5 w-5 flex-shrink-0" />
              <span>+996 XXX XXX XXX</span>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2A624C] hover:text-gray-700 transition-colors"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2A624C] hover:text-gray-700 transition-colors"
            >
              <FaInstagram />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2A624C] hover:text-gray-700 transition-colors"
            >
              <FaTwitter />
            </a>

          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-[#2A624C] font-medium hover:text-safari-brown transition-colors duration-200"
  >
    {children}
  </Link>
);

export default Navigation;