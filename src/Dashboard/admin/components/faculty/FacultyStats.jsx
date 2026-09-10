import React from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

const FacultyStats = ({
    total = 0,
    active = 0,
    pending = 0,
    inactive = 0,
}) => {
    const stats = [
        {
            title: "Total Faculty",
            value: total,
            icon: <GroupsRoundedIcon />,
        },
        {
            title: "Active",
            value: active,
            icon: <CheckCircleRoundedIcon />,
        },
        {
            title: "Pending",
            value: pending,
            icon: <PendingActionsRoundedIcon />,
        },
        {
            title: "Inactive",
            value: inactive,
            icon: <BlockRoundedIcon />,
        },
    ];

    return (
        <Grid container spacing={2}>
            {stats.map((stat) => (
                <Grid
                    key={stat.title}
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                            border:
                                "1px solid",
                            borderColor:
                                "divider",
                        }}
                    >
                        <CardContent>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {stat.title}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={800}
                                        sx={{ mt: 0.5 }}
                                    >
                                        {stat.value}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 2.5,
                                        display:
                                            "grid",
                                        placeItems:
                                            "center",
                                        bgcolor:
                                            "action.hover",
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default FacultyStats;