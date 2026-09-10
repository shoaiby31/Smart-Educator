import React from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";

const MotionCard = motion.create(Card);

const features = [
  {
    icon: <SecurityRoundedIcon fontSize="small" />,
    label: "Secure Authentication",
  },
  {
    icon: <SchoolRoundedIcon fontSize="small" />,
    label: "School Management",
  },
  {
    icon: <QuizRoundedIcon fontSize="small" />,
    label: "Interactive Quizzes",
  },
  {
    icon: <AnalyticsRoundedIcon fontSize="small" />,
    label: "Live Performance Tracking",
  },
  {
    icon: <ForumRoundedIcon fontSize="small" />,
    label: "Class Collaboration",
  },
];

const AuthIllustration = ({ image }) => {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      elevation={0}
      sx={{
        p: 5,
        borderRadius: 5,
        bgcolor: "transparent",
      }}
    >
      <CardContent>

        <Chip
          label="SmartEducator"
          color="primary"
          sx={{
            mb: 3,
            fontWeight: 700,
            borderRadius: 2,
          }}
        />

        <Typography
          variant="h3"
          fontWeight={800}
          lineHeight={1.2}
          gutterBottom
        >
          Smarter Learning.
          <br />
          Better Teaching.
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mb: 5,
            maxWidth: 520,
            fontSize: "1.05rem",
            lineHeight: 1.8,
          }}
        >
          A modern platform that empowers schools to manage classrooms,
          teachers, students, quizzes, assignments, attendance and
          communication—all from one place.
        </Typography>

        <Box
          component="img"
          src={image}
          alt="SmartEducator Illustration"
          sx={{
            width: "100%",
            maxWidth: 500,
            display: "block",
            mx: "auto",
            mb: 5,
          }}
        />

        <Stack
          direction="row"
          spacing={1.5}
          useFlexGap
          flexWrap="wrap"
        >
          {features.map((item) => (
            <Chip
              key={item.label}
              icon={item.icon}
              label={item.label}
              variant="outlined"
              sx={{
                py: 2.6,
                borderRadius: 3,
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>

      </CardContent>
    </MotionCard>
  );
};

export default AuthIllustration;