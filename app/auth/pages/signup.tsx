import { SignupForm } from "app/auth/components/SignupForm";
import { BlitzPage, useRouter } from "blitz";
import React from "react";
import { AuthLayout } from "../layouts/AuthLayout";

const SignupPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <>
      <SignupForm onSuccess={() => router.push("/")} />
    </>
  );
};

SignupPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default SignupPage;
