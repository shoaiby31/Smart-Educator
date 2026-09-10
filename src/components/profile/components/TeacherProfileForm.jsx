import React from "react";

import {
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const TeacherProfileForm = ({
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
            <TextField fullWidth required label="Full Name" size="small" name="fullName" value={values.fullName} onChange={onChange} error={Boolean(errors.fullName)} helperText={errors.fullName} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth required label="Phone Number" size="small" name="phone" value={values.phone} onChange={onChange} error={Boolean(errors.phone)} helperText={errors.phone} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField select fullWidth required label="Gender" size="small" name="gender" value={values.gender} onChange={onChange} error={Boolean(errors.gender)} helperText={errors.gender} >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Stack>

      {/* Professional Information */}
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={700} >Professional Information</Typography>

        <Grid container spacing={3}>

          {/* Teacher Code */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth required label="Teacher Code" size="small" name="teacherCode" value={values.teacherCode} onChange={onChange} error={Boolean(errors.teacherCode)} helperText={ errors.teacherCode || "Students can use this code to find and join you." } placeholder="e.g. TCH2026" inputProps={{ style: { textTransform: "uppercase", }, }} />
            </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Designation" size="small" name="designation" value={values.designation} onChange={onChange} placeholder="e.g. Senior Mathematics Teacher" error={Boolean(errors.designation)} helperText={errors.designation} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth required label="Qualification" size="small" name="qualification" value={values.qualification} onChange={onChange} error={Boolean(errors.qualification)} helperText={errors.qualification} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth type="number" label="Experience (Years)" size="small" name="experience" value={values.experience} onChange={onChange} error={Boolean(errors.experience)} helperText={errors.experience} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth required label="Specialization" size="small" name="specialization" value={values.specialization} onChange={onChange} error={Boolean(errors.specialization)} helperText={errors.specialization} placeholder="Computer Science" />
          </Grid>

          {/* Portfolio Link */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Portfolio Link (Optional)" size="small" name="portfolioLink" value={values.portfolioLink} onChange={onChange} error={Boolean(errors.portfolioLink)} helperText={ errors.portfolioLink || "Optional link to your professional portfolio." } placeholder="https://example.com/your-portfolio" type="url" />
          </Grid>

          <Grid size={12}>
            <TextField fullWidth multiline minRows={4} label="Professional Bio (Optional)" size="small" name="bio" value={values.bio} onChange={onChange} placeholder="Write a short introduction about yourself..." />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default TeacherProfileForm;