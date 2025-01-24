import React, { useState, useEffect } from "react"
import StudyMaterialCard from "../components/StudyMaterialCard"

function HomePage() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await fetch("https://smart-hub-gamma.vercel.app/browse")
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`)
        }
        const data = await response.json()
        console.log("Fetched materials:", data)
        setMaterials(Array.isArray(data) ? data : []) // Ensure materials is always an array
      } catch (error) {
        console.error("Error fetching materials:", error)
        setError(error.message)
        setMaterials([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [])

  if (loading) {
    return <p className="text-center text-purple-400">Loading materials...</p>
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-300"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#0f172a]">
      <StudyMaterialCard materials={materials} />
    </div>
  )
}

export default HomePage

