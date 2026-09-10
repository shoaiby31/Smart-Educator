import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const TeacherPreviewCard = ({
  teacher,
  sending,
  onInvite,
}) => {
  if (!teacher) return null;

  return (
    <Card
      elevation={0}
      sx={{
        mt: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Stack
          spacing={2}
          alignItems="center"
        >
          <Avatar
            src={teacher.photoURL}
            sx={{
              width: 90,
              height: 90,
            }}
          />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            {teacher.displayName}
          </Typography>

          <Chip
            label={teacher.teacherId}
            color="primary"
          />

          <Divider flexItem />

          <Box width="100%">
            <Typography variant="body2">
              <strong>Email:</strong> {teacher.email}
            </Typography>

            <Typography variant="body2">
              <strong>Role:</strong> {teacher.role}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            disabled={sending}
            onClick={onInvite}
          >
            {sending
              ? "Sending..."
              : "Send Invitation"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TeacherPreviewCard;