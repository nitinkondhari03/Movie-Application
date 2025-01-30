import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdmin = ({ children }) => {
  const { user} = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedAdmin;
