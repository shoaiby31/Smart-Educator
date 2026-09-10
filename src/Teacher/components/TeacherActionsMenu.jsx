import React, { useState } from "react";
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const TeacherActionsMenu = ({
    teacher,
    onView,
    onEdit,
    onAssignSubjects,
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

    return (
        <>
            <IconButton onClick={handleOpen}>
                <MoreVertRoundedIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        onArchive?.(teacher);
                        handleClose();
                    }}
                    sx={{ color: "warning.main" }}
                >
                    <ListItemIcon>
                        <DeleteRoundedIcon
                            fontSize="small"
                            color="warning"
                        />
                    </ListItemIcon>

                    <ListItemText>
                        Archive Teacher
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        onView?.(teacher);
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <VisibilityRoundedIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText>
                        View Profile
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        onEdit?.(teacher);
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <EditRoundedIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText>
                        Edit Details
                    </ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem
                    onClick={() => {
                        onAssignSubjects?.(teacher);
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <MenuBookRoundedIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText>
                        Assign Subjects
                    </ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onAssignClasses?.(teacher);
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <ClassRoundedIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText>
                        Assign Classes
                    </ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem
                    onClick={() => {
                        onChangeStatus?.(teacher);
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <SwapHorizRoundedIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText>
                        Change Status
                    </ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem
                    onClick={() => {
                        onArchive?.(teacher);
                        handleClose();
                    }}
                    sx={{ color: "warning.main" }}
                >
                    <ListItemIcon>
                        <DeleteRoundedIcon
                            fontSize="small"
                            color="warning"
                        />
                    </ListItemIcon>

                    <ListItemText>
                        Archive Teacher
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default TeacherActionsMenu;