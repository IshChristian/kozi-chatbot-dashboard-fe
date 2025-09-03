"use client"

import { useState } from "react"
import { Puzzle, Check, Plus, Settings } from "lucide-react"

function Integrations() {
  const [integrations] = useState([
    {
      id: 1,
      name: "Slack",
      description: "Connect your chatbots to Slack channels",
      status: "connected",
      icon: "💬",
      category: "Communication",
    },
    {
      id: 2,
      name: "WhatsApp Business",
      description: "Deploy chatbots on WhatsApp Business API",
      status: "available",
      icon: "📱",
      category: "Messaging",
    },
    {
      id: 3,
      name: "Facebook Messenger",
      description: "Integrate with Facebook Messenger platform",
      status: "connected",
      icon: "📘",
      category: "Social Media",
    },
    {
      id: 4,
      name: "Telegram",
      description: "Deploy bots on Telegram messaging platform",
      status: "available",
      icon: "✈️",
      category: "Messaging",
    },
    {
      id: 5,
      name: "Website Widget",
      description: "Embed chatbot widget on your website",
      status: "connected",
      icon: "🌐",
      category: "Web",
    },
    {
      id: 6,
      name: "Zapier",
      description: "Connect with 3000+ apps via Zapier",
      status: "available",
      icon: "⚡",
      category: "Automation",
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Communication", "Messaging", "Social Media", "Web", "Automation"]

  const filteredIntegrations = integrations.filter(
    (integration) => selectedCategory === "all" || integration.category === selectedCategory,
  )

  const getStatusColor = (status) => {
    return status === "connected" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getStatusIcon = (status) => {
    return status === "connected" ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600">Connect your chatbots with external platforms and services</p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "All Categories" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{integration.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{integration.category}</span>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}
              >
                {getStatusIcon(integration.status)}
                <span className="ml-1">{integration.status}</span>
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{integration.description}</p>

            <div className="flex space-x-2">
              {integration.status === "connected" ? (
                <>
                  <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </button>
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    Disconnect
                  </button>
                </>
              ) : (
                <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Integration Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Integration Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-primary bg-opacity-10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Puzzle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-medium text-gray-900">Connected</h3>
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="text-sm text-gray-500">Active integrations</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">Available</h3>
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-gray-500">Ready to connect</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900">Success Rate</h3>
            <p className="text-2xl font-bold text-green-600">98.5%</p>
            <p className="text-sm text-gray-500">Integration uptime</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Integrations
