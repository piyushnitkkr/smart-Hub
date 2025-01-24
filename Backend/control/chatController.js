// const messages = []; // In-memory store for chat messages

// /**
//  * Initializes the chat logic with a Socket.IO server instance.
//  * @param {import('socket.io').Server} io - The Socket.IO server instance.
//  */
// function setupChat(io) {
//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     // Send existing messages to the newly connected user
//     socket.emit("initMessages", messages);

//     // Listen for new chat messages
//     socket.on("chatMessage", (message) => {
//       const newMessage = {
//         content: message.content,
//         timestamp: message.timestamp || Date.now(),
//       };

//       // Store the message in memory
//       messages.push(newMessage);

//       // Broadcast the message to all connected clients
//       io.emit("newMessage", newMessage);
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });
//   });
// }

// module.exports = { setupChat };

const Message = require("../models/Message");

/**
 * Sets up chat logic using Socket.IO
 * @param {import('socket.io').Server} io
 */
function setupChat(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Fetch the last 50 messages from the database
    Message.find()
      .sort({ timestamp: -1 }) // Sort by latest first
      .limit(50) // Get the last 50 messages
      .then((messages) => {
        // Send messages sorted in ascending order
        socket.emit("initMessages", messages.reverse());
      })
      .catch((err) => {
        console.error("Error fetching messages:", err.message);
      });

    // Listen for new chat messages
    socket.on("chatMessage", async (message) => {
      const newMessage = new Message({
        content: message.content,
        timestamp: message.timestamp || Date.now(),
      });

      try {
        await newMessage.save(); // Save the new message to the database
        io.emit("newMessage", newMessage); // Broadcast the message to all clients
      } catch (err) {
        console.error("Error saving message:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

module.exports = { setupChat };

