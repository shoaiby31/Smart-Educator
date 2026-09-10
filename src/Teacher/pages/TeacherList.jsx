import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import useTeachers from "../hooks/useTeachers";
import TeacherTable from "../components/TeacherTable";
const TeacherList = () => {
  const {
    teachers,
    loading,
    error,
  } = useTeachers();

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

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Teachers
          </Typography>

          <Typography color="text.secondary">
            Manage your school's teachers.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
        >
          Invite Teacher
        </Button>
      </Stack>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      {teachers.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6">
            No teachers found
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            Start by adding your first teacher.
          </Typography>
        </Paper>
      ) : (
     <TeacherTable teachers={teachers} />
      )}
    </Box>
  );
};

export default TeacherList;