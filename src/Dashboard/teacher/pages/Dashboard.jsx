import React from "react";
import JoinSchoolCard from "../components/school/JoinSchoolCard";
import MySchoolRequest from "../components/school/MySchoolRequest";
import { Stack } from "@mui/material";
const TeacherDashboard = () => {
  return (
    <Stack spacing={3}>
    <JoinSchoolCard />

    <MySchoolRequest />

    {/* existing teacher dashboard content */}
</Stack>
  )
};

export default TeacherDashboard;