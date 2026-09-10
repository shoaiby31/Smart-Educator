import React from "react";

import {
    Avatar,
    Box,
    Button,
    Chip,
    Stack,
    Typography,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const roleConfig = {
    admin: {
        label: "Principal",
        color: "error",
    },
    teacher: {
        label: "Teacher",
        color: "primary",
    },
    student: {
        label: "Student",
        color: "success",
    },
};

const ProfileHero = ({
    user,
    onEdit,
}) => {
    if (!user) return null;

    const role =
        roleConfig[user.role] || {
            label:
                user.role || "User",
            color: "default",
        };

    const displayName =
        user.fullName ||
        user.displayName ||
        "Unnamed User";

    return (
        <Box sx={{ position: "relative", overflow: "hidden", borderRadius: 4, bgcolor: "white", border: "1px solid", borderColor: "#E5E7EB", boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)", }} >
            {/* ==========================================================
               Cover
               ========================================================== */}

            <Box sx={{ position: "relative", height: { xs: 145, sm: 165, }, overflow: "hidden", background: "linear-gradient(135deg, #111827 0%, #1E293B 50%, #4338CA 100%)", }} >
                {/* Decorative circle */}

                <Box sx={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", right: { xs: -120, sm: -80, }, top: -150, bgcolor: "rgba(255,255,255,0.06)", }} />
                <Box sx={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", right: { xs: 40, sm: 100, }, bottom: -145, bgcolor: "rgba(255,255,255,0.04)", }} />





{/* ======================================================
                       Page Heading
                       ====================================================== */}

                    <Box p={5}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: "#f4f8f3", letterSpacing: "-0.025em", }} >
                            {user?.instituteName}
                        </Typography>

                        <Typography variant="body2" color="#f4f8f3" sx={{ mt: 0.5, maxWidth: 600, }} >
                            Manage your personal information, account details, and role information.
                        </Typography>
                    </Box>
                    



                {/* Small accent */}

                <Box sx={{ position: "absolute", left: { xs: 24, sm: 40, }, top: 32, width: 42, height: 4, borderRadius: 10, bgcolor: "rgba(255,255,255,0.7)", }} />
            </Box>

            {/* ==========================================================
               Profile Content
               ========================================================== */}

            <Box
                sx={{
                    px: {
                        xs: 2.5,
                        sm: 3.5,
                        md: 4,
                    },
                    pb: {
                        xs: 2.5,
                        sm: 3,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        alignItems: {
                            xs: "center",
                            sm: "flex-end",
                        },
                        gap: {
                            xs: 2,
                            sm: 2.5,
                        },
                        mt: {
                            xs: -6,
                            sm: -6.5,
                        },
                    }}
                >
                    {/* ==================================================
                       Avatar
                       ================================================== */}

                    <Avatar
                        src={
                            user.photoURL || ""
                        }
                        alt={displayName}
                        sx={{
                            flexShrink: 0,
                            width: {
                                xs: 108,
                                sm: 120,
                            },
                            height: {
                                xs: 108,
                                sm: 120,
                            },
                            bgcolor: "#EEF2FF",
                            color: "#4F46E5",
                            border:
                                "5px solid white",
                            boxShadow:
                                "0 8px 24px rgba(15, 23, 42, 0.14)",
                            fontSize: {
                                xs: 42,
                                sm: 48,
                            },
                        }}
                    >
                        {!user.photoURL && (
                            <PersonRoundedIcon
                                sx={{
                                    fontSize: {
                                        xs: 48,
                                        sm: 54,
                                    },
                                }}
                            />
                        )}
                    </Avatar>

                    {/* ==================================================
                       Identity
                       ================================================== */}

                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            textAlign: {
                                xs: "center",
                                sm: "left",
                            },
                            pb: {
                                xs: 0,
                                sm: 0.5,
                            },
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: "#0F172A",
                                letterSpacing:
                                    "-0.025em",
                                lineHeight: 1.2,
                            }}
                        >
                            {displayName}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                mt: 0.6,
                                color: "#64748B",
                                overflow:
                                    "hidden",
                                textOverflow:
                                    "ellipsis",
                                whiteSpace:
                                    "nowrap",
                            }}
                        >
                            {user.email}
                        </Typography>
                    </Box>

                    {/* ==================================================
                       Edit Button
                       ================================================== */}

                    {onEdit && (
                        <Button
                            variant="outlined"
                            startIcon={
                                <EditRoundedIcon />
                            }
                            onClick={onEdit}
                            sx={{
                                flexShrink: 0,
                                borderRadius: 2.5,
                                px: 2,
                                textTransform:
                                    "none",
                                fontWeight: 700,
                                borderColor:
                                    "#D1D5DB",
                                color: "#334155",
                                "&:hover": {
                                    borderColor:
                                        "#4F46E5",
                                    color: "#4F46E5",
                                    bgcolor:
                                        "#EEF2FF",
                                },
                            }}
                        >
                            Edit Profile
                        </Button>
                    )}
                </Box>

                {/* ======================================================
                   Status Information
                   ====================================================== */}

                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{
                        mt: 2.5,
                        justifyContent: {
                            xs: "center",
                            sm: "flex-start",
                        },
                    }}
                >
                    <Chip
                        size="small"
                        label={role.label}
                        color={role.color}
                        sx={{
                            borderRadius: 1.75,
                            fontWeight: 700,
                        }}
                    />

                    <Chip
                        size="small"
                        variant="outlined"
                        label={
                            user.isProfileCompleted
                                ? "Profile Completed"
                                : "Profile Incomplete"
                        }
                        color={
                            user.isProfileCompleted
                                ? "success"
                                : "warning"
                        }
                        sx={{
                            borderRadius: 1.75,
                            fontWeight: 600,
                        }}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default ProfileHero;