import { createContext, useContext, useReducer } from "react";
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  theme: "light"
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}


export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
     const [user, setUser] = useState(null);
    const backendURL = import.meta.env.VITE_BACKEND_PORT

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        window.location.href = "/login";
        return;
      }

      try {
        const res = await axios.get(`${backendURL}/api/auth/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        alert("Session expired. Login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch,user }}>
      {children}
    </AppContext.Provider>
  );
}


export function useAppContext() {
  return useContext(AppContext);
}
