import React, { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const notificationTypeStyle = {
  info: { background: "#e3f2fd", color: "#1976d2" },
  warning: { background: "#fff3e0", color: "#f57c00" },
  error: { background: "#ffebee", color: "#d32f2f" },
  success: { background: "#e8f5e9", color: "#388e3c" }
};

export default function Notification() {
  const { notifications, removeNotification } = useContext(NotificationContext);

  if (notifications.length === 0) return null;

  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 20,
      zIndex: 1000,
      minWidth: 300
    }}>
      {notifications.map((n) => (
        <div
          key={n.id}
          style={{
            marginBottom: 12,
            padding: 16,
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            ...notificationTypeStyle[n.type] || notificationTypeStyle.info
          }}
        >
          <span>{n.message}</span>
          <button
            onClick={() => removeNotification(n.id)}
            style={{
              background: "transparent",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              marginLeft: 12,
              fontWeight: "bold"
            }}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}