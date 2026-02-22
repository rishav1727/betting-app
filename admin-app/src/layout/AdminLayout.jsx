import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminLayout({ children }) {

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white">

      {/* ================= SIDEBAR ================= */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-gray-900/80 backdrop-blur border-r border-gray-700 transition-all duration-300 flex flex-col`}
      >

        {/* Logo */}
        <div className="p-5 border-b border-gray-700 flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-xl font-bold">🛠 Admin</h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white"
          >
            ☰
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            📊 {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink
            to="/markets"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            🎯 {!collapsed && "Markets"}
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            👥 {!collapsed && "Users"}
          </NavLink>

          <NavLink
            to="/results"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            🏆 {!collapsed && "Results"}
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 p-2 rounded-lg font-semibold"
          >
            {!collapsed ? "Logout" : "🚪"}
          </button>
        </div>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <div className="bg-gray-900/60 backdrop-blur border-b border-gray-700 p-4 flex justify-between items-center">

          <h1 className="text-lg font-semibold">
            Welcome Admin 👋
          </h1>

          <div className="flex items-center gap-3">

            <div className="bg-gray-800 px-3 py-1 rounded-lg text-sm">
              Online 🟢
            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>

          </div>

        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>

      </div>

    </div>
  );
}