import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, CalendarCheck, Search, Edit2, Check, X } from "lucide-react";
import LoginDropdown from "./LoginDropdown";
import RegisterDropdown from "./RegisterDropdown";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";

const navLinks = [
  { to: "/", label: "Home", icon: CalendarCheck },
  { to: "/market-prices", label: "Market Prices", icon: Search },
  { to: "/find-buyers", label: "Find Buyers/Markets", icon: MapPin },
];

const adminLinks = [
  { to: "/", label: "Home", icon: CalendarCheck },
  { to: "/market-prices", label: "Market Prices", icon: Search },
  { to: "/find-buyers", label: "Find Buyers/Markets", icon: MapPin },
  { to: "/admin", label: "Admin Panel", icon: Search }, // Example admin page
];

const NavBar = () => {
  const location = useLocation();
  const { user, setUser } = useUser();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user?.username || "");

  const linksToRender = user?.role === "admin" ? adminLinks : navLinks;

  const handleEditClick = () => {
    setEditedUsername(user?.username || "");
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUsername(user?.username || "");
  };

  const handleSaveClick = () => {
    if (!editedUsername.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty",
        variant: "destructive",
      });
      return;
    }
    setUser({ ...user, username: editedUsername.trim() });
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Username updated successfully",
    });
  };

  return (
    <nav className="bg-green-700 shadow-lg">
      <div className="container mx-auto px-3 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          FarmWise Market Connect
        </Link>
        <ul className="flex space-x-2 md:space-x-6">
          {linksToRender.map(({ to, label, icon: Icon }) => (
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
        <div className="ml-4 flex items-center space-x-4">
          {user ? (
            <>
              {!isEditing ? (
                <div className="flex items-center space-x-2 text-white">
                  <span className="font-semibold">{user.username}</span>
                  <button
                    onClick={handleEditClick}
                    className="p-1 rounded hover:bg-green-600"
                    aria-label="Edit username"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    className="px-2 py-1 rounded text-black"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveClick}
                    className="p-1 rounded hover:bg-green-600 text-white"
                    aria-label="Save username"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="p-1 rounded hover:bg-green-600 text-white"
                    aria-label="Cancel editing username"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <LoginDropdown userType="admin" presetUsername="admin" />
              <LoginDropdown userType="user" presetUsername="user1" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
