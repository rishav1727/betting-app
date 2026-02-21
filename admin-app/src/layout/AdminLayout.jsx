import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function AdminLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const menu = [
    { name: "Dashboard", icon: "📊", path: "/dashboard" },
    { name: "Markets", icon: "🎯", path: "/markets" },
    { name: "Users", icon: "👥", path: "/users" },
    { name: "Results", icon: "🏆", path: "/results" },
  ]

  const logout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white">

      {/* Sidebar */}
      <div
        className={`bg-gray-900/80 backdrop-blur border-r border-gray-700 transition-all duration-300 
        ${collapsed ? "w-20" : "w-64"} p-4`}
      >

        <div className="flex justify-between items-center mb-8">

          {!collapsed && (
            <h2 className="text-xl font-bold">
              🛠 Admin Panel
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="bg-gray-700 px-2 py-1 rounded"
          >
            ☰
          </button>

        </div>

        <nav className="flex flex-col gap-2">

          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition
                ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
              }
            >
              <span>{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}

        </nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900/60">

          <h1 className="font-semibold">
            Welcome Admin 👋
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* Page */}
        <div className="p-6 w-full max-w-screen-2xl mx-auto">
          {children}
        </div>

      </div>

    </div>
  )
}