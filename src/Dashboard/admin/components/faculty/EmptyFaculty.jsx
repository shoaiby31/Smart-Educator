import React from "react";

import {
    Box,
    Button,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const EmptyFaculty = ({
    onViewRequests,
    hasPendingRequests = false,
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
            }}
        >
            <Box sx={{ px: { xs: 3, sm: 5, md: 7, }, py: { xs: 5, md: 7, }, textAlign: "center", }} >
                {/* Icon */}
                <Box sx={{ position: "relative", width: 96, height: 96, mx: "auto", mb: 3, }} >
                    <Box sx={{ position: "absolute", inset: 0, borderRadius: "50%", bgcolor: "primary.50", }} />

                    <Box sx={{ position: "absolute", inset: 12, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "primary.main", color: "primary.contrastText", boxShadow: "0 12px 30px rgba(25,118,210,.22)", }} >
                        <GroupsRoundedIcon sx={{ fontSize: 34, }} />
                    </Box>
                </Box>

                {/* Heading */}
                <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: "-0.01em", }} >
                    No Faculty Members Yet
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 570, mx: "auto", mt: 1.25, lineHeight: 1.7, }} >
                    Your school's faculty members will
                    appear here after teachers request to
                    join your school and their requests
                    are approved.
                </Typography>

                {/* Workflow hint */}
                <Stack direction={{ xs: "column", sm: "row", }} spacing={1.5} justifyContent="center" alignItems="stretch" sx={{ maxWidth: 650, mx: "auto", mt: 4, }} >
                    <Box sx={{ flex: 1, p: 2, borderRadius: 3, bgcolor: "action.hover", textAlign: "left", }} >
                        <Stack direction="row" spacing={1.5} alignItems="flex-start" >
                            <PersonSearchRoundedIcon color="primary" sx={{ mt: 0.25, }} />

                            <Box>
                                <Typography variant="subtitle2" fontWeight={800} >
                                    Teachers request access
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.6, }} >
                                    Teachers use your school
                                    code to send a joining
                                    request.
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{ flex: 1, p: 2, borderRadius: 3, bgcolor: "action.hover", textAlign: "left", }} >
                        <Stack direction="row" spacing={1.5} alignItems="flex-start" >
                            <GroupsRoundedIcon color="primary" sx={{ mt: 0.25, }} />

                            <Box>
                                <Typography variant="subtitle2" fontWeight={800} >
                                    You approve & assign
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.6, }} >
                                    Approve teachers and
                                    assign their classes and
                                    subjects.
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>

                {/* Action */}
                <Button variant="contained" size="large" onClick={onViewRequests} endIcon={ <ArrowForwardRoundedIcon /> } sx={{ mt: 4, px: 4, py: 1.35, borderRadius: 2.5, fontWeight: 700, boxShadow: "0 8px 22px rgba(25,118,210,.18)", }} > {hasPendingRequests ? "Review Faculty Requests" : "View Faculty Requests"} </Button>
            </Box>
        </Paper>
    );
};

export default EmptyFaculty;