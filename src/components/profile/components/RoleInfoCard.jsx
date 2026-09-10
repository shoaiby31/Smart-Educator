import React from "react";

import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const InfoItem = ({
    label,
    value,
    icon,
    fullWidth = false,
}) => {
    return (
        <Grid
            size={{
                xs: 12,
                sm: fullWidth ? 12 : 6,
            }}
        >
            <Box
                sx={{
                    p: 2,
                    height: "100%",
                    borderRadius: 2.5,
                    bgcolor: "#F8FAFC",
                    border: "1px solid",
                    borderColor: "#EEF0F4",
                    transition:
                        "all 0.2s ease",
                    "&:hover": {
                        borderColor:
                            "#E0E7FF",
                        bgcolor: "#FAFAFF",
                    },
                }}
            >
                <Stack
                    direction="row"
                    spacing={1.25}
                    alignItems="flex-start"
                >
                    {/* Icon */}

                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            flexShrink: 0,
                            borderRadius: 2,
                            display: "grid",
                            placeItems:
                                "center",
                            bgcolor:
                                "#EEF2FF",
                            color:
                                "#4F46E5",
                        }}
                    >
                        {icon}
                    </Box>

                    {/* Content */}

                    <Box
                        sx={{
                            minWidth: 0,
                            flex: 1,
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                display:
                                    "block",
                                color:
                                    "#64748B",
                                fontWeight: 600,
                                mb: 0.35,
                            }}
                        >
                            {label}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color:
                                    "#0F172A",
                                fontWeight: 650,
                                lineHeight: 1.5,
                                wordBreak:
                                    "break-word",
                            }}
                        >
                            {value || "-"}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Grid>
    );
};

const RoleInfoCard = ({
    role,
    profile,
    onEdit,
}) => {
    const getTitle = () => {
        switch (role) {
            case "student":
                return "Academic Information";

            case "teacher":
                return "Professional Information";

            case "admin":
                return "School Information";

            default:
                return "Additional Information";
        }
    };

    const getSubtitle = () => {
        switch (role) {
            case "student":
                return "Your academic and family-related information.";

            case "teacher":
                return "Your professional background and teaching information.";

            case "admin":
                return "Information about your school or institute.";

            default:
                return "Additional information associated with your account.";
        }
    };

    const renderFields = () => {
        switch (role) {
            /* ==========================================================
               Student
               ========================================================== */

            case "student":
                return (
                    <>
                        <InfoItem
                            label="Guardian"
                            value={
                                profile?.guardian
                            }
                            icon={
                                <PersonOutlineRoundedIcon fontSize="small" />
                            }
                        />

                        <InfoItem
                            label="Date of Birth"
                            value={
                                profile?.dateOfBirth
                            }
                            icon={
                                <CakeOutlinedIcon fontSize="small" />
                            }
                        />

                        <InfoItem
                            label="Address"
                            value={
                                profile?.address
                            }
                            fullWidth
                            icon={
                                <HomeOutlinedIcon fontSize="small" />
                            }
                        />
                    </>
                );

            /* ==========================================================
               Teacher
               ========================================================== */

            case "teacher":
                return (
                    <>
                        <InfoItem
                            label="Designation"
                            value={
                                profile?.designation
                            }
                            icon={
                                <BadgeOutlinedIcon fontSize="small" />
                            }
                        />

                        <InfoItem
                            label="Qualification"
                            value={
                                profile?.qualification
                            }
                            icon={
                                <WorkspacePremiumOutlinedIcon fontSize="small" />
                            }
                        />

                        <InfoItem
                            label="Specialization"
                            value={
                                profile?.specialization
                            }
                            icon={
                                <PsychologyOutlinedIcon fontSize="small" />
                            }
                        />

                        <InfoItem
                            label="Experience"
                            value={
                                profile?.experience
                            }
                            icon={
                                <TimelineOutlinedIcon fontSize="small" />
                            }
                        />

                        <InfoItem
                            label="Bio"
                            value={
                                profile?.bio
                            }
                            fullWidth
                            icon={
                                <NotesOutlinedIcon fontSize="small" />
                            }
                        />
                    </>
                );

            /* ==========================================================
               Admin
               ========================================================== */

            case "admin":
                return (
                    <>
                        <InfoItem
                            label="Institute"
                            value={
                                profile?.instituteName
                            }
                            icon={
                                <BusinessRoundedIcon fontSize="small" />
                            }
                        />

                        <InfoItem
                            label="Website"
                            value={
                                profile?.website
                            }
                            icon={
                                <LanguageOutlinedIcon fontSize="small" />
                            }
                        />

                        <InfoItem
                            label="Established"
                            value={
                                profile?.establishedYear
                            }
                            icon={
                                <CalendarMonthOutlinedIcon fontSize="small" />
                            }
                        />

                        <InfoItem
                            label="Address"
                            value={
                                profile?.instituteAddress
                            }
                            fullWidth
                            icon={
                                <HomeOutlinedIcon fontSize="small" />
                            }
                        />
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "#E5E7EB",
                bgcolor: "#FFFFFF",
                boxShadow:
                    "0 6px 24px rgba(15, 23, 42, 0.04)",
            }}
        >
            <CardContent
                sx={{
                    p: {
                        xs: 2.5,
                        sm: 3,
                        md: 3.5,
                    },
                    "&:last-child": {
                        pb: {
                            xs: 2.5,
                            sm: 3,
                            md: 3.5,
                        },
                    },
                }}
            >
                {/* ======================================================
                   Header
                   ====================================================== */}

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box
                        sx={{
                            minWidth: 0,
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >
                            <Box
                                sx={{
                                    width: 34,
                                    height: 34,
                                    borderRadius: 2,
                                    display: "grid",
                                    placeItems:
                                        "center",
                                    bgcolor:
                                        "#EEF2FF",
                                    color:
                                        "#4F46E5",
                                }}
                            >
                                <SchoolOutlinedIcon fontSize="small" />
                            </Box>

                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 800,
                                    color:
                                        "#0F172A",
                                }}
                            >
                                {getTitle()}
                            </Typography>
                        </Stack>

                        <Typography
                            variant="body2"
                            sx={{
                                mt: 0.75,
                                color:
                                    "#64748B",
                            }}
                        >
                            {getSubtitle()}
                        </Typography>
                    </Box>

                    {onEdit && (
                        <IconButton
                            onClick={onEdit}
                            aria-label="Edit role information"
                            sx={{
                                width: 40,
                                height: 40,
                                flexShrink: 0,
                                borderRadius: 2.25,
                                border: "1px solid",
                                borderColor:
                                    "#E5E7EB",
                                color:
                                    "#64748B",
                                "&:hover": {
                                    color:
                                        "#4F46E5",
                                    borderColor:
                                        "#C7D2FE",
                                    bgcolor:
                                        "#EEF2FF",
                                },
                            }}
                        >
                            <EditRoundedIcon fontSize="small" />
                        </IconButton>
                    )}
                </Stack>

                <Divider
                    sx={{
                        my: 2.5,
                    }}
                />

                {/* ======================================================
                   Role Fields
                   ====================================================== */}

                <Grid
                    container
                    spacing={1.5}
                >
                    {renderFields()}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RoleInfoCard;