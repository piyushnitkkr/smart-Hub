import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Upload, CheckCircle2, AlertCircle, Link as LinkIcon, ArrowLeft } from "lucide-react"

const BACKEND_URL = "https://smart-hub-k3z0.onrender.com"

const BRANCHES = [
  { value: "Computer Science",                       label: "CSE"               },
  { value: "Information Technology",                 label: "IT"                },
  { value: "AI",                                     label: "AI"                },
  { value: "MNC",                                    label: "MNC"               },
  { value: "Artificial Intelligence & Data Science", label: "AIDS"              },
  { value: "Electronics",                            label: "Electronics"       },
  { value: "Electrical",                             label: "Electrical"        },
  { value: "Civil",                                  label: "Civil"             },
  { value: "Mechanical",                             label: "Mechanical"        },
  { value: "PIE",                                    label: "PIE"               },
  { value: "Sustainable Energy",                     label: "Sustainable Energy"},
  { value: "Micro Electronics & VLSI",               label: "Micro Electronics" },
  { value: "Robotics & Automation",                  label: "Robotics"          },
]

function Toast({ type, message }) {
  if (!message) return null
  const ok = type === "success"
  return (
    <div className={`flex items-start gap-3 rounded-xl px-4 py-3 text-sm border animate-fade-up ${
      ok
        ? "bg-emerald-900/30 border-emerald-700/40 text-emerald-300"
        : "bg-red-900/30    border-red-700/40    text-red-300"
    }`}>
      {ok
        ? <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
        : <AlertCircle  className="h-4 w-4 mt-0.5 shrink-0" />
      }
      <span>{message}</span>
    </div>
  )
}

function FormField({ label, required, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-brand-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-600">{hint}</p>}
    </div>
  )
}

function UploadPage() {
  const navigate = useNavigate()
  const [uploading,    setUploading   ] = useState(false)
  const [toast,        setToast       ] = useState({ type: "", message: "" })
  const [fileUrl,      setFileUrl     ] = useState("")
  const [branch,       setBranch      ] = useState("")
  const [year,         setYear        ] = useState("")
  const [title,        setTitle       ] = useState("")
  const [description,  setDescription ] = useState("")

  const showToast = (type, message) => {
    setToast({ type, message })
    if (type === "success") setTimeout(() => navigate("/browse"), 1600)
    else setTimeout(() => setToast({ type: "", message: "" }), 5000)
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!branch || !year) { showToast("error", "Please select a branch and year."); return }

    setUploading(true)
    setToast({ type: "", message: "" })
    try {
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ title, description, branch, year, fileUrl }),
      })
      if (res.ok) {
        showToast("success", "Uploaded successfully! Redirecting to browse…")
      } else {
        const err = await res.json()
        showToast("error", err?.error || err?.message || "Upload failed.")
      }
    } catch {
      showToast("error", "Network error — check your connection and try again.")
    } finally {
      setUploading(false)
    }
  }

  const inputClass = "bg-surface-input border-brand-800/50 text-slate-200 placeholder:text-slate-600 rounded-xl focus:border-brand-500/70 focus:ring-1 focus:ring-brand-500/20 transition-all"

  return (
    <div className="min-h-screen bg-[#0a0f1e] py-10 px-4 page-enter">
      {/* Back link */}
      <div className="container mx-auto max-w-2xl mb-6">
        <Link
          to="/browse"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-300 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Browse
        </Link>
      </div>

      <div className="container mx-auto max-w-2xl">
        {/* Page header */}
        <div className="text-center mb-8">
          <div className="relative inline-flex mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center shadow-brand">
              <Upload className="h-7 w-7 text-white" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-brand-500/30 blur-lg -z-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Upload Study Material</h1>
          <p className="text-slate-500 text-sm">Share notes, past papers, or any resource with your peers — instantly.</p>
        </div>

        {/* Form card */}
        <div className="glass rounded-2xl p-6 shadow-card">
          {toast.message && (
            <div className="mb-5">
              <Toast type={toast.type} message={toast.message} />
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <FormField label="Title" required>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Data Structures Notes — Unit 3"
                className={inputClass}
              />
            </FormField>

            <FormField label="Description" required>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                placeholder="What does this cover? (topics, exam relevance, etc.)"
                className={`${inputClass} resize-none`}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Branch" required>
                <Select onValueChange={setBranch}>
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-card border-brand-800/60 rounded-xl shadow-card text-white">
                    {BRANCHES.map(({ value, label }) => (
                      <SelectItem key={value} value={value} className="text-sm hover:bg-brand-900/50 focus:bg-brand-900/50">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Year" required>
                <Select onValueChange={setYear}>
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-card border-brand-800/60 rounded-xl shadow-card text-white">
                    {["1","2","3","4"].map((y) => (
                      <SelectItem key={y} value={y} className="text-sm hover:bg-brand-900/50 focus:bg-brand-900/50">
                        {y === "1" ? "1st" : y === "2" ? "2nd" : y === "3" ? "3rd" : "4th"} Year
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <FormField
              label="File URL"
              required
              hint="Paste a shareable link (Google Drive, OneDrive, Dropbox…). Make sure it's set to public."
            >
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 pointer-events-none" />
                <Input
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  required
                  placeholder="https://drive.google.com/…"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </FormField>

            <Button
              type="submit"
              disabled={uploading}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500
                         hover:from-brand-500 hover:to-cyan-500
                         text-white font-semibold shadow-brand hover:shadow-brand-lg
                         transition-all duration-300 hover:-translate-y-px
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading…
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
