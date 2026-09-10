import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../Dashboard/common/DashboardLayout";
import ProtectedRoute from "../components/guards/ProtectedRoute";

import AdminDashboard from "../Dashboard/admin/pages/Dashboard";
import TeacherDashboard from "../Dashboard/teacher/pages/Dashboard";
import StudentDashboard from "../Dashboard/student/pages/Dashboard";

import FacultyMembers from "../Dashboard/admin/pages/FacultyMembers";
import ProfileRoutes from "../routes/profileRoutes";



import { useSelector } from "react-redux";
import { getRoleDashboard } from "../utils/roleRedirects";
import FacultyJoiningRequests from "../Dashboard/admin/pages/FacultyJoiningRequests";

const DashboardRoutes = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <Routes>
            <Route element={<DashboardLayout />}>

                {/* 
                    /dashboard
                    Redirect to the correct role dashboard
                */}
                <Route
                    index
                    element={
                        user ? (
                            <Navigate
                                to={getRoleDashboard(user.role)}
                                replace
                            />
                        ) : (
                            <Navigate
                                to="/"
                                replace
                            />
                        )
                    }
                />

                {/* =========================
                    ADMIN ROUTES
                ========================= */}

                <Route
                    path="admin"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin"]}
                        >
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="admin/faculty-members"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin"]}
                        >
                            <FacultyMembers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="admin/profile"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin"]}
                        >
                            <ProfileRoutes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="admin/faculty-joining-requests"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin"]}
                        >
                            <FacultyJoiningRequests />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
                    TEACHER ROUTES
                ========================= */}

                <Route
                    path="teacher"
                    element={
                        <ProtectedRoute
                            allowedRoles={["teacher"]}
                        >
                            <TeacherDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
                    STUDENT ROUTES
                ========================= */}

                <Route
                    path="student"
                    element={
                        <ProtectedRoute
                            allowedRoles={["student"]}
                        >
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
                    UNKNOWN DASHBOARD ROUTES
                ========================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Route>
        </Routes>
    );
};

export default DashboardRoutes;

