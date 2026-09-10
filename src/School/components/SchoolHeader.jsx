import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const SchoolHeader = ({ school }) => {
  return (
    <Box mb={4}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        flexWrap="wrap"
        spacing={2}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            School Profile
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Manage your school's information, branding and contact details.
          </Typography>
        </Box>

        <Chip
          color={
            school?.status === "active"
              ? "success"
              : "default"
          }
          icon={<SchoolRoundedIcon />}
          label={
            school?.status === "active"
              ? "Active"
              : "Not Configured"
          }
        />
      </Stack>
    </Box>
  );
};

export default SchoolHeader;