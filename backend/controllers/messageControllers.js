// Import necessary packages
const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

/**
 * @description Get all messages for a chat
 * @route GET /api/Message/:chatId
 * @access Protected
 */
const allMessages = asyncHandler(async (req, res) => {
  try {
    // Find all messages for the given chat ID
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/**
 * @description Create a new message
 * @route POST /api/Message/
 * @access Protected
 */
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  // Validate input fields
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  // Create a new message object
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    // Create the message in the database
    var message = await Message.create(newMessage);

    // Populate the sender and chat details
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // Update the latest message for the chat
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Export the controller functions
module.exports = { allMessages, sendMessage };
