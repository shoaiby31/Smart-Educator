import React from "react";

import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const AcademicSessionTable = ({
  sessions = [],
  onView,
  onEdit,
  onActivate,
  onComplete,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";

      case "completed":
        return "default";

      case "upcoming":
        return "warning";

      default:
        return "default";
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    try {
      const value = date?.toDate
        ? date.toDate()
        : new Date(date);

      if (Number.isNaN(value.getTime())) {
        return "-";
      }

      return value.toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "-";
    }
  };

  if (sessions.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "#E9EDF5",
          p: 5,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          color="#111827"
        >
          No Academic Sessions
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.75 }}
        >
          No academic sessions have been
          created yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "#E9EDF5",
        overflow: "hidden",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          px: 3,
          py: 2.25,
          borderBottom: "1px solid",
          borderColor: "#E9EDF5",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={800}
          color="#111827"
        >
          Academic Sessions
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.4 }}
        >
          Manage academic years and their
          current status.
        </Typography>
      </Box>

      {/* Table */}

      <Box sx={{ overflowX: "auto" }}>
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 760,

            "& th": {
              textAlign: "left",
              px: 3,
              py: 1.75,
              fontSize: 12,
              fontWeight: 700,
              color: "#64748B",
              backgroundColor: "#F8FAFC",
              borderBottom:
                "1px solid #E9EDF5",
              whiteSpace: "nowrap",
            },

            "& td": {
              px: 3,
              py: 2,
              borderBottom:
                "1px solid #F1F5F9",
              whiteSpace: "nowrap",
            },

            "& tbody tr:last-child td": {
              borderBottom: "none",
            },

            "& tbody tr:hover": {
              backgroundColor: "#FAFBFD",
            },
          }}
        >
          <thead>
            <tr>
              <th>SESSION</th>
              <th>START DATE</th>
              <th>END DATE</th>
              <th>STATUS</th>
              <th align="right">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((session) => {
              const status =
                session.status || "upcoming";

              const isActive =
                status === "active";

              const isCompleted =
                status === "completed";

              return (
                <tr key={session.sessionId}>
                  {/* Session */}

                  <td>
                    <Stack spacing={0.25}>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        color="#111827"
                      >
                        {session.name ||
                          session.sessionName ||
                          "-"}
                      </Typography>

                      {session.description && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {session.description}
                        </Typography>
                      )}
                    </Stack>
                  </td>

                  {/* Start Date */}

                  <td>
                    <Typography
                      variant="body2"
                      color="#475569"
                    >
                      {formatDate(
                        session.startDate
                      )}
                    </Typography>
                  </td>

                  {/* End Date */}

                  <td>
                    <Typography
                      variant="body2"
                      color="#475569"
                    >
                      {formatDate(
                        session.endDate
                      )}
                    </Typography>
                  </td>

                  {/* Status */}

                  <td>
                    <Chip
                      size="small"
                      label={
                        status
                          .charAt(0)
                          .toUpperCase() +
                        status.slice(1)
                      }
                      color={getStatusColor(
                        status
                      )}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform:
                          "capitalize",
                      }}
                    />
                  </td>

                  {/* Actions */}

                  <td>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      justifyContent="flex-end"
                    >
                      {/* View */}

                      {onView && (
                        <Tooltip title="View">
                          <IconButton
                            size="small"
                            onClick={() =>
                              onView(session)
                            }
                          >
                            <VisibilityRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}

                      {/* Edit */}

                      {onEdit &&
                        !isCompleted && (
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() =>
                                onEdit(session)
                              }
                            >
                              <EditRoundedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}

                      {/* Activate */}

                      {onActivate &&
                        !isActive &&
                        !isCompleted && (
                          <Tooltip title="Activate">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() =>
                                onActivate(
                                  session
                                )
                              }
                            >
                              <PlayCircleRoundedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}

                      {/* Complete */}

                      {onComplete &&
                        isActive && (
                          <Tooltip title="Complete">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() =>
                                onComplete(
                                  session
                                )
                              }
                            >
                              <CheckCircleRoundedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                    </Stack>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Box>
      </Box>
    </Paper>
  );
};

export default AcademicSessionTable;