import React, { useEffect, useState } from "react";

import {
    Alert,
    Box,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";

import { useSelector } from "react-redux";

import FacultyRequests from "../components/faculty/FacultyRequests";

import {
    subscribeToFacultyRequests,
} from "../services/adminFacultyService";

const FacultyJoiningRequests = () => {
    const { user } = useSelector(
        (state) => state.auth
    );

    const schoolId = user?.schoolId;

    const [requests, setRequests] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

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
        setError("");

        const unsubscribe =
            subscribeToFacultyRequests(
                schoolId,

                (data) => {
                    /*
                     * Firestore automatically updates
                     * this data whenever a teacher sends,
                     * gets approved, or gets rejected.
                     */
                    setRequests(data);
                    setLoading(false);
                },

                (listenerError) => {
                    console.error(
                        "Failed to listen to faculty requests:",
                        listenerError
                    );

                    setError(
                        listenerError.message ||
                            "Unable to load faculty joining requests."
                    );

                    setRequests([]);
                    setLoading(false);
                }
            );

        /*
         * Remove Firestore listener when the page
         * unmounts or schoolId changes.
         */
        return () => {
            unsubscribe();
        };
    }, [schoolId]);

    /* ==========================================================================
       Loading State
       ========================================================================== */

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Stack
                    spacing={2}
                    alignItems="center"
                >
                    <CircularProgress />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Loading faculty joining requests...
                    </Typography>
                </Stack>
            </Box>
        );
    }

    /* ==========================================================================
       Page
       ========================================================================== */

    return (
        <Box
            sx={{
                minHeight: "100%",
                bgcolor: "#F8FAFC",
                py: {
                    xs: 3,
                    md: 4,
                },
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },
                }}
            >
                {/* Error */}

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

                {/* Faculty Requests */}

                <FacultyRequests
                    requests={requests}
                    schoolId={schoolId}
                />
            </Stack>
        </Box>
    );
};

export default FacultyJoiningRequests;