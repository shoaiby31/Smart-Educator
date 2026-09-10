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
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";

const ClassActionsMenu = ({
  classItem,
  onView,
  onEdit,
  onAssignTeacher,
  onAssignStudents,
  onManageSubjects,
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
            onView?.(classItem);
            handleClose();
          }}
        >
          <ListItemIcon>
            <VisibilityRoundedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            View Class
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEdit?.(classItem);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditRoundedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            Edit Class
          </ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            onAssignTeacher?.(classItem);
            handleClose();
          }}
        >
          <ListItemIcon>
            <PersonAddRoundedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            Assign Teacher
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onAssignStudents?.(classItem);
            handleClose();
          }}
        >
          <ListItemIcon>
            <GroupsRoundedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            Assign Students
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onManageSubjects?.(classItem);
            handleClose();
          }}
        >
          <ListItemIcon>
            <MenuBookRoundedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            Manage Subjects
          </ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            onArchive?.(classItem);
            handleClose();
          }}
          sx={{ color: "warning.main" }}
        >
          <ListItemIcon>
            <ArchiveRoundedIcon
              color="warning"
              fontSize="small"
            />
          </ListItemIcon>

          <ListItemText>
            Archive Class
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ClassActionsMenu;