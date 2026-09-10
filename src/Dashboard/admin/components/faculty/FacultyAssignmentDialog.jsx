import React, { useEffect, useState } from "react";

import {
    Autocomplete,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

const FacultyAssignmentDialog = ({
    open,
    onClose,
    teacher = null,
    classes = [],
    subjects = [],
    initialClasses = [],
    initialSubjects = [],
    loading = false,
    onSave,
}) => {
    const [selectedClasses, setSelectedClasses] =
        useState([]);

    const [selectedSubjects, setSelectedSubjects] =
        useState([]);

    useEffect(() => {
        if (!open) return;

        setSelectedClasses(initialClasses || []);
        setSelectedSubjects(initialSubjects || []);
    }, [
        open,
        initialClasses,
        initialSubjects,
    ]);

    if (!teacher) return null;

    const fullName =
        teacher.fullName ||
        [
            teacher.firstName,
            teacher.lastName,
        ]
            .filter(Boolean)
            .join(" ") ||
        "Faculty Member";

    const handleSave = () => {
        onSave?.({
            teacher,
            classes: selectedClasses,
            subjects: selectedSubjects,
        });
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
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
                    px: {
                        xs: 2.5,
                        sm: 3,
                    },
                    py: 2.5,
                }}
            >
                <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={800}
                        >
                            Assign Faculty
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            Assign classes and subjects
                            to {fullName}.
                        </Typography>
                    </Box>

                    <Button
                        onClick={onClose}
                        disabled={loading}
                        sx={{
                            minWidth: 40,
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            p: 0,
                        }}
                    >
                        <CloseRoundedIcon />
                    </Button>
                </Stack>
            </DialogTitle>

            <Divider />

            <DialogContent
                sx={{
                    px: {
                        xs: 2.5,
                        sm: 3,
                    },
                    py: 3,
                }}
            >
                <Stack spacing={3}>
                    {/* Teacher summary */}
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            bgcolor: "primary.50",
                            border: "1px solid",
                            borderColor:
                                "primary.100",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                        >
                            <Box
                                sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 2,
                                    display: "grid",
                                    placeItems:
                                        "center",
                                    bgcolor:
                                        "primary.main",
                                    color: "primary.contrastText",
                                }}
                            >
                                <SchoolRoundedIcon />
                            </Box>

                            <Box>
                                <Typography
                                    fontWeight={700}
                                >
                                    {fullName}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {teacher.designation ||
                                        "Faculty Member"}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    {/* Classes */}
                    <Stack spacing={1}>
                        <Typography
                            variant="subtitle2"
                            fontWeight={800}
                        >
                            Classes
                        </Typography>

                        <Autocomplete
                            multiple
                            options={classes}
                            value={selectedClasses}
                            onChange={(
                                _event,
                                newValue
                            ) =>
                                setSelectedClasses(
                                    newValue
                                )
                            }
                            getOptionLabel={(option) =>
                                typeof option ===
                                "string"
                                    ? option
                                    : option.name ||
                                      option.title ||
                                      option.label ||
                                      ""
                            }
                            isOptionEqualToValue={(
                                option,
                                value
                            ) =>
                                (option.id ||
                                    option.uid ||
                                    option.value) ===
                                (value.id ||
                                    value.uid ||
                                    value.value)
                            }
                            renderTags={(
                                value,
                                getTagProps
                            ) =>
                                value.map(
                                    (
                                        option,
                                        index
                                    ) => (
                                        <Chip
                                            {...getTagProps(
                                                {
                                                    index,
                                                }
                                            )}
                                            key={
                                                option.id ||
                                                option.uid ||
                                                option.value ||
                                                index
                                            }
                                            label={
                                                typeof option ===
                                                "string"
                                                    ? option
                                                    : option.name ||
                                                      option.title ||
                                                      option.label
                                            }
                                            size="small"
                                        />
                                    )
                                )
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label="Assigned Classes"
                                    placeholder={
                                        selectedClasses.length
                                            ? ""
                                            : "Select classes"
                                    }
                                />
                            )}
                        />

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Select all classes this
                            teacher is responsible for.
                        </Typography>
                    </Stack>

                    {/* Subjects */}
                    <Stack spacing={1}>
                        <Typography
                            variant="subtitle2"
                            fontWeight={800}
                        >
                            Subjects
                        </Typography>

                        <Autocomplete
                            multiple
                            options={subjects}
                            value={selectedSubjects}
                            onChange={(
                                _event,
                                newValue
                            ) =>
                                setSelectedSubjects(
                                    newValue
                                )
                            }
                            getOptionLabel={(option) =>
                                typeof option ===
                                "string"
                                    ? option
                                    : option.name ||
                                      option.title ||
                                      option.label ||
                                      ""
                            }
                            isOptionEqualToValue={(
                                option,
                                value
                            ) =>
                                (option.id ||
                                    option.uid ||
                                    option.value) ===
                                (value.id ||
                                    value.uid ||
                                    value.value)
                            }
                            renderTags={(
                                value,
                                getTagProps
                            ) =>
                                value.map(
                                    (
                                        option,
                                        index
                                    ) => (
                                        <Chip
                                            {...getTagProps(
                                                {
                                                    index,
                                                }
                                            )}
                                            key={
                                                option.id ||
                                                option.uid ||
                                                option.value ||
                                                index
                                            }
                                            label={
                                                typeof option ===
                                                "string"
                                                    ? option
                                                    : option.name ||
                                                      option.title ||
                                                      option.label
                                            }
                                            size="small"
                                            icon={
                                                <MenuBookRoundedIcon />
                                            }
                                        />
                                    )
                                )
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label="Assigned Subjects"
                                    placeholder={
                                        selectedSubjects.length
                                            ? ""
                                            : "Select subjects"
                                    }
                                />
                            )}
                        />

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Select the subjects this
                            teacher will teach.
                        </Typography>
                    </Stack>
                </Stack>
            </DialogContent>

            <Divider />

            <DialogActions
                sx={{
                    px: {
                        xs: 2.5,
                        sm: 3,
                    },
                    py: 2,
                    gap: 1,
                }}
            >
                <Button
                    onClick={onClose}
                    disabled={loading}
                    sx={{
                        borderRadius: 2.5,
                        px: 2.5,
                    }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={
                        loading ||
                        selectedClasses.length ===
                            0 ||
                        selectedSubjects.length ===
                            0
                    }
                    sx={{
                        borderRadius: 2.5,
                        px: 3,
                        fontWeight: 700,
                    }}
                >
                    {loading
                        ? "Saving..."
                        : "Save Assignment"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FacultyAssignmentDialog;