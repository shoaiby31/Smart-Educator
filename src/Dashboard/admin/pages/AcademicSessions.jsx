import React from "react";

import {

    Box,

} from "@mui/material";
import AcademicSessionHeader from "../components/academicSessions/AcademicSessionHeader";
import AcademicSessionStats from "../components/academicSessions/AcademicSessionStats";
const AcademicSessions = () => {
  
    return (
        <Box
            sx={{
                minHeight: "100%",
                bgcolor: "#F8FAFC",
                py: {
                    xs: 3,
                    md: 4,
                },
            }}
        >
           <AcademicSessionHeader/>
           <AcademicSessionStats/>
        </Box>
    );
};

export default AcademicSessions;