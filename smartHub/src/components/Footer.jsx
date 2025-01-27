import React from "react"

function Footer() {
  return (
    <footer className="border-t border-purple-600 bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-purple-400">About</h3>
            <p className="text-sm text-gray-300">
              A platform for NIT Kurukshetra students to share and access study materials easily.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-purple-400">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/upload" className="hover:text-purple-400 transition-colors duration-200">
                  Upload Notes
                </a>
              </li>
              <li>
                <a href="/browse" className="hover:text-purple-400 transition-colors duration-200">
                  Browse Material
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-purple-400 transition-colors duration-200">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-purple-400">Contact</h3>
            <p className="text-sm text-gray-300 space-y-2 mb-2">piyushmittal78331@gmail.com</p>
            <p className="text-sm text-gray-300 space-y-2">
              <a
                href="https://www.linkedin.com/in/piyush-m-79a993280"
                className="hover:text-purple-400 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-600 text-center text-sm text-gray-400">
          © 2024 Student Study Hub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

