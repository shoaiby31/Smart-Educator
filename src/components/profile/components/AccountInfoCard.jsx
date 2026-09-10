import React from "react";

import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

const InfoRow = ({ label, value, children }) => (
    <Box
        sx={{
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
        }}
    >
        <Typography
            variant="body2"
            color="text.secondary"
            sx={{
                minWidth: 140,
                fontWeight: 500,
            }}
        >
            {label}
        </Typography>

        <Box
            sx={{
                flex: 1,
                textAlign: "right",
                minWidth: 0,
            }}
        >
            {children || (
                <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{
                        wordBreak: "break-word",
                    }}
                >
                    {value || "-"}
                </Typography>
            )}
        </Box>
    </Box>
);

const AccountInfoCard = ({ profile }) => {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                mb: 3,
                bgcolor: "background.paper",
            }}
        >
            <CardContent
                sx={{
                    p: {
                        xs: 2.5,
                        sm: 3.5,
                    },
                }}
            >
                {/* Header */}
                <Stack spacing={0.5}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Account Information
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Basic information about your account
                    </Typography>
                </Stack>

                <Divider sx={{ mt: 2.5 }} />

                {/* Account Information */}
                <Box>
                    <InfoRow
                        label="Email Address"
                        value={profile?.email}
                    />

                    <Divider />

                    <InfoRow
                        label="Role"
                        value={
                            profile?.role
                                ? profile.role
                                      .charAt(0)
                                      .toUpperCase() +
                                  profile.role.slice(1)
                                : "-"
                        }
                    />

                    <Divider />

                    <InfoRow
                        label="School ID"
                        value={profile?.schoolId}
                    />

                    <Divider />

                    <InfoRow label="Profile Status">
                        <Chip
                            size="small"
                            color={
                                profile?.isProfileCompleted
                                    ? "success"
                                    : "warning"
                            }
                            label={
                                profile?.isProfileCompleted
                                    ? "Completed"
                                    : "Incomplete"
                            }
                            sx={{
                                fontWeight: 600,
                                borderRadius: 2,
                            }}
                        />
                    </InfoRow>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AccountInfoCard;