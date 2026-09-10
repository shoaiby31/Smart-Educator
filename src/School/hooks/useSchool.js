import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import schoolService from "../services/schoolService";

const useSchool = () => {
  const { user } = useSelector((state) => state.auth);

  const [school, setSchool] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const loadSchool = useCallback(async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await schoolService.get(user.uid);

      setSchool(data);

      setError("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load school.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createSchool = async (formData) => {
    try {
      setSaving(true);

      await schoolService.create(user.uid, formData);

      await loadSchool();

      return true;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create school.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateSchool = async (formData) => {
    try {
      setSaving(true);

      await schoolService.update(user.uid, formData);

      await loadSchool();

      return true;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update school.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const uploadLogo = async (file) => {
  try {
    setSaving(true);

    const url = await schoolService.uploadLogo(user.uid, file);

    await loadSchool();

    return url;
  } finally {
    setSaving(false);
  }
};

  const uploadCover = async (file) => {
    const url = await schoolService.uploadCover(user.uid, file);

    await loadSchool();

    return url;
  };

  useEffect(() => {
    loadSchool();
  }, [loadSchool]);

  return {
    school,
    loading,
    saving,
    error,

    createSchool,
    updateSchool,

    uploadLogo,
    uploadCover,

    refresh: loadSchool,
  };
};

export default useSchool;