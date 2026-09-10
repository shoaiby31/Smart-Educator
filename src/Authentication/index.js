// =========================
// Pages
// =========================

export { default as Signup } from "./pages/Signup";
export { default as Login } from "./pages/Login";
export { default as ForgotPassword } from "./pages/ForgotPassword";
export { default as VerifyEmail } from "./pages/VerifyEmail";


// =========================
// Common Components
// =========================

export { default as AuthLayout } from "./components/common/AuthLayout";
export { default as AuthCard } from "./components/common/AuthCard";
export { default as AuthHeader } from "./components/common/AuthHeader";
export { default as AuthFooter } from "./components/common/AuthFooter";
export { default as LoadingButton } from "./components/common/LoadingButton";


// =========================
// Signup Components
// =========================

export { default as SignupForm } from "./components/signup/SignupForm";
export { default as RoleSelector } from "./components/signup/RoleSelector";
export { default as PasswordStrength } from "./components/signup/PasswordStrength";


// =========================
// Login Components
// =========================

export { default as LoginForm } from "./components/login/LoginForm";


// =========================
// Forgot Password Components
// =========================

export { default as ForgotPasswordForm } from "./components/forgotPassword/ForgotPasswordForm";


// =========================
// Shared Components
// =========================

export { default as GoogleButton } from "./components/shared/GoogleButton";
export { default as AuthIllustration } from "./components/AuthIllustration";


// =========================
// Services
// =========================

export * from "./services/authService";
export * from "./services/userService";


// =========================
// Validation
// =========================

export * from "./validation/authValidation";


// =========================
// Context
// =========================

export {
  AuthProvider,
  useAuth,
} from "./context/AuthProvider";