"use client"

import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Chat from "../Pages/Chat"

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-white">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
