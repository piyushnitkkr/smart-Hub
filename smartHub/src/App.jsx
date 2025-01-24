import React from "react"
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import Header from "./components/Header"
import LogoHead from "./components/LogoHead"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import UploadPage from "./pages/UploadPage"
import BrowsePage from "./pages/BrowsePage"
import HelpPage from "./pages/HelpPage"
import LiveChat from "./components/LiveChat"
import "./App.css"
import "./index.css"

function Layout({ children }) {
  const location = useLocation()
  const showLogo = location.pathname === "/help" || location.pathname === "/upload" || location.pathname === "/"

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-[#0f172a] text-white overflow-x-hidden">
      {showLogo && <LogoHead />}
      <main className="flex-grow">{children}</main>
      <LiveChat />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

