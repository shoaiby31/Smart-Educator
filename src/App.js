import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";

// Landing
import LandingPage from "./landing/pages/Landing";
import LandingNavbar from "./landing/components/LandingNavbar";
import LandingFooter from "./landing/components/Footer";

import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Contact from './components/contact';

// Authentication
import Login from "./Authentication/pages/Login";
import Signup from "./Authentication/pages/Signup";
import ForgotPassword from "./Authentication/pages/ForgotPassword";
import VerifyEmail from "./Authentication/pages/VerifyEmail";

// Profile
import ProfileRoutes from "./routes/profileRoutes";
import CompleteProfile from "./components/profile/pages/CompleteProfile";

// Dashboard
import DashboardRoutes from "./routes/dashboardroutes";
import AuthRedirect from "./components/guards/AuthRedirect";
function AppRoutes() {
  const location = useLocation();

  const hideLandingLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/complete-profile");

  return (
    <>
      {!hideLandingLayout && <LandingNavbar />}

      <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/about-us"
          element={<AboutUs />}
        />

        <Route
          path="/contact-us"
          element={<Contact />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Signup />}
        />
        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />

        <Route
          path="/profile/*"
          element={<ProfileRoutes />}
        />

        {/* Complete Profile */}
        <Route
          path="/complete-profile"
          element={
            // <CompleteProfileGuard>
            <CompleteProfile />
            // </CompleteProfileGuard>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard/*"
          element={<DashboardRoutes />}
        />
      </Routes>

      {!hideLandingLayout && <LandingFooter />}
    </>
  );
}

export default function App() {
  const themeMode = useSelector(
    (state) => state.mode.value
  );

  const theme = createTheme({
    palette: {
      mode: themeMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper square elevation={0} sx={{ minHeight: "100vh", }} >
        <AuthRedirect>
          <AppRoutes />
        </AuthRedirect>
      </Paper>
    </ThemeProvider>
  );
}