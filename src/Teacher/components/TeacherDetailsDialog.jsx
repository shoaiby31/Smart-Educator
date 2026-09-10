import React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const TeacherDetailsDialog = ({
  open,
  onClose,
  teacher,
}) => {
  if (!teacher) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Teacher Details
      </DialogTitle>

      <DialogContent dividers>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="center"
          mb={4}
        >
          <Avatar
            src={teacher.photoURL}
            sx={{
              width: 100,
              height: 100,
              fontSize: 36,
            }}
          >
            {teacher.firstName?.charAt(0)}
          </Avatar>

          <Box>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {teacher.firstName} {teacher.lastName}
            </Typography>

            <Chip
  label={teacher.status}
  color={
    teacher.status === "active"
      ? "success"
      : "default"
  }
  sx={{ mt: 1 }}
/>

          </Box>

        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>

          <Grid size={{ xs: 12, md: 6 }}>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
              }}
            >
              <Stack spacing={2}>

                <Typography
                  fontWeight={700}
                >
                  Contact Information
                </Typography>

                <Stack direction="row" spacing={1}>
                  <EmailRoundedIcon color="primary" />
                  <Typography>
                    {teacher.email}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <PhoneRoundedIcon color="primary" />
                  <Typography>
                    {teacher.phone || "Not Available"}
                  </Typography>
                </Stack>

              </Stack>

            </Paper>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
              }}
            >
              <Stack spacing={2}>

                <Typography
                  fontWeight={700}
                >
                  Teaching Information
                </Typography>

                <Stack direction="row" spacing={1}>
                  <MenuBookRoundedIcon color="primary" />
                  <Typography>
                    {teacher.subject || "Not Assigned"}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <SchoolRoundedIcon color="primary" />
                  <Typography>
                    Not Assigned
                  </Typography>
                </Stack>

              </Stack>

            </Paper>

          </Grid>

        </Grid>

        <Grid
          container
          spacing={2}
          mt={2}
        >

          <Grid size={{ xs: 12, md: 4 }}>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <GroupsRoundedIcon
                color="primary"
                sx={{ fontSize: 40 }}
              />

              <Typography
                variant="h4"
                fontWeight={700}
              >
                180
              </Typography>

              <Typography
                color="text.secondary"
              >
                Students
              </Typography>

            </Paper>

          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <MenuBookRoundedIcon
                color="secondary"
                sx={{ fontSize: 40 }}
              />

              <Typography
                variant="h4"
                fontWeight={700}
              >
                32
              </Typography>

              <Typography
                color="text.secondary"
              >
                Quizzes Created
              </Typography>

            </Paper>

          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CheckCircleRoundedIcon
                color="success"
                sx={{ fontSize: 40 }}
              />

              <Typography
                variant="h4"
                fontWeight={700}
              >
                96%
              </Typography>

              <Typography
                color="text.secondary"
              >
                Attendance
              </Typography>

            </Paper>

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Close
        </Button>

        <Button
          variant="contained"
        >
          Edit Teacher
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default TeacherDetailsDialog;