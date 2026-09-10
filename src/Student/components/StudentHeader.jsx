import React from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import { useNavigate } from "react-router-dom";

const StudentHeader = () => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
        color: "#fff",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={3}
      >
        <Box>
          <Chip
            icon={
              <SchoolRoundedIcon
                sx={{ color: "#fff !important" }}
              />
            }
            label="Student Management"
            sx={{
              mb: 2,
              bgcolor: "rgba(255,255,255,.15)",
              color: "#fff",
            }}
          />

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Students
          </Typography>

          <Typography
            sx={{
              mt: 1,
              opacity: 0.9,
            }}
          >
            Manage students, assign classes, monitor academic
            progress, and oversee enrollments.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<PersonAddAltRoundedIcon />}
          onClick={() => navigate("/student-requests")}
          sx={{
            bgcolor: "#fff",
            color: "success.main",
            px: 3,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            "&:hover": {
              bgcolor: "#F5F5F5",
            },
          }}
        >
          Student Requests
        </Button>
      </Stack>
    </Paper>
  );
};

export default StudentHeader;