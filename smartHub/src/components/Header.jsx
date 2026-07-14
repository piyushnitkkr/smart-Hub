import React, { useState, useEffect, useCallback } from "react"
import { Search, Menu, X, Upload } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import debounce from "lodash.debounce"
import { Link, useLocation } from "react-router-dom"

const BACKEND_URL = "https://smart-hub-k3z0.onrender.com"

const BRANCHES = [
  { value: "Computer Science",                        label: "CSE" },
  { value: "Information Technology",                  label: "IT" },
  { value: "AI",                                      label: "AI" },
  { value: "MNC",                                     label: "MNC" },
  { value: "Artificial Intelligence & Data Science",  label: "AIDS" },
  { value: "Electronics",                             label: "Electronics" },
  { value: "Electrical",                              label: "Electrical" },
  { value: "Civil",                                   label: "Civil" },
  { value: "Mechanical",                              label: "Mechanical" },
  { value: "PIE",                                     label: "PIE" },
  { value: "Sustainable Energy",                      label: "Sustainable Energy" },
  { value: "Micro Electronics & VLSI",                label: "Micro Electronics" },
  { value: "Robotics & Automation",                   label: "Robotics" },
]

function Header({ onDataUpdate, onLoadingChange }) {
  const [searchTerm, setSearchTerm]       = useState("")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [selectedYear, setSelectedYear]   = useState("all")
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [scrolled, setScrolled]           = useState(false)
  const location = useLocation()

  // Shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const fetchFilteredData = useCallback(async (search, branch, year) => {
    if (onLoadingChange) onLoadingChange(true)
    try {
      const query = new URLSearchParams()
      if (search.trim())    query.append("search",     search.trim())
      if (branch !== "all") query.append("department", branch)
      if (year   !== "all") query.append("year",       year)

      const qs  = query.toString()
      const url = qs ? `${BACKEND_URL}/browse?${qs}` : `${BACKEND_URL}/browse`

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce((s, b, y) => fetchFilteredData(s, b, y), 350),
    [fetchFilteredData]
  )

  useEffect(() => {
    debouncedFetch(searchTerm, selectedBranch, selectedYear)
    return () => debouncedFetch.cancel()
  }, [searchTerm, selectedBranch, selectedYear, debouncedFetch])

  const navItems = [
    { path: "/",       label: "Home"   },
    { path: "/browse", label: "Browse" },
    { path: "/help",   label: "Help"   },
  ]

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300
        ${scrolled
          ? "py-0 bg-[#0a0f1e]/98 backdrop-blur-xl shadow-xl shadow-black/40 border-b border-brand-800/60"
          : "py-1 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-brand-900/40"
        }`}
    >
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative">
              <img
                src="/download.png"
                alt="Logo"
                className="w-8 h-8 rounded-full ring-2 ring-brand-500/40 group-hover:ring-brand-400/70 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-brand-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-base font-bold gradient-text hidden sm:block">Smart Study Hub</span>
          </Link>

          {/* Search — center */}
          <div className="flex-1 max-w-lg">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-400/70 pointer-events-none transition-colors group-focus-within:text-brand-400" />
              <Input
                placeholder="Search notes, subjects, departments…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 bg-surface-input border-brand-800/60 text-slate-200 placeholder:text-slate-600
                           focus:border-brand-500/80 focus:ring-1 focus:ring-brand-500/40 focus:bg-surface-card
                           transition-all duration-200 text-sm rounded-xl"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 shrink-0">
            {navItems.map(({ path, label }) => (
              <Link key={path} to={path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm px-3 rounded-lg transition-all duration-200 ${
                    location.pathname === path
                      ? "text-brand-300 bg-brand-900/50 font-medium"
                      : "text-slate-400 hover:text-brand-300 hover:bg-brand-900/30"
                  }`}
                >
                  {label}
                </Button>
              </Link>
            ))}
            <Link to="/upload" className="ml-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-cyan-500
                           text-white shadow-brand transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-px
                           rounded-lg font-medium text-sm"
              >
                <Upload className="mr-1.5 h-3.5 w-3.5" />
                Upload
              </Button>
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-brand-300 transition-colors p-1"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 pb-3 pt-0.5">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-[150px] h-8 bg-surface-input border-brand-800/50 text-brand-300 text-xs
                                       hover:border-brand-600/70 focus:ring-brand-500/30 rounded-lg transition-colors">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent className="bg-surface-card border-brand-800/60 text-white rounded-xl shadow-card">
              <SelectItem value="all" className="text-sm hover:bg-brand-900/50 focus:bg-brand-900/50">All Branches</SelectItem>
              {BRANCHES.map(({ value, label }) => (
                <SelectItem key={value} value={value} className="text-sm hover:bg-brand-900/50 focus:bg-brand-900/50">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[130px] h-8 bg-surface-input border-brand-800/50 text-brand-300 text-xs
                                       hover:border-brand-600/70 focus:ring-brand-500/30 rounded-lg transition-colors">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent className="bg-surface-card border-brand-800/60 text-white rounded-xl shadow-card">
              <SelectItem value="all"className="text-sm">All Years</SelectItem>
              <SelectItem value="1"  className="text-sm">1st Year</SelectItem>
              <SelectItem value="2"  className="text-sm">2nd Year</SelectItem>
              <SelectItem value="3"  className="text-sm">3rd Year</SelectItem>
              <SelectItem value="4"  className="text-sm">4th Year</SelectItem>
            </SelectContent>
          </Select>

          {(selectedBranch !== "all" || selectedYear !== "all" || searchTerm) && (
            <button
              onClick={() => { setSelectedBranch("all"); setSelectedYear("all"); setSearchTerm("") }}
              className="text-xs text-slate-500 hover:text-brand-300 transition-colors underline underline-offset-2"
            >
              Clear filters
            </button>
          )}

          {/* Mobile upload button */}
          <Link to="/upload" className="ml-auto md:hidden">
            <Button
              size="sm"
              className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-cyan-500
                         text-white text-xs h-8 rounded-lg font-medium"
            >
              <Upload className="mr-1 h-3 w-3" />
              Upload
            </Button>
          </Link>
        </div>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-brand-900/40 py-3 animate-fade-up">
            <nav className="flex flex-col gap-1">
              {navItems.map(({ path, label }) => (
                <Link key={path} to={path} onClick={() => setMobileOpen(false)}>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      location.pathname === path
                        ? "text-brand-300 bg-brand-900/40 font-medium"
                        : "text-slate-400 hover:text-brand-300 hover:bg-brand-900/20"
                    }`}
                  >
                    {label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
