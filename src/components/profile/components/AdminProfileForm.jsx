import React from "react";

import {
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const AdminProfileForm = ({
  values,
  errors = {},
  onChange,
}) => {
  return (
    <Stack spacing={5}>
      {/* Personal Information */}

      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={700}>
          Personal Information
        </Typography>

        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField fullWidth required label="Full Name" size='small' name="fullName" value={values.fullName} onChange={onChange} error={Boolean(errors.fullName)} helperText={errors.fullName} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth required label="Phone Number" size='small' name="phone" value={values.phone} onChange={onChange} error={Boolean(errors.phone)} helperText={errors.phone} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField select fullWidth required label="Gender" size='small' name="gender" value={values.gender} onChange={onChange} error={Boolean(errors.gender)} helperText={errors.gender} >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Stack>

      {/* School Information */}

      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={700}>School Information</Typography>

        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField fullWidth required label="Institute Name" size='small' name="instituteName" value={values.instituteName} onChange={onChange} error={Boolean(errors.instituteName)} helperText={errors.instituteName} />
          </Grid>

          <Grid size={12}>
            <TextField fullWidth required label="School Code" size='small' name="schoolCode" value={values.schoolCode} onChange={onChange} error={Boolean(errors.schoolCode)} helperText={ errors.schoolCode || "Teachers and students will use this code to send join requests." } />
          </Grid>

          

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Website (Optional)" size='small' name="website" value={values.website} onChange={onChange} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth type="number" label="Established Year (Optional)" size='small' name="establishedYear" value={values.establishedYear} onChange={onChange} />
          </Grid>

          <Grid size={12}>
            <TextField fullWidth multiline minRows={3} label="Institute Address" size='small' name="instituteAddress" value={values.instituteAddress} onChange={onChange} error={Boolean(errors.instituteAddress)} helperText={errors.instituteAddress} />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default AdminProfileForm;