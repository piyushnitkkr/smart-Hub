const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const { setupChat } = require("./control/chatController");
const { getResources, createResource, giveSearchResults } = require("./control/resourceController");

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Dynamic CORS configuration
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN, // Use CLIENT_ORIGIN in production
    methods: ["GET", "POST"],
  },
});

// Set io instance on app
app.set("io", io);

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/upload", createResource);

app.get("/", getResources);

// Unified "/browse" route
app.get("/browse", async (req, res) => {
  const { search, department, year, page } = req.query;

  console.log("Received Query Params:", { search, department, year, page });

  if (search || department || year || page) {
    await giveSearchResults(req, res);
  } else {
    await getResources(req, res);
  }
});

// Set up chat functionality
setupChat(io);

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
