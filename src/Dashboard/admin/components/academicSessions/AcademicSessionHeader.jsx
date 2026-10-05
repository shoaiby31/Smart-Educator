import React from "react";

import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const AcademicSessionHeader = ({
  onCreateSession,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: {
          xs: "flex-start",
          sm: "center",
        },
        justifyContent: "space-between",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        gap: 2,
        py: { xs: 2,},
        
      }}
    >
      {/* Page Information */}

      <Stack
        direction="row"
        spacing={1.75}
        alignItems="center"
      >
        {/* Icon */}

        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            display: "grid",
            placeItems: "center",
            bgcolor: "rgba(99, 102, 241, 0.1)",
            color: "primary.main",
          }}
        >
          <CalendarMonthRoundedIcon />
        </Box>

        {/* Text */}

        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              color: "#111827",
              letterSpacing: "-0.02em",
            }}
          >
            Academic Sessions
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.4,
            }}
          >
            Manage your school's academic years and sessions.
          </Typography>
        </Box>
      </Stack>

      {/* Create Session Button */}

      <Button
        variant="contained"
        startIcon={
          <AddRoundedIcon />
        }
        onClick={onCreateSession}
        sx={{
          minHeight: 42,
          px: 2.25,
          borderRadius: 2.5,
          textTransform: "none",
          fontWeight: 700,
          boxShadow:
            "0 8px 20px rgba(99, 102, 241, 0.18)",

          "&:hover": {
            boxShadow:
              "0 10px 24px rgba(99, 102, 241, 0.25)",
          },
        }}
      >
        Create Sessions
      </Button>
    </Box>
  );
};

export default AcademicSessionHeader;