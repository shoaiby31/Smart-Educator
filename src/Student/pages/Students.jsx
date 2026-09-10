import React from "react";
import { Box, Container } from "@mui/material";

import StudentHeader from "../components/StudentHeader";
import StudentStats from "../components/StudentStats";
import StudentFilters from "../components/StudentFilters";
import StudentTable from "../components/StudentTable";

const Students = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <StudentHeader />

      <Box mt={3}>
        <StudentStats />
      </Box>

      <Box mt={3}>
        <StudentFilters />
      </Box>

      <Box mt={3}>
        <StudentTable />
      </Box>
    </Container>
  );
};

export default Students;