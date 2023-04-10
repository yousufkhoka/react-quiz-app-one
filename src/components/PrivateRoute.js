import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return !currentUser ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
