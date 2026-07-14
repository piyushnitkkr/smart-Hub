import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Upload, CheckCircle2, AlertCircle, Link as LinkIcon } from "lucide-react"

const BACKEND_URL = "https://smart-hub-k3z0.onrender.com"

function Toast({ type, message }) {
  if (!message) return null
  const isSuccess = type === "success"
  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium border ${
        isSuccess
          ? "bg-green-900/40 border-green-600/60 text-green-300"
          : "bg-red-900/40 border-red-600/60 text-red-300"
      }`}
    >
      {isSuccess ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
      {message}
    </div>
  )
}

function UploadPage() {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState({ type: "", message: "" })
  const [fileUrl, setFileUrl] = useState("")
  const [branch, setBranch] = useState("")
  const [year, setYear] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const showToast = (type, message) => {
    setToast({ type, message })
    if (type === "success") setTimeout(() => navigate("/browse"), 1500)
    else setTimeout(() => setToast({ type: "", message: "" }), 5000)
  }

  async function onSubmit(event) {
    event.preventDefault()
    if (!branch || !year) {
      showToast("error", "Please select a branch and year before submitting.")
      return
    }

    setUploading(true)
    setToast({ type: "", message: "" })

    try {
      const response = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: JSON.stringify({ title, description, branch, year, fileUrl }),
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        showToast("success", "Resource uploaded successfully! Redirecting...")
      } else {
        const error = await response.json()
        showToast("error", error?.error || error?.message || "Failed to upload resource.")
      }
    } catch {
      showToast("error", "Network error — please check your connection and try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Page header */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-900/50 border border-purple-600/50 mb-4">
            <Upload className="h-6 w-6 text-purple-400" />
          </span>
          <h1 className="text-3xl font-bold text-white">Upload Study Material</h1>
          <p className="text-gray-500 text-sm mt-2">Share notes, past papers, or any useful resource with your peers.</p>
        </div>

        <div className="bg-[#1a2234] border border-purple-600/40 rounded-2xl p-6 shadow-xl shadow-purple-900/20">
          {toast.message && (
            <div className="mb-5">
              <Toast type={toast.type} message={toast.message} />
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-purple-300">Title <span className="text-red-400">*</span></label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Data Structures Notes — Unit 3"
                className="bg-[#0f172a] border-purple-600/60 text-white placeholder:text-gray-600 focus:border-purple-400 transition-colors"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-purple-300">Description <span className="text-red-400">*</span></label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                placeholder="Brief description of what's covered..."
                className="bg-[#0f172a] border-purple-600/60 text-white placeholder:text-gray-600 focus:border-purple-400 transition-colors resize-none"
              />
            </div>

            {/* Branch + Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-purple-300">Branch <span className="text-red-400">*</span></label>
                <Select onValueChange={setBranch} required>
                  <SelectTrigger className="bg-[#0f172a] border-purple-600/60 text-white hover:border-purple-400 transition-colors">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a2234] border-purple-600 text-white">
                    <SelectItem value="Computer Science">CSE</SelectItem>
                    <SelectItem value="Information Technology">IT</SelectItem>
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="MNC">MNC</SelectItem>
                    <SelectItem value="Artificial Intelligence & Data Science">AIDS</SelectItem>
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

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-purple-300">Year <span className="text-red-400">*</span></label>
                <Select onValueChange={setYear} required>
                  <SelectTrigger className="bg-[#0f172a] border-purple-600/60 text-white hover:border-purple-400 transition-colors">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a2234] border-purple-600 text-white">
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* File URL */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-purple-300">
                File URL <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                <Input
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  required
                  placeholder="https://drive.google.com/..."
                  className="pl-9 bg-[#0f172a] border-purple-600/60 text-white placeholder:text-gray-600 focus:border-purple-400 transition-colors"
                />
              </div>
              <p className="text-xs text-gray-600">Paste a shareable link (Google Drive, OneDrive, etc.)</p>
            </div>

            <Button
              type="submit"
              disabled={uploading}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2.5 shadow-md shadow-purple-900/30 transition-all hover:shadow-purple-700/40 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Material
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
