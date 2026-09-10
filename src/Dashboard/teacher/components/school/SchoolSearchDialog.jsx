import React, { useEffect, useState } from "react";

import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    ArrowBackRounded,
    BusinessRounded,
    CheckCircleRounded,
    LocationOnRounded,
    SchoolRounded,
    SendRounded,
} from "@mui/icons-material";

import { useSelector } from "react-redux";

import {
    findSchoolByCode,
    sendSchoolJoinRequest,
} from "../../services/teacherSchoolService";

const SchoolSearchDialog = ({
    open,
    onClose,
}) => {
    const { user } = useSelector(
        (state) => state.auth
    );

    const [schoolCode, setSchoolCode] =
        useState("");

    const [school, setSchool] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [sending, setSending] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState(false);

    /* ==========================================================================
       Reset Dialog
       ========================================================================== */

    useEffect(() => {
        if (!open) {
            setSchoolCode("");
            setSchool(null);
            setLoading(false);
            setSending(false);
            setError("");
            setSuccess(false);
        }
    }, [open]);

    /* ==========================================================================
       Find School
       ========================================================================== */

    const handleFindSchool = async () => {
        const normalizedCode =
            schoolCode.trim();

        if (!normalizedCode) {
            setError(
                "Please enter a school code."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSchool(null);
            setSuccess(false);

            const schoolData =
                await findSchoolByCode(
                    normalizedCode
                );

            setSchool(schoolData);
        } catch (err) {
            console.error(
                "Failed to find school:",
                err
            );

            setError(
                err.message ||
                    "Unable to find the school."
            );
        } finally {
            setLoading(false);
        }
    };

    /* ==========================================================================
       Send Join Request
       ========================================================================== */

    const handleSendRequest = async () => {
        if (!user?.uid) {
            setError(
                "Your account information could not be found."
            );
            return;
        }

        if (!school?.schoolId) {
            setError(
                "Please find a school first."
            );
            return;
        }

        try {
            setSending(true);
            setError("");

            await sendSchoolJoinRequest({
                teacherUid: user.uid,
                school,
            });

            setSuccess(true);
        } catch (err) {
            console.error(
                "Failed to send school request:",
                err
            );

            setError(
                err.message ||
                    "Unable to send the school joining request."
            );
        } finally {
            setSending(false);
        }
    };

    /* ==========================================================================
       Back To Search
       ========================================================================== */

    const handleBack = () => {
        setSchool(null);
        setError("");
        setSuccess(false);
    };

    /* ==========================================================================
       Render
       ========================================================================== */

    return (
        <Dialog
            open={open}
            onClose={
                sending
                    ? undefined
                    : onClose
            }
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    overflow: "hidden",
                },
            }}
        >
            {/* ------------------------------------------------------------------
               Title
               ------------------------------------------------------------------ */}

            <DialogTitle
                sx={{
                    px: {
                        xs: 2.5,
                        sm: 3,
                    },
                    pt: 3,
                    pb: 2,
                }}
            >
                <Stack spacing={0.5}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {success
                            ? "Request Sent"
                            : school
                            ? "School Found"
                            : "Find a School"}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {success
                            ? "Your request has been sent to the school administrator."
                            : school
                            ? "Review the school information before sending your request."
                            : "Enter the unique school code provided by the school."}
                    </Typography>
                </Stack>
            </DialogTitle>

            <Divider />

            <DialogContent
                sx={{
                    px: {
                        xs: 2.5,
                        sm: 3,
                    },
                    py: 3,
                }}
            >
                {/* ==================================================================
                   Success
                   ================================================================== */}

                {success ? (
                    <Stack
                        spacing={2.5}
                        alignItems="center"
                        textAlign="center"
                        sx={{
                            py: 4,
                        }}
                    >
                        <Box
                            sx={{
                                width: 72,
                                height: 72,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                bgcolor:
                                    "success.50",
                                color:
                                    "success.main",
                            }}
                        >
                            <CheckCircleRounded
                                sx={{
                                    fontSize: 48,
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                Request sent
                                successfully
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 0.75,
                                    maxWidth: 400,
                                }}
                            >
                                Your request to join{" "}
                                <strong>
                                    {
                                        school?.instituteName
                                    }
                                </strong>{" "}
                                is now pending
                                administrator approval.
                            </Typography>
                        </Box>
                    </Stack>
                ) : !school ? (
                    /* ==============================================================
                       Search
                       ============================================================== */

                    <Stack spacing={2.5}>
                        {error && (
                            <Alert
                                severity="error"
                                onClose={() =>
                                    setError("")
                                }
                            >
                                {error}
                            </Alert>
                        )}

                        <TextField
                            fullWidth
                            autoFocus
                            label="School Code"
                            placeholder="e.g. SCH-1024"
                            value={schoolCode}
                            onChange={(event) =>
                                setSchoolCode(
                                    event.target.value
                                )
                            }
                            onKeyDown={(
                                event
                            ) => {
                                if (
                                    event.key ===
                                    "Enter"
                                ) {
                                    handleFindSchool();
                                }
                            }}
                            disabled={loading}
                            inputProps={{
                                style: {
                                    textTransform:
                                        "uppercase",
                                },
                            }}
                            helperText="Enter the code provided by the school administrator."
                        />

                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor:
                                    "action.hover",
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={1.5}
                                alignItems="flex-start"
                            >
                                <BusinessRounded
                                    color="primary"
                                    fontSize="small"
                                />

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    After finding the
                                    school, you can
                                    review its details
                                    before sending a
                                    joining request.
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                ) : (
                    /* ==============================================================
                       School Preview
                       ============================================================== */

                    <Stack spacing={2.5}>
                        {error && (
                            <Alert
                                severity="error"
                                onClose={() =>
                                    setError("")
                                }
                            >
                                {error}
                            </Alert>
                        )}

                        <Box
                            sx={{
                                p: 2.5,
                                borderRadius: 3,
                                border: "1px solid",
                                borderColor:
                                    "divider",
                                bgcolor:
                                    "background.paper",
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <Avatar
                                    src={
                                        school.logo ||
                                        ""
                                    }
                                    variant="rounded"
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 3,
                                        bgcolor:
                                            "primary.50",
                                        color:
                                            "primary.main",
                                    }}
                                >
                                    <SchoolRounded />
                                </Avatar>

                                <Box
                                    sx={{
                                        minWidth: 0,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        {
                                            school.instituteName
                                        }
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        School Code:{" "}
                                        <strong>
                                            {
                                                school.schoolCode
                                            }
                                        </strong>
                                    </Typography>
                                </Box>
                            </Stack>

                            <Divider
                                sx={{ my: 2.5 }}
                            />

                            <Stack spacing={1.5}>
                                {school.instituteAddress && (
                                    <Stack
                                        direction="row"
                                        spacing={1.25}
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
                                                school.instituteAddress
                                            }
                                        </Typography>
                                    </Stack>
                                )}

                                {school.website && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Website:{" "}
                                        {
                                            school.website
                                        }
                                    </Typography>
                                )}
                            </Stack>
                        </Box>

                        <Alert severity="info">
                            Sending a request does not
                            immediately add you to this
                            school. The school
                            administrator must approve
                            your request first.
                        </Alert>
                    </Stack>
                )}
            </DialogContent>

            <Divider />

            {/* ------------------------------------------------------------------
               Actions
               ------------------------------------------------------------------ */}

            <DialogActions
                sx={{
                    px: {
                        xs: 2.5,
                        sm: 3,
                    },
                    py: 2,
                    gap: 1,
                }}
            >
                {success ? (
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{
                            minWidth: 120,
                            borderRadius: 2.5,
                        }}
                    >
                        Done
                    </Button>
                ) : !school ? (
                    <>
                        <Button
                            onClick={onClose}
                            color="inherit"
                            disabled={loading}
                            sx={{
                                borderRadius: 2.5,
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={
                                handleFindSchool
                            }
                            disabled={
                                loading ||
                                !schoolCode.trim()
                            }
                            startIcon={
                                loading ? (
                                    <CircularProgress
                                        size={18}
                                        color="inherit"
                                    />
                                ) : (
                                    <BusinessRounded />
                                )
                            }
                            sx={{
                                minWidth: 140,
                                borderRadius: 2.5,
                            }}
                        >
                            {loading
                                ? "Searching..."
                                : "Find School"}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={handleBack}
                            color="inherit"
                            disabled={sending}
                            startIcon={
                                <ArrowBackRounded />
                            }
                            sx={{
                                borderRadius: 2.5,
                            }}
                        >
                            Back
                        </Button>

                        <Button
                            variant="contained"
                            onClick={
                                handleSendRequest
                            }
                            disabled={sending}
                            startIcon={
                                sending ? (
                                    <CircularProgress
                                        size={18}
                                        color="inherit"
                                    />
                                ) : (
                                    <SendRounded />
                                )
                            }
                            sx={{
                                minWidth: 170,
                                borderRadius: 2.5,
                                fontWeight: 700,
                            }}
                        >
                            {sending
                                ? "Sending..."
                                : "Send Join Request"}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default SchoolSearchDialog;