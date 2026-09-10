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
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";

const StudentActionsMenu = ({
  student,
  onView,
  onEdit,
  onAssignClass,
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
            onView?.(student);
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
            onEdit?.(student);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditRoundedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            Edit Student
          </ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            onAssignClass?.(student);
            handleClose();
          }}
        >
          <ListItemIcon>
            <ClassRoundedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            Assign Class
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onChangeStatus?.(student);
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
            onArchive?.(student);
            handleClose();
          }}
          sx={{ color: "warning.main" }}
        >
          <ListItemIcon>
            <ArchiveRoundedIcon
              fontSize="small"
              color="warning"
            />
          </ListItemIcon>

          <ListItemText>
            Archive Student
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default StudentActionsMenu;