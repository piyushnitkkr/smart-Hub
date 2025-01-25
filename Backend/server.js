const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const { setupChat } = require("./control/chatController");
const { getResources, createResource, giveSearchResults } = require("./control/resourceController");

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
  "http://smart-hub-zrd3.vercel.app", // Frontend origin
  "http://smart-hub-three.vercel.app", // Backend origin
];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials like cookies
  })
);
app.use(express.json());

// Connect to database
connectDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});

// Set up Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  console.log("Socket handshake headers:", socket.handshake.headers.origin);
  next();
});

app.set("io", io);

// Routes
app.post("/upload", createResource);
app.get("/", getResources);
app.get("/browse", async (req, res) => {
  const { search, department, year, page } = req.query;
  if (search || department || year || page) {
    await giveSearchResults(req, res);
  } else {
    await getResources(req, res);
  }
});

// Set up chat functionality
setupChat(io);

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down server...");
  process.exit(0);
});
