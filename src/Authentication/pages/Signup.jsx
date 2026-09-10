import React from "react";

import AuthLayout from "../components/common/AuthLayout";
import AuthCard from "../components/common/AuthCard";
import AuthHeader from "../components/common/AuthHeader";
import AuthFooter from "../components/common/AuthFooter";
import AuthIllustration from "../components/AuthIllustration";
import SignupForm from "../components/signup/SignupForm";

// Illustration
import signupIllustration from "../../assets/Signup.svg";

const Signup = () => {
  return (
    <AuthLayout
      leftContent={
        <AuthIllustration
          image={signupIllustration}
        />
      }
    >
      <AuthCard>
        <AuthHeader
          badge="SmartEducator"
          title="Create Your Account"
          subtitle="Join SmartEducator and become part of a modern learning platform. Create your account to manage schools, teach students, or begin your learning journey."
        />

        <SignupForm />

        <AuthFooter
          question="Already have an account?"
          actionText="Sign In"
          actionLink="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;