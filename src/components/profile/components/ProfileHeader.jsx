import React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
const MotionBox = motion.create(Box);
const ProfileHeader = ({
  mode = "complete",
}) => {
  const isEdit = mode === "edit";

  return (
    <MotionBox initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} >
        <Card sx={{ borderRadius: 4, background: "linear-gradient(to top left,hsl(315,93.8%,44.3%),rgb(104,70,253))", color: "white", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,.12)", }} >
          <CardContent sx={{ py: 5 }}>

            <Typography variant="h5" fontWeight={700} mb={2} >
              {isEdit
                ? "My Profile"
                : "Complete Your Profile"}
            </Typography>

            <Typography sx={{ maxWidth: "750px", mx: "auto", opacity: 0.95, }} >
              {isEdit
                ? "Review and update your personal information, profile photo, and account details to keep your SmartEducator profile accurate, complete, and up to date."
                : "Complete your profile by adding your personal and role-specific information. A complete profile helps personalize your SmartEducator experience and ensures you can access the features and services available for your account."}
            </Typography>
          </CardContent>
        </Card>
      </MotionBox>
  );
};

export default ProfileHeader;