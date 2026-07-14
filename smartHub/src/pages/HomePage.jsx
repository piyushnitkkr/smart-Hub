import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import StudyMaterialCard from "../components/StudyMaterialCard"
import { Button } from "../components/ui/button"
import { BookOpen, Upload, Users, Search } from "lucide-react"

const BACKEND_URL = "https://smart-hub-k3z0.onrender.com"

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-2 bg-[#1a2234] border border-purple-600/40 rounded-xl px-6 py-4">
      <Icon className="h-6 w-6 text-purple-400" />
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
  )
}

function HomePage() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await fetch(`${BACKEND_URL}/browse`)
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)
        const data = await response.json()
        // API returns { materials: [...] } or a plain array
        setMaterials(Array.isArray(data) ? data : data.materials || [])
      } catch (err) {
        console.error("Error fetching materials:", err)
        setError(err.message)
        setMaterials([])
      } finally {
        setLoading(false)
      }
    }
    fetchMaterials()
  }, [])

  return (
    <div className="bg-[#0f172a] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4 text-center">
        {/* Glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-900/40 border border-purple-700/50 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            NIT Kurukshetra
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Study Hub
            </span>
            <br />for Every Branch &amp; Year
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Access and share notes, question papers, and resources — uploaded by students, for students.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/browse">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 transition-all hover:-translate-y-px">
                <Search className="mr-2 h-4 w-4" />
                Browse Materials
              </Button>
            </Link>
            <Link to="/upload">
              <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-900/40 px-6 py-2.5 transition-all hover:-translate-y-px">
                <Upload className="mr-2 h-4 w-4" />
                Upload Notes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      {!loading && !error && materials.length > 0 && (
        <section className="container mx-auto px-4 mb-10">
          <div className="flex flex-wrap justify-center gap-4">
            <StatCard icon={BookOpen} label="Resources" value={materials.length} />
            <StatCard
              icon={Users}
              label="Departments"
              value={new Set(materials.map((m) => m.department).filter(Boolean)).size}
            />
            <StatCard
              icon={Upload}
              label="Contributed by students"
              value="100%"
            />
          </div>
        </section>
      )}

      {/* Materials */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white">Recently Added</h2>
          <Link to="/browse" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
            View all →
          </Link>
        </div>

        {error ? (
          <div className="text-center py-16">
            <p className="text-red-400 mb-4">Could not load materials: {error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-500 text-white"
            >
              Retry
            </Button>
          </div>
        ) : (
          <StudyMaterialCard materials={materials} loading={loading} />
        )}
      </section>
    </div>
  )
}

export default HomePage
