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
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useNavigate } from "react-router-dom";

const ClassHeader = () => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background:
          "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
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
            label="Class Management"
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
            Classes
          </Typography>

          <Typography
            sx={{
              mt: 1,
              opacity: 0.9,
              maxWidth: 650,
            }}
          >
            Organize classes, assign teachers, manage students,
            and build the academic structure for your school.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddRoundedIcon />}
          onClick={() => navigate("/classes/create")}
          sx={{
            bgcolor: "#fff",
            color: "primary.main",
            px: 3,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            "&:hover": {
              bgcolor: "#F5F5F5",
            },
          }}
        >
          Create Class
        </Button>
      </Stack>
    </Paper>
  );
};

export default ClassHeader;