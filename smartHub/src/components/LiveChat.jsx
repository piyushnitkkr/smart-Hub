import React, { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Send, MessageCircle, ChevronDown, ChevronUp, Wifi, WifiOff } from "lucide-react"

const BACKEND_URL = "https://smart-hub-k3z0.onrender.com"

const AVATAR_GRADIENTS = [
  "from-indigo-600 to-violet-600",
  "from-violet-600 to-fuchsia-600",
  "from-cyan-600   to-blue-600",
  "from-blue-600   to-indigo-600",
  "from-fuchsia-600 to-pink-600",
  "from-emerald-600 to-cyan-600",
]
function avatarGradient(name = "") {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return AVATAR_GRADIENTS[Math.abs(h) % AVATAR_GRADIENTS.length]
}

function LiveChat() {
  const [isOpen,        setIsOpen       ] = useState(false)
  const [messages,      setMessages     ] = useState([])
  const [newMessage,    setNewMessage   ] = useState("")
  const [socket,        setSocket       ] = useState(null)
  const [username,      setUsername     ] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const [connected,     setConnected    ] = useState(false)
  const [unreadCount,   setUnreadCount  ] = useState(0)
  const messagesEndRef = useRef(null)
  const inputRef       = useRef(null)

  useEffect(() => {
    const saved = sessionStorage.getItem("chat_username")
    if (saved) setUsername(saved)
  }, [])

  useEffect(() => {
    const s = io(BACKEND_URL, { transports: ["polling", "websocket"] })
    setSocket(s)
    s.on("connect",      () => setConnected(true))
    s.on("disconnect",   () => setConnected(false))
    s.on("initMessages", (msgs) => setMessages(msgs))
    s.on("newMessage",   (msg)  => {
      setMessages((prev) => [...prev, msg])
      if (!isOpen) setUnreadCount((c) => c + 1)
    })
    return () => s.close()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 60)
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
    socket.emit("chatMessage", { content: newMessage.trim(), sender: username, timestamp: Date.now() })
    setNewMessage("")
  }

  return (
    <div className="fixed bottom-5 right-5 w-[22rem] z-50 animate-slide-right">
      <div className="rounded-2xl border border-brand-800/60 bg-[#0a0f1e]/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">

        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-brand-900/80 to-surface-card
                     border-b border-brand-800/40 cursor-pointer select-none group"
          onClick={() => setIsOpen((o) => !o)}
        >
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <MessageCircle className="h-4 w-4 text-brand-400" />
              {unreadCount > 0 && !isOpen && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-brand-500 text-[9px] text-white flex items-center justify-center font-bold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <span className="text-sm font-semibold text-slate-200">Live Chat</span>
            <span className={`flex items-center gap-1 text-[10px] font-medium ${connected ? "text-emerald-400" : "text-slate-600"}`}>
              {connected
                ? <><Wifi className="h-2.5 w-2.5" /> Live</>
                : <><WifiOff className="h-2.5 w-2.5" /> Offline</>
              }
            </span>
          </div>
          <button className="text-slate-500 hover:text-brand-300 transition-colors">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>

        {/* Body */}
        {isOpen && (
          <div className="animate-fade-up">
            {!username ? (
              /* Username gate */
              <form onSubmit={handleSetUsername} className="p-4 space-y-3">
                <div className="text-center py-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-cyan-500 mx-auto mb-3 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm text-slate-300 font-medium">Join the conversation</p>
                  <p className="text-xs text-slate-600 mt-0.5">Choose a display name to start chatting</p>
                </div>
                <Input
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Your name…"
                  maxLength={24}
                  autoFocus
                  className="bg-surface-input border-brand-800/50 text-slate-200 placeholder:text-slate-600 text-sm rounded-xl focus:border-brand-500/70"
                />
                <Button
                  type="submit"
                  disabled={!usernameInput.trim()}
                  className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-cyan-500
                             text-white rounded-xl text-sm shadow-brand disabled:opacity-40"
                >
                  Join Chat
                </Button>
              </form>
            ) : (
              /* Chat */
              <div className="p-3">
                {/* Messages */}
                <div className="h-56 overflow-y-auto mb-3 space-y-3 pr-1">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-700">
                      <MessageCircle className="h-6 w-6" />
                      <p className="text-xs">No messages yet — say hello!</p>
                    </div>
                  )}
                  {messages.map((msg, i) => {
                    const sender  = msg.sender || "User"
                    const initials = sender.slice(0, 2).toUpperCase()
                    const grad    = avatarGradient(sender)
                    return (
                      <div key={i} className="flex gap-2 items-start animate-fade-up">
                        <Avatar className="h-6 w-6 shrink-0">
                          <AvatarFallback className={`bg-gradient-to-br ${grad} text-white text-[10px] font-bold`}>
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-1.5 mb-0.5">
                            <span className="text-xs font-semibold text-brand-300 truncate">{sender}</span>
                            <span className="text-[9px] text-slate-700 shrink-0">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 break-words leading-relaxed">{msg.content}</p>
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
                    placeholder={`Message as ${username}…`}
                    maxLength={300}
                    className="flex-1 h-8 bg-surface-input border-brand-800/50 text-slate-200 placeholder:text-slate-600
                               text-xs rounded-xl focus:border-brand-500/70"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!newMessage.trim()}
                    className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-600 to-brand-500
                               hover:from-brand-500 hover:to-cyan-500 text-white shrink-0 shadow-brand
                               disabled:opacity-30 transition-all"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>

                <button
                  type="button"
                  onClick={() => { setUsername(""); sessionStorage.removeItem("chat_username") }}
                  className="mt-2 text-[10px] text-slate-700 hover:text-slate-500 transition-colors"
                >
                  Change name
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default LiveChat
