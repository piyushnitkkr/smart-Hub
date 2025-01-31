import { useState, useEffect, useRef } from "react"
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
    const newSocket = io("https://smart-hub-k3z0.onrender.com", {
      transports: ["polling", "websocket"],
    })
    setSocket(newSocket)

    newSocket.on("initMessages", (fetchedMessages) => {
      setMessages(fetchedMessages)
    })

    newSocket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => newSocket.close()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, []) //Removed unnecessary dependency: messages

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
    <div className="fixed bottom-4 right-4 w-80 z-50 animate-slide-in">
      <Card className="bg-surface border border-primary-600">
        <CardHeader className="flex flex-row items-center justify-between bg-background border-b border-primary-600">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-primary-300">Live Chat</h3>
            <span className="text-xs bg-primary-900 text-primary-200 px-1.5 py-0.5 rounded animate-pulse-slow">
              {messages.length} Messages
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary-400 hover:text-primary-300 hover:bg-primary-900/50"
          >
            {isOpen ? "−" : "+"}
          </Button>
        </CardHeader>
        {isOpen && (
          <CardContent className="bg-surface p-4">
            <div className="space-y-4 h-64 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <div key={index} className="flex gap-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Avatar className="border border-primary-600">
                    <AvatarFallback className="bg-primary-900 text-primary-200">U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{msg.content}</p>
                    <span className="text-xs text-primary-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
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
                className="flex-grow bg-background border-primary-600 text-text-primary placeholder:text-text-secondary"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-secondary hover:bg-secondary-600 text-text-primary"
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

