import React from "react";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";


const TeacherStats = ({ teachers = [] }) => {
    const totalTeachers = teachers.length;

const activeTeachers = teachers.filter(
  (teacher) => teacher.status === "active"
).length;

const inactiveTeachers = teachers.filter(
  (teacher) => teacher.status === "inactive"
).length;

const stats = [
  {
    title: "Total Teachers",
    value: totalTeachers,
    icon: <GroupsRoundedIcon color="primary" fontSize="large" />,
    chip: "Teachers",
  },
  {
    title: "Active Teachers",
    value: activeTeachers,
    icon: <CheckCircleRoundedIcon color="success" fontSize="large" />,
    chip: "Active",
  },
  {
    title: "Inactive Teachers",
    value: inactiveTeachers,
    icon: <HourglassTopRoundedIcon color="warning" fontSize="large" />,
    chip: "Inactive",
  },
  {
    title: "Assigned Subjects",
    value: "--",
    icon: <MenuBookRoundedIcon color="secondary" fontSize="large" />,
    chip: "Coming Soon",
  },
];

  return (
    <Grid container spacing={3}>
      {stats.map((item) => (
        <Grid
          key={item.title}
          size={{ xs: 12, sm: 6, lg: 3 }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              transition: ".3s",
              height: "100%",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                {item.icon}

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  {item.value}
                </Typography>

                <Chip
                  size="small"
                  color="primary"
                  icon={<TrendingUpRoundedIcon />}
                  label={item.chip}
                  sx={{ width: "fit-content" }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeacherStats;