import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const skippedProfile = sessionStorage.getItem("profileSkipped") === "true";
  const {
    user,
    loading,
    userReady,
  } = useSelector((state) => state.auth);

  useEffect(() => {
  if (loading || !userReady || !user) return;

  // Already inside authenticated areas
  if (
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/profile")
  ) {
    return;
  }

  // Profile completed -> leave completion page
  if (
    location.pathname === "/complete-profile" &&
    user.isProfileCompleted
  ) {
    navigate("/dashboard", { replace: true });
    return;
  }

  // Profile incomplete -> force completion
  if (
    !user.isProfileCompleted &&
    !skippedProfile
  ) {
    navigate("/complete-profile", { replace: true });
  }
}, [
  user,
  loading,
  userReady,
  location.pathname,
  skippedProfile,
  navigate,
]);
  return children;
};

export default AuthRedirect;