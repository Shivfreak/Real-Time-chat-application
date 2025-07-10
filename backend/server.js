// Import necessary packages
const dotenv = require("dotenv");
const express = require("express");

// Load environment variables from .env file
dotenv.config({ path: 'backend/.env' });

// Import custom modules
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

// Connect to the database
connectDB();

// Initialize express app
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// API routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);



const __dirname1 = path.resolve();

// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  // Serve the React app for all other routes
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  // Default route for development
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}



// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

// Define the port
const PORT = process.env.PORT;

// Start the server
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

// Initialize socket.io
const io = require("socket.io")(server, {
  pingTimeout: 60000, // 60 seconds
  cors: {
    origin: "http://localhost:3001",
  },
});

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // User setup
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
    socket.userId = userData._id;
  });

  // Join a chat room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  // Typing indicator
  socket.on("typing", (room) => socket.to(room).emit("typing"));
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));

  // New message
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    // Broadcast the message to all users in the chat except the sender
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  // Disconnect
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(socket.userId);
  });
});
