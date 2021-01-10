import { Box, Button, Text } from "@chakra-ui/react";
import signup from "app/auth/mutations/signup";
import { SignupInput } from "app/auth/validations";
import { Field } from "app/components/Field";
import { Form, FORM_ERROR } from "app/components/Form";
import { Link, useMutation } from "blitz";
import React from "react";

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);

  return (
    <Box w="full">
      <Text fontSize="h1">Create an Account</Text>

      <Form
        submit="Create Account"
        schema={SignupInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values);
            props.onSuccess?.();
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" };
            } else {
              return { [FORM_ERROR]: error.toString() };
            }
          }
        }}
        actions={
          <Link href="/login" passHref>
            <Button variant="link">or log in</Button>
          </Link>
        }
      >
        <Field name="email" type="email" label="Email" placeholder="Email" />
        <Field name="password" type="password" label="Password" placeholder="Password" />
      </Form>
    </Box>
  );
};

export default SignupForm;
