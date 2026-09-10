import React from "react";

import AuthLayout from "../components/common/AuthLayout";
import AuthCard from "../components/common/AuthCard";
import AuthHeader from "../components/common/AuthHeader";
import AuthFooter from "../components/common/AuthFooter";
import AuthIllustration from "../components/AuthIllustration";
import ForgotPasswordForm from "../components/forgotPassword/ForgotPasswordForm";

import forgotIllustration from "../../assets/ForgotPassword.svg";

const ForgotPassword = () => {
  return (
    <AuthLayout
      leftContent={
        <AuthIllustration image={forgotIllustration} />
      }
    >
      <AuthCard>
        <AuthHeader
          badge="Account Recovery"
          title="Forgot Your Password?"
          subtitle="Enter your registered email address and we'll send you a secure password reset link so you can regain access to your SmartEducator account."
        />

        <ForgotPasswordForm />

        <AuthFooter
          question="Remember your password?"
          actionText="Back to Login"
          actionLink="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPassword;