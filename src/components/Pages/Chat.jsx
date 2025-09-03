"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"

// Sample chatbot dataset
const chatbotResponses = {
  greetings: [
    "Hello! I'm KOZi Assistant. How can I help you today?",
    "Hi there! Welcome to KOZi. What would you like to know?",
    "Greetings! I'm here to assist you with any questions.",
  ],
  jobs: [
    "We have over 7 active job opportunities available. Would you like to see job providers or job seekers?",
    "Our platform connects 343 job providers with 4775 job seekers. What type of position are you looking for?",
    "KOZi specializes in caretaker positions. Let me help you find the perfect match!",
  ],
  payment: [
    "Our premium features require a one-time registration fee for advanced workers.",
    "Payment grants access to exclusive premium features. Would you like to know more about the benefits?",
    "We offer secure payment processing for all our premium services.",
  ],
  default: [
    "I'm here to help! Could you please rephrase your question?",
    "That's an interesting question. Let me help you find the right information.",
    "I'd be happy to assist you. Could you provide more details?",
  ],
}

function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm KOZi Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)]
    } else if (message.includes("job") || message.includes("work") || message.includes("career")) {
      return chatbotResponses.jobs[Math.floor(Math.random() * chatbotResponses.jobs.length)]
    } else if (message.includes("payment") || message.includes("fee") || message.includes("premium")) {
      return chatbotResponses.payment[Math.floor(Math.random() * chatbotResponses.payment.length)]
    } else {
      return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)]
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botResponse = {
          id: Date.now() + 1,
          text: getBotResponse(inputText),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">KOZi Assistant</h2>
            <p className="text-sm opacity-90">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm">Online</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-transparent border border-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </div>
        ))}

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
              onKeyPress={handleKeyPress}
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
