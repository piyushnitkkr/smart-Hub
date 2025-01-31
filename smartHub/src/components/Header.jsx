import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import debounce from "lodash.debounce"
import { Link } from "react-router-dom"

function Header({ onDataUpdate }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchFilteredData()
    }, 300)

    debouncedFetch()

    return () => {
      debouncedFetch.cancel()
    }
  }, []) // Only run when the component mounts and unmounts

  const fetchFilteredData = async () => {
    try {
      const query = new URLSearchParams()

      if (searchTerm.trim()) query.append("search", searchTerm.trim())
      if (selectedBranch !== "all") query.append("department", selectedBranch)
      if (selectedYear !== "all") query.append("year", selectedYear)

      const queryString = query.toString()
      const url = queryString
        ? `https://smart-hub-k3z0.onrender.com/browse?${queryString}`
        : `https://smart-hub-k3z0.onrender.com/browse`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("Filtered Data:", data)
      onDataUpdate(data.materials || []) // Update the component with fetched data
    } catch (error) {
      console.error("Error fetching filtered data:", error.message)
      onDataUpdate([]) // Clear data on error
    }
  }

  const handleFilterChange = (type, value) => {
    if (type === "search") setSearchTerm(value)
    if (type === "department") setSelectedBranch(value)
    if (type === "year") setSelectedYear(value)
    fetchFilteredData()
  }

  return (
    <header className="border-b border-primary-600 bg-surface animate-fade-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0 animate-slide-in">
            <img src="/download.png" alt="Logo" className="w-10 h-10 rounded-full animate-pulse-slow" />
            <h1 className="text-xl font-bold text-primary-300">Smart Study Hub</h1>
          </Link>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Input
                placeholder="Search for notes, subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-background border-primary-600 text-text-primary placeholder:text-text-secondary focus:ring-primary-400"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-text-secondary" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4 animate-slide-in" style={{ animationDelay: "0.2s" }}>
          <Select value={selectedBranch} onValueChange={(value) => handleFilterChange("department", value)}>
            <SelectTrigger className="w-[180px] bg-background border-primary-600 text-text-primary">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent className="bg-surface border-primary-600 text-text-primary">
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

          <Select value={selectedYear} onValueChange={(value) => handleFilterChange("year", value)}>
            <SelectTrigger className="w-[180px] bg-background border-primary-600 text-text-primary">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent className="bg-surface border-primary-600 text-text-primary">
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="1">1st Year</SelectItem>
              <SelectItem value="2">2nd Year</SelectItem>
              <SelectItem value="3">3rd Year</SelectItem>
              <SelectItem value="4">4th Year</SelectItem>
            </SelectContent>
          </Select>

          <Link to="/upload" className="ml-auto">
            <Button
              variant="default"
              className="bg-secondary hover:bg-secondary-600 text-text-primary animate-pulse-slow"
            >
              Upload Notes
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

