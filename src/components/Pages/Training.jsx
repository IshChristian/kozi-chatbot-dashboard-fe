"use client"

import { useState } from "react"
import { BookOpen, Upload, Download, Play, Pause } from "lucide-react"

function Training() {
  const [trainingData] = useState([
    {
      id: 1,
      name: "Customer Support Dataset",
      type: "FAQ",
      size: "2.3 MB",
      entries: 1247,
      lastUpdated: "2 days ago",
      status: "active",
    },
    {
      id: 2,
      name: "Product Information",
      type: "Knowledge Base",
      size: "5.7 MB",
      entries: 892,
      lastUpdated: "1 week ago",
      status: "training",
    },
    {
      id: 3,
      name: "Sales Scripts",
      type: "Conversation Flow",
      size: "1.8 MB",
      entries: 456,
      lastUpdated: "3 days ago",
      status: "inactive",
    },
  ])

  const [activeTab, setActiveTab] = useState("datasets")

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "training":
        return "bg-blue-100 text-blue-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Training Data</h1>
        <p className="text-gray-600">Manage datasets and train your chatbots</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("datasets")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "datasets"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Datasets
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "upload"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Upload Data
            </button>
            <button
              onClick={() => setActiveTab("training")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "training"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Training Jobs
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "datasets" && (
            <div className="space-y-4">
              {trainingData.map((dataset) => (
                <div key={dataset.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary bg-opacity-10 rounded-lg p-2 mr-4">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{dataset.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>{dataset.type}</span>
                          <span>{dataset.size}</span>
                          <span>{dataset.entries} entries</span>
                          <span>Updated {dataset.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(dataset.status)}`}
                      >
                        {dataset.status}
                      </span>
                      <button className="text-gray-400 hover:text-primary">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-primary">
                        {dataset.status === "training" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "upload" && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Training Data</h3>
                <p className="text-gray-500 mb-4">Drag and drop your files here, or click to browse</p>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-pink-600">Choose Files</button>
                <p className="text-xs text-gray-400 mt-2">Supported formats: CSV, JSON, TXT (Max 10MB)</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Data Format Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• CSV files should have 'question' and 'answer' columns</li>
                  <li>
                    • JSON files should follow the format: {"{"}"question": "...", "answer": "..."{"}"}
                  </li>
                  <li>• Ensure data is clean and relevant to your chatbot's purpose</li>
                  <li>• Include diverse examples to improve training quality</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "training" && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-yellow-900">Training in Progress</h4>
                    <p className="text-sm text-yellow-800">Customer Support Bot - 67% complete</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full h-4 w-4 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-green-900">Training Completed</h4>
                    <p className="text-sm text-green-800">Sales Assistant - Accuracy improved to 94.2%</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-red-500 rounded-full h-4 w-4 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-red-900">Training Failed</h4>
                    <p className="text-sm text-red-800">FAQ Bot - Invalid data format detected</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Training
