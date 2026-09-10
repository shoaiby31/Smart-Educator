import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";

import useSchool from "../hooks/useSchool";
import SchoolForm from "../components/SchoolForm";
import SchoolOverviewCard from "../components/SchoolOverviewCard";
import SchoolHeader from "../components/SchoolHeader";
const SchoolProfile = () => {
const {
  school,
  loading,
  saving,
  uploadLogo,
  uploadCover,
  createSchool,
  updateSchool,
} = useSchool();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleSubmit = async (values) => {
    if (school) {
      await updateSchool(values);
    } else {
      await createSchool(values);
    }
  };

  return (
    <Container maxWidth="xl">
<SchoolHeader school={school} />

  <Grid container spacing={3}>
    <Grid size={{ xs: 12, lg: 4 }}>
      <SchoolOverviewCard
        school={school}
        loading={saving}
        uploadLogo={uploadLogo}
        uploadCover={uploadCover}
      />
    </Grid>

    <Grid size={{ xs: 12, lg: 8 }}>
      <SchoolForm
        initialValues={school}
        loading={saving}
        onSubmit={handleSubmit}
      />
    </Grid>
  </Grid>
</Container>
  );
};

export default SchoolProfile;