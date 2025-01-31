import React, { useState } from "react"
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
      <div className="text-center mt-4">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-400">No study materials found</p>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 text-gray-400">Enter a valid search</p>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMaterials.map((material) => (
          <Card key={material.id} className="bg-[#1a2234] border border-purple-600">
            <CardHeader className="flex flex-col items-center justify-between border-b border-purple-600/50">
              <div>
                <h3 className="text-lg font-semibold text-purple-400">{material.title || "No Title Available"}</h3>
                <p className="text-sm text-gray-400">{material.department || "Unknown Department"}</p>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-300 mb-4">{material.description || "No description available."}</p>
              <div className="flex justify-center">
                <Button
                  variant="default"
                  onClick={() => material.fileUrl && window.open(material.fileUrl, "_blank")}
                  disabled={!material.fileUrl}
                  className="bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-900 disabled:text-gray-400"
                >
                  {material.fileUrl ? "Open Link" : "No Link Available"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="border-purple-600 text-purple-400 hover:bg-purple-900/50 hover:text-purple-300"
        >
          Previous
        </Button>
        <p className="text-sm text-purple-400">
          Page {currentPage} of {totalPages}
        </p>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="border-purple-600 text-purple-400 hover:bg-purple-900/50 hover:text-purple-300"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default StudyMaterialCard

