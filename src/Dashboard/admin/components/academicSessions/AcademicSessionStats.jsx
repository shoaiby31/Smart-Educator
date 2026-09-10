import React from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import UpcomingRoundedIcon from "@mui/icons-material/UpcomingRounded";

const AcademicSessionStats = ({
  sessions = [],
}) => {
  const totalSessions = sessions.length;

  const activeSessions = sessions.filter(
    (session) => session.status === "active"
  ).length;

  const completedSessions = sessions.filter(
    (session) => session.status === "completed"
  ).length;

  const upcomingSessions = sessions.filter(
    (session) => session.status === "upcoming"
  ).length;

  const stats = [
    {
      title: "Total Sessions",
      value: totalSessions,
      icon: <CalendarMonthRoundedIcon />,
      background: "rgba(99, 102, 241, 0.1)",
      color: "#6366F1",
    },
    {
      title: "Active Sessions",
      value: activeSessions,
      icon: <CheckCircleRoundedIcon />,
      background: "rgba(34, 197, 94, 0.1)",
      color: "#16A34A",
    },
    {
      title: "Completed",
      value: completedSessions,
      icon: <HistoryRoundedIcon />,
      background: "rgba(100, 116, 139, 0.1)",
      color: "#64748B",
    },
    {
      title: "Upcoming",
      value: upcomingSessions,
      icon: <UpcomingRoundedIcon />,
      background: "rgba(245, 158, 11, 0.1)",
      color: "#D97706",
    },
  ];

  return (
    <Grid
      container
      spacing={2}
    >
      {stats.map((stat) => (
        <Grid
          key={stat.title}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "#E9EDF5",
              transition:
                "all 0.2s ease",

              "&:hover": {
                transform:
                  "translateY(-2px)",
                boxShadow:
                  "0 10px 24px rgba(15, 23, 42, 0.06)",
              },
            }}
          >
            <CardContent
              sx={{
                p: 2.5,
                "&:last-child": {
                  pb: 2.5,
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748B",
                      fontWeight: 500,
                    }}
                  >
                    {stat.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{
                      mt: 0.75,
                      color: "#111827",
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    display: "grid",
                    placeItems: "center",
                    bgcolor:
                      stat.background,
                    color:
                      stat.color,
                  }}
                >
                  {stat.icon}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AcademicSessionStats;