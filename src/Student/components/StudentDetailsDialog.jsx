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
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";

const StudentDetailsDialog = ({
  open,
  onClose,
  student,
}) => {
  if (!student) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Student Details
      </DialogTitle>

      <DialogContent dividers>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="center"
          mb={4}
        >
          <Avatar
            src={student.photoURL}
            sx={{
              width: 100,
              height: 100,
              fontSize: 36,
            }}
          >
            {student.name?.charAt(0)}
          </Avatar>

          <Box>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {student.name}
            </Typography>

            <Chip
              color="success"
              label={student.status}
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
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack spacing={2}>

                <Typography fontWeight={700}>
                  Personal Information
                </Typography>

                <Stack direction="row" spacing={1}>
                  <EmailRoundedIcon color="primary" />
                  <Typography>
                    {student.email}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <BadgeRoundedIcon color="primary" />
                  <Typography>
                    Admission No: {student.admissionNumber}
                  </Typography>
                </Stack>

              </Stack>

            </Paper>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack spacing={2}>

                <Typography fontWeight={700}>
                  Academic Information
                </Typography>

                <Stack direction="row" spacing={1}>
                  <SchoolRoundedIcon color="primary" />
                  <Typography>
                    {student.class} - {student.section}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <PersonRoundedIcon color="primary" />
                  <Typography>
                    Class Teacher: Ahmed Khan
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
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CheckCircleRoundedIcon
                color="success"
                sx={{ fontSize: 42 }}
              />

              <Typography
                variant="h4"
                fontWeight={700}
              >
                96%
              </Typography>

              <Typography color="text.secondary">
                Attendance
              </Typography>

            </Paper>

          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <AssignmentTurnedInRoundedIcon
                color="primary"
                sx={{ fontSize: 42 }}
              />

              <Typography
                variant="h4"
                fontWeight={700}
              >
                24 / 25
              </Typography>

              <Typography color="text.secondary">
                Assignments
              </Typography>

            </Paper>

          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <SchoolRoundedIcon
                color="secondary"
                sx={{ fontSize: 42 }}
              />

              <Typography
                variant="h4"
                fontWeight={700}
              >
                88%
              </Typography>

              <Typography color="text.secondary">
                Quiz Average
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
          Edit Student
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default StudentDetailsDialog;