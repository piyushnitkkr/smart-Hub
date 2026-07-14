import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import StudyMaterialCard from "../components/StudyMaterialCard"
import { Button } from "../components/ui/button"
import { BookOpen, Upload, Users, Search, Sparkles, ArrowRight } from "lucide-react"

const BACKEND_URL = "https://smart-hub-k3z0.onrender.com"

function StatCard({ icon: Icon, label, value, delay = "" }) {
  return (
    <div
      className={`animate-fade-up ${delay} glass rounded-2xl px-6 py-5 flex flex-col items-center gap-2
                  hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300 group`}
    >
      <div className="w-10 h-10 rounded-xl bg-brand-900/60 flex items-center justify-center
                      group-hover:bg-brand-800/60 transition-colors duration-300">
        <Icon className="h-5 w-5 text-brand-400" />
      </div>
      <span className="text-2xl font-extrabold text-white tabular-nums">{value}</span>
      <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  )
}

function FeaturePill({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-brand-900/50 text-brand-300
                     border border-brand-700/40 px-3 py-1.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      {children}
    </span>
  )
}

function HomePage() {
  const [materials, setMaterials] = useState([])
  const [loading,   setLoading  ] = useState(true)
  const [error,     setError    ] = useState(null)

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const res  = await fetch(`${BACKEND_URL}/browse`)
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`)
        const data = await res.json()
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

  const deptCount = new Set(materials.map((m) => m.department).filter(Boolean)).size

  return (
    <div className="page-enter bg-[#0a0f1e] min-h-screen">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 text-center">
        {/* Animated background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="glow-blob absolute -top-32 left-1/3 w-[500px] h-[500px] bg-brand-700/25" />
          <div className="glow-blob absolute top-20 -right-20 w-96 h-96 bg-cyan-500/10" style={{ animationDelay: "1.5s" }} />
          <div className="glow-blob absolute bottom-0 left-0 w-64 h-64 bg-brand-800/20" style={{ animationDelay: "3s" }} />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Pill badge */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 animate-fade-in">
            <FeaturePill>NIT Kurukshetra</FeaturePill>
            <FeaturePill>Free &amp; Open</FeaturePill>
            <FeaturePill>Student-powered</FeaturePill>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 leading-[1.1] animate-fade-up">
            Your{" "}
            <span className="gradient-text">Study Hub</span>
            <br />
            <span className="text-slate-300">for Every Branch &amp; Year</span>
          </h1>

          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed animate-fade-up-delay">
            Access and share notes, question papers, and resources —
            uploaded by students, for students. Completely free.
          </p>

          <div className="flex flex-wrap gap-3 justify-center animate-fade-up-delay2">
            <Link to="/browse">
              <Button
                className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-cyan-500
                           text-white px-6 py-2.5 h-11 shadow-brand hover:shadow-brand-lg
                           transition-all duration-300 hover:-translate-y-0.5 rounded-xl font-semibold"
              >
                <Search className="mr-2 h-4 w-4" />
                Browse Materials
              </Button>
            </Link>
            <Link to="/upload">
              <Button
                variant="outline"
                className="border-brand-700/60 text-brand-300 hover:bg-brand-900/50 hover:border-brand-500/60
                           px-6 py-2.5 h-11 transition-all duration-300 hover:-translate-y-0.5 rounded-xl font-semibold"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Notes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────── */}
      {!loading && !error && materials.length > 0 && (
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            <StatCard icon={BookOpen} label="Resources"    value={materials.length} />
            <StatCard icon={Users}    label="Departments"  value={deptCount}        delay="[animation-delay:0.1s]" />
            <StatCard icon={Sparkles} label="By students"  value="100%"             delay="[animation-delay:0.2s]" />
          </div>
        </section>
      )}

      {/* ─── Divider ──────────────────────────────────────────── */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-800/60 to-transparent" />
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <BookOpen className="h-4 w-4 text-brand-500" />
            <span>Recently Added</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-800/60 to-transparent" />
        </div>
      </div>

      {/* ─── Materials grid ───────────────────────────────────── */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-1">
          <p className="text-slate-600 text-xs">
            {!loading && !error && `${materials.length} resource${materials.length !== 1 ? "s" : ""} available`}
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 transition-colors group"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 rounded-full bg-red-900/30 border border-red-700/40 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-red-400 text-sm">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-brand-600 hover:bg-brand-500 text-white rounded-xl"
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
