import React, { useCallback, useEffect, useState } from "react";

import {
    Alert,
    Box,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";

import { useSelector } from "react-redux";

import FacultyHeader from "../components/faculty/FacultyHeader";
import FacultyTable from "../components/faculty/FacultyTable";
import FacultyRequests from "../components/faculty/FacultyRequests";
import EmptyFaculty from "../components/faculty/EmptyFaculty";

import {
    getFacultyMembers,
    getFacultyRequests,
} from "../services/adminFacultyService";

const FacultyMembers = () => {
    const { user } = useSelector((state) => state.auth);

    const schoolId = user?.schoolId;

    const [faculty, setFaculty] = useState([]);
    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    /* ==========================================================================
       Load Faculty & Requests
       ========================================================================== */

    const loadFacultyData = useCallback(async () => {
        if (!schoolId) {
            setFaculty([]);
            setRequests([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const [facultyData, requestData] =
                await Promise.all([
                    getFacultyMembers(schoolId),
                    getFacultyRequests(schoolId),
                ]);

            setFaculty(facultyData);
            setRequests(requestData);
        } catch (err) {
            console.error(
                "Failed to load faculty data:",
                err
            );

            setError(
                err.message ||
                "Unable to load faculty information."
            );
        } finally {
            setLoading(false);
        }
    }, [schoolId]);

    /* ==========================================================================
       Initial Load
       ========================================================================== */

    useEffect(() => {
        loadFacultyData();
    }, [loadFacultyData]);

    /* ==========================================================================
       Filtering
       ========================================================================== */

    const filteredFaculty = faculty.filter((teacher) => {
        const searchValue = search.trim().toLowerCase();

        const matchesSearch =
            !searchValue ||
            teacher.fullName
                ?.toLowerCase()
                .includes(searchValue) ||
            teacher.email
                ?.toLowerCase()
                .includes(searchValue) ||
            teacher.teacherCode
                ?.toLowerCase()
                .includes(searchValue) ||
            teacher.designation
                ?.toLowerCase()
                .includes(searchValue);

        const matchesStatus =
            statusFilter === "all" ||
            teacher.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    /* ==========================================================================
       Stats
       ========================================================================== */

    const totalFaculty = faculty.length;

    const activeFaculty = faculty.filter(
        (teacher) =>
            !teacher.status ||
            teacher.status === "active"
    ).length;

    const inactiveFaculty = faculty.filter(
        (teacher) =>
            teacher.status === "inactive"
    ).length;

    const pendingRequests = requests.length;

    const stats = {
        total: totalFaculty,
        active: activeFaculty,
        inactive: inactiveFaculty,
        pending: pendingRequests,
    };

    /* ==========================================================================
       Loading State
       ========================================================================== */

    if (loading) {
        return (
            <Box sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", }} >
                <Stack spacing={2} alignItems="center" >
                    <CircularProgress />

                    <Typography variant="body2" color="text.secondary" >
                        Loading faculty members...
                    </Typography>
                </Stack>
            </Box>
        );
    }

    /* ==========================================================================
       Page
       ========================================================================== */

    return (
        <Box sx={{ minHeight: "100%", bgcolor: "#F8FAFC" }} >
           
                <Stack spacing={3}>
                    {/* Statistics Header */}
                    <FacultyHeader stats={stats} onRefresh={loadFacultyData} />

                    {/* Error */}
                    {error && (<Alert severity="error" onClose={() => setError("")} > {error} </Alert>)}



                    {/* Pending Requests */}
                    {/* {requests.length > 0 && (
                        <FacultyRequests requests={requests} schoolId={schoolId} onUpdated={loadFacultyData} />
                    )} */}

                    {/* Search & Filters */}
                    {/* {faculty.length > 0 && (
                        <FacultyFilters
                            search={search}
                            onSearchChange={setSearch}
                            status={statusFilter}
                            onStatusChange={
                                setStatusFilter
                            }
                        />
                    )} */}

                    {/* Faculty */}
                    {faculty.length === 0 ? (
                        <EmptyFaculty
                            hasPendingRequests={
                                requests.length > 0
                            }
                            onViewRequests={() => {
                                document
                                    .getElementById(
                                        "faculty-requests"
                                    )
                                    ?.scrollIntoView({
                                        behavior:
                                            "smooth",
                                        block: "start",
                                    });
                            }}
                        />
                    ) : (
                        <FacultyTable
                            faculty={filteredFaculty}
                            onRefresh={
                                loadFacultyData
                            }
                        />
                    )}
                </Stack>
   
        </Box>
    );
};

export default FacultyMembers;