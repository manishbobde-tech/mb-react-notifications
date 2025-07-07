import { useEffect, useContext, useRef } from "react";
import { NotificationContext } from "../context/NotificationContext";

// Change this to your WebSocket server URL
const WEBSOCKET_URL = "ws://localhost:4000";

export default function useWebSocket() {
  const { addNotification } = useContext(NotificationContext);
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new window.WebSocket(WEBSOCKET_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      addNotification({
        type: "success",
        message: "WebSocket connection established!"
      });
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        addNotification({
          type: data.type || "info",
          message: data.message || String(event.data)
        });
      } catch {
        addNotification({
          type: "info",
          message: String(event.data)
        });
      }
    };

    ws.onerror = () => {
      addNotification({
        type: "error",
        message: "WebSocket error occurred."
      });
    };

    ws.onclose = () => {
      addNotification({
        type: "warning",
        message: "WebSocket connection closed."
      });
    };

    return () => {
      ws.close();
    };
    // eslint-disable-next-line
  }, []);

  return wsRef;
}