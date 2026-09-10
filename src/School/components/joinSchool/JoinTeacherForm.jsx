import React, { useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";

import LoadingButton from "../../../Authentication/components/common/LoadingButton";

const JoinTeacherForm = () => {
  const [loading, setLoading] = useState(false);

  const [schoolCode, setSchoolCode] = useState("");

  const [message, setMessage] = useState("");

  const [school, setSchool] = useState(null);

  const [status, setStatus] = useState({
    type: "",
    text: "",
  });

  const handleFindSchool = async () => {
    if (!schoolCode.trim()) {
      setStatus({
        type: "error",
        text: "Please enter a School Code.",
      });
      return;
    }

    try {
      setLoading(true);

      // Firebase lookup will be added later

      // Example Preview
      setSchool({
        schoolName: "Green Valley School",
        schoolType: "Private School",
        principal: "Muhammad Ali",
        city: "Lahore",
      });

      setStatus({
        type: "success",
        text: "School found successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Firebase Join Request logic later

      setStatus({
        type: "success",
        text: "Your join request has been submitted successfully.",
      });

      setSchool(null);
      setSchoolCode("");
      setMessage("");
    } catch (error) {
      setStatus({
        type: "error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>

        <Stack spacing={3}>

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Join as Teacher
          </Typography>

          <Typography color="text.secondary">
            Enter the School Code provided by your school administrator.
          </Typography>

          {status.text && (
            <Alert severity={status.type}>
              {status.text}
            </Alert>
          )}

          <TextField
            fullWidth
            label="School Code"
            value={schoolCode}
            onChange={(e) =>
              setSchoolCode(e.target.value.toUpperCase())
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeRoundedIcon />
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            loading={loading}
            text="Find School"
            loadingText="Searching..."
            onClick={handleFindSchool}
          />

          {school && (
            <>
              <Divider />

              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                }}
              >
                <CardContent>

                  <Stack spacing={2}>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <ApartmentRoundedIcon color="primary" />

                      <Typography
                        variant="h6"
                        fontWeight={700}
                      >
                        {school.schoolName}
                      </Typography>
                    </Box>

                    <Typography>
                      <strong>Type:</strong> {school.schoolType}
                    </Typography>

                    <Typography>
                      <strong>Principal:</strong> {school.principal}
                    </Typography>

                    <Typography>
                      <strong>City:</strong> {school.city}
                    </Typography>

                  </Stack>

                </CardContent>
              </Card>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message (Optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MessageRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <LoadingButton
                loading={loading}
                text="Submit Join Request"
                loadingText="Submitting..."
                onClick={handleSubmit}
              />
            </>
          )}

        </Stack>

      </CardContent>
    </Card>
  );
};

export default JoinTeacherForm;