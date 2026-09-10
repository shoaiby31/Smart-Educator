import React from "react";

import {
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const StudentProfileForm = ({
  values,
  errors = {},
  onChange,
}) => {
  return (
    <Stack spacing={4}>
      {/* Personal Information */}
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={700} >Personal Information</Typography>

        <Grid container spacing={3}>
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

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Admission Number" size='small' name="admissionNo" value={values.admissionNo} onChange={onChange} error={Boolean(errors.admissionNo)} helperText={errors.admissionNo} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth required type="date" label="Date of Birth" size='small' name="dateOfBirth" value={values.dateOfBirth} onChange={onChange} error={Boolean(errors.dateOfBirth)} helperText={errors.dateOfBirth} InputLabelProps={{shrink: true,}}/>
          </Grid>
        </Grid>
      </Stack>

      {/* Guardian Information */}
      <Stack spacing={3}>
        <Typography fontWeight={700} variant="h6" >Guardian Information</Typography>

        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField fullWidth required label="Guardian Name" size='small' name="guardian" value={values.guardian} onChange={onChange} error={Boolean(errors.guardian)} helperText={errors.guardian} />
          </Grid>

          <Grid size={12}>
            <TextField fullWidth required multiline minRows={3} label="Home Address" name="address" value={values.address} onChange={onChange} error={Boolean(errors.address)} helperText={errors.address} />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default StudentProfileForm;