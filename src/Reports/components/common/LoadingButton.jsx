import React from "react";
import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({
  loading = false,
  text,
  loadingText = "Please wait...",
  type = "button",
  onClick,
  fullWidth = true,
  color = "primary",
  variant = "contained",
  startIcon,
  endIcon,
  sx = {},
}) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      disabled={loading}
      onClick={onClick}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      sx={{
        py: 1.4,
        borderRadius: 3,
        fontWeight: 700,
        fontSize: "0.95rem",
        textTransform: "none",
        boxShadow: "none",
        transition: ".25s",

        "&:hover": {
          boxShadow: "0 10px 30px rgba(108,99,255,.25)",
          transform: "translateY(-2px)",
        },

        ...sx,
      }}
    >
      {loading ? (
        <>
          <CircularProgress
            size={20}
            color="inherit"
            sx={{ mr: 1 }}
          />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default LoadingButton;