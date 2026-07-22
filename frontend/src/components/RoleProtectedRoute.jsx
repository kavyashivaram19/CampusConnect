// =======================================================
// IMPORTS
// =======================================================

import { Navigate } from "react-router-dom";

// =======================================================
// COMPONENT
// =======================================================

function RoleProtectedRoute({ children, allowedRoles }) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default RoleProtectedRoute;