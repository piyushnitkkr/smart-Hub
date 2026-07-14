import React, { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { ExternalLink, BookOpen, GraduationCap, Calendar } from "lucide-react"

// Skeleton loader for cards while fetching
function SkeletonCard() {
  return (
    <div className="bg-[#1a2234] border border-purple-600/40 rounded-lg p-4 animate-pulse">
      <div className="h-5 bg-purple-900/50 rounded mb-2 w-3/4" />
      <div className="h-4 bg-purple-900/30 rounded mb-4 w-1/2" />
      <div className="h-4 bg-purple-900/20 rounded mb-2 w-full" />
      <div className="h-4 bg-purple-900/20 rounded mb-4 w-4/5" />
      <div className="h-9 bg-purple-900/40 rounded w-1/3 mx-auto" />
    </div>
  )
}

const YEAR_LABELS = { "1": "1st Year", "2": "2nd Year", "3": "3rd Year", "4": "4th Year" }

function StudyMaterialCard({ materials, loading }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const totalPages = Math.ceil(materials.length / itemsPerPage)
  const currentMaterials = materials.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (loading) {
    return (
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    )
  }

  if (materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <BookOpen className="h-14 w-14 text-purple-600/50" />
        <p className="text-2xl font-semibold text-purple-400">No study materials found</p>
        <p className="text-gray-500 text-sm max-w-xs">
          Try adjusting your search, or be the first to upload something for this category.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <p className="text-xs text-gray-500 mb-4">
        Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, materials.length)} of{" "}
        {materials.length} results
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMaterials.map((material) => (
          <Card
            key={material.id || material._id}
            className="bg-[#1a2234] border border-purple-600/50 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-200 group flex flex-col"
          >
            <CardHeader className="flex flex-col gap-1 border-b border-purple-600/30 pb-3">
              <h3 className="text-base font-semibold text-purple-300 group-hover:text-purple-200 transition-colors line-clamp-2">
                {material.title || "Untitled"}
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {material.department && (
                  <span className="inline-flex items-center gap-1 text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full border border-purple-700/50">
                    <GraduationCap className="h-3 w-3" />
                    {material.department}
                  </span>
                )}
                {material.year && (
                  <span className="inline-flex items-center gap-1 text-xs bg-violet-900/40 text-violet-300 px-2 py-0.5 rounded-full border border-violet-700/50">
                    <Calendar className="h-3 w-3" />
                    {YEAR_LABELS[material.year] || `Year ${material.year}`}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 pt-3">
              <p className="text-sm text-gray-400 flex-1 line-clamp-3 mb-4">
                {material.description || "No description available."}
              </p>
              <Button
                variant="default"
                onClick={() => material.fileUrl && window.open(material.fileUrl, "_blank", "noopener,noreferrer")}
                disabled={!material.fileUrl}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white disabled:bg-purple-900/40 disabled:text-gray-500 group/btn transition-all"
              >
                {material.fileUrl ? (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Open Resource
                  </>
                ) : (
                  "No Link Available"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="border-purple-600 text-purple-400 hover:bg-purple-900/50 hover:text-purple-300 disabled:opacity-30"
          >
            ← Previous
          </Button>
          <span className="text-sm text-purple-400 tabular-nums">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="border-purple-600 text-purple-400 hover:bg-purple-900/50 hover:text-purple-300 disabled:opacity-30"
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  )
}

export default StudyMaterialCard
