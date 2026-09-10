import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";

const features = [
  {
    title: "Teacher Management",
    description:
      "Add, edit, archive and manage teachers from a single dashboard.",
    icon: <GroupsRoundedIcon color="primary" sx={{ fontSize: 45 }} />,
  },
  {
    title: "Student Management",
    description:
      "Maintain complete student records with real-time updates.",
    icon: <SchoolRoundedIcon color="primary" sx={{ fontSize: 45 }} />,
  },
  {
    title: "Attendance Tracking",
    description:
      "Record and monitor attendance efficiently for every class.",
    icon: <FactCheckRoundedIcon color="primary" sx={{ fontSize: 45 }} />,
  },
  {
    title: "Reports & Analytics",
    description:
      "Generate useful reports to monitor school performance.",
    icon: <AnalyticsRoundedIcon color="primary" sx={{ fontSize: 45 }} />,
  },
];

const FeaturesSection = () => {
  return (
    <Box py={10} id="features" sx={{
    scrollMarginTop: "90px",
  }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={700}
          mb={2}
        >
          Everything Your School Needs
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          mb={6}
        >
          One platform to manage your entire school.
        </Typography>

        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid
              key={feature.title}
              size={{ xs: 12, sm: 6, md: 3 }}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  {feature.icon}

                  <Typography
                    variant="h6"
                    fontWeight={600}
                    mt={2}
                    mb={1}
                  >
                    {feature.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;