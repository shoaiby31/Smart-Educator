import {
  Button,
  Stack,
  TextField,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const TeacherSearchForm = ({
  teacherId,
  setTeacherId,
  searching,
  onSearch,
}) => {
  return (
    <Stack spacing={2}>
      <TextField
        fullWidth
        label="Teacher ID"
        placeholder="SE-TCH-000245"
        value={teacherId}
        onChange={(e) => setTeacherId(e.target.value.toUpperCase())}
      />

      <Button
        variant="contained"
        startIcon={<SearchRoundedIcon />}
        disabled={!teacherId.trim() || searching}
        onClick={onSearch}
      >
        {searching ? "Searching..." : "Search Teacher"}
      </Button>
    </Stack>
  );
};

export default TeacherSearchForm;