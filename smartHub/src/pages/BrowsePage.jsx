import React, { useState } from "react"
import Header from "../components/Header"
import StudyMaterialCard from "../components/StudyMaterialCard"

function BrowsePage() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true) // start true — Header fetches on mount

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header onDataUpdate={setMaterials} onLoadingChange={setLoading} />
      <div className="container mx-auto px-4 py-8">
        <StudyMaterialCard materials={materials} loading={loading} />
      </div>
    </div>
  )
}

export default BrowsePage
