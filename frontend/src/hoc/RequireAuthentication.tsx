import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useAuth } from "../hooks/useAuth";

export function RequireAuthentication({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
