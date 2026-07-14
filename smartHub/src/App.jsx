import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import UploadPage from "./pages/UploadPage"
import BrowsePage from "./pages/BrowsePage"
import HelpPage from "./pages/HelpPage"
import NotFoundPage from "./pages/NotFoundPage"
import LiveChat from "./components/LiveChat"
import "./index.css"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0f172a] text-white overflow-x-hidden">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <LiveChat />
        <Footer />
      </div>
    </Router>
  )
}

export default App
