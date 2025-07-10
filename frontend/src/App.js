// Import necessary styles and components
import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";

/**
 * The main component of the application.
 * It sets up the routing for the different pages.
 */
function App() {
  return (
    <div className="App">
      {/* Route for the homepage */}
      <Route path="/" component={Homepage} exact />
      {/* Route for the chat page */}
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
