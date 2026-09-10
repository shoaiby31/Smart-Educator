import {
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import SchoolLogoUploader from "./SchoolLogoUploader";
import SchoolCoverUploader from "./SchoolCoverUploader";
const SchoolProfileCard = ({
  school,
  loading,
  uploadLogo,
  uploadCover,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
        <SchoolCoverUploader
  coverUrl={school?.coverPhotoUrl}
  onUpload={uploadCover}
  loading={loading}
/>
      <SchoolLogoUploader
        logoUrl={school?.logoUrl}
        onUpload={uploadLogo}
        loading={loading}
      />

      <Stack
        spacing={1}
        mt={3}
        alignItems="center"
      >
        <Typography
          variant="h5"
          fontWeight={700}
          align="center"
        >
          {school?.instituteName || "School Name"}
        </Typography>

        <Typography
          color="text.secondary"
          align="center"
        >
          {school?.city || "City"},{" "}
          {school?.country || "Country"}
        </Typography>

        <Chip
          label={school?.status || "Not Configured"}
          color={
            school?.status === "active"
              ? "success"
              : "default"
          }
        />

        {school?.phone && (
          <Typography variant="body2">
            📞 {school.phone}
          </Typography>
        )}

        {school?.email && (
          <Typography variant="body2">
            ✉️ {school.email}
          </Typography>
        )}

        {school?.website && (
          <Typography variant="body2">
            🌐 {school.website}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default SchoolProfileCard;