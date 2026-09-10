import React from "react";

import AuthLayout from "../components/common/AuthLayout";
import AuthCard from "../components/common/AuthCard";
import AuthHeader from "../components/common/AuthHeader";
import AuthFooter from "../components/common/AuthFooter";
import AuthIllustration from "../components/AuthIllustration";
import LoginForm from "../components/login/LoginForm";

import loginIllustration from "../../assets/login.svg";

const Login = () => {
    return (
        <AuthLayout
            leftContent={
                <AuthIllustration image={loginIllustration} />
            }
        >
            <AuthCard>
                <AuthHeader
                    badge="Welcome Back"
                    title="Sign In to SmartEducator"
                    subtitle="Access your dashboard, manage your school, teach your classes, or continue your learning journey securely."
                />

                <LoginForm />

                <AuthFooter
                    question="Don't have an account?"
                    actionText="Create Account"
                    actionLink="/register"
                />
            </AuthCard>
        </AuthLayout>

    );
};

export default Login;