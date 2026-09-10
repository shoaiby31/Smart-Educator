import React from "react";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";

import TeachersPageHeader from "../components/TeachersPageHeader";
import TeacherStats from "../components/TeacherStats";
import TeacherFilters from "../components/TeacherFilters";
import TeacherTable from "../components/TeacherTable";

import useTeachers from "../hooks/useTeachers";

const Teachers = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    teachers,
    loading,
    error,
  } = useTeachers();

  const isAdmin = user?.role === "admin";

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 3,
      }}
    >
      <TeachersPageHeader isAdmin={isAdmin} />

      <Box mt={3}>
        <TeacherStats teachers={teachers} />
      </Box>

      <Box mt={3}>
        <TeacherFilters />
      </Box>

      <Box mt={3}>
        <TeacherTable
          teachers={teachers}
          loading={loading}
          error={error}
          isAdmin={isAdmin}
        />
      </Box>
    </Container>
  );
};

export default Teachers;