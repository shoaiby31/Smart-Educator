import React, { useMemo } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";

const PasswordStrength = ({ password }) => {
  const checks = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }, [password]);

  const passedChecks = Object.values(checks).filter(Boolean).length;

  const percentage = (passedChecks / 5) * 100;

  let strength = "Very Weak";
  let color = "error";

  if (passedChecks === 2) {
    strength = "Weak";
    color = "warning";
  }

  if (passedChecks === 3) {
    strength = "Fair";
    color = "info";
  }

  if (passedChecks === 4) {
    strength = "Good";
    color = "success";
  }

  if (passedChecks === 5) {
    strength = "Strong";
    color = "success";
  }

  const Requirement = ({ label, valid }) => (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
    >
      {valid ? (
        <CheckCircleRoundedIcon
          color="success"
          fontSize="small"
        />
      ) : (
        <RadioButtonUncheckedRoundedIcon
          color="disabled"
          fontSize="small"
        />
      )}

      <Typography
        variant="body2"
        color={valid ? "text.primary" : "text.secondary"}
      >
        {label}
      </Typography>
    </Stack>
  );

  if (!password) return null;

  return (
    <Box
      sx={{
        mt: 2,
        mb: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography fontWeight={600}>
          Password Strength
        </Typography>

        <Typography
          fontWeight={700}
          color={`${color}.main`}
        >
          {strength}
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={percentage}
        color={color}
        sx={{
          height: 8,
          borderRadius: 10,
          mb: 2,
        }}
      />

      <Stack spacing={1}>
        <Requirement
          label="At least 8 characters"
          valid={checks.length}
        />

        <Requirement
          label="One uppercase letter"
          valid={checks.uppercase}
        />

        <Requirement
          label="One lowercase letter"
          valid={checks.lowercase}
        />

        <Requirement
          label="One number"
          valid={checks.number}
        />

        <Requirement
          label="One special character"
          valid={checks.special}
        />
      </Stack>
    </Box>
  );
};

export default PasswordStrength;