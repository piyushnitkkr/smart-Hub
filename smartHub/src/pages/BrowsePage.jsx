import React, { useState } from "react"
import Header from "../components/Header"
import StudyMaterialCard from "../components/StudyMaterialCard"

function BrowsePage() {
  const [materials, setMaterials] = useState([])
  const [loading,   setLoading  ] = useState(true)

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Header onDataUpdate={setMaterials} onLoadingChange={setLoading} />
      <div className="container mx-auto px-4 py-6 page-enter">
        <StudyMaterialCard materials={materials} loading={loading} />
      </div>
    </div>
  )
}

export default BrowsePage
