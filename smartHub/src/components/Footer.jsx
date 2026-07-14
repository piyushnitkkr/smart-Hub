import React from "react"
import { Link } from "react-router-dom"
import { Github, Linkedin, Mail } from "lucide-react"

function Footer() {
  return (
    <footer className="border-t border-brand-900/40 bg-[#070c18] text-white">
      {/* Gradient top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-600/40 to-transparent" />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/download.png" alt="Logo" className="w-7 h-7 rounded-full ring-1 ring-brand-600/40" />
              <span className="font-bold gradient-text text-sm">Smart Study Hub</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A free, open platform for NIT Kurukshetra students to share and access study materials.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              <a
                href="mailto:piyushmittal78331@gmail.com"
                className="w-7 h-7 rounded-lg bg-brand-900/40 border border-brand-800/40 flex items-center justify-center
                           text-slate-500 hover:text-brand-300 hover:border-brand-600/60 transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/piyush-m-79a993280"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-brand-900/40 border border-brand-800/40 flex items-center justify-center
                           text-slate-500 hover:text-brand-300 hover:border-brand-600/60 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold mb-4 text-brand-400 uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/",       label: "Home"           },
                { to: "/browse", label: "Browse Material" },
                { to: "/upload", label: "Upload Notes"    },
                { to: "/help",   label: "Help Center"     },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-slate-500 hover:text-brand-300 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-700 group-hover:bg-brand-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-xs font-semibold mb-4 text-brand-400 uppercase tracking-widest">Upload Tips</h3>
            <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1 h-1 rounded-full bg-brand-700 shrink-0" />
                Use Google Drive or OneDrive for large files
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1 h-1 rounded-full bg-brand-700 shrink-0" />
                Set sharing to &quot;Anyone with the link&quot;
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1 h-1 rounded-full bg-brand-700 shrink-0" />
                Include subject &amp; unit in the title
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1 h-1 rounded-full bg-brand-700 shrink-0" />
                Write a clear description to help others
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold mb-4 text-brand-400 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:piyushmittal78331@gmail.com"
                  className="text-slate-500 hover:text-brand-300 transition-colors duration-200 text-xs break-all"
                >
                  piyushmittal78331@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/piyush-m-79a993280"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-brand-300 transition-colors duration-200 text-xs flex items-center gap-1"
                >
                  <Linkedin className="h-3 w-3" />
                  LinkedIn Profile
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <span className="text-xs text-slate-700">Live support via</span>
              <p className="text-xs text-brand-500 mt-0.5">Chat widget ↘</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-brand-900/30 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-slate-700">
            © {new Date().getFullYear()} Smart Study Hub · All rights reserved
          </span>
          <span className="text-xs text-slate-700">
            Built with ❤️ by NIT Kurukshetra students
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
