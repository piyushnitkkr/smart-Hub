import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"

function StudyMaterialCard({ materials }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const totalPages = Math.ceil(materials.length / itemsPerPage)
  const currentMaterials = materials.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  if (materials.length === 0) {
    return (
      <div className="text-center mt-4 animate-fade-in">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary-300">No study materials found</p>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 text-text-secondary">Enter a valid search</p>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMaterials.map((material, index) => (
          <Card
            key={material.id}
            className="bg-surface border border-primary-600 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-col items-center justify-between border-b border-primary-600/50">
              <div>
                <h3 className="text-lg font-semibold text-primary-300">{material.title || "No Title Available"}</h3>
                <p className="text-sm text-text-secondary">{material.department || "Unknown Department"}</p>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-text-primary mb-4">{material.description || "No description available."}</p>
              <div className="flex justify-center">
                <Button
                  variant="default"
                  onClick={() => material.fileUrl && window.open(material.fileUrl, "_blank")}
                  disabled={!material.fileUrl}
                  className="bg-secondary hover:bg-secondary-600 text-text-primary disabled:bg-primary-900 disabled:text-text-secondary animate-pulse-slow"
                >
                  {material.fileUrl ? "Open Link" : "No Link Available"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <Button
          variant="outline"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="border-primary-600 text-primary-300 hover:bg-primary-900/50 hover:text-primary-200"
        >
          Previous
        </Button>
        <p className="text-sm text-text-primary">
          Page {currentPage} of {totalPages}
        </p>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="border-primary-600 text-primary-300 hover:bg-primary-900/50 hover:text-primary-200"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default StudyMaterialCard

