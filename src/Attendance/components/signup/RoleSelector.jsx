import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const roles = [
  {
    value: "admin",
    title: "School Administrator",
    description:
      "Create and manage your school, teachers, classes, students and overall academic activities.",
    icon: <AdminPanelSettingsRoundedIcon />,
    color: "#6C63FF",
  },
  {
    value: "teacher",
    title: "Teacher",
    description:
      "Join your school, teach students, create quizzes, assignments and manage classrooms.",
    icon: <SchoolRoundedIcon />,
    color: "#0EA5E9",
  },
  {
    value: "student",
    title: "Student",
    description:
      "Join classes, attempt quizzes, view assignments and collaborate with teachers.",
    icon: <PersonRoundedIcon />,
    color: "#22C55E",
  },
];

const RoleSelector = ({ value, onChange }) => {
  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        Choose Your Role
      </Typography>

      <Grid container spacing={2}>
        {roles.map((role) => {
          const selected = value === role.value;

          return (
            <Grid size={{ xs: 12 }} key={role.value}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "2px solid",
                  borderColor: selected ? role.color : "#E5E7EB",
                  bgcolor: selected
                    ? `${role.color}10`
                    : "#fff",
                  transition: ".25s",

                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: role.color,
                    boxShadow: "0 15px 40px rgba(0,0,0,.08)",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => onChange(role.value)}
                >
                  <CardContent>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Avatar
                        sx={{
                          bgcolor: role.color,
                          width: 55,
                          height: 55,
                        }}
                      >
                        {role.icon}
                      </Avatar>

                      {selected && (
                        <Chip
                          color="primary"
                          icon={<CheckCircleRoundedIcon />}
                          label="Selected"
                        />
                      )}
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight={700}
                      mt={2}
                    >
                      {role.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={1}
                      lineHeight={1.8}
                    >
                      {role.description}
                    </Typography>

                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default RoleSelector;