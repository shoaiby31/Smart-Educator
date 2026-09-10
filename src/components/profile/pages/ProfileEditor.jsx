import React, { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

import ProfileHeader from "../components/ProfileHeader";
import ProfilePhotoUploader from "../components/ProfilePhotoUploader";

import AdminProfileForm from "../components/AdminProfileForm";
import TeacherProfileForm from "../components/TeacherProfileForm";
import StudentProfileForm from "../components/StudentProfileForm";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Authentication";

import useProfileForm from "../hooks/useProfileForm";
import { validateProfile } from "../validation/profileValidation";
import { completeProfile } from "../services/profileService";

const ProfileEditor = ({
    mode = "complete",
    profile = null,
    onSaved,
    onCancel,
}) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    /*
     * ----------------------------------------------------
     * Selected Role
     * ----------------------------------------------------
     *
     * During profile completion the user can choose
     * Admin / Teacher / Student.
     *
     * During edit mode we keep the existing role.
     */
    const [selectedRole, setSelectedRole] = useState(
        user?.role || ""
    );

    /*
     * If the authenticated user already has a role,
     * use it as the initial selection.
     */
    useEffect(() => {
        if (user?.role && mode === "edit") {
            setSelectedRole(user.role);
        }
    }, [user?.role, mode]);

    /*
     * ----------------------------------------------------
     * Profile Form
     * ----------------------------------------------------
     *
     * selectedRole is passed so the hook can build the
     * correct initial form structure.
     */
    const {
        formData,
        profileImage,
        errors,
        loading,
        setErrors,
        setLoading,
        handleChange,
        handleImageChange,
    } = useProfileForm(
        profile,
        selectedRole
    );

    if (!user) return null;

    /*
     * ----------------------------------------------------
     * Role -> Profile Form
     * ----------------------------------------------------
     */

    const profileForms = {
        admin: AdminProfileForm,
        teacher: TeacherProfileForm,
        student: StudentProfileForm,
    };

    const ActiveProfileForm =
        profileForms[selectedRole];

    /*
     * ----------------------------------------------------
     * Role Selection
     * ----------------------------------------------------
     */

    const handleRoleChange = (role) => {
        if (loading) return;

        setSelectedRole(role);
        setErrors({});
    };

    /*
     * ----------------------------------------------------
     * Submit
     * ----------------------------------------------------
     */

    const handleSubmit = async () => {
        setErrors({});

        /*
         * Make sure a role has been selected.
         */
        if (!selectedRole) {
            setErrors({
                submit:
                    "Please select a profile role before continuing.",
            });

            return;
        }

        /*
         * Validate according to selected role.
         */
        const validationErrors =
            validateProfile({
                role: selectedRole,
                values: formData,
            });

        if (
            Object.keys(validationErrors).length
        ) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            /*
             * Common user information.
             */
            const userData = {
                fullName:
                    formData.fullName,

                phone:
                    formData.phone,

                gender:
                    formData.gender,

                photoURL:
                    user.photoURL || "",
            };

            /*
             * Role-specific information.
             */
            const profileDataByRole = {
                admin: {
                    instituteName:
                        formData.instituteName,

                    schoolCode:
                        formData.schoolCode,

                    instituteAddress:
                        formData.instituteAddress,

                    website:
                        formData.website,

                    establishedYear:
                        formData.establishedYear,
                },

                teacher: {
                    teacherCode: formData.teacherCode,
                    designation: formData.designation,
                    qualification: formData.qualification,
                    specialization: formData.specialization,
                    experience: formData.experience,
                    portfolioLink: formData.portfolioLink,
                    bio: formData.bio,
                },

                student: {
                    admissionNo:
                        formData.admissionNo,

                    dateOfBirth:
                        formData.dateOfBirth,

                    guardian:
                        formData.guardian,

                    address:
                        formData.address,
                },
            };

            const profileData =
                profileDataByRole[
                selectedRole
                ] || {};

            /*
             * Complete profile according to
             * the selected role.
             */
            await completeProfile({
                role: selectedRole,
                uid: user.uid,
                userData,
                profileData,
                imageFile: profileImage,
            });

            /*
             * Profile is now completed.
             */
            sessionStorage.removeItem(
                "profileSkipped"
            );

            /*
             * Edit mode.
             */
            if (mode === "edit") {
                onSaved?.();
                return;
            }

            /*
             * Complete-profile mode.
             */
            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Profile completion error:",
                error
            );

            setErrors({
                submit:
                    error.message ||
                    "Something went wrong while saving your profile.",
            });
        } finally {
            setLoading(false);
        }
    };

    /*
     * ----------------------------------------------------
     * Skip Profile
     * ----------------------------------------------------
     */

    const handleSkip = () => {
        sessionStorage.setItem(
            "profileSkipped",
            "true"
        );

        navigate("/", {
            replace: true,
        });
    };

    /*
     * ----------------------------------------------------
     * Role Options
     * ----------------------------------------------------
     */

    const roles = [
        {
            value: "admin",
            label: "Admin",
            description:
                "Manage your school and school community.",
        },
        {
            value: "teacher",
            label: "Teacher",
            description:
                "Manage classes, students and teaching activities.",
        },
        {
            value: "student",
            label: "Student",
            description:
                "Join your school and access learning activities.",
        },
    ];

    return (
        <Paper elevation={0} sx={{ borderRadius: 5, overflow: "hidden", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)", }} >
            <ProfileHeader mode={mode} />

            <Box sx={{ px: { xs: 2.5, sm: 4, md: 5, }, py: { xs: 3, md: 5, }, }} >
                {errors.submit && (<Alert severity="error" sx={{ mb: 4, borderRadius: 3, }} >{errors.submit}</Alert>)}

                <Grid container spacing={{ xs: 4, md: 5, }} alignItems="flex-start" >
                    {/* LEFT — Form */}
                    <Grid size={{ xs: 12, md: 8, }} >
                        <Box sx={{ pr: { md: 1, }, }} >
                            {/* <Stack spacing={1} mb={3} >
                                <Typography variant="h6" fontWeight={700} > Personal & Profile Information </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 680, lineHeight: 1.7, }} >
                                    Add the information
                                    below to keep your
                                    SmartEducator profile
                                    complete and up to
                                    date.
                                </Typography>
                            </Stack> */}

                            {/* Role Selection */}
                            {mode === "complete" && (
                                <Box sx={{ mb: 2 }} >
                                    <Typography variant="h6" fontWeight={700} gutterBottom >Choose Your Role</Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7, }} >
                                        Select the role that best describes how you will use SmartEducator. The profile form will automatically change according to your selection.
                                    </Typography>

                                    <Grid container spacing={2} >
                                        {roles.map(
                                            (role) => {
                                                const isSelected = selectedRole === role.value;

                                                return (
                                                    <Grid key={role.value} size={{ xs: 12, sm: 4, }} >
                                                        <Button fullWidth variant={isSelected ? "contained" : "text"} disabled={loading} onClick={() => handleRoleChange(role.value)} sx={{ borderRadius: 3, textTransform: "none" }} >
                                                            {role.label}
                                                            {/* <Box> */}
                                                            {/* <Typography fontWeight={ 700 } sx={{ mb: 0.4, }} > { role.label } </Typography> */}

                                                            {/* <Typography variant="caption" sx={{ display: "block", opacity: isSelected ? 0.9 : 0.7, lineHeight: 1.4, }} >
                                                                    { role.description }
                                                                </Typography> */}
                                                            {/* </Box> */}
                                                        </Button>
                                                    </Grid>
                                                );
                                            }
                                        )}
                                    </Grid>
                                </Box>
                            )}

                            {/* Active Role Form */}
                            {ActiveProfileForm ? (
                                <ActiveProfileForm
                                    values={formData}
                                    errors={errors}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        py: 5,
                                        textAlign:
                                            "center",
                                        color:
                                            "text.secondary",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                    >
                                        Please select a
                                        role to continue.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    {/* RIGHT — Profile Photo */}
                    <Grid
                        size={{
                            xs: 12,
                            md: 4,
                        }}
                    >
                        <Box
                            sx={{
                                position:
                                    "relative",
                                overflow:
                                    "hidden",
                                borderRadius: 5,
                                border: "1px solid",
                                borderColor:
                                    "divider",
                                p: {
                                    xs: 3,
                                    md: 3.5,
                                },
                                minHeight: {
                                    md: 360,
                                },
                                display: "flex",
                                flexDirection:
                                    "column",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                textAlign: "center",
                                bgcolor:
                                    "grey.50",

                                "&::before": {
                                    content: '""',
                                    position:
                                        "absolute",
                                    width: 180,
                                    height: 180,
                                    borderRadius:
                                        "50%",
                                    background:
                                        "rgba(25, 118, 210, 0.07)",
                                    top: -70,
                                    right: -60,
                                },

                                "&::after": {
                                    content: '""',
                                    position:
                                        "absolute",
                                    width: 130,
                                    height: 130,
                                    borderRadius:
                                        "50%",
                                    background:
                                        "rgba(25, 118, 210, 0.05)",
                                    bottom: -60,
                                    left: -45,
                                },

                                transition:
                                    "transform 0.3s ease, box-shadow 0.3s ease",

                                "&:hover": {
                                    transform:
                                        "translateY(-3px)",
                                    boxShadow:
                                        "0 16px 35px rgba(15,23,42,0.08)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position:
                                        "relative",
                                    zIndex: 1,
                                    width: "100%",
                                }}
                            >
                                <Stack
                                    alignItems="center"
                                    spacing={1}
                                    mb={3}
                                >
                                    <Box
                                        sx={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: 2.5,
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center",
                                            bgcolor:
                                                "primary.main",
                                            color:
                                                "primary.contrastText",
                                        }}
                                    >
                                        <CameraAltRoundedIcon />
                                    </Box>

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        Profile Photo
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            maxWidth: 260,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        Add a clear photo
                                        so your
                                        teachers,
                                        students, and
                                        school community
                                        can recognize you
                                        easily.
                                    </Typography>
                                </Stack>

                                <ProfilePhotoUploader
                                    image={
                                        profileImage
                                    }
                                    loading={
                                        loading
                                    }
                                    onImageChange={
                                        handleImageChange
                                    }
                                />

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="center"
                                    alignItems="center"
                                    mt={3}
                                >
                                    <VerifiedUserRoundedIcon
                                        sx={{
                                            fontSize: 18,
                                            color:
                                                "text.secondary",
                                        }}
                                    />

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Your profile photo
                                        is securely
                                        associated with
                                        your account.
                                    </Typography>
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Bottom Actions */}
                <Box
                    sx={{
                        mt: 5,
                        pt: 4,
                        borderTop:
                            "1px solid",
                        borderColor:
                            "divider",
                    }}
                >
                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {mode === "complete" && (
                            <Button
                                variant="outlined"
                                onClick={
                                    handleSkip
                                }
                                disabled={loading}
                                sx={{
                                    flex: {
                                        xs: 1,
                                        md: "0 0 auto",
                                    },
                                    px: {
                                        md: 4,
                                    },
                                    py: {
                                        xs: 1.2,
                                        md: 1.5,
                                    },
                                    borderRadius: 3,
                                    textTransform:
                                        "none",
                                    fontWeight: 700,
                                    whiteSpace:
                                        "nowrap",
                                    borderWidth: 2,
                                    "&:hover": {
                                        borderWidth: 2,
                                    },
                                }}
                            >
                                Skip for now
                            </Button>
                        )}

                        {mode === "edit" && (
                            <Button
                                variant="outlined"
                                onClick={
                                    onCancel
                                }
                                disabled={loading}
                                sx={{
                                    flex: {
                                        xs: 1,
                                        md: "0 0 auto",
                                    },
                                    px: {
                                        md: 4,
                                    },
                                    py: {
                                        xs: 1.2,
                                        md: 1.5,
                                    },
                                    borderRadius: 3,
                                    textTransform:
                                        "none",
                                    fontWeight: 700,
                                    whiteSpace:
                                        "nowrap",
                                    borderWidth: 2,
                                    "&:hover": {
                                        borderWidth: 2,
                                    },
                                }}
                            >
                                Cancel
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            size="large"
                            disabled={
                                loading ||
                                !selectedRole
                            }
                            onClick={
                                handleSubmit
                            }
                            sx={{
                                flex: {
                                    xs: 1,
                                    md: "0 0 auto",
                                },
                                px: {
                                    md: 4,
                                },
                                py: {
                                    xs: 1.2,
                                    md: 1.5,
                                },
                                borderRadius: 3,
                                textTransform:
                                    "none",
                                fontWeight: 700,
                                whiteSpace:
                                    "nowrap",
                                background:
                                    "linear-gradient(to top left,hsl(315,93.8%,44.3%),rgb(104,70,253))",
                            }}
                        >
                            {loading
                                ? "Saving..."
                                : mode ===
                                    "edit"
                                    ? "Save Changes"
                                    : "Complete Profile"}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProfileEditor;

