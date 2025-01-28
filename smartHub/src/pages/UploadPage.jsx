import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Upload } from "lucide-react"

function UploadPage() {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [fileUrl, setFileUrl] = useState("")
  const [branch, setBranch] = useState("")
  const [year, setYear] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function onSubmit(event) {
    event.preventDefault()

    const data = {
      title,
      description,
      branch,
      year,
      fileUrl,
    }

    try {
      setUploading(true)

      const response = await fetch("https://smart-hub-k3z0.onrender.com/upload", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        alert("Resource uploaded successfully!")
        navigate("/")
      } else {
        const error = await response.json()
        alert("Failed to upload resource: " + (error?.message || "Unknown error"))
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert("An error occurred while uploading.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-purple-400">Upload Study Material</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300">Title</label>
            <Input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-gray-800 border-purple-500 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300">Description</label>
            <Textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-gray-800 border-purple-500 text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-300">Branch</label>
              <Select name="branch" onValueChange={(value) => setBranch(value)} required>
                <SelectTrigger className="bg-gray-800 border-purple-500 text-white">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500 text-white">
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="Computer Science">CSE</SelectItem>
                  <SelectItem value="Information Technology">IT</SelectItem>
                  <SelectItem value="AI">AI</SelectItem>
                  <SelectItem value="MNC">MNC</SelectItem>
                  <SelectItem value="Artificial Intelligence & Data Science">
                    AIDS
                  </SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="PIE">PIE</SelectItem>
                  <SelectItem value="Sustainable Energy">Sustainable Energy</SelectItem>
                  <SelectItem value="Micro Electronics & VLSI">Micro Electronics</SelectItem>
                  <SelectItem value="Robotics & Automation">Robotics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-300">Year</label>
              <Select name="year" onValueChange={(value) => setYear(value)} required>
                <SelectTrigger className="bg-gray-800 border-purple-500 text-white">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500 text-white">
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300">File URL</label>
            <div className="flex items-center gap-4">
              <Input
                type="url"
                placeholder="Enter the file URL"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                required
                className="bg-gray-800 border-purple-500 text-white"
              />
            </div>
          </div>

          <Button type="submit" disabled={uploading} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Material
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default UploadPage

