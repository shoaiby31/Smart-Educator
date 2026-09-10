import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCompletionGuard = ({ children }) => {
  const {
    user,
    loading,
    userReady,
  } = useSelector((state) => state.auth);

  // Wait until auth is initialized
  if (loading || !userReady) {
    return null;
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Profile is incomplete
  if (!user.profileCompleted) {
    return (
      <Navigate
        to="/complete-profile"
        replace
      />
    );
  }

  return children;
};

export default ProfileCompletionGuard;