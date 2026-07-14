import React, { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Send, MessageCircle, ChevronDown, ChevronUp } from "lucide-react"

const BACKEND_URL = "https://smart-hub-k3z0.onrender.com"

// Generate a stable color for a username
const AVATAR_COLORS = [
  "bg-purple-700", "bg-violet-700", "bg-indigo-700",
  "bg-fuchsia-700", "bg-blue-700", "bg-pink-700",
]
function avatarColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [socket, setSocket] = useState(null)
  const [username, setUsername] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const [connected, setConnected] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const savedName = sessionStorage.getItem("chat_username")
    if (savedName) setUsername(savedName)
  }, [])

  useEffect(() => {
    const newSocket = io(BACKEND_URL, {
      transports: ["polling", "websocket"],
    })
    setSocket(newSocket)

    newSocket.on("connect", () => setConnected(true))
    newSocket.on("disconnect", () => setConnected(false))

    newSocket.on("initMessages", (fetchedMessages) => {
      setMessages(fetchedMessages)
    })

    newSocket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message])
      if (!isOpen) setUnreadCount((c) => c + 1)
    })

    return () => newSocket.close()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSetUsername = (e) => {
    e.preventDefault()
    const name = usernameInput.trim()
    if (!name) return
    setUsername(name)
    sessionStorage.setItem("chat_username", name)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !socket || !username) return
    const message = {
      content: newMessage.trim(),
      sender: username,
      timestamp: Date.now(),
    }
    socket.emit("chatMessage", message)
    setNewMessage("")
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <Card className="bg-[#0c1322] border border-purple-600/70 shadow-xl shadow-purple-900/30 overflow-hidden">
        {/* Header */}
        <CardHeader
          className="flex flex-row items-center justify-between bg-[#141e33] border-b border-purple-600/50 py-2.5 px-4 cursor-pointer select-none"
          onClick={() => setIsOpen((o) => !o)}
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-purple-400" />
            <h3 className="font-semibold text-purple-300 text-sm">Live Chat</h3>
            <span
              className={`w-2 h-2 rounded-full ${connected ? "bg-green-400" : "bg-gray-500"}`}
              title={connected ? "Connected" : "Disconnected"}
            />
            {!isOpen && unreadCount > 0 && (
              <span className="text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded-full font-semibold">
                {unreadCount}
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/40 h-6 w-6 p-0">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </CardHeader>

        {isOpen && (
          <CardContent className="bg-[#0c1322] p-3">
            {/* Username gate */}
            {!username ? (
              <form onSubmit={handleSetUsername} className="space-y-3 py-2">
                <p className="text-sm text-gray-400 text-center">Choose a display name to join the chat</p>
                <Input
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Your name..."
                  maxLength={24}
                  autoFocus
                  className="bg-[#1a2234] border-purple-600/70 text-gray-200 placeholder:text-gray-500 text-sm"
                />
                <Button
                  type="submit"
                  disabled={!usernameInput.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white text-sm"
                >
                  Join Chat
                </Button>
              </form>
            ) : (
              <>
                {/* Messages */}
                <div className="space-y-3 h-56 overflow-y-auto mb-3 pr-1 scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">
                  {messages.length === 0 && (
                    <p className="text-center text-gray-600 text-xs mt-10">No messages yet. Say hello!</p>
                  )}
                  {messages.map((msg, index) => {
                    const sender = msg.sender || "User"
                    const initials = sender.slice(0, 2).toUpperCase()
                    const color = avatarColor(sender)
                    return (
                      <div key={index} className="flex gap-2 items-start">
                        <Avatar className="h-7 w-7 shrink-0 border border-purple-700/50">
                          <AvatarFallback className={`${color} text-white text-xs`}>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-medium text-purple-300 truncate">{sender}</span>
                            <span className="text-[10px] text-gray-600 shrink-0">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 break-words">{msg.content}</p>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={sendMessage} className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Message as ${username}...`}
                    maxLength={300}
                    className="flex-grow bg-[#1a2234] border-purple-600/70 text-gray-200 placeholder:text-gray-500 text-sm"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!newMessage.trim()}
                    className="bg-purple-600 hover:bg-purple-500 text-white shrink-0 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>

                <button
                  type="button"
                  onClick={() => { setUsername(""); sessionStorage.removeItem("chat_username") }}
                  className="mt-2 text-[10px] text-gray-600 hover:text-gray-400 transition-colors"
                >
                  Change name
                </button>
              </>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default LiveChat
