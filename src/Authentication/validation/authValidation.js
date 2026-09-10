/**
 * Validate Signup Form
 */
export const validateSignup = (formData) => {
  const errors = {};

  // Full Name
  if (!formData.fullName?.trim()) {
    errors.fullName = "Full name is required.";
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = "Full name must contain at least 3 characters.";
  }

  // Email
  if (!formData.email?.trim()) {
    errors.email = "Email address is required.";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  // Password
  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  // Confirm Password
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  // Role
  if (!formData.role) {
    errors.role = "Please select your role.";
  }

  // Terms
  if (!formData.agree) {
    errors.agree =
      "You must accept the Terms of Service and Privacy Policy.";
  }

  return errors;
};

/**
 * Validate Login Form
 */
export const validateLogin = (formData) => {
  const errors = {};

  if (!formData.email?.trim()) {
    errors.email = "Email address is required.";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  }

  return errors;
};

/**
 * Validate Forgot Password Form
 */
export const validateForgotPassword = (email) => {
  const errors = {};

  if (!email?.trim()) {
    errors.email = "Email address is required.";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
};