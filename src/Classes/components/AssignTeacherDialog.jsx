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

const teachers = [
  {
    uid: "teacher1",
    name: "Ahmed Khan",
  },
  {
    uid: "teacher2",
    name: "Fatima Noor",
  },
  {
    uid: "teacher3",
    name: "Ali Raza",
  },
];

const AssignTeacherDialog = ({
  open,
  onClose,
  classItem,
  onSave,
}) => {
  const [teacherUid, setTeacherUid] = useState("");

  useEffect(() => {
    if (classItem) {
      setTeacherUid(classItem.teacherUid || "");
    }
  }, [classItem]);

  const handleSave = () => {
    onSave?.(classItem, teacherUid);
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
        Assign Class Teacher
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
          >
            {classItem?.name}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label="Select Teacher"
                value={teacherUid}
                onChange={(e) =>
                  setTeacherUid(e.target.value)
                }
              >
                <MenuItem value="">
                  None
                </MenuItem>

                {teachers.map((teacher) => (
                  <MenuItem
                    key={teacher.uid}
                    value={teacher.uid}
                  >
                    {teacher.name}
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

export default AssignTeacherDialog;