import React, { useState } from "react";

import {
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";

const FacultyActionsMenu = ({
    teacher,
    onView,
    onEdit,
    onAssignClasses,
    onChangeStatus,
    onArchive,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (callback) => {
        handleClose();
        callback?.(teacher);
    };

    const isActive =
        (teacher?.status || "active") === "active";

    return (
        <>
            <IconButton
                onClick={handleOpen}
                size="small"
                aria-label="Faculty actions"
                aria-controls={
                    open
                        ? "faculty-actions-menu"
                        : undefined
                }
                aria-haspopup="true"
                aria-expanded={
                    open ? "true" : undefined
                }
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    "&:hover": {
                        bgcolor: "action.hover",
                    },
                }}
            >
                <MoreVertRoundedIcon fontSize="small" />
            </IconButton>

            <Menu
                id="faculty-actions-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 3,
                        sx: {
                            mt: 1,
                            minWidth: 220,
                            borderRadius: 2.5,
                            border: "1px solid",
                            borderColor: "divider",
                        },
                    },
                }}
            >
                {/* View */}
                <MenuItem
                    onClick={() =>
                        handleAction(onView)
                    }
                >
                    <ListItemIcon>
                        <VisibilityRoundedIcon
                            fontSize="small"
                        />
                    </ListItemIcon>

                    <ListItemText>
                        View Faculty
                    </ListItemText>
                </MenuItem>

                {/* Edit */}
                <MenuItem
                    onClick={() =>
                        handleAction(onEdit)
                    }
                >
                    <ListItemIcon>
                        <EditRoundedIcon
                            fontSize="small"
                        />
                    </ListItemIcon>

                    <ListItemText>
                        Edit Profile
                    </ListItemText>
                </MenuItem>

                {/* Assign classes and subjects */}
                <MenuItem
                    onClick={() =>
                        handleAction(
                            onAssignClasses
                        )
                    }
                >
                    <ListItemIcon>
                        <SchoolRoundedIcon
                            fontSize="small"
                        />
                    </ListItemIcon>

                    <ListItemText
                        primary="Assign Classes & Subjects"
                        secondary="Manage teaching assignments"
                    />
                </MenuItem>

                <Divider />

                {/* Status */}
                <MenuItem
                    onClick={() =>
                        handleAction(
                            onChangeStatus
                        )
                    }
                >
                    <ListItemIcon>
                        <SwapHorizRoundedIcon
                            fontSize="small"
                        />
                    </ListItemIcon>

                    <ListItemText
                        primary={
                            isActive
                                ? "Deactivate Faculty"
                                : "Activate Faculty"
                        }
                    />
                </MenuItem>

                {/* Archive */}
                <MenuItem
                    onClick={() =>
                        handleAction(onArchive)
                    }
                    sx={{
                        color: "error.main",
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color: "error.main",
                        }}
                    >
                        <ArchiveRoundedIcon
                            fontSize="small"
                        />
                    </ListItemIcon>

                    <ListItemText>
                        Archive Faculty
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default FacultyActionsMenu;