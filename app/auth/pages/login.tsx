import { BlitzPage, useRouter } from "blitz";
import LoginForm from "../components/LoginForm";
import { AuthLayout } from "../layouts/AuthLayout";

const LoginPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <>
      <LoginForm onSuccess={() => router.push("/")} />
    </>
  );
};

LoginPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default LoginPage;
