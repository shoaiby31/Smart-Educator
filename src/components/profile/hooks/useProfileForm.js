import { useMemo, useState, useEffect } from "react";
import { useAuth } from "../../../Authentication";

import {
  commonInitialValues,
  adminInitialValues,
  teacherInitialValues,
  studentInitialValues,
} from "../constants/profileConstants";

const useProfileForm = (
  profile = null,
  selectedRole = null
) => {
  const { user } = useAuth();

  //----------------------------------------------------
  // Active Role
  //----------------------------------------------------

  const activeRole =
    selectedRole || user?.role || "";

  //----------------------------------------------------
  // Build Initial Values Based On Selected Role
  //----------------------------------------------------

  const initialFormData = useMemo(() => {
    const common = {
      ...commonInitialValues,

      fullName:
        profile?.fullName ||
        user?.fullName ||
        user?.displayName,

      phone:
        profile?.phone || "",

      gender:
        profile?.gender || "",
    };

    switch (activeRole) {
      case "admin":
        return {
          ...common,
          ...adminInitialValues,

          instituteName:
            profile?.instituteName || "",

          schoolCode:
            profile?.schoolCode || "",

          instituteAddress:
            profile?.instituteAddress || "",

          website:
            profile?.website || "",

          establishedYear:
            profile?.establishedYear || "",
        };

      case "teacher":
        return {
          ...common,
          ...teacherInitialValues,

          teacherCode: profile?.teacherCode || "",

          designation:
            profile?.designation || "",

          qualification:
            profile?.qualification || "",

          specialization:
            profile?.specialization || "",

          experience:
            profile?.experience || "",

          portfolioLink: profile?.portfolioLink || "",


          bio:
            profile?.bio || "",
        };

      case "student":
        return {
          ...common,
          ...studentInitialValues,

          admissionNo:
            profile?.admissionNo || "",

          guardian:
            profile?.guardian || "",

          address:
            profile?.address || "",

          dateOfBirth:
            profile?.dateOfBirth || "",
        };

      default:
        return common;
    }
  }, [
    activeRole,
    profile,
    user?.fullName,
  user?.displayName,
  ]);

  //----------------------------------------------------
  // States
  //----------------------------------------------------

  const [formData, setFormData] =
    useState(initialFormData);

  const [profileImage, setProfileImage] =
    useState(null);

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  //----------------------------------------------------
  // Update Form When Role/Profile Changes
  //----------------------------------------------------

  useEffect(() => {
    setFormData(initialFormData);
    setErrors({});
  }, [initialFormData]);

  //----------------------------------------------------
  // Handle Input Change
  //----------------------------------------------------

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  //----------------------------------------------------
  // Handle Image
  //----------------------------------------------------

  const handleImageChange = (file) => {
    setProfileImage(file);
  };

  //----------------------------------------------------
  // Reset
  //----------------------------------------------------

  const resetForm = () => {
    setFormData(initialFormData);

    setProfileImage(null);

    setErrors({});
  };

  //----------------------------------------------------
  // Return
  //----------------------------------------------------

  return {
    formData,
    profileImage,
    errors,
    loading,

    setErrors,
    setLoading,

    handleChange,
    handleImageChange,

    resetForm,
  };


};

export default useProfileForm;
