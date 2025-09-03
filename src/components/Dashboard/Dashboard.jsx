"use client"

import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Overview from "../Pages/Overview"
import Chatbots from "../Pages/Chatbots"
import Conversations from "../Pages/Conversations"
import Analytics from "../Pages/Analytics"
import Settings from "../Pages/Settings"
import Training from "../Pages/Training"
import Integrations from "../Pages/Integrations"
import Chat from "../Pages/Chat"

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-white">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/chatbots" element={<Chatbots />} />
            <Route path="/conversations" element={<Conversations />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/training" element={<Training />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
