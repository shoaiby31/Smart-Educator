import React, {useEffect} from "react";
import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  resendVerificationEmail
} from "../services/authService";
import {
  updateEmailVerification,
  updateLastLogin,
} from "../services/userService";
import { auth } from "../../config/firebase";

const VerifyEmail = () => {
  const navigate = useNavigate();
useEffect(() => {
  const interval = setInterval(async () => {
    if (!auth.currentUser) return;

    await auth.currentUser.reload();

    if (auth.currentUser.emailVerified) {
      clearInterval(interval);

      await updateEmailVerification(
        auth.currentUser.uid,
        true
      );
await updateLastLogin(auth.currentUser.uid);
      navigate("/dashboard");
    }
  }, 3000);

  return () => clearInterval(interval);
}, [navigate]);
  const handleResend = async () => {
    try {
      await resendVerificationEmail();

      alert("Verification email sent.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f8fafc",
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          bgcolor: "#fff",
          p: 5,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
          >
            Verify Your Email
          </Typography>

          <Alert severity="info">
            We've sent a verification email to your inbox.
            Please verify your email before accessing your dashboard.
          </Alert>

          <Button
            variant="contained"
            onClick={handleResend}
          >
            Resend Email
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default VerifyEmail;