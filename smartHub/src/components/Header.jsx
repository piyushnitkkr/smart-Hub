import React, { useState, useEffect, useCallback } from "react"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import debounce from "lodash.debounce"
import { Link, useLocation } from "react-router-dom"

const BACKEND_URL = "https://smart-hub-k3z0.onrender.com"

function Header({ onDataUpdate, onLoadingChange }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const location = useLocation()

  const fetchFilteredData = useCallback(async (search, branch, year) => {
    if (onLoadingChange) onLoadingChange(true)
    try {
      const query = new URLSearchParams()
      if (search.trim()) query.append("search", search.trim())
      if (branch !== "all") query.append("department", branch)
      if (year !== "all") query.append("year", year)

      const queryString = query.toString()
      const url = queryString
        ? `${BACKEND_URL}/browse?${queryString}`
        : `${BACKEND_URL}/browse`

      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      onDataUpdate(data.materials || (Array.isArray(data) ? data : []))
    } catch (error) {
      console.error("Error fetching filtered data:", error.message)
      onDataUpdate([])
    } finally {
      if (onLoadingChange) onLoadingChange(false)
    }
  }, [onDataUpdate, onLoadingChange])

  // Debounced version for search input
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce((search, branch, year) => fetchFilteredData(search, branch, year), 350),
    [fetchFilteredData]
  )

  // Re-fetch when filters change
  useEffect(() => {
    debouncedFetch(searchTerm, selectedBranch, selectedYear)
    return () => debouncedFetch.cancel()
  }, [searchTerm, selectedBranch, selectedYear, debouncedFetch])

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-40 border-b border-purple-600/60 bg-[#0c1322]/95 backdrop-blur-md shadow-lg shadow-purple-900/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/download.png" alt="Logo" className="w-9 h-9 rounded-full ring-2 ring-purple-500/50" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
              Smart Study Hub
            </h1>
          </Link>

          <div className="flex-1 max-w-xl w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 pointer-events-none" />
              <Input
                placeholder="Search for notes, subjects, departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-[#1a2234] border-purple-600/70 text-gray-200 placeholder:text-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
              />
            </div>
          </div>

          <nav className="flex items-center gap-1 shrink-0">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm transition-colors ${isActive("/") ? "text-purple-300 bg-purple-900/40" : "text-gray-400 hover:text-purple-300 hover:bg-purple-900/30"}`}
              >
                Home
              </Button>
            </Link>
            <Link to="/browse">
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm transition-colors ${isActive("/browse") ? "text-purple-300 bg-purple-900/40" : "text-gray-400 hover:text-purple-300 hover:bg-purple-900/30"}`}
              >
                Browse
              </Button>
            </Link>
            <Link to="/help">
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm transition-colors ${isActive("/help") ? "text-purple-300 bg-purple-900/40" : "text-gray-400 hover:text-purple-300 hover:bg-purple-900/30"}`}
              >
                Help
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex flex-wrap gap-3 mt-3 items-center">
          <Select value={selectedBranch} onValueChange={(value) => setSelectedBranch(value)}>
            <SelectTrigger className="w-[160px] bg-[#1a2234] border-purple-600/70 text-purple-300 text-sm hover:border-purple-400 transition-colors">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a2234] border-purple-600 text-white">
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="Computer Science">CSE</SelectItem>
              <SelectItem value="Information Technology">IT</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
              <SelectItem value="MNC">MNC</SelectItem>
              <SelectItem value="Artificial Intelligence & Data Science">AIDS</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Electrical">Electrical</SelectItem>
              <SelectItem value="Civil">Civil</SelectItem>
              <SelectItem value="Mechanical">Mechanical</SelectItem>
              <SelectItem value="PIE">PIE</SelectItem>
              <SelectItem value="Sustainable Energy">Sustainable Energy</SelectItem>
              <SelectItem value="Micro Electronics & VLSI">Micro Electronics</SelectItem>
              <SelectItem value="Robotics & Automation">Robotics</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value)}>
            <SelectTrigger className="w-[140px] bg-[#1a2234] border-purple-600/70 text-purple-300 text-sm hover:border-purple-400 transition-colors">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a2234] border-purple-600 text-white">
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="1">1st Year</SelectItem>
              <SelectItem value="2">2nd Year</SelectItem>
              <SelectItem value="3">3rd Year</SelectItem>
              <SelectItem value="4">4th Year</SelectItem>
            </SelectContent>
          </Select>

          <Link to="/upload" className="ml-auto">
            <Button className="bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/40 transition-all hover:shadow-purple-700/50 hover:-translate-y-px">
              + Upload Notes
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

