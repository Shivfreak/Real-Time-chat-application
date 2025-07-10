// Import necessary components and hooks
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

/**
 * The main page for the chat application.
 * It displays the side drawer, the user's chats, and the chatbox.
 */
const Chatpage = () => {
  // State to trigger a re-fetch of the chats
  const [fetchAgain, setFetchAgain] = useState(false);
  // Get the user from the chat context
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {/* Display the side drawer if the user is logged in */}
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {/* Display the user's chats if the user is logged in */}
        {user && <MyChats fetchAgain={fetchAgain} />}
        {/* Display the chatbox if the user is logged in */}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
