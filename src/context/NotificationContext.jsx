import React, { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

let idCounter = 0;

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(({ message, type = "info", duration = 4000 }) => {
    const id = ++idCounter;
    setNotifications((current) => [
      ...current,
      { id, message, type }
    ]);
    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration);
    }
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((current) => current.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}