"use client"

import { useState } from "react"
import { MessageSquare, Search, Filter, Eye } from "lucide-react"

function Conversations() {
  const [conversations] = useState([
    {
      id: 1,
      user: "John Doe",
      chatbot: "Customer Support Bot",
      messages: 12,
      status: "resolved",
      lastMessage: "Thank you for your help!",
      timestamp: "2 hours ago",
      satisfaction: 5,
    },
    {
      id: 2,
      user: "Jane Smith",
      chatbot: "Sales Assistant",
      messages: 8,
      status: "active",
      lastMessage: "Can you show me more options?",
      timestamp: "15 minutes ago",
      satisfaction: null,
    },
    {
      id: 3,
      user: "Mike Johnson",
      chatbot: "FAQ Bot",
      messages: 3,
      status: "resolved",
      lastMessage: "Perfect, that answered my question.",
      timestamp: "1 day ago",
      satisfaction: 4,
    },
    {
      id: 4,
      user: "Sarah Wilson",
      chatbot: "Customer Support Bot",
      messages: 15,
      status: "escalated",
      lastMessage: "I need to speak with a human agent.",
      timestamp: "3 hours ago",
      satisfaction: 2,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.chatbot.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || conv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "escalated":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSatisfactionStars = (rating) => {
    if (!rating) return "N/A"
    return "★".repeat(rating) + "☆".repeat(5 - rating)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Conversations</h1>
        <p className="text-gray-600">Monitor and analyze chatbot conversations</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chatbot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Messages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satisfaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredConversations.map((conversation) => (
                <tr key={conversation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-primary bg-opacity-10 rounded-full p-2 mr-3">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{conversation.user}</div>
                        <div className="text-sm text-gray-500">{conversation.timestamp}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{conversation.chatbot}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{conversation.messages}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(conversation.status)}`}
                    >
                      {conversation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{conversation.lastMessage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getSatisfactionStars(conversation.satisfaction)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-pink-600 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Conversations
