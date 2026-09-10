import React, { useState } from "react";

import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import {
    CheckCircleOutline,
    Close,
    PersonOutline,
    Schedule,
} from "@mui/icons-material";

import {
    acceptFacultyRequest,
    rejectFacultyRequest,
} from "../../services/adminFacultyService";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const FacultyRequests = ({
    requests = [],
    schoolId,
    onUpdated,
}) => {
    const [processingId, setProcessingId] = useState(null);
    const [error, setError] = useState("");

    const handleAccept = async (request) => {
        if (!request?.requestId) {
            return;
        }

        try {
            setProcessingId(
                request.requestId
            );

            /*
             * Once this request is approved,
             * Firestore changes its status from
             * "pending" to "approved".
             *
             * The realtime listener will then
             * automatically remove it from this list.
             */
            await acceptFacultyRequest(
                request.requestId
            );
        } catch (error) {
            console.error(
                "Failed to accept faculty request:",
                error
            );
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (request) => {
        try {
            setProcessingId(request.requestId);
            setError("");

            await rejectFacultyRequest(
                request.requestId
            );

            await onUpdated?.();
        } catch (err) {
            console.error(
                "Failed to reject teacher request:",
                err
            );

            setError(
                err.message ||
                "Unable to reject this teacher request."
            );
        } finally {
            setProcessingId(null);
        }
    };

    if (!requests.length) {
        return (
        /*  ==========================================================
                Empty State
            ========================================================== */
            <Stack alignItems="center" textAlign="center" spacing={1} sx={{ px: 3, py: 4, }} >
                <Box sx={{ width: 48, height: 48, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "action.hover", color: "text.secondary", }} >
                    <SchoolRoundedIcon />
                </Box>
                <Typography variant="body2" fontWeight={600} >No pending requests</Typography>
                <Typography variant="caption" color="text.secondary" > New teacher joining requests will appear here automatically. </Typography>
            </Stack>
        )
    }

    return (
        <Card
            id="faculty-requests"
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    px: {
                        xs: 2.5,
                        md: 3,
                    },
                    py: 2.5,
                    bgcolor: "background.paper",
                }}
            >
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={1.5}
                    alignItems={{
                        xs: "flex-start",
                        sm: "center",
                    }}
                    justifyContent="space-between"
                >
                    <Box>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >
                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                Faculty Requests
                            </Typography>

                            <Chip
                                label={requests.length}
                                size="small"
                                color="primary"
                                sx={{
                                    fontWeight: 700,
                                }}
                            />
                        </Stack>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            Teachers requesting to
                            join your school.
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Divider />

            {/* Error */}
            {error && (
                <Box sx={{ p: 2.5 }}>
                    <Alert
                        severity="error"
                        onClose={() =>
                            setError("")
                        }
                    >
                        {error}
                    </Alert>
                </Box>
            )}

            {/* Requests */}
            <CardContent
                sx={{
                    p: {
                        xs: 2,
                        md: 3,
                    },
                    "&:last-child": {
                        pb: {
                            xs: 2,
                            md: 3,
                        },
                    },
                }}
            >
                <Stack spacing={2}>
                    {requests.map((request) => {
                        const isProcessing =
                            processingId ===
                            request.requestId;

                        return (
                            <Box
                                key={
                                    request.requestId
                                }
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    border: "1px solid",
                                    borderColor:
                                        "divider",
                                    transition:
                                        "all .2s ease",

                                    "&:hover": {
                                        borderColor:
                                            "primary.main",
                                        boxShadow:
                                            "0 6px 20px rgba(15,23,42,.06)",
                                    },
                                }}
                            >
                                <Stack
                                    direction={{
                                        xs: "column",
                                        md: "row",
                                    }}
                                    spacing={2}
                                    alignItems={{
                                        xs: "stretch",
                                        md: "center",
                                    }}
                                >
                                    {/* Teacher */}
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        alignItems="center"
                                        sx={{
                                            flex: 1,
                                            minWidth: 0,
                                        }}
                                    >
                                        <Avatar
                                            src={
                                                request.teacherPhoto ||
                                                ""
                                            }
                                            sx={{
                                                width: 46,
                                                height: 46,
                                            }}
                                        >
                                            {request.teacherName
                                                ?.charAt(
                                                    0
                                                )
                                                ?.toUpperCase() || (
                                                    <PersonOutline />
                                                )}
                                        </Avatar>

                                        <Box
                                            sx={{
                                                minWidth: 0,
                                            }}
                                        >
                                            <Typography
                                                fontWeight={
                                                    700
                                                }
                                                noWrap
                                            >
                                                {request.teacherName ||
                                                    "Unknown Teacher"}
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                flexWrap="wrap"
                                                alignItems="center"
                                                sx={{
                                                    mt: 0.5,
                                                }}
                                            >
                                                {request.teacherId && (
                                                    <Chip
                                                        label={`Code: ${request.teacherId}`}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                )}

                                                {request.requestedAt && (
                                                    <Stack
                                                        direction="row"
                                                        spacing={
                                                            0.5
                                                        }
                                                        alignItems="center"
                                                    >
                                                        <Schedule
                                                            sx={{
                                                                fontSize: 15,
                                                                color: "text.secondary",
                                                            }}
                                                        />

                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            Pending
                                                            request
                                                        </Typography>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </Box>
                                    </Stack>

                                    {/* Actions */}
                                    <Stack
                                        direction={{
                                            xs: "column",
                                            sm: "row",
                                        }}
                                        spacing={1}
                                        justifyContent="flex-end"
                                    >
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            startIcon={
                                                <Close />
                                            }
                                            disabled={
                                                isProcessing
                                            }
                                            onClick={() =>
                                                handleReject(
                                                    request
                                                )
                                            }
                                            sx={{
                                                minWidth: {
                                                    xs: "100%",
                                                    sm: 110,
                                                },
                                                borderRadius: 2.5,
                                            }}
                                        >
                                            Reject
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={
                                                <CheckCircleOutline />
                                            }
                                            disabled={
                                                isProcessing
                                            }
                                            onClick={() =>
                                                handleAccept(
                                                    request
                                                )
                                            }
                                            sx={{
                                                minWidth: {
                                                    xs: "100%",
                                                    sm: 120,
                                                },
                                                borderRadius: 2.5,
                                            }}
                                        >
                                            {isProcessing
                                                ? "Processing..."
                                                : "Accept"}
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        );
                    })}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default FacultyRequests;