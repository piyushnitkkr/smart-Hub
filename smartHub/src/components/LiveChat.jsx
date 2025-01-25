import React, { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Send } from "lucide-react"

function LiveChat() {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [socket, setSocket] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const newSocket = io("https://smart-hub-three.vercel.app", {
      transports: ["websocket", "polling"], // Allow WebSocket and polling
    })
    setSocket(newSocket)

    newSocket.on("connect", () => {
      console.log("Connected to the server")
    })

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message)
    })

    newSocket.on("disconnect", () => {
      console.warn("Disconnected from the server")
    })

    newSocket.on("initMessages", (fetchedMessages) => {
      setMessages(fetchedMessages)
    })

    newSocket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      newSocket.disconnect()
      console.log("Socket disconnected")
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !socket) return

    const message = { content: newMessage, timestamp: Date.now() }
    socket.emit("chatMessage", message)
    setNewMessage("")
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <Card className="bg-[#0f172a] border border-purple-600">
        <CardHeader className="flex flex-row items-center justify-between bg-[#1a2234] border-b border-purple-600">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-purple-400">Live Chat</h3>
            <span className="text-xs bg-purple-900 text-purple-200 px-1.5 py-0.5 rounded">
              {messages.length} Messages
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/50"
          >
            {isOpen ? "−" : "+"}
          </Button>
        </CardHeader>
        {isOpen && (
          <CardContent className="bg-[#0f172a] p-4">
            <div className="space-y-4 h-64 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div key={msg._id || msg.timestamp} className="flex gap-2">
                  <Avatar className="border border-purple-600">
                    <AvatarFallback className="bg-purple-900 text-purple-200">U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">{msg.content}</p>
                    <span className="text-xs text-purple-400">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow bg-[#1a2234] border-purple-600 text-gray-200 placeholder:text-gray-400"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default LiveChat
