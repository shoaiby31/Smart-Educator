import React, {
  useEffect,
  useState,
} from "react";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useSelector } from "react-redux";

import {
  createAcademicSession,
  updateAcademicSession,
} from "../../services/academicSessionService";

const AcademicSessionDialog = ({
  open,
  onClose,
  session = null,
  refreshSessions,
}) => {
  const { user } = useSelector(
    (state) => state.auth
  );

  const schoolId = user?.schoolId;

  const isEditMode = Boolean(session);

  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ==========================================================================
     Format Firestore Date For Input
     ========================================================================== */

  const formatDateForInput = (date) => {
    if (!date) {
      return "";
    }

    try {
      const value = date?.toDate
        ? date.toDate()
        : new Date(date);

      if (Number.isNaN(value.getTime())) {
        return "";
      }

      const year = value.getFullYear();

      const month = String(
        value.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        value.getDate()
      ).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };

  /* ==========================================================================
     Populate Form
     ========================================================================== */

  useEffect(() => {
    if (!open) {
      return;
    }

    if (session) {
      setFormData({
        name: session.name || "",

        startDate: formatDateForInput(
          session.startDate
        ),

        endDate: formatDateForInput(
          session.endDate
        ),
      });
    } else {
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
      });
    }

    setError("");
  }, [open, session]);

  /* ==========================================================================
     Handle Input Change
     ========================================================================== */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* ==========================================================================
     Submit
     ========================================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!schoolId) {
      setError(
        "School information is missing."
      );

      return;
    }

    const name =
      formData.name.trim();

    if (!name) {
      setError(
        "Please enter an academic session name."
      );

      return;
    }

    if (!formData.startDate) {
      setError(
        "Please select a start date."
      );

      return;
    }

    if (!formData.endDate) {
      setError(
        "Please select an end date."
      );

      return;
    }

    if (
      formData.endDate <
      formData.startDate
    ) {
      setError(
        "End date cannot be before the start date."
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      if (isEditMode) {
        await updateAcademicSession({
          sessionId:
            session.sessionId,

          name,

          startDate:
            formData.startDate,

          endDate:
            formData.endDate,
        });
      } else {
        await createAcademicSession({
          schoolId,

          name,

          startDate:
            formData.startDate,

          endDate:
            formData.endDate,
        });
      }

      await refreshSessions();

      onClose();
    } catch (error) {
      console.error(
        "Failed to save academic session:",
        error
      );

      setError(
        error?.message ||
          "Failed to save academic session."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================================
     Close Dialog
     ========================================================================== */

  const handleClose = () => {
    if (loading) {
      return;
    }

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 3,
          pt: 3,
          pb: 1.5,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={0.4}>
            <Typography
              variant="h6"
              fontWeight={800}
              color="#111827"
            >
              {isEditMode
                ? "Edit Academic Session"
                : "Create Academic Session"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {isEditMode
                ? "Update the academic session dates and name."
                : "Create a new academic year for your school."}
            </Typography>
          </Stack>

          <Button
            onClick={handleClose}
            disabled={loading}
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: 2,
              color: "#64748B",
            }}
          >
            <CloseRoundedIcon />
          </Button>
        </Stack>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Stack
          spacing={2.25}
          sx={{
            mt: 1,
          }}
        >
          <TextField
            label="Session Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. 2026-2027"
            fullWidth
            required
            disabled={loading}
          />

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
          >
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={
                formData.startDate
              }
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={
                formData.endDate
              }
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Stack>

          {error && (
            <Typography
              variant="body2"
              sx={{
                color: "#DC2626",
                bgcolor: "#FEF2F2",
                border:
                  "1px solid #FECACA",
                borderRadius: 2,
                px: 1.5,
                py: 1.25,
              }}
            >
              {error}
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 1,
          gap: 1,
        }}
      >
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            color: "#475569",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            minWidth: 140,
            minHeight: 42,
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          {loading ? (
            <CircularProgress
              size={22}
              color="inherit"
            />
          ) : isEditMode ? (
            "Save Changes"
          ) : (
            "Create Session"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AcademicSessionDialog;