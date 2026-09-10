import React from "react";

import {
  Box,
  Container,
} from "@mui/material";



import { useAuth } from "../../../Authentication";

import ProfileEditor from "./ProfileEditor";

const CompleteProfile = () => {


  const { user } = useAuth();

  if (!user) return null;


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        py: 6,
      }}
    >
      <Container>
        


        <ProfileEditor mode="complete" />
      </Container>
    </Box>
  );
};

export default CompleteProfile;