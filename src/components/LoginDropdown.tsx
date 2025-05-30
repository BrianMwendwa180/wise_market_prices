import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import * as jwt_decode from "jwt-decode";
import { useUser } from "@/contexts/UserContext";

interface LoginDropdownProps {
  userType: "admin" | "user";
  presetUsername?: string;
}

const LoginDropdown = ({ userType, presetUsername }: LoginDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(presetUsername || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setUser } = useUser();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter username and password",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const decoded: any = (jwt_decode as any).default(data.token);
        setUser({ username: decoded.username, role: decoded.role, token: data.token });
        toast({
          title: "Success",
          description: `Logged in as ${decoded.username}`,
        });
        localStorage.setItem("token", data.token);
        setIsOpen(false);
        setUsername(presetUsername || "");
        setPassword("");
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block text-left mr-2">
      <button
        onClick={toggleDropdown}
        className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 ${
          userType === "admin"
            ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400"
            : "bg-yellow-500 text-green-900 hover:bg-yellow-600 focus:ring-yellow-400"
        } font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {userType === "admin" ? "Admin Login" : "User Login"}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 p-4">
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={!!presetUsername}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="flex justify-between mt-3 space-x-2">
              <button
                onClick={() => window.location.href = '/register/user'}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Register User
              </button>
              <button
                onClick={() => window.location.href = '/register/admin'}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Register Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;
