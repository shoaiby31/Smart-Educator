import React from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useNavigate } from "react-router-dom";

const EmptyClasses = () => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        borderRadius: 4,
        border: "1px dashed",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          bgcolor: "primary.light",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      >
        <SchoolRoundedIcon
          sx={{
            fontSize: 46,
            color: "primary.main",
          }}
        />
      </Box>

      <Typography
        variant="h5"
        fontWeight={700}
        gutterBottom
      >
        No Classes Found
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          maxWidth: 500,
          mx: "auto",
          mb: 4,
        }}
      >
        Create your first class to organize students,
        assign teachers, and manage your school's
        academic structure.
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<AddRoundedIcon />}
        onClick={() => navigate("/classes/create")}
      >
        Create First Class
      </Button>
    </Paper>
  );
};

export default EmptyClasses;