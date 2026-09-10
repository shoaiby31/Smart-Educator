import React, { useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const students = [
  {
    uid: "student1",
    name: "Ali Hassan",
    admissionNumber: "SE-2026-001",
  },
  {
    uid: "student2",
    name: "Ahmed Raza",
    admissionNumber: "SE-2026-002",
  },
  {
    uid: "student3",
    name: "Sara Khan",
    admissionNumber: "SE-2026-003",
  },
  {
    uid: "student4",
    name: "Fatima Noor",
    admissionNumber: "SE-2026-004",
  },
];

const AssignStudentsDialog = ({
  open,
  onClose,
  classItem,
  onSave,
}) => {
  const [search, setSearch] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const value =
        `${student.name} ${student.admissionNumber}`.toLowerCase();

      return value.includes(search.toLowerCase());
    });
  }, [search]);

  const handleToggle = (uid) => {
    setSelectedStudents((prev) =>
      prev.includes(uid)
        ? prev.filter((id) => id !== uid)
        : [...prev, uid]
    );
  };

  const handleSave = () => {
    onSave?.(classItem, selectedStudents);
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
        Assign Students
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} mt={1}>

          <Typography
            variant="subtitle1"
            fontWeight={600}
          >
            {classItem?.name}
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Search Student"
            placeholder="Name or Admission Number"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <Divider />

          <List>

            {filteredStudents.map((student) => (
              <ListItem
                key={student.uid}
                secondaryAction={
                  <Checkbox
                    checked={selectedStudents.includes(
                      student.uid
                    )}
                    onChange={() =>
                      handleToggle(student.uid)
                    }
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    {student.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={student.name}
                  secondary={student.admissionNumber}
                />
              </ListItem>
            ))}

          </List>

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
          Assign Selected
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default AssignStudentsDialog;