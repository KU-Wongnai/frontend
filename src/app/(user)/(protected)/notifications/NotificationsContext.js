"use client";

import { useEffect } from "react";
import React, { createContext, useContext, useReducer } from 'react';
import { getAllNotification } from "@/services/notification";
import useAuthStore from "@/contexts/auth-store";

// Define the initial state for the notification count
const initialState = { count: 0 , notificationState: null, notificationLastest: null };

const NotificationContext = createContext();

// Define the reducer function to handle state updates
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      console.log('[INCREMENT]');
      return { ...state, count: state.count + 1 };
    case 'RESET':
      console.log('[RESET]]');
      return { ...state, count: 0 };
    case 'SET_NEW_NOTIFICATION':
      return { ...state, notificationLastest: action.newNotifications };
    default:
      return state;
  }
};
// Create a context provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  const user = useAuthStore((state) => state.user);
  const [notifications, setNotifications] = React.useState([]);
  const setNewNotification = (newNotifications) => {
    dispatch({ type: 'SET_NEW_NOTIFICATION', newNotifications });
  };

  useEffect(() => {
    // can use this function to fetch data from database
    const fetchNotification = async () => {
      if (user == null) return; 
      const notifications = await getAllNotification(user.id);
      setNotifications(notifications);
    };
    fetchNotification();
    console.log('[useEffect][NotificationProvider]] fetchNotification');
    setNewNotification(notifications);
  }, [user]);

  useEffect(() => {
    const notReadNotificationsCount = notifications.filter(notification => notification.read_at == null).length;
    state.count = notReadNotificationsCount;
    console.log('[useEffect][NotificationProvider] notReadNotificationsCount', notReadNotificationsCount);
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ state, dispatch, notifications, setNewNotification  }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Create a custom hook to easily access the context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
