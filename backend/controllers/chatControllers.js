// Import necessary packages
const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

/**
 * @description Create or fetch a one-to-one chat
 * @route POST /api/chat/
 * @access Protected
 */
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  // Find if a chat already exists between the two users
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  // Populate the sender details of the latest message
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  // If chat exists, send it back
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // Otherwise, create a new chat
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

/**
 * @description Fetch all chats for a user
 * @route GET /api/chat/
 * @access Protected
 */
const fetchChats = asyncHandler(async (req, res) => {
  try {
    // Find all chats that the user is a part of
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        // Populate the sender details of the latest message
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/**
 * @description Create a new group chat
 * @route POST /api/chat/group
 * @access Protected
 */
const createGroupChat = asyncHandler(async (req, res) => {
  // Validate input fields
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  // A group chat must have at least 2 users
  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  // Add the current user to the group
  users.push(req.user);

  try {
    // Create the group chat
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    // Fetch the full group chat details
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/**
 * @description Rename a group
 * @route PUT /api/chat/rename
 * @access Protected
 */
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  // Find and update the chat name
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

/**
 * @description Remove a user from a group
 * @route PUT /api/chat/groupremove
 * @access Protected
 */
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // Find and update the chat to remove the user
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

/**
 * @description Add a user to a group
 * @route PUT /api/chat/groupadd
 * @access Protected
 */
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // Find and update the chat to add the user
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

// Export the controller functions
module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
