import { Routes, Route } from "react-router-dom";

import Profile from "../components/profile/pages/Profile";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={<Profile />}
      />
    </Routes>
  );
};

export default ProfileRoutes;