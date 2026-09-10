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
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const stats = [
  {
    title: "Total Students",
    value: 856,
    icon: <SchoolRoundedIcon color="primary" fontSize="large" />,
    chip: "+42 This Month",
  },
  {
    title: "Active Students",
    value: 832,
    icon: <CheckCircleRoundedIcon color="success" fontSize="large" />,
    chip: "97% Active",
  },
  {
    title: "Pending Requests",
    value: 14,
    icon: <HourglassTopRoundedIcon color="warning" fontSize="large" />,
    chip: "Awaiting Approval",
  },
  {
    title: "Total Classes",
    value: 28,
    icon: <ClassRoundedIcon color="secondary" fontSize="large" />,
    chip: "Across School",
  },
];

const StudentStats = () => {
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

export default StudentStats;