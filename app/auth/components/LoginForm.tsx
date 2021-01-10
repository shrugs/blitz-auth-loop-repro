import { Box, Button, Text } from "@chakra-ui/react";
import login from "app/auth/mutations/login";
import { LoginInput } from "app/auth/validations";
import { Field } from "app/components/Field";
import { Form, FORM_ERROR } from "app/components/Form";
import { AuthenticationError, Link, useMutation } from "blitz";
import React from "react";

type LoginFormProps = {
  onSuccess?: () => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login);

  return (
    <Box w="full">
      <Text fontSize="h1">Login</Text>

      <Form
        submit="Login"
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
        actions={
          <Link href="/signup" passHref>
            <Button variant="link">or sign up</Button>
          </Link>
        }
      >
        <Field name="email" type="email" label="Email" placeholder="Email" />
        <Field name="password" type="password" label="Password" placeholder="Password" />
      </Form>
    </Box>
  );
};

export default LoginForm;
