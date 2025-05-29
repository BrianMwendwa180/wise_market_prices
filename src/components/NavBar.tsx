
import { Link, useLocation } from "react-router-dom";
import { MapPin, CalendarCheck, Search } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", icon: CalendarCheck },
  { to: "/market-prices", label: "Market Prices", icon: Search },
  { to: "/find-buyers", label: "Find Buyers/Markets", icon: MapPin },
];

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="bg-green-700 shadow-lg">
      <div className="container mx-auto px-3 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          FarmWise Market Connect
        </Link>
        <ul className="flex space-x-2 md:space-x-6">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center px-3 py-1.5 rounded transition-colors ${
                  location.pathname === to
                    ? "bg-green-900 text-yellow-300"
                    : "text-white hover:bg-green-600 hover:text-yellow-200"
                }`}
              >
                <Icon className="w-5 h-5 mr-1.5" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
