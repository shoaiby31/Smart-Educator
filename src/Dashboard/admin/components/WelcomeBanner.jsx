import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

import { useSelector } from "react-redux";

const WelcomeBanner = () => {
  const { user } = useSelector((state) => state.auth);
  const getSubtitle = () => {
    switch (user.role) {
      case "admin":
        return "Manage your school, teachers, students and academic activities from one place.";

      case "teacher":
        return "Manage your classes, students, quizzes and assignments.";

      case "student":
        return "Track your classes, assignments, quizzes and academic progress.";

      default:
        return "Welcome back to SmartEducator.";
    }
  };
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";

    return "Good Night";
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background:
          "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Stack spacing={2}>
          <Chip
            icon={<SchoolRoundedIcon sx={{ color: "#fff !important" }} />}
            label="SmartEducator Dashboard"
            sx={{
              bgcolor: "rgba(255,255,255,.15)",
              color: "#fff",
              width: "fit-content",
            }}
          />

          <Typography
            variant="h4"
            fontWeight={700}
          >
            <WavingHandRoundedIcon
              sx={{
                verticalAlign: "middle",
                mr: 1,
              }}
            />
            {getGreeting()}, {user.displayName || "User"}
          </Typography>
          <Chip
            label={user.role?.toUpperCase()}
            size="small"
            sx={{
              width: "fit-content",
              bgcolor: "rgba(255,255,255,.15)",
              color: "#fff",
              fontWeight: 600,
            }}
          />
          <Typography sx={{ opacity: 0.9 }}>
            {getSubtitle()}
          </Typography>

          <Box display="flex" alignItems="center">
            <CalendarMonthRoundedIcon sx={{ mr: 1 }} />

            <Typography>
              {today}
            </Typography>
          </Box>
        </Stack>

        <Avatar
          src={user.photoURL}
          sx={{
            width: 90,
            height: 90,
            fontSize: 34,
            bgcolor: "#fff",
            color: "primary.main",
            fontWeight: 700,
          }}
        >
          {
            user.displayName
              ?.trim()
              ?.charAt(0)
              ?.toUpperCase() || "U"
          }
        </Avatar>
      </Stack>
    </Paper>
  );
};

export default WelcomeBanner;