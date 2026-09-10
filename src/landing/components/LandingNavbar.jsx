import React, { useState } from "react";
import { AppBar, Box, Button, Drawer, IconButton, List, ListItemButton, ListItemText, Stack, Toolbar, Typography, Avatar, Divider, Menu, MenuItem } from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { useSelector } from "react-redux";
import LogoutButton from "../../components/common/LogoutButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Link as RouterLink } from "react-router-dom";
import Logo from '../../assets/logo.png';
import { Skeleton } from "@mui/material";

const navItems = [
  {
    id: 1,
    label: "Home",
    to: "/",
  },
  {
    id: 2,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    id: 3,
    label: "Services",
    to: "/services",
  },
  {
    id: 4,
    label: "About",
    to: "/about-us",
  },
  {
    id: 5,
    label: "Contact",
    to: "/contact-us",
  },
];

const LandingNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [scrolled, setScrolled] = useState(false);

  const { user, userReady } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 20);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () =>
  //     window.removeEventListener("scroll", handleScroll);
  // }, []);

  const handleDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 10 }}>
      <AppBar position="fixed" color="inherit" elevation={0}>
        {/* <Container maxWidth="xl"> */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: 'auto' }}>
            <Box component="img" src={Logo} sx={{ width: 80 }} alt="Logo" />
          </a>

          <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex", }, }} >
            {navItems.map((item) => (
              <Button key={item.label} component={RouterLink}
                to={item.to} sx={{ my: 2, textTransform: 'none', color: 'inherit' }}>

                {item.label}
              </Button>
            ))}

            {!userReady ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : !user ? (
              <>
              <Button component={RouterLink} to="/login" sx={{ textTransform: "none", color: "primary.main", }} >Login</Button>
                <Button component={RouterLink} to="/register" sx={{ textTransform: "none", color: "primary.main", fontWeight: 600, }} >Create Account</Button>

{/* <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="inherit"
              size="large"
              sx={{
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              Get Started
            </Button> */}
              </>
            ) : (
              <>
                <Button onClick={openMenu} color="inherit" sx={{ textTransform: "none", borderRadius: 50, px: 1, py: 0.5, minWidth: 0, "&:hover": { bgcolor: "action.hover", }, }} endIcon={<KeyboardArrowDownRoundedIcon />} >
                  <Avatar src={user.photoURL} alt={user.fullName} sx={{ width: 38, height: 38, mr: 1.5, }} />

                  <Box textAlign="left" sx={{ display: { xs: "none", lg: "block", }, }} >
                    <Typography variant="body2" fontWeight={700} lineHeight={1.2} >
                      {user.fullName || user.displayName}
                    </Typography>

                    <Typography variant="caption" color="text.secondary" textTransform="capitalize" >
                      {user.role}
                    </Typography>
                  </Box>
                </Button>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu} anchorOrigin={{ vertical: "bottom", horizontal: "right", }} transformOrigin={{ vertical: "top", horizontal: "right", }} PaperProps={{ elevation: 8, sx: { mt: 1.5, width: 240, borderRadius: 3, overflow: "hidden", }, }} >
                  <Box px={2} py={2} display="flex" alignItems="center" gap={1.5} >
                    <Avatar src={user.photoURL} sx={{ width: 50, height: 50, }} />

                    <Box>
                      <Typography fontWeight={700} variant="body2" >
                        {user.fullName || user.displayName}
                      </Typography>

                      <Typography variant="caption" color="text.secondary" >
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  <MenuItem component={RouterLink} to="/profile" onClick={closeMenu} >
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
            )}

          </Stack>

          <IconButton onClick={handleDrawer} sx={{ display: { xs: "flex", md: "none", }, }} >
            <MenuRoundedIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawer}
      >
        <Box
          sx={{
            width: 280,
            p: 2,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              variant="h6"
              fontWeight={700}
            >
              SmartEducator
            </Typography>

            <IconButton onClick={handleDrawer}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItemButton key={item.label} component={RouterLink} to={item.to} onClick={handleDrawer} >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}

            {!user ? (
              <>
                <ListItemButton
                  component={RouterLink}
                  to="/login"
                  onClick={handleDrawer}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>

                <Box mt={2}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    fullWidth
                    onClick={handleDrawer}
                  >
                    Get Started
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Divider sx={{ my: 2 }} />

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  px={2}
                  mb={2}
                >
                  <Avatar
                    src={user.photoURL}
                    sx={{
                      width: 52,
                      height: 52,
                    }}
                  />

                  <Box>
                    <Typography fontWeight={700}>
                      {user.fullName || user.displayName}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {user.email}
                    </Typography>
                  </Box>
                </Stack>

                <ListItemButton
                  component={RouterLink}
                  to="/profile"
                  onClick={handleDrawer}
                >
                  <ListItemText primary="Profile" />
                </ListItemButton>

                <ListItemButton
                  component={RouterLink}
                  to="/settings"
                  onClick={handleDrawer}
                >
                  <ListItemText primary="Settings" />
                </ListItemButton>

                <Box mt={2}>
                  <LogoutButton
                    fullWidth
                    variant="contained"
                  />
                </Box>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default LandingNavbar;