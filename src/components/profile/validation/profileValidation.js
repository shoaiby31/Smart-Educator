// =====================================================
// Helpers
// =====================================================

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  value.toString().trim() === "";

const isPhoneNumber = (phone) =>
  /^[0-9+\-\s()]{8,20}$/.test(phone);

// =====================================================
// Admin
// =====================================================

const validateAdmin = (values) => {
  const errors = {};

  if (isEmpty(values.fullName))
    errors.fullName = "Full name is required.";

  if (isEmpty(values.phone))
    errors.phone = "Phone number is required.";
  else if (!isPhoneNumber(values.phone))
    errors.phone = "Enter a valid phone number.";

  if (isEmpty(values.gender))
    errors.gender = "Please select gender.";

  if (isEmpty(values.instituteName))
    errors.instituteName =
      "Institute name is required.";

      if (isEmpty(values.schoolCode))
    errors.schoolCode =
      "schoolCode is required.";

  if (isEmpty(values.instituteAddress))
    errors.instituteAddress =
      "Institute address is required.";

  return errors;
};

// =====================================================
// Teacher
// =====================================================

const validateTeacher = (values) => {
  const errors = {};

  if (isEmpty(values.fullName))
    errors.fullName = "Full name is required.";

  if (isEmpty(values.phone))
    errors.phone = "Phone number is required.";
  else if (!isPhoneNumber(values.phone))
    errors.phone = "Enter a valid phone number.";

  if (isEmpty(values.gender))
    errors.gender = "Please select gender.";

 if (isEmpty(values.teacherCode))
    errors.teacherCode =
      "Please set teacher code.";

      if (isEmpty(values.designation))
    errors.designation =
      "Designation is required.";

      if (isEmpty(values.experience))
    errors.experience =
      "Experience is required.";

  if (isEmpty(values.qualification))
    errors.qualification =
      "Qualification is required.";

  if (isEmpty(values.specialization))
    errors.specialization =
      "Specialization is required.";

  return errors;
};

// =====================================================
// Student
// =====================================================

const validateStudent = (values) => {
  const errors = {};

  if (isEmpty(values.fullName))
    errors.fullName = "Full name is required.";

  if (isEmpty(values.phone))
    errors.phone = "Phone number is required.";
  else if (!isPhoneNumber(values.phone))
    errors.phone = "Enter a valid phone number.";

  if (isEmpty(values.gender))
    errors.gender = "Please select gender.";

   if (isEmpty(values.admissionNo))
    errors.admissionNo = "Admission No is required.";

  if (isEmpty(values.dateOfBirth))
    errors.dateOfBirth =
      "Date of birth is required.";

  if (isEmpty(values.guardian))
    errors.guardian =
      "Guardian name is required.";

  if (isEmpty(values.address))
    errors.address =
      "Address is required.";

  return errors;
};

// =====================================================
// Public API
// =====================================================

export const validateProfile = ({
  role,
  values,
}) => {
  switch (role) {
    case "admin":
      return validateAdmin(values);

    case "teacher":
      return validateTeacher(values);

    case "student":
      return validateStudent(values);

    default:
      return {};
  }
};