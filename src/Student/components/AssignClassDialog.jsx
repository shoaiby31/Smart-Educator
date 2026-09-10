import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const classes = [
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
];

const sections = ["A", "B", "C", "D"];

const AssignClassDialog = ({
  open,
  onClose,
  student,
  onSave,
}) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    if (student) {
      setSelectedClass(student.class || "");
      setSelectedSection(student.section || "");
    }
  }, [student]);

  const handleSave = () => {
    onSave?.(student, {
      class: selectedClass,
      section: selectedSection,
    });

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
        Assign Class
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <Typography variant="subtitle1" fontWeight={600}>
            {student?.name}
          </Typography>

          <Grid container spacing={2}>

            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label="Class"
                value={selectedClass}
                onChange={(e) =>
                  setSelectedClass(e.target.value)
                }
              >
                {classes.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label="Section"
                value={selectedSection}
                onChange={(e) =>
                  setSelectedSection(e.target.value)
                }
              >
                {sections.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    Section {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

          </Grid>

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

export default AssignClassDialog;