import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import JoinSchoolTabs from "../components/joinSchool/JoinSchoolTabs";

import joinIllustration from "../../assets/JoinSchool.svg";

const JoinSchool = () => {
  const [selectedRole, setSelectedRole] = useState("teacher");

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={5} alignItems="center">
        {/* Left Side */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Chip
              icon={<SchoolRoundedIcon />}
              label="Join an Existing School"
              color="primary"
              sx={{ width: "fit-content" }}
            />

            <Typography
              variant="h3"
              fontWeight={700}
            >
              Become Part of Your School
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              lineHeight={1.8}
            >
              Join your school securely using the School Code provided
              by your administrator. Whether you're a teacher or a
              student, SmartEducator connects you with your classrooms,
              assignments, quizzes, announcements, and much more.
            </Typography>

            <Box
              component="img"
              src={joinIllustration}
              alt="Join School"
              sx={{
                width: "100%",
                maxWidth: 500,
                mx: "auto",
              }}
            />
          </Stack>
        </Grid>

        {/* Right Side */}
        <Grid size={{ xs: 12, md: 6 }}>
          <JoinSchoolTabs
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />
        </Grid>
      </Grid>

      <Box mt={8}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={4}
        >
          Why Join Through SmartEducator?
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <SchoolRoundedIcon
                    color="primary"
                    fontSize="large"
                  />

                  <Typography variant="h6" fontWeight={600}>
                    One School Platform
                  </Typography>

                  <Typography color="text.secondary">
                    Access your school's resources, announcements,
                    classes, and academic activities from one place.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <PersonRoundedIcon
                    color="primary"
                    fontSize="large"
                  />

                  <Typography variant="h6" fontWeight={600}>
                    Teacher Workspace
                  </Typography>

                  <Typography color="text.secondary">
                    Create quizzes, manage classes, assign homework,
                    communicate with students, and monitor performance.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <GroupsRoundedIcon
                    color="primary"
                    fontSize="large"
                  />

                  <Typography variant="h6" fontWeight={600}>
                    Student Learning
                  </Typography>

                  <Typography color="text.secondary">
                    Join classes, attempt quizzes, receive homework,
                    participate in discussions, and track your progress.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default JoinSchool;