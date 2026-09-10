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

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const ClassDetailsDialog = ({
  open,
  onClose,
  classItem,
}) => {
  if (!classItem) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Class Details
      </DialogTitle>

      <DialogContent dividers>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="center"
          mb={4}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "primary.main",
            }}
          >
            <SchoolRoundedIcon sx={{ fontSize: 42 }} />
          </Avatar>

          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              {classItem.name}
            </Typography>

            <Typography color="text.secondary">
              Grade {classItem.grade} • Section {classItem.section}
            </Typography>

            <Chip
              sx={{ mt: 1 }}
              color={
                classItem.status === "Active"
                  ? "success"
                  : "warning"
              }
              label={classItem.status}
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
                  Class Information
                </Typography>

                <Stack direction="row" spacing={1}>
                  <SchoolRoundedIcon color="primary" />
                  <Typography>
                    {classItem.name}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <CalendarMonthRoundedIcon color="primary" />
                  <Typography>
                    Academic Year: 2026-2027
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
                  Teacher
                </Typography>

                <Stack direction="row" spacing={1}>
                  <PersonRoundedIcon color="primary" />
                  <Typography>
                    {classItem.teacher}
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
              <GroupsRoundedIcon
                color="success"
                sx={{ fontSize: 40 }}
              />

              <Typography
                variant="h4"
                fontWeight={700}
                mt={1}
              >
                {classItem.students}
              </Typography>

              <Typography color="text.secondary">
                Students
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
              <MenuBookRoundedIcon
                color="primary"
                sx={{ fontSize: 40 }}
              />

              <Typography
                variant="h4"
                fontWeight={700}
                mt={1}
              >
                8
              </Typography>

              <Typography color="text.secondary">
                Subjects
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
                color="warning"
                sx={{ fontSize: 40 }}
              />

              <Typography
                variant="h4"
                fontWeight={700}
                mt={1}
              >
                {classItem.capacity}
              </Typography>

              <Typography color="text.secondary">
                Capacity
              </Typography>
            </Paper>
          </Grid>
        </Grid>

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>

        <Button variant="contained">
          Edit Class
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassDetailsDialog;