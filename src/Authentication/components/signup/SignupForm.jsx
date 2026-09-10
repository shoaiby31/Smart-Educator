import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PasswordStrength from "./PasswordStrength";
import RoleSelector from "./RoleSelector";
import LoadingButton from "../common/LoadingButton";
import GoogleButton from "../shared/GoogleButton";
import { validateSignup } from "../../validation/authValidation";
import { registerUser } from "../../services/authService";
import { loginWithGoogle } from "../../services/authService";
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    agree: false,
  });
const navigate = useNavigate();

const location = useLocation();

  const { user, userReady, loading, } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});

  const [loading1, setLoading1] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

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

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  

    const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = validateSignup(formData);

if (Object.keys(validationErrors).length > 0) {
  setErrors(validationErrors);
  return;
}

setErrors({});

  try {
    setLoading1(true);

   await registerUser({
  displayName: formData.fullName,
  email: formData.email,
  password: formData.password,
  role: formData.role,
});

    navigate("/verify-email");

    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
      agree: false,
    });
  } catch (error) {
    setMessage({
      type: "error",
      text: error.message,
    });
  } finally {
    setLoading1(false);
  }
};



  const handleGoogleSignup = async () => {
  try {
    setGoogleLoading(true);

    const user = await loginWithGoogle();

    setMessage({
      type: "success",
      text: `Welcome ${user.displayName || "to SmartEducator"}!`,
    });

    // We'll add role-based navigation later
    // navigate("/dashboard");

  } catch (error) {
    setMessage({
      type: "error",
      text: error.message,
    });
  } finally {
    setGoogleLoading(false);
  }
};


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Stack spacing={3}>

        {message.text && (
          <Alert severity={message.type}>
            {message.text}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName}
        />

        <TextField
          fullWidth
          type="email"
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        <PasswordStrength
          password={formData.password}
        />

        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
        />
                <Box>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ mb: 2 }}
          >
            Choose Your Role
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              lineHeight: 1.8,
            }}
          >
            Select how you'll use SmartEducator. School Administrators can
            create and manage schools, while Teachers and Students can join an
            existing school after registration.
          </Typography>

          <RoleSelector
            value={formData.role}
            onChange={handleRoleChange}
          />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{" "}
              <Typography
                component="span"
                color="primary"
                fontWeight={600}
              >
                Terms of Service
              </Typography>{" "}
              and{" "}
              <Typography
                component="span"
                color="primary"
                fontWeight={600}
              >
                Privacy Policy
              </Typography>
            </Typography>
          }
        />

        {errors.agree && (
          <Typography
            color="error"
            variant="body2"
          >
            {errors.agree}
          </Typography>
        )}

        <LoadingButton
          type="submit"
          loading={loading1}
          text="Create Account"
          loadingText="Creating your account..."
        />

        <Divider>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            OR
          </Typography>
        </Divider>

        <GoogleButton
          loading={googleLoading}
          onClick={handleGoogleSignup}
          text="Continue with Google"
        />

        <Typography
          textAlign="center"
          variant="body2"
          color="text.secondary"
        >
          By creating an account, you'll be able to securely access
          SmartEducator, collaborate with your school, and enjoy all platform
          features based on your assigned role.
        </Typography>

      </Stack>
    </Box>
  );
};

export default SignupForm;