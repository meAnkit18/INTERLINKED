import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  theme: "light",
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case "AUTH_ERROR":
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const backendURL = import.meta.env.VITE_BACKEND_PORT;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch({ type: "AUTH_ERROR" });
        return;
      }

      try {
        const res = await axios.get(`${backendURL}/api/auth/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: "SET_USER", payload: res.data });
      } catch (err) {
        console.error("Error fetching user:", err);
        localStorage.removeItem("token");
        dispatch({ type: "AUTH_ERROR" });
      }
    };

    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}