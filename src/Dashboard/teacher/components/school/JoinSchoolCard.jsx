import React, { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";

import {
    ArrowForwardRounded,
    BusinessRounded,
    SchoolRounded,
} from "@mui/icons-material";

import SchoolSearchDialog from "./SchoolSearchDialog";

const JoinSchoolCard = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card
                elevation={0}
                sx={{
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    overflow: "hidden",
                    position: "relative",

                    background:
                        "linear-gradient(135deg, rgba(25,118,210,0.07), rgba(255,255,255,0.95))",

                    transition:
                        "transform .25s ease, box-shadow .25s ease",

                    "&:hover": {
                        transform:
                            "translateY(-3px)",
                        boxShadow:
                            "0 12px 30px rgba(15,23,42,0.08)",
                    },
                }}
            >
                <CardContent
                    sx={{
                        p: {
                            xs: 2.5,
                            md: 3.5,
                        },
                        "&:last-child": {
                            pb: {
                                xs: 2.5,
                                md: 3.5,
                            },
                        },
                    }}
                >
                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={3}
                        alignItems={{
                            xs: "stretch",
                            sm: "center",
                        }}
                        justifyContent="space-between"
                    >
                        {/* Left Content */}
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="flex-start"
                            sx={{
                                minWidth: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    flexShrink: 0,
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    bgcolor:
                                        "primary.main",
                                    color: "primary.contrastText",
                                    boxShadow:
                                        "0 8px 20px rgba(25,118,210,0.22)",
                                }}
                            >
                                <SchoolRounded />
                            </Box>

                            <Box>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    flexWrap="wrap"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        Join a School
                                    </Typography>

                                    <Chip
                                        size="small"
                                        label="Teacher"
                                        icon={
                                            <BusinessRounded />
                                        }
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 2,
                                        }}
                                    />
                                </Stack>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.75,
                                        maxWidth: 620,
                                        lineHeight: 1.7,
                                    }}
                                >
                                    Connect your teacher
                                    profile with a school
                                    using its unique school
                                    code. Your request will
                                    be sent to the school
                                    administrator for
                                    approval.
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display:
                                            "block",
                                        mt: 1.25,
                                    }}
                                >
                                    You can only become a
                                    school teacher after the
                                    administrator approves
                                    your request.
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Action */}
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={
                                <ArrowForwardRounded />
                            }
                            onClick={() =>
                                setOpen(true)
                            }
                            sx={{
                                flexShrink: 0,
                                minWidth: {
                                    xs: "100%",
                                    sm: 180,
                                },
                                px: 3,
                                py: 1.25,
                                borderRadius: 3,
                                fontWeight: 700,
                                boxShadow:
                                    "0 8px 20px rgba(25,118,210,0.18)",
                            }}
                        >
                            Find a School
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            <SchoolSearchDialog
                open={open}
                onClose={() =>
                    setOpen(false)
                }
            />
        </>
    );
};

export default JoinSchoolCard;