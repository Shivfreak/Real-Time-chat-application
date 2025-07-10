// Import necessary packages and hooks
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Create a new context for the chat application
const ChatContext = createContext();

/**
 * The ChatProvider component provides the chat state to all components in the application.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 */
const ChatProvider = ({ children }) => {
  // Define the state variables
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const history = useHistory();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    // If the user is not logged in, redirect to the homepage
    if (!userInfo) history.push("/");
  }, [history]);

  return (
    // Provide the state to the child components
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

/**
 * A custom hook to consume the chat context.
 * @returns {object} The chat context.
 */
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
