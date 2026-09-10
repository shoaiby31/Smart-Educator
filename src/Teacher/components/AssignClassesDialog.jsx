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

const allClasses = [
  "Grade 6 - A",
  "Grade 6 - B",
  "Grade 7 - A",
  "Grade 7 - B",
  "Grade 8 - A",
  "Grade 8 - B",
  "Grade 9 - A",
  "Grade 9 - B",
  "Grade 10 - A",
  "Grade 10 - B",
];

const AssignClassesDialog = ({
  open,
  onClose,
  teacher,
  onSave,
}) => {
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    if (teacher?.classes) {
      setSelectedClasses(teacher.classes);
    } else {
      setSelectedClasses([]);
    }
  }, [teacher]);

  const handleSave = () => {
    onSave?.(teacher, selectedClasses);
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
        Assign Classes
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <Box>
            <Typography
              variant="subtitle2"
              gutterBottom
            >
              Teacher
            </Typography>

            <Typography fontWeight={600}>
              {teacher?.name}
            </Typography>
          </Box>

          <Autocomplete
            multiple
            options={allClasses}
            value={selectedClasses}
            onChange={(event, value) =>
              setSelectedClasses(value)
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  color="primary"
                  variant="outlined"
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Classes"
                placeholder="Select Classes"
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

export default AssignClassesDialog;