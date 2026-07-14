import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="border-t border-purple-600/40 bg-[#0c1322] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/download.png" alt="Logo" className="w-7 h-7 rounded-full ring-1 ring-purple-500/50" />
              <span className="font-bold text-purple-300 text-sm">Smart Study Hub</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              A platform for NIT Kurukshetra students to share and access study materials — freely, and for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold mb-3 text-purple-400 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-purple-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-purple-300 transition-colors">Browse Material</Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-purple-300 transition-colors">Upload Notes</Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-purple-300 transition-colors">Help Center</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold mb-3 text-purple-400 uppercase tracking-wide">Upload Tips</h3>
            <ul className="space-y-2 text-xs text-gray-500 leading-relaxed">
              <li>Use Google Drive for large files</li>
              <li>Set sharing to "Anyone with link"</li>
              <li>Include subject &amp; unit in the title</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold mb-3 text-purple-400 uppercase tracking-wide">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:piyushmittal78331@gmail.com"
                  className="hover:text-purple-300 transition-colors break-all"
                >
                  piyushmittal78331@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/piyush-m-79a993280"
                  className="hover:text-purple-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-purple-600/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Smart Study Hub. All rights reserved.</span>
          <span>Built with ❤️ by NIT Kurukshetra students</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
