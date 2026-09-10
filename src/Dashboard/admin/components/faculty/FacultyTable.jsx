import React from "react";

import {
    Avatar,
    Box,
    Chip,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

import FacultyActionsMenu from "./FacultyActionsMenu";
import EmptyFaculty from "./EmptyFaculty";

const FacultyTable = ({
   faculty = [],
    loading = false,
    onView,
    onEdit,
    onAssignClasses,
    onChangeStatus,
    onArchive,
    onAdd,
}) => {
    if (!loading && faculty.length === 0) {
        return <EmptyFaculty onAdd={onAdd} />;
    }

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow
                        sx={{
                            bgcolor: "grey.50",
                        }}
                    >
                        <TableCell>
                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="text.secondary"
                            >
                                FACULTY MEMBER
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="text.secondary"
                            >
                                TEACHER CODE
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="text.secondary"
                            >
                                QUALIFICATION
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="text.secondary"
                            >
                                SPECIALIZATION
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="text.secondary"
                            >
                                STATUS
                            </Typography>
                        </TableCell>

                        <TableCell align="right">
                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="text.secondary"
                            >
                                ACTIONS
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                align="center"
                                sx={{ py: 8 }}
                            >
                                <Typography
                                    color="text.secondary"
                                >
                                    Loading faculty members...
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        faculty.map((teacher) => {
                            const fullName =
                                teacher.fullName ||
                                [teacher.firstName, teacher.lastName]
                                    .filter(Boolean)
                                    .join(" ") ||
                                "Unnamed Teacher";

                            const photoURL =
                                teacher.photoURL || "";

                            const status =
                                teacher.status || "active";

                            return (
                                <TableRow
                                    key={
                                        teacher.uid ||
                                        teacher.id
                                    }
                                    hover
                                    sx={{
                                        "&:last-child td": {
                                            borderBottom: 0,
                                        },
                                    }}
                                >
                                    {/* Faculty member */}
                                    <TableCell>
                                        <Stack
                                            direction="row"
                                            spacing={1.5}
                                            alignItems="center"
                                        >
                                            <Avatar
                                                src={photoURL}
                                                alt={fullName}
                                                sx={{
                                                    width: 42,
                                                    height: 42,
                                                }}
                                            >
                                                {fullName
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </Avatar>

                                            <Box>
                                                <Typography
                                                    fontWeight={700}
                                                    noWrap
                                                >
                                                    {fullName}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    noWrap
                                                >
                                                    {teacher.email ||
                                                        "No email"}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>

                                    {/* Teacher code */}
                                    <TableCell>
                                        {teacher.teacherCode ? (
                                            <Chip
                                                label={
                                                    teacher.teacherCode
                                                }
                                                size="small"
                                                icon={
                                                    <SchoolRoundedIcon />
                                                }
                                                sx={{
                                                    fontWeight: 700,
                                                }}
                                            />
                                        ) : (
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Not assigned
                                            </Typography>
                                        )}
                                    </TableCell>

                                    {/* Qualification */}
                                    <TableCell>
                                        <Typography variant="body2">
                                            {teacher.qualification ||
                                                "—"}
                                        </Typography>
                                    </TableCell>

                                    {/* Specialization */}
                                    <TableCell>
                                        <Typography variant="body2">
                                            {teacher.specialization ||
                                                "—"}
                                        </Typography>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={
                                                status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                status.slice(1)
                                            }
                                            color={
                                                status === "active"
                                                    ? "success"
                                                    : status ===
                                                      "pending"
                                                    ? "warning"
                                                    : "default"
                                            }
                                            variant="outlined"
                                        />
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell align="right">
                                       <FacultyActionsMenu
    teacher={teacher}
    onView={onView}
    onEdit={onEdit}
    onAssignClasses={onAssignClasses}
    onChangeStatus={onChangeStatus}
    onArchive={onArchive}
/>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FacultyTable;