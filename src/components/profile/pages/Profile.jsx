import React, { useState } from "react";

import {
    Alert,
    Box,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import { useAuth } from "../../../Authentication";

import ProfileHero from "../components/ProfileHero";
import ProfileEditor from "./ProfileEditor";

import PersonalInfoCard from "../components/PersonalInfoCard";
import AccountInfoCard from "../components/AccountInfoCard";
import RoleInfoCard from "../components/RoleInfoCard";

import useProfile from "../hooks/useProfile";

const Profile = () => {
    const { user } = useAuth();

    const [editing, setEditing] =
        useState(false);

    const {
        profile,
        loading,
        refreshProfile,
    } = useProfile();

    /* ==========================================================================
       Authentication
       ========================================================================== */

    if (!user) {
        return null;
    }

    /* ==========================================================================
       Loading
       ========================================================================== */

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "#F8FAFC",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Loading profile...
                </Typography>
            </Box>
        );
    }

    /* ==========================================================================
       Profile Not Completed
       ========================================================================== */

    if (!user.isProfileCompleted) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "#F8FAFC",
                    py: {
                        xs: 3,
                        md: 0,
                    },
                }}
            >
                <Container
                    maxWidth="lg"
                >
                    <Alert
                        severity="info"
                        sx={{
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor:
                                "info.200",
                            bgcolor: "white",
                        }}
                    >
                        Please complete your
                        profile to continue.
                    </Alert>
                </Container>
            </Box>
        );
    }

    /* ==========================================================================
       Edit Profile
       ========================================================================== */

    if (editing) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "#F8FAFC",
                    py: {
                        xs: 3,
                        md: 0,
                    },
                }}
            >
                <Container
                    maxWidth="lg"
                >
                    <Stack spacing={3}>
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 800,
                                    color: "#0F172A",
                                    letterSpacing:
                                        "-0.02em",
                                }}
                            >
                                Edit Profile
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,
                                }}
                            >
                                Update your
                                personal and
                                account
                                information.
                            </Typography>
                        </Box>

                        <ProfileEditor
                            mode="edit"
                            profile={profile}
                            onCancel={() =>
                                setEditing(false)
                            }
                            onSaved={async () => {
                                await refreshProfile();
                                setEditing(false);
                            }}
                        />
                    </Stack>
                </Container>
            </Box>
        );
    }

    /* ==========================================================================
       View Profile
       ========================================================================== */

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#F8FAFC",
                py: {
                    xs: 2.5,
                    sm: 3,
                    md: 0,
                },
            }}
        >
            <Container
                maxWidth="lg"
            >
                <Stack spacing={3}>
                    
                    {/* ======================================================
                       Profile Hero
                       ====================================================== */}

                    <ProfileHero
                        user={profile}
                        onEdit={() =>
                            setEditing(true)
                        }
                    />

                    {/* ======================================================
                       Profile Information
                       ====================================================== */}

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1.35fr 0.65fr",
                            },
                            gap: 3,
                            alignItems: "start",
                        }}
                    >
                        {/* Left */}
                        <Stack spacing={3}>
                            <PersonalInfoCard
                                profile={profile}
                                onEdit={() =>
                                    setEditing(true)
                                }
                            />

                            <RoleInfoCard
                                profile={profile}
                                role={
                                    profile.role
                                }
                                onEdit={() =>
                                    setEditing(true)
                                }
                            />
                        </Stack>

                        {/* Right */}
                        <AccountInfoCard
                            profile={profile}
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default Profile;