import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // // Auto-load user from token on app mount
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axiosInstance
  //       .get(API_PATHS.AUTH.GET_USER_INFO)
  //       .then((res) => {
  //         setUser(res.data);
  //       })
  //       .catch(() => {
  //         localStorage.clear(); // If token is invalid
  //       });
  //   }
  // }, []); // run only on first render

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (e.g., on logout)
  const clearUser = () =>{
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;