"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authState = useState(false);
  const [isLogin, setIsLogin] = authState;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const getLoginStatus = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLogin(false);
        setIsReady(true);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/login`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);

        setIsLogin(res.ok);
        console.log("After login in Auth.js: the state 1 is: ", isLogin);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("After login in Auth.js: the state 2 is: ", isLogin);
        setIsReady(true);
      }
    };

    getLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {isReady ? children : "Loading"}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
