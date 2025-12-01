import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setauth] = useState(localStorage.getItem("token") || null);

  const setToken = (token, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    setauth(token);
  };

  return (
    <>
      <authContext.Provider value={{ auth, setToken }}>
        {children}
      </authContext.Provider>
    </>
  );
};

export const useAuthContext = () => useContext(authContext);

export const ProtectedRoutes = ({ children }) => {
  const { auth } = useAuthContext();

  if (auth === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
