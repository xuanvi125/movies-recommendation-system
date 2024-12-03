import { createContext, useContext, useReducer, useEffect } from "react";
import * as AuthService from "../services/AuthService";
const authContext = createContext();
function authReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isInitialize: true,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOG_IN":
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
      };
    case "LOG_OUT":
      return {
        ...state,
        isAuth: false,
        user: null,
      };
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuth: false,
    isInitialize: false,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({ type: "INIT", payload: { user: null, isAuth: false } });
      return;
    }
    async function fetchUser() {
      const response = await AuthService.getProfile();
      if (response.statusCode == 200) {
        dispatch({
          type: "INIT",
          payload: { user: response.user, isAuth: true },
        });
      } else {
        dispatch({ type: "INIT", payload: { user: null, isAuth: false } });
      }
    }
    fetchUser();
  }, []);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
}
export function useAuth() {
  return useContext(authContext);
}
