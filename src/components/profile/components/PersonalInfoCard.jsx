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
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import WcRoundedIcon from "@mui/icons-material/WcRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const InfoItem = ({
    label,
    value,
    icon,
}) => {
    return (
        <Grid
            size={{
                xs: 12,
                sm: 6,
            }}
        >
            <Box
                sx={{
                    p: 2,
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

                    {/* Information */}

                    <Box
                        sx={{
                            minWidth: 0,
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

const PersonalInfoCard = ({
    profile,
    onEdit,
}) => {
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
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 800,
                                color: "#0F172A",
                            }}
                        >
                            Personal Information
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                mt: 0.4,
                                color: "#64748B",
                            }}
                        >
                            Your basic personal
                            and contact
                            information.
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={onEdit}
                        aria-label="Edit personal information"
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2.25,
                            border: "1px solid",
                            borderColor:
                                "#E5E7EB",
                            color: "#64748B",
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
                        <EditRoundedIcon
                            fontSize="small"
                        />
                    </IconButton>
                </Stack>

                <Divider
                    sx={{
                        my: 2.5,
                    }}
                />

                {/* ======================================================
                   Information
                   ====================================================== */}

                <Grid
                    container
                    spacing={1.5}
                >
                    <InfoItem
                        label="Full Name"
                        value={
                            profile?.fullName
                        }
                        icon={
                            <PersonOutlineRoundedIcon
                                fontSize="small"
                            />
                        }
                    />

                    <InfoItem
                        label="Phone Number"
                        value={
                            profile?.phone
                        }
                        icon={
                            <PhoneOutlinedIcon
                                fontSize="small"
                            />
                        }
                    />

                    <InfoItem
                        label="Gender"
                        value={
                            profile?.gender
                        }
                        icon={
                            <WcRoundedIcon
                                fontSize="small"
                            />
                        }
                    />

                    <InfoItem
                        label="Email Address"
                        value={
                            profile?.email
                        }
                        icon={
                            <EmailOutlinedIcon
                                fontSize="small"
                            />
                        }
                    />
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PersonalInfoCard;