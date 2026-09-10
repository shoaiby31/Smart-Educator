export const ROLE_DASHBOARD = {
  admin: "/dashboard/admin",
  teacher: "/dashboard/teacher",
  student: "/dashboard/student",
};

export const getRoleDashboard = (role) => {
  return ROLE_DASHBOARD[role] || "/";
};