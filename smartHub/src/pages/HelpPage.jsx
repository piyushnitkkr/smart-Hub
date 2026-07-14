import React from "react"
import { Link } from "react-router-dom"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { HelpCircle, Upload, Search, FileText, Mail } from "lucide-react"
import { Button } from "../components/ui/button"

const FAQ = [
  {
    value: "upload",
    icon: Upload,
    question: "How do I upload study materials?",
    answer:
      'Click "Upload Notes" in the navigation, fill out the form with your material\'s title, description, branch, and year, then paste a shareable file URL (e.g. Google Drive). Submit, and your resource is instantly available to everyone.',
  },
  {
    value: "access",
    icon: Search,
    question: "How do I find and access materials?",
    answer:
      'Head to the Browse page. Use the search bar or filter by branch and year. Click "Open Resource" on any card to open the file in a new tab.',
  },
  {
    value: "format",
    icon: FileText,
    question: "What file formats are supported?",
    answer:
      "We accept any shareable link — Google Drive, OneDrive, Dropbox, Notion, etc. Make sure the link is set to \"Anyone with the link can view\" before uploading.",
  },
  {
    value: "contact",
    icon: Mail,
    question: "How do I contact support?",
    answer:
      "You can reach us at piyushmittal78331@gmail.com, or use the Live Chat button in the bottom-right corner of any page.",
  },
]

function HelpPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-900/50 border border-purple-600/50 mb-4">
            <HelpCircle className="h-6 w-6 text-purple-400" />
          </span>
          <h1 className="text-3xl font-bold text-white">Help Center</h1>
          <p className="text-gray-500 text-sm mt-2">Answers to the most common questions about Smart Study Hub.</p>
        </div>

        {/* FAQ */}
        <div className="bg-[#1a2234] border border-purple-600/40 rounded-2xl p-6 shadow-xl shadow-purple-900/20 mb-8">
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ.map(({ value, icon: Icon, question, answer }) => (
              <AccordionItem
                key={value}
                value={value}
                className="border border-purple-600/30 rounded-lg px-4 bg-[#0f172a]/60 hover:border-purple-500/50 transition-colors"
              >
                <AccordionTrigger className="text-purple-200 hover:text-purple-100 py-4 text-sm font-medium [&>svg]:text-purple-400">
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-purple-400 shrink-0" />
                    {question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-sm pb-4 leading-relaxed">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#1a2234] border border-purple-600/30 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white mb-2">Still have questions?</h2>
          <p className="text-gray-500 text-sm mb-5">
            Reach out directly or start browsing — you'll find your answer.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:piyushmittal78331@gmail.com">
              <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-900/40">
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>
            </a>
            <Link to="/browse">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white">
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
