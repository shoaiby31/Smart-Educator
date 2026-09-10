import React from "react";
import {
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import googleIcon from "../../assets/icons/google.svg";
const GoogleButton = ({
  onClick,
  loading = false,
  text = "Continue with Google",
}) => {
  return (
    <Button
      fullWidth
      variant="outlined"
      disabled={loading}
      onClick={onClick}
      sx={{
        py: 1.3,
        mt: 2,
        borderRadius: 3,
        borderColor: "grey.300",
        color: "text.primary",
        textTransform: "none",
        fontWeight: 600,
        backgroundColor: "#fff",
        transition: ".25s",

        "&:hover": {
          backgroundColor: "#F8FAFC",
          borderColor: "#6C63FF",
          transform: "translateY(-2px)",
          boxShadow: "0 10px 30px rgba(108,99,255,.10)",
        },
      }}
    >
      {loading ? (
        <CircularProgress size={22} />
      ) : (
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
        >
          <img
            src={googleIcon}
            alt="Google"
            width={22}
            height={22}
          />

          <Typography
            fontWeight={600}
            fontSize=".95rem"
          >
            {text}
          </Typography>
        </Stack>
      )}
    </Button>
  );
};

export default GoogleButton;