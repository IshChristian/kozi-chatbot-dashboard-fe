"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"
import aboutKozi from "./aboutKozi"
import ReactMarkdown from "react-markdown"
import axios from "axios"

const OPENROUTER_API_KEY = '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'

// Fixed: Parse JSON from localStorage and handle potential errors
let currentUserId = null
try {
  const userString = localStorage.getItem("user_id")
  if (userString) {
    const user = JSON.parse(userString)
    currentUserId = user._id || user.id || user // Handle different possible structures
    console.log("Parsed user:", user)
    console.log("Current user ID:", currentUserId)
  } else {
    console.log("No user found in localStorage")
    // You might want to redirect to login or show an error
  }
} catch (error) {
  console.error("Error parsing user from localStorage:", error)
  // Handle the error appropriately - maybe redirect to login
}

const botUserId = "68c09a3524956f1ac9df7759" // recipient (replace with your bot's user id)

async function getAIAnswer(question) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are a helpful assistant. Use the following information about KOZi to answer user questions:\n${aboutKozi}` },
        { role: "user", content: question }
      ]
    })
  })
  const data = await response.json()
  return data.choices?.[0]?.message?.content || "Sorry, I couldn't get an answer from AI."
}

function Chat() {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Fetch chat history from database on mount
  useEffect(() => {
    // Check if user is logged in before fetching messages
    if (!currentUserId) {
      console.error("No user ID found. User needs to log in.")
      // You might want to redirect to login or show an error message
      return
    }

    async function fetchMessages() {
      try {
        const res = await axios.get("https://kozi-be.onrender.com/api/messages", {
          params: { user1: currentUserId, user2: botUserId }
        })
        setMessages(Array.isArray(res.data) ? res.data : [])
      } catch (err) {
        console.error("Error fetching messages:", err)
        setMessages([
          {
            _id: 1,
            content: "Hello! I'm KOZi Assistant. How can I help you today?",
            sender: botUserId,
            recipient: currentUserId,
            timestamp: new Date(),
          },
        ])
      }
    }
    fetchMessages()
  }, [])

  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentUserId) return

    const userMessage = {
      sender: currentUserId,
      recipient: botUserId,
      content: inputText,
      timestamp: new Date(),
    }
    console.log(userMessage)

    setMessages((prev) => [...prev, { ...userMessage, _id: Date.now() }])
    setInputText("")
    setIsTyping(true)

    try {
      // Save user message to DB
      await axios.post("https://kozi-be.onrender.com/api/messages", userMessage)

      // Get bot response
      const botContent = await getAIAnswer(inputText)
      const botMessage = {
        sender: botUserId,
        recipient: currentUserId,
        content: botContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, { ...botMessage, _id: Date.now() + 1 }])
      setIsTyping(false)

      // Save bot message to DB
      await axios.post("https://kozi-be.onrender.com/api/messages", botMessage)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsTyping(false)
      // You might want to show an error message to the user
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Show error if no user is logged in
  if (!currentUserId) {
    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow-sm items-center justify-center">
        <p className="text-gray-600 mb-4">Please log in to use the chat.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600"
        >
          Refresh
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Chat Header */}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isUserMessage = message.sender === currentUserId
          const isBotMessage = botUserId === message.sender
          
          return (
            <div key={message._id} className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${isUserMessage ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isUserMessage
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isUserMessage ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    isUserMessage
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                      : "bg-transparent border border-gray-200 text-gray-800"
                  }`}
                >
                  {isBotMessage ? (
                    <div className="text-sm">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  <p className={`text-xs mt-1 ${isUserMessage ? "text-white/70" : "text-gray-500"}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-transparent border border-gray-200 rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              rows="1"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="w-11 h-11 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat