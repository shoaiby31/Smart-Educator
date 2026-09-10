import React from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { MoreVertRounded } from "@mui/icons-material";

const StatCard = ({
  title,
  value,
  icon,
  color,
  bg,
  subtitle
}) => {
  return (
    <Paper elevation={0}
      sx={{
        p: 2.5, borderRadius: 4, border: "1px solid #ECECEC", display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        boxShadow: "0  0px rgba(15,23,42,.05)",
      }}>
      <Stack direction="row" spacing={2}>
        <Avatar sx={{
          width: { xs: 62, md: 42, lg: 52, xl: 62 }, height: { xs: 62, md: 42, lg: 52, xl: 62 }, bgcolor: bg, color: color,
          "& svg": { fontSize: 30, },
        }}>{icon}</Avatar>

        <Box>
          <Typography sx={{ fontSize: 13, color: "#6B7280", }} >{title}</Typography>
          <Typography sx={{ mt: .3, fontWeight: 700, fontSize: 38, lineHeight: 1, color: "#111827", }} >{value}</Typography>
          <Typography sx={{ mt: 1, fontSize: 13, color: "#16A34A", }}>{subtitle}</Typography>
        </Box>
      </Stack>

      <IconButton size="small" >
        <MoreVertRounded sx={{ color: "#6B7280", }} />
      </IconButton>
    </Paper>






  );
};

export default StatCard;