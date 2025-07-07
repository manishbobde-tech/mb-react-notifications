import React from "react";
import Notification from "./components/Notification";
import useWebSocket from "./ws/useWebSocket";

function App() {
  useWebSocket();

  return (
    <div>
      <h1>React WebSocket Notifications Demo</h1>
      <Notification />
      <p>Try sending a message from your WebSocket server!</p>
    </div>
  );
}

export default App;