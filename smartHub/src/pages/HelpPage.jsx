import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"

function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-400">Help Center</h1>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="upload" className="border-b border-purple-600">
            <AccordionTrigger className="text-purple-300 hover:text-purple-400">
              How do I upload study materials?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Click the "Upload Notes" button in the header, fill out the form with your material's details, attach your
              file URL, and submit. Your material will be available after review.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="download" className="border-b border-purple-600">
            <AccordionTrigger className="text-purple-300 hover:text-purple-400">
              How do I Access materials?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Browse the available materials, click on the one you're interested in, and use the Open Link button. You
              can preview materials before downloading.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="format" className="border-b border-purple-600">
            <AccordionTrigger className="text-purple-300 hover:text-purple-400">
              What file formats are supported?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              We support file links.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact" className="border-b border-purple-600">
            <AccordionTrigger className="text-purple-300 hover:text-purple-400">
              How do I contact support?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              You can reach our support team at piyushmittal78331@gmail.com or use the live chat feature.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default HelpPage

