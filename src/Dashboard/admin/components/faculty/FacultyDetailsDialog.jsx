import React from "react";

import {
    Avatar,
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";

const InfoItem = ({
    icon,
    label,
    value,
}) => {
    return (
        <Stack
            direction="row"
            spacing={1.5}
            alignItems="flex-start"
        >
            <Box
                sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "action.hover",
                    flexShrink: 0,
                }}
            >
                {icon}
            </Box>

            <Box sx={{ minWidth: 0 }}>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                >
                    {label}
                </Typography>

                <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                        mt: 0.25,
                        wordBreak: "break-word",
                    }}
                >
                    {value || "Not provided"}
                </Typography>
            </Box>
        </Stack>
    );
};

const FacultyDetailsDialog = ({
    open,
    onClose,
    teacher,
}) => {
    if (!teacher) return null;

    const fullName =
        teacher.fullName ||
        [teacher.firstName, teacher.lastName]
            .filter(Boolean)
            .join(" ") ||
        "Unnamed Teacher";

    const status =
        teacher.status || "active";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    overflow: "hidden",
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    p: 0,
                }}
            >
                <Box
                    sx={{
                        px: {
                            xs: 2.5,
                            md: 4,
                        },
                        py: 3,
                        background:
                            "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                        color: "white",
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >
                            <Avatar
                                src={
                                    teacher.photoURL ||
                                    ""
                                }
                                alt={fullName}
                                sx={{
                                    width: 64,
                                    height: 64,
                                    border:
                                        "2px solid rgba(255,255,255,.3)",
                                }}
                            >
                                {fullName
                                    .charAt(0)
                                    .toUpperCase()}
                            </Avatar>

                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight={800}
                                >
                                    {fullName}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color:
                                            "rgba(255,255,255,.7)",
                                        mt: 0.25,
                                    }}
                                >
                                    {teacher.designation ||
                                        "Faculty Member"}
                                </Typography>

                                <Chip
                                    label={
                                        status
                                            .charAt(0)
                                            .toUpperCase() +
                                        status.slice(1)
                                    }
                                    size="small"
                                    color={
                                        status ===
                                        "active"
                                            ? "success"
                                            : status ===
                                              "pending"
                                            ? "warning"
                                            : "default"
                                    }
                                    sx={{
                                        mt: 1,
                                        fontWeight: 700,
                                    }}
                                />
                            </Box>
                        </Stack>

                        <IconButton
                            onClick={onClose}
                            sx={{
                                color: "white",
                                bgcolor:
                                    "rgba(255,255,255,.08)",
                                "&:hover": {
                                    bgcolor:
                                        "rgba(255,255,255,.16)",
                                },
                            }}
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Stack>
                </Box>
            </DialogTitle>

            <DialogContent
                sx={{
                    p: {
                        xs: 2.5,
                        md: 4,
                    },
                }}
            >
                {/* Personal Information */}
                <Stack spacing={2.5}>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={800}
                        >
                            Personal Information
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Basic contact and account
                            information.
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <InfoItem
                                icon={
                                    <EmailRoundedIcon fontSize="small" />
                                }
                                label="Email"
                                value={
                                    teacher.email
                                }
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <InfoItem
                                icon={
                                    <PhoneRoundedIcon fontSize="small" />
                                }
                                label="Phone"
                                value={
                                    teacher.phone
                                }
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <InfoItem
                                icon={
                                    <BadgeRoundedIcon fontSize="small" />
                                }
                                label="Teacher Code"
                                value={
                                    teacher.teacherCode
                                }
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <InfoItem
                                icon={
                                    <SchoolRoundedIcon fontSize="small" />
                                }
                                label="Gender"
                                value={
                                    teacher.gender
                                }
                            />
                        </Grid>
                    </Grid>
                </Stack>

                <Divider sx={{ my: 4 }} />

                {/* Professional Information */}
                <Stack spacing={2.5}>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={800}
                        >
                            Professional Information
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Teaching background and
                            professional details.
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <InfoItem
                                icon={
                                    <WorkRoundedIcon fontSize="small" />
                                }
                                label="Designation"
                                value={
                                    teacher.designation
                                }
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <InfoItem
                                icon={
                                    <SchoolRoundedIcon fontSize="small" />
                                }
                                label="Qualification"
                                value={
                                    teacher.qualification
                                }
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <InfoItem
                                icon={
                                    <SchoolRoundedIcon fontSize="small" />
                                }
                                label="Specialization"
                                value={
                                    teacher.specialization
                                }
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <InfoItem
                                icon={
                                    <WorkRoundedIcon fontSize="small" />
                                }
                                label="Experience"
                                value={
                                    teacher.experience
                                        ? `${teacher.experience} years`
                                        : null
                                }
                            />
                        </Grid>

                        <Grid size={12}>
                            <InfoItem
                                icon={
                                    <LinkRoundedIcon fontSize="small" />
                                }
                                label="Portfolio"
                                value={
                                    teacher.portfolioLink
                                }
                            />
                        </Grid>

                        <Grid size={12}>
                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    fontWeight={600}
                                >
                                    Professional Bio
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 0.75,
                                        lineHeight: 1.7,
                                        color:
                                            "text.secondary",
                                    }}
                                >
                                    {teacher.bio ||
                                        "No professional bio provided."}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default FacultyDetailsDialog;