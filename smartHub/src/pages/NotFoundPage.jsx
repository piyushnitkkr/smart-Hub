import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Home, Search } from "lucide-react"

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold bg-gradient-to-b from-purple-400 to-violet-700 bg-clip-text text-transparent mb-4 select-none">
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-gray-500 text-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/">
            <Button className="bg-purple-600 hover:bg-purple-500 text-white">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/browse">
            <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-900/40">
              <Search className="mr-2 h-4 w-4" />
              Browse Materials
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
