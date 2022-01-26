import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth0();

  return isLoading ? (
    <Box
      alignItems="center"
      justifyContent="center"
      display="flex"
      minHeight="100%"
    >
      <CircularProgress />
    </Box>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default RequireAuth;
