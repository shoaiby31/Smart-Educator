import { useState } from "react";

import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";

import TeacherSearchForm from "./TeacherSearchForm";
import TeacherPreviewCard from "./TeacherPreviewCard";

import useTeachers from "../hooks/useTeachers";

const InviteTeacherDialog = ({
  open,
  onClose,
}) => {
  const {
    searchTeacher,
    inviteTeacher,
  } = useTeachers();

  const [teacherId, setTeacherId] = useState("");

  const [teacher, setTeacher] = useState(null);

  const [searching, setSearching] = useState(false);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSearch = async () => {
  if (!teacherId.trim()) {
    setError("Please enter a Teacher ID.");
    return;
  }

  setSearching(true);

  setTeacher(null);
  setError("");
  setSuccess("");

  const result = await searchTeacher(teacherId.trim());

  if (!result.success) {
    setError(result.message);
  } else {
    setTeacher(result.data);
  }

  setSearching(false);
};

 const handleInvite = async () => {
  if (!teacher) return;

  setSending(true);

  const result = await inviteTeacher(teacher.uid);

  if (!result.success) {
    setError(result.message);
  } else {
    setSuccess("Invitation sent successfully.");
    handleClose();
  }

  setSending(false);
};

  const handleClose = () => {
  setTeacher(null);
  setTeacherId("");
  setError("");
  setSuccess("");

  onClose();
};

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Invite Teacher
        </DialogTitle>

        <DialogContent>
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          <TeacherSearchForm
            teacherId={teacherId}
            setTeacherId={setTeacherId}
            searching={searching}
            onSearch={handleSearch}
          />

          <TeacherPreviewCard
            teacher={teacher}
            sending={sending}
            onInvite={handleInvite}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
        message={success}
      />
    </>
  );
};

export default InviteTeacherDialog;