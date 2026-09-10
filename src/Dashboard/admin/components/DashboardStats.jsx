import React from "react";

import { Box, Grid, Paper, Alert, Typography, Skeleton, Button, Avatar, Stack, IconButton, } from "@mui/material";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import useDashboardStats from "../../hooks/useDashboardStats";
import StatCard from "../../common/StatsCard";
import { Add, SchoolRounded, GroupsRounded, QuizRounded, InfoOutline, ApartmentRounded, MoreVertRounded, CalendarTodayOutlined, BarChartRounded, AddBoxRounded, WavingHandRounded, } from "@mui/icons-material";

import { useSelector } from "react-redux";

import FacultyCount from "../../../components/AdminComponents/FacultyCount";
import StudentsCount from "../../../components/DashbaordComponents/StudentsCount";
const DashboardStats = () => {
  const {
    stats,
    loading,
    error,
  } = useDashboardStats();

  const { user } = useSelector((state) => state.auth);
  const getSubtitle = () => {
    switch (user.role) {
      case "admin":
        return "Here's what's happening in your school today.";

      case "teacher":
        return "Manage your classes, students, quizzes and assignments.";

      case "student":
        return "Track your classes, assignments, quizzes and academic progress.";

      default:
        return "Welcome back to SmartEducator.";
    }
  };

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const day = today.toLocaleDateString("en-US", {
    weekday: "long",
  });



  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";

    return "Good Night";
  };

  const cardData = [
    {
      title: "Teachers",
      value: stats.totalTeachers,
      icon: <SchoolRoundedIcon />,
      color: "#3B82F6",
      bg: "#E8F1FF",
      subtitle: "+3 this month",
    },
    {
      title: "Students",
      value: stats.totalStudents,
      icon: <PeopleAltRoundedIcon />,
      color: "#10B981",
      bg: "#E8F1FF",
      subtitle: "+3 this month",

    },
    {
      title: "Active Classes",
      value: stats.totalAdmins,
      icon: <ApartmentRounded />,
      color: "#3B82F6",
      bg: "#E8F1FF",
      subtitle: "12 grades",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <GroupsRoundedIcon />,
      color: "#8B5CF6",
      bg: "#FFF2DE",
      subtitle: "+10 this month",
    },
  ];


  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid size={{ xs:12, sm:6, lg:3 }}>
            <Skeleton variant="rounded" height={150} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  return (

        <Box sx={{ px: { xs: 2, md: 1}, py: 0, background: "#F7F8FC", }} >
      {/* ================= TOP SECTION ================= */}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", lg: "center" }, flexDirection: { xs: "column", lg: "row" }, gap: 3,}}>

        {/* Greeting */}

        <Box>
         <Typography sx={{ fontSize: { xs: 15, md: 18, lg:24, xl:32 }, fontWeight: 700, color: "#111827", lineHeight: 1.2, }}>
        {getGreeting()}, {user.displayName || "User"}

        <WavingHandRounded sx={{ ml: 1, color: "#FDBA21", fontSize: { xs: 15, md: 20, lg:24, xl:32}, verticalAlign: "middle",}}/>
      </Typography>

      <Typography sx={{ mt: .8, color: "#6B7280", fontSize: { xs: 12, md: 14, lg:16 } }}>
        {getSubtitle()}
      </Typography>
        </Box>

        {/* Right Side */}

    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" >
    
          {/* Date */}

          <Stack direction="row" spacing={1} alignItems="center" mr={2}>
             <CalendarTodayOutlined sx={{ color: "#6B7280", fontSize: 16, }} />
        <Box>
          <Typography sx={{ fontSize: 11, fontWeight: 600, }}>{formattedDate}</Typography>
          <Typography sx={{ fontSize: 10, color: "#6B7280", }}>{day}</Typography>
        </Box>
          </Stack>

 <Button startIcon={<Add />} size="small" variant="contained" sx={{ borderRadius: 3, px: 2, py: 1, textTransform: "none", fontWeight: 600, background: "linear-gradient(90deg,#EC3AA6,#6C4AF8)", "&:hover": { background: "linear-gradient(90deg,#EC3AA6,#6C4AF8)", }, }}>
        Add Teacher
      </Button>

      <Button startIcon={<AddBoxRounded />} size="small" variant="outlined" sx={{ borderRadius: 3, px: 2, py: 1, textTransform: "none", borderColor: "#E5E7EB", color: "#111827", }}>
        Create Class
      </Button>

      <Button startIcon={<BarChartRounded />} size="small" variant="outlined" sx={{ borderRadius: 3, px: 2, py: 1, textTransform: "none", borderColor: "#E5E7EB", color: "#111827", }}>
        View Reports
      </Button>
        </Stack>
      </Box>

         {/* ================= STATS ================= */}

    <Grid container spacing={3}  sx={{ mt: 2 }}>
      
        {cardData.map((card, index) => (
          <Grid size={{ xs:12, sm:6, lg:3 }}>
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            bg={card.bg}
            subtitle={card.subtitle}
          />
      </Grid>

        ))}
    </Grid>
    </Box>
  );
};

export default DashboardStats;