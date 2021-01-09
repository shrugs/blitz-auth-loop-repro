import login from "app/auth/mutations/login";
import { LoginInput } from "app/auth/validations";
import { Form, FORM_ERROR } from "app/components/Form";
import { LabeledTextField } from "app/components/LabeledTextField";
import { AuthenticationError, Link, useMutation } from "blitz";
import React from "react";
import { cc } from "utils/cc";

type LoginFormProps = {
  onSuccess?: () => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login);

  return (
    <div>
      <h1>Login</h1>

      <Form
        submitText="Login"
        schema={LoginInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values);
            props.onSuccess?.();
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" };
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              };
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>

      <div className={cc("mt-4")}>
        Or <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
