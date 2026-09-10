import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const allSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "Urdu",
  "Islamiyat",
  "Pakistan Studies",
];

const AssignSubjectsDialog = ({
  open,
  onClose,
  teacher,
  onSave,
}) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (teacher?.subjects) {
      setSubjects(teacher.subjects);
    } else {
      setSubjects([]);
    }
  }, [teacher]);

  const handleSave = () => {
    onSave?.(teacher, subjects);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Assign Subjects
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <Box>

            <Typography
              variant="subtitle2"
              mb={1}
            >
              Teacher
            </Typography>

            <Typography fontWeight={600}>
              {teacher?.name}
            </Typography>

          </Box>

          <Autocomplete
            multiple
            options={allSubjects}
            value={subjects}
            onChange={(event, newValue) =>
              setSubjects(newValue)
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                  color="primary"
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Subjects"
                placeholder="Select Subjects"
              />
            )}
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save Changes
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default AssignSubjectsDialog;