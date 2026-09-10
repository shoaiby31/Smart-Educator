import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  EmailOutlined,
} from "@mui/icons-material";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingButton from "../common/LoadingButton";
import GoogleButton from "../shared/GoogleButton";

import { validateLogin } from "../../validation/authValidation";

import {
  loginUser,
  loginWithGoogle,
} from "../../services/authService";

import {
  createUserProfile,
  getUserProfile,
} from "../../services/userService";

const LoginForm = () => {
  const navigate = useNavigate();
const location = useLocation();

  const { user, userReady, loading, } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [errors, setErrors] = useState({});

  const [loginLoading, setLoginLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  //--------------------------------------------------
  // Redirect if already logged in
  //--------------------------------------------------

  useEffect(() => {
  if (loading || !userReady) return;

  if (user) {
    const previousPage =
      location.state?.from?.pathname || "/";

    navigate(previousPage, {
      replace: true,
    });
  }
}, [
  loading,
  userReady,
  user,
  navigate,
  location,
]);

  //--------------------------------------------------
  // Input Change
  //--------------------------------------------------

  const handleChange = (event) => {
    const {
      name,
      value,
      checked,
      type,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  //--------------------------------------------------
  // Email Login
  //--------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors =
      validateLogin(formData);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoginLoading(true);

      setErrors({});

      setMessage({
        type: "",
        text: "",
      });

      const firebaseUser =
        await loginUser({
          email: formData.email,
          password: formData.password,
        });

      if (!firebaseUser.emailVerified) {
        navigate("/verify-email", {
          replace: true,
        });

        return;
      }

      // AuthProvider + AuthRedirect
      // will handle navigation

    } catch (error) {
      setMessage({
        type: "error",
        text:
          error?.message ||
          "Unable to sign in.",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  //--------------------------------------------------
  // Google Login
  //--------------------------------------------------

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      setMessage({
        type: "",
        text: "",
      });

      const firebaseUser =
        await loginWithGoogle();

      let profile =
        await getUserProfile(
          firebaseUser.uid
        );

      if (!profile) {
        profile = {
          uid: firebaseUser.uid,

          displayName:
            firebaseUser.displayName ||
            "",

          email:
            firebaseUser.email || "",

          photoURL:
            firebaseUser.photoURL ||
            "",

          role: "student",

          isProfileCompleted: false,
        };

        await createUserProfile(profile);
      }

      // AuthProvider + AuthRedirect
      // will handle navigation

    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          error?.message ||
          "Google sign in failed.",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  //--------------------------------------------------
  // UI
  //--------------------------------------------------

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
    >
      <Stack spacing={3}>
        {message.text && (
          <Alert severity={message.type}>
            {message.text}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={
                  formData.remember
                }
                onChange={handleChange}
              />
            }
            label="Remember Me"
          />

          <Typography
            component={Link}
            to="/forgot-password"
            color="primary"
            sx={{
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Forgot Password?
          </Typography>
        </Box>

        <LoadingButton
          type="submit"
          loading={loginLoading}
          text="Sign In"
          loadingText="Signing In..."
        />

        <Divider>
          <Typography variant="body2">
            OR
          </Typography>
        </Divider>

        <GoogleButton
          loading={googleLoading}
          onClick={
            handleGoogleLogin
          }
          text="Continue with Google"
        />
      </Stack>
    </Box>
  );
};

export default LoginForm;