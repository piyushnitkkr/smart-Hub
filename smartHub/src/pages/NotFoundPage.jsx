import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Home, Search } from "lucide-react"

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4 page-enter">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="glow-blob absolute top-1/3 left-1/4 w-96 h-96 bg-brand-700/15" />
        <div className="glow-blob absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600/10" style={{ animationDelay: "2s" }} />
      </div>

      <div className="text-center max-w-md relative">
        {/* Animated 404 */}
        <div className="relative mb-6 inline-block">
          <div className="text-9xl font-black gradient-text select-none animate-fade-up leading-none">
            404
          </div>
          <div className="absolute inset-0 text-9xl font-black text-brand-600/20 blur-xl select-none leading-none">
            404
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Page not found
        </h1>
        <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          The page you're looking for doesn't exist or may have moved.
        </p>

        <div className="flex flex-wrap gap-3 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Link to="/">
            <Button
              className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-cyan-500
                         text-white rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-px"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/browse">
            <Button
              variant="outline"
              className="border-brand-700/60 text-brand-300 hover:bg-brand-900/50 hover:border-brand-500/60
                         rounded-xl transition-all duration-200"
            >
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
