import React, { useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import { useAuth } from "../../../Authentication";
import LoadingButton from "../../../Authentication/components/common/LoadingButton";
import { validateCreateSchool } from "../../validation/schoolValidation";
import { useSelector } from "react-redux";

const schoolTypes = [
  "Public School",
  "Private School",
  "College",
  "University",
  "Academy",
  "Institute",
  "Coaching Center",
  "Other",
];

const CreateSchoolForm = () => {
  const { user } = useSelector((state) => state.auth);


  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolType: "",
    schoolEmail: "",
    schoolPhone: "",
    address: "",
    description: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   const validationErrors = validateCreateSchool(formData);

if (Object.keys(validationErrors).length > 0) {
  setMessage({
    type: "error",
    text: "Please fix the highlighted fields.",
  });

  console.log(validationErrors);

  return;
}

setLoading(true);

try {

      console.log(formData);

      setMessage({
        type: "success",
        text: "School is ready to be created (Firebase integration pending).",
      });
    } catch (error) {
      setMessage({
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
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>

          <Box>
            <Chip
              icon={<SchoolRoundedIcon />}
              label="School Information"
              color="primary"
            />

            <Typography
              variant="h5"
              fontWeight={700}
              mt={2}
            >
              Create a New School
            </Typography>

            <Typography
              color="text.secondary"
            >
              Fill in your school's details to get started.
            </Typography>
          </Box>

          <Divider />

          {message.text && (
            <Alert severity={message.type}>
              {message.text}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="School Name"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <ApartmentRoundedIcon
                        sx={{ mr: 1, color: "action.active" }}
                      />
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  select
                  label="School Type"
                  name="schoolType"
                  value={formData.schoolType}
                  onChange={handleChange}
                >
                  {schoolTypes.map((type) => (
                    <MenuItem
                      key={type}
                      value={type}
                    >
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Principal"
                  value={user?.displayName || ""}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <PersonRoundedIcon
                        sx={{ mr: 1 }}
                      />
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="School Email"
                  name="schoolEmail"
                  value={formData.schoolEmail}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <EmailRoundedIcon
                        sx={{ mr: 1 }}
                      />
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="School Phone"
                  name="schoolPhone"
                  value={formData.schoolPhone}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <PhoneRoundedIcon
                        sx={{ mr: 1 }}
                      />
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="School Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <LocationOnRoundedIcon
                        sx={{ mr: 1 }}
                      />
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="School Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <DescriptionRoundedIcon
                        sx={{
                          mr: 1,
                          mt: 1,
                          alignSelf: "flex-start",
                        }}
                      />
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  disabled
                  label="School ID"
                  placeholder="Will be generated automatically"
                  InputProps={{
                    startAdornment: (
                      <BadgeRoundedIcon
                        sx={{ mr: 1 }}
                      />
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <LoadingButton
                  type="submit"
                  loading={loading}
                  text="Create School"
                  loadingText="Creating School..."
                />
              </Grid>

            </Grid>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CreateSchoolForm;