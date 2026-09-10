import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const AuthFooter = ({
  question,
  actionText,
  actionLink,
}) => {
  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        {question}{" "}
        <Link
          component={RouterLink}
          to={actionLink}
          underline="hover"
          fontWeight={600}
        >
          {actionText}
        </Link>
      </Typography>
    </Box>
  );
};

export default AuthFooter;