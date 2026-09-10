import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CTASection = () => {
  return (
    <Box py={10}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 6,
            textAlign: "center",
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: "#fff",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
          >
            Ready to Transform Your School?
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: 700,
              mx: "auto",
              mb: 4,
            }}
          >
            Join SmartEducator today and simplify school management with one
            modern, secure, and powerful platform.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="inherit"
              size="large"
              sx={{
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              Get Started
            </Button>

            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#fff",
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Login
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default CTASection;