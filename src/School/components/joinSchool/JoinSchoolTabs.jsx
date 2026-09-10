import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import JoinTeacherForm from "./JoinTeacherForm";
import JoinStudentForm from "./JoinStudentForm";

const JoinSchoolTabs = ({
  selectedRole,
  setSelectedRole,
}) => {
  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={4}
      >
        <Card
          sx={{
            flex: 1,
            borderRadius: 4,
            border:
              selectedRole === "teacher"
                ? "2px solid"
                : "1px solid",
            borderColor:
              selectedRole === "teacher"
                ? "primary.main"
                : "divider",
            bgcolor:
              selectedRole === "teacher"
                ? "primary.50"
                : "background.paper",
            transition: ".3s",
          }}
        >
          <CardActionArea
            onClick={() => setSelectedRole("teacher")}
          >
            <CardContent>
              <Stack
                alignItems="center"
                spacing={2}
              >
                <PersonRoundedIcon
                  color="primary"
                  sx={{ fontSize: 50 }}
                />

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  Join as Teacher
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  Request access to teach classes and manage
                  quizzes.
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 4,
            border:
              selectedRole === "student"
                ? "2px solid"
                : "1px solid",
            borderColor:
              selectedRole === "student"
                ? "primary.main"
                : "divider",
            bgcolor:
              selectedRole === "student"
                ? "primary.50"
                : "background.paper",
            transition: ".3s",
          }}
        >
          <CardActionArea
            onClick={() => setSelectedRole("student")}
          >
            <CardContent>
              <Stack
                alignItems="center"
                spacing={2}
              >
                <SchoolRoundedIcon
                  color="primary"
                  sx={{ fontSize: 50 }}
                />

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  Join as Student
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  Join your teacher's classes and start your
                  learning journey.
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>

      {selectedRole === "teacher" ? (
        <JoinTeacherForm />
      ) : (
        <JoinStudentForm />
      )}
    </Box>
  );
};

export default JoinSchoolTabs;