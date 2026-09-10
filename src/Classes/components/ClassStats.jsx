import React from "react";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const stats = [
  {
    title: "Total Classes",
    value: 28,
    icon: <SchoolRoundedIcon color="primary" fontSize="large" />,
    chip: "Academic Year 2026-27",
  },
  {
    title: "Total Students",
    value: 856,
    icon: <GroupsRoundedIcon color="success" fontSize="large" />,
    chip: "Across All Classes",
  },
  {
    title: "Assigned Teachers",
    value: 34,
    icon: <PersonRoundedIcon color="secondary" fontSize="large" />,
    chip: "Class Teachers",
  },
  {
    title: "Average Class Size",
    value: 31,
    icon: <BarChartRoundedIcon color="warning" fontSize="large" />,
    chip: "Students per Class",
  },
];

const ClassStats = () => {
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
              height: "100%",
              transition: ".3s",
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

export default ClassStats;