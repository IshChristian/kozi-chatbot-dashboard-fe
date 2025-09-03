"use client"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  BarChart3,
  BookOpen,
  Puzzle,
  Settings,
  X,
  MessageCircle,
} from "lucide-react"

const menuItems = [
  { name: "Overview", path: "/dashboard/overview", icon: LayoutDashboard },
  { name: "Chatbots", path: "/dashboard/chatbots", icon: Bot },
  { name: "Conversations", path: "/dashboard/conversations", icon: MessageSquare },
  { name: "Chat", path: "/dashboard/chat", icon: MessageCircle },
  { name: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
  { name: "Training", path: "/dashboard/training", icon: BookOpen },
  { name: "Integrations", path: "/dashboard/integrations", icon: Puzzle },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
]

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-white">KOZi</h1>
            <div className="w-2 h-6 bg-pink-400 rounded-full"></div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`sidebar-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
