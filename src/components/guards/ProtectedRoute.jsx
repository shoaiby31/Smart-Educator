import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getRoleDashboard } from "../../utils/roleRedirects";

const ProtectedRoute = ({
  allowedRoles = [],
  children,
}) => {
  const {
    user,
    loading,
    userReady,
  } = useSelector((state) => state.auth);

  // Wait until authentication finishes
  if (loading || !userReady) {
    return null;
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Force every authenticated user to complete profile first
  if (!user.isProfileCompleted) {
    return (
      <Navigate
        to="/complete-profile"
        replace
      />
    );
  }

  // No role restriction
  if (allowedRoles.length === 0) {
    return children;
  }

  // Correct role
  if (allowedRoles.includes(user.role)) {
    return children;
  }

  // Wrong role → send to their own dashboard
  return (
    <Navigate
      to={getRoleDashboard(user.role)}
      replace
    />
  );
};

export default ProtectedRoute;