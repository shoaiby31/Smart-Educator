import React from "react";
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
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

import CreateSchoolForm from "../components/createSchool/CreateSchoolForm";

import schoolIllustration from "../../assets/CreateSchool.svg";

const features = [
  {
    icon: <GroupsRoundedIcon color="primary" />,
    title: "Manage Teachers & Students",
    description:
      "Invite teachers and students to your school with a secure School ID.",
  },
  {
    icon: <QuizRoundedIcon color="primary" />,
    title: "Digital Assessments",
    description:
      "Create public and private quizzes with live progress tracking.",
  },
  {
    icon: <ChatRoundedIcon color="primary" />,
    title: "Class Communication",
    description:
      "Enable announcements and group conversations between teachers and students.",
  },
  {
    icon: <AutoStoriesRoundedIcon color="primary" />,
    title: "Homework & Daily Diary",
    description:
      "Share homework, notes, and daily classroom activities digitally.",
  },
];

const CreateSchool = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={5} alignItems="center">
        {/* Left Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Chip
              label="School Administration"
              color="primary"
              sx={{ width: "fit-content" }}
            />

            <Typography
              variant="h3"
              fontWeight={700}
            >
              Create Your School
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              lineHeight={1.8}
            >
              SmartEducator helps principals and administrators build a
              complete digital learning environment. Create your school,
              invite teachers, enroll students, assign classes, conduct
              quizzes, and manage academic activities from one secure
              platform.
            </Typography>

            <Box
              component="img"
              src={schoolIllustration}
              alt="Create School"
              sx={{
                width: "100%",
                maxWidth: 500,
                mx: "auto",
              }}
            />
          </Stack>
        </Grid>

        {/* Right Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CreateSchoolForm />
        </Grid>
      </Grid>

      <Box mt={8}>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          mb={4}
        >
          Everything You Need to Manage Your School
        </Typography>

        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid
              key={feature.title}
              size={{ xs: 12, sm: 6, md: 3 }}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box>{feature.icon}</Box>

                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {feature.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        mt={8}
        sx={{
          p: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
          color: "#fff",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight={700}>
            Why SmartEducator?
          </Typography>

          <Typography lineHeight={1.8}>
            SmartEducator is more than a school management system. It is a
            collaborative learning platform where administrators, teachers,
            students, and parents can stay connected. From attendance and
            classroom communication to quizzes, homework, reports, and
            performance analytics, everything is organized in one place to
            make education smarter, faster, and more engaging.
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default CreateSchool;