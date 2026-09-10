import React from "react";

import {
    Autocomplete,
    Box,
    Button,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";

const FacultyFilters = ({
    search = "",
    status = "all",
    specialization = "all",
    assignedClass = "all",
    assignedSubject = "all",

    specializations = [],
    classes = [],
    subjects = [],

    onSearchChange,
    onStatusChange,
    onSpecializationChange,
    onAssignedClassChange,
    onAssignedSubjectChange,

    onReset,
}) => {
    return (
        <Box sx={{ p: { xs: 2, md: 2.5, }, borderRadius: 3, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", }} >
            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                spacing={2}
                alignItems={{
                    xs: "stretch",
                    md: "center",
                }}
            >
                {/* Search */}
                <TextField
                    fullWidth
                    size="small"
                    value={search}
                    onChange={(event) =>
                        onSearchChange?.(
                            event.target.value
                        )
                    }
                    placeholder="Search faculty..."
                    InputProps={{
                        startAdornment: (
                            <SearchRoundedIcon
                                fontSize="small"
                                sx={{
                                    mr: 1,
                                    color: "text.secondary",
                                }}
                            />
                        ),
                    }}
                    sx={{
                        minWidth: {
                            md: 240,
                        },
                    }}
                />

                {/* Status */}
                <TextField
                    select
                    size="small"
                    label="Status"
                    value={status}
                    onChange={(event) =>
                        onStatusChange?.(
                            event.target.value
                        )
                    }
                    sx={{
                        minWidth: {
                            md: 150,
                        },
                    }}
                >
                    <MenuItem value="all">
                        All Status
                    </MenuItem>

                    <MenuItem value="active">
                        Active
                    </MenuItem>

                    <MenuItem value="inactive">
                        Inactive
                    </MenuItem>

                    <MenuItem value="archived">
                        Archived
                    </MenuItem>
                </TextField>

                {/* Specialization */}
                <Autocomplete
                    size="small"
                    options={specializations}
                    value={
                        specialization === "all"
                            ? null
                            : specialization
                    }
                    onChange={(
                        _event,
                        newValue
                    ) =>
                        onSpecializationChange?.(
                            newValue || "all"
                        )
                    }
                    sx={{
                        minWidth: {
                            md: 190,
                        },
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Specialization"
                            placeholder="All"
                        />
                    )}
                />

                {/* Class */}
                <Autocomplete
                    size="small"
                    options={classes}
                    value={
                        assignedClass === "all"
                            ? null
                            : assignedClass
                    }
                    onChange={(
                        _event,
                        newValue
                    ) =>
                        onAssignedClassChange?.(
                            newValue || "all"
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
                    sx={{
                        minWidth: {
                            md: 170,
                        },
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Class"
                            placeholder="All"
                        />
                    )}
                />

                {/* Subject */}
                <Autocomplete
                    size="small"
                    options={subjects}
                    value={
                        assignedSubject === "all"
                            ? null
                            : assignedSubject
                    }
                    onChange={(
                        _event,
                        newValue
                    ) =>
                        onAssignedSubjectChange?.(
                            newValue || "all"
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
                    sx={{
                        minWidth: {
                            md: 170,
                        },
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Subject"
                            placeholder="All"
                        />
                    )}
                />

                {/* Reset */}
                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={
                        <FilterAltOffRoundedIcon />
                    }
                    onClick={onReset}
                    sx={{
                        minWidth: {
                            md: 105,
                        },
                        borderRadius: 2.5,
                        whiteSpace: "nowrap",
                    }}
                >
                    Reset
                </Button>
            </Stack>
        </Box>
    );
};

export default FacultyFilters;