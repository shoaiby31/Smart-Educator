import React, { useCallback, useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import {
    CheckCircleRounded,
    HourglassTopRounded,
    RefreshRounded,
    SchoolRounded,
    CancelRounded,
    LocationOnRounded,
} from "@mui/icons-material";

import { useSelector } from "react-redux";

import { getMySchoolRequests } from "../../services/teacherSchoolService";

const MySchoolRequest = () => {
    const { user } = useSelector(
        (state) => state.auth
    );

    const [requests, setRequests] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    /* ==========================================================================
       Load Requests
       ========================================================================== */

    const loadRequests = useCallback(
        async () => {
            if (!user?.uid) {
                setRequests([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const data =
                    await getMySchoolRequests(
                        user.uid
                    );

                /*
                 * Most recent requests first.
                 *
                 * Firestore timestamps may not always
                 * be available immediately, so we safely
                 * handle missing timestamps.
                 */
                const sortedRequests = [
                    ...data,
                ].sort((a, b) => {
                    const aTime =
                        a.requestedAt
                            ?.toMillis?.() || 0;

                    const bTime =
                        b.requestedAt
                            ?.toMillis?.() || 0;

                    return bTime - aTime;
                });

                setRequests(
                    sortedRequests
                );
            } catch (err) {
                console.error(
                    "Failed to load school requests:",
                    err
                );

                setError(
                    err.message ||
                        "Unable to load your school requests."
                );
            } finally {
                setLoading(false);
            }
        },
        [user?.uid]
    );

    /* ==========================================================================
       Initial Load
       ========================================================================== */

    useEffect(() => {
        loadRequests();
    }, [loadRequests]);

    /* ==========================================================================
       Status Helpers
       ========================================================================== */

    const getStatusConfig = (
        status
    ) => {
        switch (status) {
            case "approved":
                return {
                    label: "Approved",
                    color: "success",
                    icon: (
                        <CheckCircleRounded
                            fontSize="small"
                        />
                    ),
                };

            case "rejected":
                return {
                    label: "Rejected",
                    color: "error",
                    icon: (
                        <CancelRounded
                            fontSize="small"
                        />
                    ),
                };

            case "pending":
            default:
                return {
                    label: "Pending",
                    color: "warning",
                    icon: (
                        <HourglassTopRounded
                            fontSize="small"
                        />
                    ),
                };
        }
    };

    /* ==========================================================================
       Loading
       ========================================================================== */

    if (loading) {
        return (
            <Card
                elevation={0}
                sx={{
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor:
                        "divider",
                }}
            >
                <CardContent>
                    <Stack
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            py: 4,
                        }}
                    >
                        <CircularProgress
                            size={28}
                        />

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Loading school requests...
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    /* ==========================================================================
       Error
       ========================================================================== */

    if (error) {
        return (
            <Alert
                severity="error"
                action={
                    <Button
                        color="inherit"
                        size="small"
                        startIcon={
                            <RefreshRounded />
                        }
                        onClick={
                            loadRequests
                        }
                    >
                        Retry
                    </Button>
                }
                sx={{
                    borderRadius: 3,
                }}
            >
                {error}
            </Alert>
        );
    }

    /* ==========================================================================
       No Requests
       ========================================================================== */

    if (requests.length === 0) {
        return null;
    }

    /* ==========================================================================
       Render
       ========================================================================== */

    return (
        <Stack spacing={2.5}>
            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={1}
                alignItems={{
                    xs: "flex-start",
                    sm: "center",
                }}
                justifyContent="space-between"
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        School Requests
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Track your school joining
                        requests.
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    size="small"
                    startIcon={
                        <RefreshRounded />
                    }
                    onClick={
                        loadRequests
                    }
                    sx={{
                        borderRadius: 2.5,
                    }}
                >
                    Refresh
                </Button>
            </Stack>

            {requests.map((request) => {
                const status =
                    getStatusConfig(
                        request.status
                    );

                return (
                    <Card
                        key={
                            request.requestId
                        }
                        elevation={0}
                        sx={{
                            borderRadius: 4,
                            border: "1px solid",
                            borderColor:
                                "divider",
                            overflow:
                                "hidden",
                        }}
                    >
                        <CardContent
                            sx={{
                                p: {
                                    xs: 2.5,
                                    md: 3,
                                },
                                "&:last-child": {
                                    pb: {
                                        xs: 2.5,
                                        md: 3,
                                    },
                                },
                            }}
                        >
                            <Stack
                                spacing={2.5}
                            >
                                {/* --------------------------------------------------
                                   Header
                                   -------------------------------------------------- */}

                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "row",
                                    }}
                                    spacing={2}
                                    alignItems={{
                                        xs: "flex-start",
                                        sm: "center",
                                    }}
                                    justifyContent="space-between"
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        alignItems="center"
                                    >
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 2.5,
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                bgcolor:
                                                    "primary.50",
                                                color:
                                                    "primary.main",
                                            }}
                                        >
                                            <SchoolRounded />
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight={
                                                    700
                                                }
                                            >
                                                {
                                                    request.schoolName
                                                }
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                School Code:{" "}
                                                {
                                                    request.schoolCode
                                                }
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Chip
                                        icon={
                                            status.icon
                                        }
                                        label={
                                            status.label
                                        }
                                        color={
                                            status.color
                                        }
                                        size="small"
                                        sx={{
                                            fontWeight: 600,
                                            borderRadius: 2,
                                        }}
                                    />
                                </Stack>

                                <Divider />

                                {/* --------------------------------------------------
                                   School Information
                                   -------------------------------------------------- */}

                                <Stack
                                    spacing={1.5}
                                >
                                    {request
                                        .schoolAddress && (
                                        <Stack
                                            direction="row"
                                            spacing={
                                                1
                                            }
                                            alignItems="flex-start"
                                        >
                                            <LocationOnRounded
                                                sx={{
                                                    fontSize: 20,
                                                    color: "text.secondary",
                                                }}
                                            />

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {
                                                    request.schoolAddress
                                                }
                                            </Typography>
                                        </Stack>
                                    )}

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Request ID:{" "}
                                        {
                                            request.requestId
                                        }
                                    </Typography>
                                </Stack>

                                {/* --------------------------------------------------
                                   Status Message
                                   -------------------------------------------------- */}

                                {request.status ===
                                    "pending" && (
                                    <Alert
                                        severity="warning"
                                        sx={{
                                            borderRadius: 3,
                                        }}
                                    >
                                        Your request is
                                        waiting for the
                                        school
                                        administrator to
                                        review it.
                                    </Alert>
                                )}

                                {request.status ===
                                    "approved" && (
                                    <Alert
                                        severity="success"
                                        sx={{
                                            borderRadius: 3,
                                        }}
                                    >
                                        Your request has
                                        been approved. You
                                        are now a member of
                                        this school.
                                    </Alert>
                                )}

                                {request.status ===
                                    "rejected" && (
                                    <Alert
                                        severity="error"
                                        sx={{
                                            borderRadius: 3,
                                        }}
                                    >
                                        Your request was
                                        rejected by the
                                        school
                                        administrator. You
                                        may submit another
                                        request if you still
                                        want to join this
                                        school.
                                    </Alert>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                );
            })}
        </Stack>
    );
};

export default MySchoolRequest;