import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const AuthHeader = ({
  badge = "SmartEducator",
  title,
  subtitle,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Chip
        icon={<AutoAwesomeRoundedIcon />}
        label={badge}
        color="primary"
        sx={{
          mb: 2,
          borderRadius: 2,
          fontWeight: 600,
          px: 1,
        }}
      />

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#111827",
          lineHeight: 1.2,
          mb: 1.5,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          lineHeight: 1.8,
          maxWidth: 450,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default AuthHeader;