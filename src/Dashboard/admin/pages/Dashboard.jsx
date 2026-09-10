import React from "react";
import { Box } from "@mui/material";

import WelcomeBanner from "../components/WelcomeBanner";
import DashboardStats from "../components/DashboardStats";
import QuickActions from "../components/QuickActions";
const Dashboard = () => {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {/* <WelcomeBanner /> */}

      <DashboardStats />

      <QuickActions />
    </Box>
  );
};

export default Dashboard;