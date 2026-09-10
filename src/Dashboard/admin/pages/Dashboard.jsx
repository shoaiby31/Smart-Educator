import React from "react";
import { Box, Grid } from "@mui/material";

import DashboardStats from "../components/DashboardStats";
import RecentActivities from "../components/RecentActivities";
import UpcomingEvents from "../components/UpcomingEvents";
import StatisticsCards from "../components/StatisticsCards";


import QuickActions from "../components/QuickActions";
const Dashboard = () => {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {/* <WelcomeBanner /> */}

      <DashboardStats />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UpcomingEvents />

        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <RecentActivities />
        </Grid>
      </Grid>
      <StatisticsCards />
      <QuickActions />
    </Box>
  );
};

export default Dashboard;