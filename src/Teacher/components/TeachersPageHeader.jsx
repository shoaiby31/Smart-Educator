import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  PersonRounded,
  PersonAddAltRounded,
  MailOutlineRounded,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import InviteTeacherDialog from "./InviteTeacherDialog";

const TeachersPageHeader = ({ isAdmin }) => {
  const navigate = useNavigate();

  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#2563EB 0%,#4F46E5 100%)",
          color: "#fff",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={3}
        >
          {/* Left Side */}

          <Box>
            <Chip
              icon={
                <PersonRounded
                  sx={{
                    color: "#fff !important",
                  }}
                />
              }
              label="Teacher Management"
              sx={{
                mb: 2,
                bgcolor: "rgba(255,255,255,.15)",
                color: "#fff",
              }}
            />

            <Typography
              variant="h4"
              fontWeight={700}
            >
              Faculty Members
            </Typography>

            <Typography
              sx={{
                mt: 1,
                opacity: 0.9,
                maxWidth: 650,
              }}
            >
              Manage teachers, assign subjects, allocate classes,
              monitor activities, and invite new faculty members to
              join your school.
            </Typography>
          </Box>

          {/* Right Side */}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
          >
            <Button
              variant="outlined"
              startIcon={<MailOutlineRounded />}
              onClick={() =>
                navigate("/dashboard/admin/teacher-requests")
              }
              sx={{
                borderColor: "#fff",
                color: "#fff",
                px: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,

                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,.12)",
                },
              }}
            >
              Teacher Requests
            </Button>

            {isAdmin && (
              <Button
                variant="contained"
                startIcon={<PersonAddAltRounded />}
                onClick={() => setInviteOpen(true)}
                sx={{
                  bgcolor: "#fff",
                  color: "primary.main",
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,

                  "&:hover": {
                    bgcolor: "#F4F4F4",
                  },
                }}
              >
                Invite Teacher
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>

      <InviteTeacherDialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
};

export default TeachersPageHeader;