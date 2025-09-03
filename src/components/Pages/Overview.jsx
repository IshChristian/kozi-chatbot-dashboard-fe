import { Bot, MessageSquare, Users, TrendingUp } from "lucide-react"

function Overview() {
  const stats = [
    { name: "Active Chatbots", value: "12", icon: Bot, change: "+2.5%", changeType: "positive" },
    { name: "Total Conversations", value: "1,247", icon: MessageSquare, change: "+12.3%", changeType: "positive" },
    { name: "Active Users", value: "892", icon: Users, change: "+8.1%", changeType: "positive" },
    { name: "Response Rate", value: "94.2%", icon: TrendingUp, change: "+1.2%", changeType: "positive" },
  ]

  const recentActivity = [
    { id: 1, action: 'New chatbot "Customer Support" created', time: "2 hours ago", type: "create" },
    { id: 2, action: 'Training data updated for "Sales Bot"', time: "4 hours ago", type: "update" },
    { id: 3, action: "Integration with Slack completed", time: "6 hours ago", type: "integration" },
    { id: 4, action: "Weekly analytics report generated", time: "1 day ago", type: "report" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your chatbots.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-primary bg-opacity-10 rounded-lg p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p
                      className={`ml-2 text-sm font-medium ${
                        stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-primary text-white px-4 py-3 rounded-lg hover:bg-pink-600 transition-colors">
            Create New Chatbot
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            View Analytics
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            Manage Training Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default Overview
