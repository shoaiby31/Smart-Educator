import React from "react";

import {

    Box,

} from "@mui/material";
import AcademicSessionHeader from "../components/academicSessions/AcademicSessionHeader";
import AcademicSessionStats from "../components/academicSessions/AcademicSessionStats";
import AcademicSessionTable from "../components/academicSessions/AcademicSessionTable";
const AcademicSessions = () => {
  
    return (
        <Box
            sx={{
                minHeight: "100%",
                bgcolor: "#F8FAFC",
                py: {
                    xs: 3,
                    md: 1,
                },
            }}
        >
           <AcademicSessionHeader/>
           <AcademicSessionStats/>
           <AcademicSessionTable/>
        </Box>
    );
};

export default AcademicSessions;