import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
// import DashboardHeader from "./DashboardHeader";

// const DRAWER_WIDTH = 280;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };
  return (

    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar mobileOpen={mobileOpen}
        onClose={handleDrawerToggle} />

      <Box sx={{ flexGrow: 1 }}>
        <TopBar />

        {/* Push content below AppBar */}
        {/* <Toolbar /> */}

        {/* <DashboardHeader /> */}

        <Box
          sx={{
            p: {
              xs: 2,
              sm: 2,
              md: 2,
            }, background: "#F7F8FC",
          }}
        >


          <Outlet />
        </Box>
      </Box>
    </Box>



    // <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8FAFC" }}>
    //   {/* Sidebar */}
    //   <Sidebar  mobileOpen={mobileOpen}
    // onClose={handleDrawerToggle} />

    //   {/* Main Content */}
    //   <Box
    //     component="main"
    //     sx={{
    //       flexGrow: 1,
    //       ml: { md: `${DRAWER_WIDTH}px` },
    //       minHeight: "100vh",
    //     }}
    //   >
    //     <TopBar onMenuClick={handleDrawerToggle} />

    //     {/* Push content below AppBar */}
    //     <Toolbar />

    //     <DashboardHeader />

    //     <Box
    //       sx={{
    //         p: {
    //           xs: 2,
    //           sm: 3,
    //           md: 4,
    //         },
    //       }}
    //     >
    //       <Outlet />
    //     </Box>
    //   </Box>
    // </Box>
  );
};

export default DashboardLayout;