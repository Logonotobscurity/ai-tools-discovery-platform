import { Brain, Database, TrendingUp } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Tools Analytics</h1>
              <p className="text-gray-600">Comprehensive analysis of 2,500+ AI tools dataset</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Database className="h-4 w-4" />
              <span>Live Data</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>Updated</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
