import React, { useState } from "react";
import {
  Alert,
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import { EmailOutlined } from "@mui/icons-material";

import LoadingButton from "../common/LoadingButton";

import { forgotPassword } from "../../services/authService";
import { validateForgotPassword } from "../../validation/authValidation";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForgotPassword(email);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      setErrors({});

      setMessage({
        type: "",
        text: "",
      });

      await forgotPassword(email);

      setMessage({
        type: "success",
        text: "Password reset email sent successfully. Please check your inbox.",
      });

      setEmail("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

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

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Enter the email address associated with your SmartEducator
          account. We'll send you instructions to reset your password.
        </Typography>

        <TextField
          fullWidth
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <LoadingButton
          type="submit"
          loading={loading}
          text="Send Reset Link"
          loadingText="Sending..."
        />
      </Stack>
    </Box>
  );
};

export default ForgotPasswordForm;