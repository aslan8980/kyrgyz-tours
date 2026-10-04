import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo1.webp";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Itineraries", path: "/itineraries" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Map", path: "/map" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-[9999] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">

          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center"
          >
            <img
              src={Logo}
              alt="Kyrgyz Tours"
              className="w-[140px] h-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`relative py-2 transition-all duration-300 ${
                    active
                      ? "text-[#4A5C23] font-semibold"
                      : "text-gray-800 hover:text-[#4A5C23]"
                  }`}
                >
                  {item.name}

                  {/* ACTIVE INDICATOR */}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] bg-[#4A5C23] rounded-full transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800 text-2xl"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div className="md:hidden pb-5">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                      active
                        ? "bg-[#f0f2eb] text-[#4A5C23] font-semibold"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;