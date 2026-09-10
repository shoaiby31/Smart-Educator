import React, { useEffect, useState } from "react";

import {
    Badge,
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Menu,
    Stack,
    Typography,
    Avatar,
    Chip,
} from "@mui/material";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    subscribeToFacultyRequests,
    acceptFacultyRequest,
    rejectFacultyRequest,
} from "../../services/adminFacultyService";

const FacultyRequestNotifications = () => {
    const navigate = useNavigate();

    const { user } = useSelector(
        (state) => state.auth
    );

    const schoolId = user?.schoolId;

    const [anchorEl, setAnchorEl] =
        useState(null);

    const [requests, setRequests] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [processingId, setProcessingId] =
        useState(null);

    const open = Boolean(anchorEl);

    /* ==========================================================================
       Realtime Faculty Requests
       ========================================================================== */

    useEffect(() => {
        if (!schoolId) {
            setRequests([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const unsubscribe =
            subscribeToFacultyRequests(
                schoolId,

                (data) => {
                    /*
                     * Firestore automatically calls this
                     * whenever a pending request is added,
                     * updated, or removed.
                     *
                     * The notification dropdown only
                     * displays the latest 3 requests.
                     */
                    setRequests(
                        data.slice(0, 3)
                    );

                    setLoading(false);
                },

                (error) => {
                    console.error(
                        "Faculty request listener error:",
                        error
                    );

                    setRequests([]);
                    setLoading(false);
                }
            );

        /*
         * Remove the Firestore listener when the
         * component unmounts or school changes.
         */
        return () => {
            unsubscribe();
        };
    }, [schoolId]);

    /* ==========================================================================
       Menu
       ========================================================================== */

    const handleOpen = (event) => {
        setAnchorEl(
            event.currentTarget
        );
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    /* ==========================================================================
       Accept Request
       ========================================================================== */

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

    /* ==========================================================================
       Reject Request
       ========================================================================== */

    const handleReject = async (request) => {
        if (!request?.requestId) {
            return;
        }

        try {
            setProcessingId(
                request.requestId
            );

            /*
             * Once rejected, the request will no
             * longer match the realtime pending
             * request query.
             */
            await rejectFacultyRequest(
                request.requestId
            );
        } catch (error) {
            console.error(
                "Failed to reject faculty request:",
                error
            );
        } finally {
            setProcessingId(null);
        }
    };

    /* ==========================================================================
       View All Requests
       ========================================================================== */

    const handleViewAll = () => {
        handleClose();

        navigate(
            "/dashboard/admin/faculty-joining-requests"
        );
    };

    /* ==========================================================================
       Render
       ========================================================================== */

    return (
        <>
            {/* ==================================================================
                Notification Bell
                ================================================================== */}

            <IconButton
                onClick={handleOpen}
                aria-label="Faculty joining requests"
                sx={{
                    width: 44,
                    height: 44,
                    mr: 1,
                    color: "#111827",
                    borderRadius: 2,

                    "&:hover": {
                        bgcolor: "#F7F7FB",
                    },
                }}
            >
                <Badge
                    badgeContent={
                        requests.length
                    }
                    color="error"
                    max={99}
                    overlap="circular"
                >
                    <NotificationsNoneRoundedIcon />
                </Badge>
            </IconButton>

            {/* ==================================================================
                Notification Menu
                ================================================================== */}

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                slotProps={{
                    paper: {
                        elevation: 4,
                        sx: {
                            width: {
                                xs: 350,
                                sm: 390,
                            },
                            maxWidth:
                                "calc(100vw - 24px)",
                            mt: 1,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor:
                                "divider",
                            overflow:
                                "hidden",
                        },
                    },
                }}
            >
                {/* ==============================================================
                    Header
                    ============================================================== */}

                <Box
                    sx={{
                        px: 2,
                        py: 1.75,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                            >
                                Faculty Requests
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Teachers waiting
                                for approval
                            </Typography>
                        </Box>

                        {requests.length >
                            0 && (
                            <Chip
                                size="small"
                                color="warning"
                                label={`${requests.length} pending`}
                                sx={{
                                    borderRadius: 2,
                                    fontWeight: 600,
                                }}
                            />
                        )}
                    </Stack>
                </Box>

                <Divider />

                {/* ==============================================================
                    Loading
                    ============================================================== */}

                {loading ? (
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        spacing={1.5}
                        sx={{
                            py: 4,
                        }}
                    >
                        <CircularProgress
                            size={26}
                        />

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Loading requests...
                        </Typography>
                    </Stack>
                ) : requests.length ===
                  0 ? (
                    /* ==========================================================
                       Empty State
                       ========================================================== */

                    <Stack
                        alignItems="center"
                        textAlign="center"
                        spacing={1}
                        sx={{
                            px: 3,
                            py: 4,
                        }}
                    >
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius:
                                    "50%",
                                display:
                                    "grid",
                                placeItems:
                                    "center",
                                bgcolor:
                                    "action.hover",
                                color:
                                    "text.secondary",
                            }}
                        >
                            <SchoolRoundedIcon />
                        </Box>

                        <Typography
                            variant="body2"
                            fontWeight={600}
                        >
                            No pending requests
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            New teacher joining
                            requests will appear
                            here automatically.
                        </Typography>
                    </Stack>
                ) : (
                    /* ==========================================================
                       Requests
                       ========================================================== */

                    <List disablePadding>
                        {requests.map(
                            (request) => {
                                const isProcessing =
                                    processingId ===
                                    request.requestId;

                                return (
                                    <React.Fragment
                                        key={
                                            request.requestId
                                        }
                                    >
                                        <ListItem
                                            alignItems="flex-start"
                                            sx={{
                                                px: 2,
                                                py: 1.75,
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={
                                                        request.teacherPhoto ||
                                                        ""
                                                    }
                                                    sx={{
                                                        width: 42,
                                                        height: 42,
                                                    }}
                                                >
                                                    {request.teacherName
                                                        ?.charAt(
                                                            0
                                                        )
                                                        ?.toUpperCase() ||
                                                        "T"}
                                                </Avatar>
                                            </ListItemAvatar>

                                            <Box
                                                sx={{
                                                    flex: 1,
                                                    minWidth: 0,
                                                }}
                                            >
                                                <ListItemText
                                                    sx={{
                                                        m: 0,
                                                    }}
                                                    primary={
                                                        <Typography
                                                            variant="body2"
                                                            fontWeight={
                                                                700
                                                            }
                                                            noWrap
                                                        >
                                                            {request.teacherName ||
                                                                "Teacher"}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            noWrap
                                                        >
                                                            {request.teacherEmail ||
                                                                request.teacherCode ||
                                                                "Teacher joining request"}
                                                        </Typography>
                                                    }
                                                />

                                                <Stack
                                                    direction="row"
                                                    spacing={
                                                        0.75
                                                    }
                                                    sx={{
                                                        mt: 1,
                                                    }}
                                                >
                                                    {/* Accept */}

                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="success"
                                                        disabled={
                                                            isProcessing
                                                        }
                                                        startIcon={
                                                            isProcessing ? (
                                                                <CircularProgress
                                                                    size={
                                                                        14
                                                                    }
                                                                    color="inherit"
                                                                />
                                                            ) : (
                                                                <CheckRoundedIcon />
                                                            )
                                                        }
                                                        onClick={() =>
                                                            handleAccept(
                                                                request
                                                            )
                                                        }
                                                        sx={{
                                                            minWidth: 0,
                                                            px: 1.25,
                                                            borderRadius: 2,
                                                            textTransform:
                                                                "none",
                                                        }}
                                                    >
                                                        Accept
                                                    </Button>

                                                    {/* Reject */}

                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="error"
                                                        disabled={
                                                            isProcessing
                                                        }
                                                        startIcon={
                                                            <CloseRoundedIcon />
                                                        }
                                                        onClick={() =>
                                                            handleReject(
                                                                request
                                                            )
                                                        }
                                                        sx={{
                                                            minWidth: 0,
                                                            px: 1.25,
                                                            borderRadius: 2,
                                                            textTransform:
                                                                "none",
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </Stack>
                                            </Box>
                                        </ListItem>

                                        <Divider
                                            component="li"
                                        />
                                    </React.Fragment>
                                );
                            }
                        )}
                    </List>
                )}

                {/* ==============================================================
                    View All
                    ============================================================== */}

                <Box
                    sx={{
                        p: 1.25,
                    }}
                >
                    <Button
                        fullWidth
                        variant="text"
                        endIcon={
                            <ArrowForwardRoundedIcon />
                        }
                        onClick={
                            handleViewAll
                        }
                        sx={{
                            borderRadius: 2,
                            textTransform:
                                "none",
                            fontWeight: 600,
                        }}
                    >
                        View All Requests
                    </Button>
                </Box>
            </Menu>
        </>
    );
};

export default FacultyRequestNotifications;