import React from "react";
import { Box, Container } from "@mui/material";

import ClassHeader from "../components/ClassHeader";
import ClassStats from "../components/ClassStats";
import ClassFilters from "../components/ClassFilters";
import ClassTable from "../components/ClassTable";

const Classes = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <ClassHeader />

      <Box mt={3}>
        <ClassStats />
      </Box>

      <Box mt={3}>
        <ClassFilters />
      </Box>

      <Box mt={3}>
        <ClassTable />
      </Box>
    </Container>
  );
};

export default Classes;