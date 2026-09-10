export const validateSchool = (values) => {
  const errors = {};

  if (!values.instituteName?.trim()) {
    errors.instituteName = "Institute name is required.";
  }

  if (!values.instituteAddress?.trim()) {
    errors.instituteAddress = "Institute address is required.";
  }

  if (!values.city?.trim()) {
    errors.city = "City is required.";
  }

  if (!values.country?.trim()) {
    errors.country = "Country is required.";
  }

  if (!values.phone?.trim()) {
    errors.phone = "Phone number is required.";
  }

  if (
    values.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  ) {
    errors.email = "Enter a valid email.";
  }

  if (
    values.website &&
    !/^https?:\/\/.+/i.test(values.website)
  ) {
    errors.website =
      "Website should start with http:// or https://";
  }

  return errors;
};