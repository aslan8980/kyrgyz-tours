
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import Logo from "../assets/images/logo1.webp";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Itineraries", path: "/itineraries" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Map", path: "/map" },
    { name: "Favorites", path: "/saved", icon: true },
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

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault();
    setMenuOpen(false);

    if (location.pathname === path) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-[9999] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link
            to="/"
            onClick={(event) => handleNavigation(event, "/")}
            className="flex items-center"
          >
            <img
              src={Logo}
              alt="Kyrgyz Tours"
              className="w-[140px] h-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(event) =>
                    handleNavigation(event, item.path)
                  }
                  className={`relative py-2 transition-all duration-300 ${
                    active
                      ? "text-[#4A5C23] font-semibold"
                      : "text-gray-800 hover:text-[#4A5C23]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon && <Heart size={16} />}
                    {item.name}
                  </span>

                  <span
                    className={`absolute left-0 bottom-0 h-[2px] rounded-full bg-[#4A5C23] transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800 text-2xl"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-5">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={(event) =>
                      handleNavigation(event, item.path)
                    }
                    className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                      active
                        ? "bg-[#f0f2eb] text-[#4A5C23] font-semibold"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <Heart size={18} />}
                      {item.name}
                    </span>
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
