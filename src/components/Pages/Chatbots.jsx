"use client"

import { useState } from "react"
import { Bot, Plus, Edit, Trash2, Play, Pause, Settings } from "lucide-react"

function Chatbots() {
  const [chatbots, setChatbots] = useState([
    {
      id: 1,
      name: "Customer Support Bot",
      description: "Handles customer inquiries and support tickets",
      status: "active",
      conversations: 342,
      lastTrained: "2 days ago",
      accuracy: "94.2%",
    },
    {
      id: 2,
      name: "Sales Assistant",
      description: "Helps with product recommendations and sales",
      status: "active",
      conversations: 156,
      lastTrained: "1 week ago",
      accuracy: "89.7%",
    },
    {
      id: 3,
      name: "FAQ Bot",
      description: "Answers frequently asked questions",
      status: "inactive",
      conversations: 89,
      lastTrained: "3 days ago",
      accuracy: "96.1%",
    },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newBot, setNewBot] = useState({ name: "", description: "" })

  const toggleBotStatus = (id) => {
    setChatbots(
      chatbots.map((bot) =>
        bot.id === id ? { ...bot, status: bot.status === "active" ? "inactive" : "active" } : bot,
      ),
    )
  }

  const deleteBot = (id) => {
    setChatbots(chatbots.filter((bot) => bot.id !== id))
  }

  const createBot = () => {
    if (newBot.name && newBot.description) {
      const bot = {
        id: Date.now(),
        name: newBot.name,
        description: newBot.description,
        status: "inactive",
        conversations: 0,
        lastTrained: "Never",
        accuracy: "N/A",
      }
      setChatbots([...chatbots, bot])
      setNewBot({ name: "", description: "" })
      setShowCreateModal(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chatbots</h1>
          <p className="text-gray-600">Manage and monitor your chatbot fleet</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Chatbot
        </button>
      </div>

      {/* Chatbots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {chatbots.map((bot) => (
          <div key={bot.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-primary bg-opacity-10 rounded-lg p-2 mr-3">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{bot.name}</h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      bot.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {bot.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button onClick={() => toggleBotStatus(bot.id)} className="text-gray-400 hover:text-primary">
                  {bot.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button className="text-gray-400 hover:text-primary">
                  <Settings className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-primary">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => deleteBot(bot.id)} className="text-gray-400 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{bot.description}</p>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Conversations:</span>
                <span className="font-medium">{bot.conversations}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Trained:</span>
                <span className="font-medium">{bot.lastTrained}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Accuracy:</span>
                <span className="font-medium">{bot.accuracy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Chatbot</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chatbot Name</label>
                <input
                  type="text"
                  value={newBot.name}
                  onChange={(e) => setNewBot({ ...newBot, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter chatbot name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newBot.description}
                  onChange={(e) => setNewBot({ ...newBot, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  rows="3"
                  placeholder="Describe what this chatbot will do"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button onClick={createBot} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-pink-600">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbots
