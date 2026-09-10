import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../../../Authentication";

import { getProfile } from "../services/profileService";

const useProfile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getProfile({
        uid: user.uid,
        role: user.role,
        schoolId: user.schoolId,
      });

      setProfile(data);
    } catch (error) {
      console.error("Profile:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    profile,
    loading,
    refreshProfile: loadProfile,
  };
};

export default useProfile;