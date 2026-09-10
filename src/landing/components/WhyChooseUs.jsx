import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";

const reasons = [
  {
    title: "Secure Access",
    description:
      "Role-based authentication ensures that admins, teachers, and future student accounts only access what they are allowed to.",
    icon: <SecurityRoundedIcon color="primary" sx={{ fontSize: 42 }} />,
  },
  {
    title: "Cloud Powered",
    description:
      "Built on Firebase for reliable, real-time data synchronization and secure cloud storage.",
    icon: <CloudDoneRoundedIcon color="primary" sx={{ fontSize: 42 }} />,
  },
  {
    title: "Fast & Efficient",
    description:
      "Designed to reduce paperwork and simplify daily school operations with a clean workflow.",
    icon: <BoltRoundedIcon color="primary" sx={{ fontSize: 42 }} />,
  },
  {
    title: "Works Everywhere",
    description:
      "Fully responsive so you can manage your school from desktop, tablet, or mobile.",
    icon: <DevicesRoundedIcon color="primary" sx={{ fontSize: 42 }} />,
  },
];

const WhyChooseUs = () => {
  return (
    <Box py={10} id="why-us" sx={{
    scrollMarginTop: "90px",
  }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          fontWeight={700}
          align="center"
          gutterBottom
        >
          Why Choose SmartEducator?
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mb: 6 }}
        >
          Everything you need to manage your school efficiently in one place.
        </Typography>

        <Grid container spacing={3}>
          {reasons.map((item) => (
            <Grid
              key={item.title}
              size={{ xs: 12, sm: 6, md: 3 }}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    {item.icon}

                    <Typography variant="h6" fontWeight={600}>
                      {item.title}
                    </Typography>

                    <Typography color="text.secondary">
                      {item.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;