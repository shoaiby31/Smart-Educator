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
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const statistics = [
  {
    title: "Teachers",
    value: 24,
    change: "+2 This Month",
    icon: <SchoolRoundedIcon fontSize="large" color="primary" />,
  },
  {
    title: "Students",
    value: 742,
    change: "+18 This Week",
    icon: <GroupsRoundedIcon fontSize="large" color="primary" />,
  },
  {
    title: "Classes",
    value: 18,
    change: "No Change",
    icon: <ClassRoundedIcon fontSize="large" color="primary" />,
  },
  {
    title: "Quizzes",
    value: 61,
    change: "+5 Today",
    icon: <QuizRoundedIcon fontSize="large" color="primary" />,
  },
];

const StatisticsCards = () => {
  return (
    <Grid container spacing={3}>
      {statistics.map((item) => (
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
                  color="success"
                  icon={<TrendingUpRoundedIcon />}
                  label={item.change}
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

export default StatisticsCards;