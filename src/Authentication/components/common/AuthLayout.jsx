import { Box, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";


const MotionBox = motion.create(Box);

const AuthLayout = ({ leftContent, children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        background:
          "radial-gradient(circle at top left, rgba(108,99,255,.08), transparent 40%), radial-gradient(circle at bottom right, rgba(139,92,246,.08), transparent 40%)",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="center"
        >
          {/* Left Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {leftContent}
            </MotionBox>
          </Grid>

          {/* Right Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {children}
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AuthLayout;