import React from "react"
import { Link } from "react-router-dom"

function LogoHead() {
  return (
    <header className="border-b border-purple-600 bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <Link to="/" className="flex flex-col items-center gap-2">
            <img src="/Smart.svg" alt="Logo" className="w-20 h-20 rounded-[50%]" />
            <h1 className="text-3xl font-bold text-purple-400">Smart Study Hub</h1>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default LogoHead

