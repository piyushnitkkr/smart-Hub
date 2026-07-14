import React from "react"
import { Link } from "react-router-dom"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { HelpCircle, Upload, Search, FileText, Mail, ArrowLeft, MessageCircle } from "lucide-react"
import { Button } from "../components/ui/button"

const FAQ = [
  {
    value:    "upload",
    icon:     Upload,
    question: "How do I upload study materials?",
    answer:
      'Click "Upload" in the navigation, fill out the form with your material\'s title, description, branch, and year, then paste a shareable file URL (e.g. Google Drive). Hit submit — your resource is live instantly.',
  },
  {
    value:    "access",
    icon:     Search,
    question: "How do I find and access materials?",
    answer:
      'Go to Browse. Use the search bar or filter by branch and year. Click "Open Resource" on any card to open the file in a new tab.',
  },
  {
    value:    "format",
    icon:     FileText,
    question: "What kinds of links are supported?",
    answer:
      'Any publicly shareable link works — Google Drive, OneDrive, Dropbox, Notion, GitHub, etc. Just make sure sharing is set to "Anyone with the link can view".',
  },
  {
    value:    "contact",
    icon:     Mail,
    question: "How do I contact support?",
    answer:
      "Email us at piyushmittal78331@gmail.com, or use the Live Chat widget in the bottom-right corner of any page.",
  },
  {
    value:    "chat",
    icon:     MessageCircle,
    question: "What is the Live Chat for?",
    answer:
      "The Live Chat lets all users on the site talk to each other in real time — ask for specific materials, recommend resources, or just connect with fellow students.",
  },
]

function HelpPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] py-10 px-4 page-enter">
      <div className="container mx-auto max-w-2xl">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-300 transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative inline-flex mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center shadow-brand">
              <HelpCircle className="h-7 w-7 text-white" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-brand-500/30 blur-lg -z-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Help Center</h1>
          <p className="text-slate-500 text-sm">Everything you need to know about Smart Study Hub.</p>
        </div>

        {/* FAQ */}
        <div className="glass rounded-2xl p-5 shadow-card mb-6 animate-fade-up">
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ.map(({ value, icon: Icon, question, answer }) => (
              <AccordionItem
                key={value}
                value={value}
                className="border border-brand-800/40 rounded-xl px-4 bg-surface-input/40
                           hover:border-brand-700/60 transition-colors duration-200"
              >
                <AccordionTrigger className="text-slate-200 hover:text-white py-4 text-sm font-medium [&>svg]:text-brand-400 hover:no-underline">
                  <span className="flex items-center gap-3 text-left">
                    <span className="w-7 h-7 rounded-lg bg-brand-900/60 flex items-center justify-center shrink-0">
                      <Icon className="h-3.5 w-3.5 text-brand-400" />
                    </span>
                    {question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-sm pb-4 leading-relaxed pl-10">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA card */}
        <div
          className="glass rounded-2xl p-8 text-center animate-fade-up relative overflow-hidden"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-lg font-bold text-white mb-2 relative">Still have questions?</h2>
          <p className="text-slate-500 text-sm mb-6 relative">
            Reach out directly — we're happy to help.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative">
            <a href="mailto:piyushmittal78331@gmail.com">
              <Button
                variant="outline"
                className="border-brand-700/60 text-brand-300 hover:bg-brand-900/50 hover:border-brand-500/60
                           rounded-xl transition-all duration-200"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>
            </a>
            <Link to="/browse">
              <Button
                className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-cyan-500
                           text-white rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-px"
              >
                <Search className="mr-2 h-4 w-4" />
                Browse Materials
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage
