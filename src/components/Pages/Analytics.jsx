import { BarChart3, TrendingUp, Users, MessageSquare } from "lucide-react"

function Analytics() {
  const metrics = [
    { name: "Total Conversations", value: "2,847", change: "+12.3%", trend: "up" },
    { name: "Avg Response Time", value: "1.2s", change: "-8.1%", trend: "down" },
    { name: "User Satisfaction", value: "4.6/5", change: "+2.4%", trend: "up" },
    { name: "Resolution Rate", value: "89.2%", change: "+5.7%", trend: "up" },
  ]

  const topChatbots = [
    { name: "Customer Support Bot", conversations: 1247, satisfaction: 4.8 },
    { name: "Sales Assistant", conversations: 892, satisfaction: 4.5 },
    { name: "FAQ Bot", conversations: 708, satisfaction: 4.9 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Track performance and insights across your chatbots</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div
                className={`flex items-center text-sm font-medium ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                <TrendingUp className={`h-4 w-4 mr-1 ${metric.trend === "down" ? "transform rotate-180" : ""}`} />
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversation Volume Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Conversation Volume</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 78, 90, 81, 56, 75, 88].map((height, index) => (
              <div key={index} className="flex-1 bg-primary bg-opacity-20 rounded-t flex items-end">
                <div
                  className="w-full bg-primary rounded-t transition-all duration-300"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Top Performing Chatbots */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top Performing Chatbots</h2>
          <div className="space-y-4">
            {topChatbots.map((bot, index) => (
              <div key={bot.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{bot.name}</p>
                    <p className="text-sm text-gray-500">{bot.conversations} conversations</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{bot.satisfaction}/5</p>
                  <p className="text-sm text-gray-500">satisfaction</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Detailed Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">Peak Hours</h3>
            <p className="text-sm text-gray-500 mt-1">Most conversations happen between 2-4 PM</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900">Common Topics</h3>
            <p className="text-sm text-gray-500 mt-1">Billing (34%), Support (28%), Sales (21%)</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900">Growth Rate</h3>
            <p className="text-sm text-gray-500 mt-1">15% increase in conversations this month</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
