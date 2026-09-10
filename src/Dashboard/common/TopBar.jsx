import React from "react";
import {
  AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Divider, Box, Avatar, Typography, Paper, InputBase, useTheme, useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Authentication/services/authService";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { SearchRounded, MenuRounded } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import LogoutButton from "../../components/common/LogoutButton";

import { useSelector } from "react-redux";
import FacultyRequestNotifications from "../admin/components/faculty/FacultyRequestNotifications";


const TopBar = ({ onMenuClick }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const { user, userReady, loading } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      await logoutUser();

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AppBar position="sticky" elevation={0}
      sx={{ bgcolor: "#fff", borderBottom: "1px solid #F1F1F4", color: "#111827", zIndex: (theme) => theme.zIndex.drawer + 1, }}>
      <Toolbar sx={{ height: 78, minHeight: "78px !important", px: { xs: 2, md: 3 }, }} >

        {/* Mobile Menu */}
        <IconButton onClick={onMenuClick} sx={{ width: 44, height: 44, borderRadius: 2, color: "#111827", mr: 2, "&:hover": { bgcolor: "#F7F7FB", }, }}>
          <MenuRounded sx={{ fontSize: 26 }} />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        {/* CENTER - SEARCH */}
        {isDesktop && (
          <Paper elevation={0} sx={{ width: 290, height: 42, borderRadius: "14px", border: "1px solid #ECECF3", display: "flex", alignItems: "center", px: 1.8, mr: 3, bgcolor: "#fff", "&:hover": { borderColor: "#E0E0EA", }, "&:focus-within": { borderColor: "#8B5CF6", boxShadow: "0 0 0 3px rgba(139,92,246,.08)", }, }} >
            <SearchRounded sx={{ color: "#6B7280", fontSize: 20, mr: 1.2, }} />
            <InputBase placeholder="Search anything..." sx={{ flex: 1, fontSize: 14, color: "#111827", "& input::placeholder": { color: "#9CA3AF", opacity: 1, }, }} />
          </Paper>
        )}



        {/* Notifications */}
        {user?.role === "admin" && (
          <FacultyRequestNotifications />
        )}


        {/* USER PROFILE */}
        <>
                <Button onClick={openMenu} color="inherit" sx={{ textTransform: "none", borderRadius: 50, px: 1, py: 0.5, minWidth: 0, "&:hover": { bgcolor: "action.hover", }, }} endIcon={<KeyboardArrowDownRoundedIcon />} >
                  <Avatar src={user?.photoURL  || ""} alt={user.fullName} sx={{ width: 38, height: 38, mr: 1.5, }} />

                  <Box textAlign="left" sx={{ display: { xs: "none", lg: "block", }, }} >
                    <Typography variant="body2" fontWeight={700} lineHeight={1.2} >
                      {user?.fullName || user?.displayName}
                    </Typography>

                    <Typography variant="caption" color="text.secondary" textTransform="capitalize" >
                      {user?.role}
                    </Typography>
                  </Box>
                </Button>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu} anchorOrigin={{ vertical: "bottom", horizontal: "right", }} transformOrigin={{ vertical: "top", horizontal: "right", }} PaperProps={{ elevation: 8, sx: { mt: 1.5, width: 240, borderRadius: 3, overflow: "hidden", }, }} >
                  <Box px={2} py={2} display="flex" alignItems="center" gap={1.5} >
                    <Avatar src={user?.photoURL  || ""} sx={{ width: 50, height: 50, }} />

                    <Box>
                      <Typography fontWeight={700} variant="body2" >
                        {user?.fullName || user?.displayName}
                      </Typography>

                      <Typography variant="caption" color="text.secondary" >
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  <MenuItem component={RouterLink} to="/dashboard/admin/profile" onClick={closeMenu} >
                    Profile
                  </MenuItem>

                  <MenuItem component={RouterLink} to="/settings" onClick={closeMenu} >
                    Settings
                  </MenuItem>

                  <Divider />

                  <Box px={1} py={1}>
                    <LogoutButton variant="text" fullWidth onLoggedOut={closeMenu} >
                      Logout
                    </LogoutButton>
                  </Box>
                </Menu>
              </>


      </Toolbar>
      
    </AppBar>
  );
};

export default TopBar;