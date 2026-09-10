import { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Stack,
    TextField,
} from "@mui/material";

import LoadingButton from "../../components/common/LoadingButton";
import { validateSchool } from "../validation/schoolValidation";
const defaultValues = {
    instituteName: "",
    instituteAddress: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    academicSession: "",
};

const SchoolForm = ({
    initialValues,
    loading,
    onSubmit,
}) => {
    const [formData, setFormData] = useState(defaultValues);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialValues) {
            setFormData({
                ...defaultValues,
                ...initialValues,
            });
        }
    }, [initialValues]);

    const handleChange = (event) => {
  const { name, value } = event.target;

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

    const handleSubmit = (event) => {
        const validationErrors = validateSchool(formData);

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        onSubmit(formData);
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        error={Boolean(errors.instituteName)}
                        helperText={errors.instituteName}
                        fullWidth
                        label="Institute Name"
                        name="instituteName"
                        value={formData.instituteName}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                    error={Boolean(errors.academicSession)}
                        helperText={errors.academicSession}
                        fullWidth
                        label="Academic Session"
                        name="academicSession"
                        value={formData.academicSession}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={12}>
                    <TextField
                    error={Boolean(errors.instituteAddress)}
                        helperText={errors.instituteAddress}
                        fullWidth
                        label="Institute Address"
                        name="instituteAddress"
                        value={formData.instituteAddress}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                    error={Boolean(errors.city)}
                        helperText={errors.city}
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                    error={Boolean(errors.province)}
                        helperText={errors.province}
                        fullWidth
                        label="Province / State"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                    error={Boolean(errors.country)}
                        helperText={errors.country}
                        fullWidth
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                    error={Boolean(errors.postalCode)}
                        helperText={errors.postalCode}
                        fullWidth
                        label="Postal Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                    error={Boolean(errors.phone)}
                        helperText={errors.phone}
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                    error={Boolean(errors.email)}
                        helperText={errors.email}
                        fullWidth
                        label="Contact Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={12}>
                    <TextField
                    error={Boolean(errors.website)}
                        helperText={errors.website}
                        fullWidth
                        label="Website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            <Box mt={4}>
                <Stack direction="row" justifyContent="flex-end">
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        text={
                            initialValues
                                ? "Update School"
                                : "Create School"
                        }
                        loadingText="Saving..."
                    />
                </Stack>
            </Box>
        </Paper>
    );
};

export default SchoolForm;