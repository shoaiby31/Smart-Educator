import React from "react";
import { Paper, Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionPaper = motion.create(Paper);

const AuthCard = ({ children }) => {
  return (
    <MotionPaper
      elevation={0}
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      sx={{
        p: {
          xs: 3,
          sm: 4,
          md: 5,
        },

        borderRadius: 5,

        bgcolor: "#fff",

        border: "1px solid",

        borderColor: "grey.200",

        boxShadow:
          "0px 20px 50px rgba(15, 23, 42, 0.08)",

        transition: "all .3s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0px 25px 60px rgba(15,23,42,.12)",
        },
      }}
    >
      <Box>

        {children}

      </Box>
    </MotionPaper>
  );
};

export default AuthCard;