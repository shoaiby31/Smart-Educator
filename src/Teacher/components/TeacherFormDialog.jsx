import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import { useSelector } from "react-redux";

import {
  createTeacher,
  updateTeacher,
} from "../services/teacherService";
import AppSnackbar from "../../components/common/AppSnackbar";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  qualification: "",
  experience: "",
  subject: "",
  joiningDate: "",
};
const TeacherFormDialog = ({
  open,
  onClose,
  teacher = null,
}) => {
  const { schoolUid } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(initialValues);

  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

  useEffect(() => {
    if (teacher) {
      setFormData({
        firstName: teacher.firstName || "",
        lastName: teacher.lastName || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        gender: teacher.gender || "",
        qualification: teacher.qualification || "",
        experience: teacher.experience || "",
        subject: teacher.subject || "",
        joiningDate: teacher.joiningDate || "",
      });
    } else {
      setFormData(initialValues);
    }
  }, [teacher]);
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async () => {
    if (
  !formData.firstName ||
  !formData.lastName ||
  !formData.email
) {
  alert("Please fill all required fields.");
  return;
}
  try {
    setSaving(true);

    if (teacher) {
      await updateTeacher(
        schoolUid,
        teacher.uid,
        formData
      );
    } else {
      await createTeacher(
        schoolUid,
        formData
      );
    }


    setSnackbar({
  open: true,
  message: teacher
    ? "Teacher updated successfully."
    : "Teacher added successfully.",
  severity: "success",
});

onClose();
    setFormData(initialValues);
  } catch (error) {
    console.error(error);

setSnackbar({
  open: true,
  message: error.message,
  severity: "error",
});
  } finally {
    setSaving(false);
  }
};
return (
    <>
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="md"
  >
    <DialogTitle>
      {teacher ? "Edit Teacher" : "Add Teacher"}
    </DialogTitle>

    <DialogContent dividers>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g. 5 Years"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            type="date"
            label="Joining Date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </DialogContent>

    <DialogActions>
      <Button onClick={onClose}>
        Cancel
      </Button>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={saving}
      >
        {saving
          ? "Saving..."
          : teacher
          ? "Update Teacher"
          : "Add Teacher"}
      </Button>
    </DialogActions>
  </Dialog>
  <AppSnackbar
  open={snackbar.open}
  message={snackbar.message}
  severity={snackbar.severity}
  onClose={() =>
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }))
  }
/>
</>
);
}
export default TeacherFormDialog;