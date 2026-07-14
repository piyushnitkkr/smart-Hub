import React, { useState } from "react"
import { ExternalLink, BookOpen, GraduationCap, Calendar, FileX } from "lucide-react"
import { Button } from "./ui/button"

// Shimmer skeleton
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-brand-900/40 p-5 overflow-hidden relative">
      <div className="skeleton h-4 w-3/4 rounded-lg mb-3" />
      <div className="skeleton h-3 w-1/2 rounded-lg mb-4" />
      <div className="skeleton h-3 w-full rounded-lg mb-2" />
      <div className="skeleton h-3 w-4/5 rounded-lg mb-5" />
      <div className="skeleton h-9 w-1/3 rounded-xl" />
    </div>
  )
}

const YEAR_LABELS  = { "1": "1st Year", "2": "2nd Year", "3": "3rd Year", "4": "4th Year" }
const DEPT_COLORS  = [
  "bg-indigo-900/40 text-indigo-300 border-indigo-700/40",
  "bg-violet-900/40 text-violet-300 border-violet-700/40",
  "bg-cyan-900/40   text-cyan-300   border-cyan-700/40",
  "bg-sky-900/40    text-sky-300    border-sky-700/40",
  "bg-blue-900/40   text-blue-300   border-blue-700/40",
]
function deptColor(dept = "") {
  let h = 0
  for (let i = 0; i < dept.length; i++) h = dept.charCodeAt(i) + ((h << 5) - h)
  return DEPT_COLORS[Math.abs(h) % DEPT_COLORS.length]
}

function StudyMaterialCard({ materials, loading }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const totalPages      = Math.ceil(materials.length / itemsPerPage)
  const currentMaterials = materials.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const goNext = () => { if (currentPage < totalPages) { setCurrentPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }) } }
  const goPrev = () => { if (currentPage > 1)          { setCurrentPage((p) => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }) } }

  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4 animate-fade-up">
        <div className="w-16 h-16 rounded-2xl bg-brand-900/40 border border-brand-800/40 flex items-center justify-center">
          <FileX className="h-8 w-8 text-brand-500/60" />
        </div>
        <p className="text-xl font-semibold text-slate-300">No study materials found</p>
        <p className="text-slate-600 text-sm max-w-xs">
          Try a different search term or filter, or be the first to upload for this category.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <p className="text-xs text-slate-600 mb-4 tabular-nums">
        Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, materials.length)} of {materials.length} results
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMaterials.map((material, idx) => (
          <div
            key={material.id || material._id}
            className="animate-fade-up card-lift glass rounded-2xl flex flex-col group
                       hover:border-brand-500/40 hover:shadow-brand transition-all duration-300"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            {/* Card header */}
            <div className="p-4 pb-3 border-b border-brand-900/40">
              <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-2 mb-2">
                {material.title || "Untitled"}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {material.department && (
                  <span className={`badge border ${deptColor(material.department)}`}>
                    <GraduationCap className="h-3 w-3" />
                    {material.department}
                  </span>
                )}
                {material.year && (
                  <span className="badge bg-brand-950/60 text-brand-300 border border-brand-800/40">
                    <Calendar className="h-3 w-3" />
                    {YEAR_LABELS[material.year] || `Year ${material.year}`}
                  </span>
                )}
              </div>
            </div>

            {/* Card body */}
            <div className="p-4 flex flex-col flex-1">
              <p className="text-xs text-slate-500 flex-1 line-clamp-3 mb-4 leading-relaxed">
                {material.description || "No description available."}
              </p>
              <Button
                onClick={() => material.fileUrl && window.open(material.fileUrl, "_blank", "noopener,noreferrer")}
                disabled={!material.fileUrl}
                className="w-full h-8 text-xs rounded-xl
                           bg-gradient-to-r from-brand-700/80 to-brand-600/80
                           hover:from-brand-600 hover:to-cyan-600
                           text-white border border-brand-600/40
                           disabled:from-brand-950/50 disabled:to-brand-950/50 disabled:text-slate-600 disabled:border-brand-900/20
                           transition-all duration-300 group/btn shadow-sm hover:shadow-brand"
              >
                {material.fileUrl ? (
                  <span className="flex items-center gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Open Resource
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" />
                    No Link Available
                  </span>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={currentPage === 1}
            className="border-brand-800/60 text-brand-400 hover:bg-brand-900/40 hover:border-brand-600/60
                       disabled:opacity-25 rounded-xl text-sm transition-all duration-200"
          >
            ← Prev
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1
              const isActive = page === currentPage
              if (totalPages > 5 && Math.abs(page - currentPage) > 2 && page !== 1 && page !== totalPages) {
                if (page === currentPage - 3 || page === currentPage + 3) return <span key={page} className="text-slate-600 px-1">…</span>
                return null
              }
              return (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                  className={`w-8 h-8 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-brand-600 text-white shadow-brand font-semibold"
                      : "text-slate-500 hover:bg-brand-900/40 hover:text-brand-300"
                  }`}
                >
                  {page}
                </button>
              )
            })}
          </div>

          <Button
            variant="outline"
            onClick={goNext}
            disabled={currentPage === totalPages}
            className="border-brand-800/60 text-brand-400 hover:bg-brand-900/40 hover:border-brand-600/60
                       disabled:opacity-25 rounded-xl text-sm transition-all duration-200"
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  )
}

export default StudyMaterialCard
