import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  CircularProgress,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { signOut } from "firebase/auth";

import { auth } from "../../config/firebase";

const LogoutButton = ({
  variant = "text",
  fullWidth = false,
  onLoggedOut,
  children = "Logout",
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      sessionStorage.removeItem("profileSkipped");

      await signOut(auth);

      onLoggedOut?.();

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      startIcon={
        loading ? (
          <CircularProgress size={18} />
        ) : (
          <LogoutRoundedIcon />
        )
      }
      disabled={loading}
      onClick={handleLogout}
    >
      {children}
    </Button>
  );
};

export default LogoutButton;